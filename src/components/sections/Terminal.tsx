"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

interface HistoryEntry {
  id: number;
  /** Working directory to draw in the prompt. Null for bare output lines. */
  cwd: string | null;
  cmd: string;
  output: string;
}

declare global {
  interface Window {
    __louisArSetDefaultLayout?: () => string;
    __louisArGetDefaultLayout?: () => string;
    __louisArOpenApp?: (id: string) => string | null;
    __louisArCloseApp?: (id: string) => boolean;
    __louisArListApps?: () => { id: string; title: string }[];
  }
}

// ── Virtual filesystem ────────────────────────────────────────────────────────

interface VFile {
  kind: "file";
  content: string;
  size: number;
}

interface VDir {
  kind: "dir";
  children: Record<string, VNode>;
}

type VNode = VFile | VDir;

function f(content: string): VFile {
  return { kind: "file", content, size: content.length };
}

function d(children: Record<string, VNode>): VDir {
  return { kind: "dir", children };
}

const HOME: VDir = d({
  Documents: d({
    "resume.txt": f(`LOUIS ARBEY
Data Scientist, Stockholm

NOW
  Redfield AB, Data Scientist (2025 to present)
  AI consulting for large-scale companies and government institutions.

BEFORE
  RISE x Husqvarna, Master's thesis on 6G on-device AI   2026
  Adone Conseil, Data & BI Consultant                    2024
  Deloitte, Data Analyst                            2022-2023
  Boulanger, Sales & Consulting                     2020-2021

EDUCATION
  MSc, Stockholm University         AI applied to Health
  Engineering Degree, Efrei Paris   Data Engineering

Long version: try 'open experience'`),
    "thesis_notes.md": f(`# 6G On-Device AI for Autonomous Robots
RISE Research Institutes of Sweden x Husqvarna, spring 2026

## The question
Can a lawn mower reason about what it sees without shipping
every single frame off to a datacenter?

## The build
- Vision-Language Model for scene understanding
- Small Language Model for the planning step
- Compute split between the robot and the network edge
- Field data collected on a Husqvarna Automower
- Quantised to fit the robot's compute and power budget

## The result
Read the whole thing: https://thesis.louisarbey.eu`),
    "stockholm.txt": f(`Things nobody warns you about Stockholm:

1. The sun sets at 14:50 in December and you make peace with it.
2. Fika is not a coffee break, it is infrastructure.
3. Every queue is a numbered ticket. Every single one.
4. The summer makes all of the above worth it.`),
  }),
  Projects: d({
    "thesis.md": f(`# 6G On-Device AI for Robots        [completed 2026]

Modular VLM + SLM system for real-time robot navigation,
built with RISE and Husqvarna.

Stack: Python, PyTorch, VLM, SLM, 6G, Robotics
Link:  https://thesis.louisarbey.eu`),
    "easy-qr.md": f(`# Easy QR: Free QR Generator        [live 2025]

Paste a URL, get a QR code. No account, no subscription,
no expiry date quietly ticking down.

Stack: Lovable
Link:  https://qrcode.louisarbey.eu`),
    "self-checkout.md": f(`# Self-Checkout Vision System       [live 2023]

Computer vision model that recognises catering trays at
checkout. Selected in the top six of forty submissions
at Efrei Paris.

Stack: Python, Computer Vision, scikit-learn`),
    "portfolio.md": f(`# Portfolio Website                 [live 2025]

The desktop you are currently typing into. Every window,
menu and app is real React, no images of a UI.

Stack: Next.js, TypeScript, Tailwind CSS, Motion
Source: https://github.com/LuiAr/louis-ar`),
  }),
  Photos: d({
    "profile.jpeg": f("[binary] JPEG image data, 120 x 120, baseline"),
    "husq_robot.png": f("[binary] PNG image data, one robot, one lawn"),
  }),
  "ReadMe.txt": f(`Welcome to Louis's terminal.

This is a hand-rolled shell running inside a browser window.
It has a small virtual filesystem and most of the muscle
memory you already have:

  Tab          complete commands and paths
  Up / Down    walk back through history
  Ctrl+C       abandon the current line
  Ctrl+L       clear the screen
  Ctrl+A / E   jump to start / end of line
  Ctrl+U / K   kill to start / end of line
  Ctrl+W       delete the previous word

Run 'help' for the command list, 'ls -a' to see what is
hiding, and 'open' to launch any app on this desktop.`),
  "secret_plans.txt": f(`ACCESS DENIED

This file has been classified by the NSA.
Just kidding, there are no secret plans here.
But nice try.`),
  "hello_world.cpp": f(`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`),
  ".zshrc": f(`# ~/.zshrc
export PS1="%n@%m:%~$ "
alias ll="ls -la"
alias please="sudo"

# This file has never once been sourced. It is decoration.`),
  ".hidden_joke": f(`You found it.

There is no prize, but you did read the flags on 'ls',
which is more than most people manage.`),
});

const USER = "louisar";
const HOST = "macbook";

function pathToString(path: string[]): string {
  return path.length === 0 ? "~" : `~/${path.join("/")}`;
}

/** Resolve a user-typed path against the cwd. Returns null if it escapes home. */
function resolvePath(cwd: string[], input: string): string[] | null {
  const absolute = input.startsWith("~") || input.startsWith("/");
  const start = absolute ? [] : [...cwd];
  const body = input.replace(/^~\/?|^\//, "");
  const segments = body.length === 0 ? [] : body.split("/");

  const out = start;
  for (const segment of segments) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      if (out.length === 0) return null;
      out.pop();
      continue;
    }
    out.push(segment);
  }
  return out;
}

function getNode(path: string[]): VNode | null {
  let node: VNode = HOME;
  for (const segment of path) {
    if (node.kind !== "dir") return null;
    const next: VNode | undefined = node.children[segment];
    if (!next) return null;
    node = next;
  }
  return node;
}

/** Split a line into argv, honouring single and double quotes. */
function tokenize(line: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;
  let started = false;

  for (const ch of line) {
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      started = true;
      continue;
    }
    if (ch === " " || ch === "\t") {
      if (started) tokens.push(current);
      current = "";
      started = false;
      continue;
    }
    current += ch;
    started = true;
  }
  if (started) tokens.push(current);
  return tokens;
}

// ── Commands ──────────────────────────────────────────────────────────────────

interface CommandContext {
  args: string[];
  cwd: string[];
  history: string[];
}

interface CommandResult {
  output?: string;
  cwd?: string[];
  clear?: boolean;
  clearHistory?: boolean;
}

interface Command {
  summary: string;
  usage: string;
  run: (ctx: CommandContext) => CommandResult;
}

function pad(value: string, width: number): string {
  return value.length >= width ? value : value + " ".repeat(width - value.length);
}

function padStart(value: string, width: number): string {
  return value.length >= width ? value : " ".repeat(width - value.length) + value;
}

function listEntries(node: VDir, showHidden: boolean): string[] {
  return Object.keys(node.children)
    .filter((name) => showHidden || !name.startsWith("."))
    .sort((a, b) => a.localeCompare(b));
}

function longFormat(node: VDir, names: string[]): string {
  const stamp = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const lines = names.map((name) => {
    const child = node.children[name];
    const isDir = child.kind === "dir";
    const mode = isDir ? "drwxr-xr-x" : "-rw-r--r--";
    const links = isDir ? Object.keys(child.children).length + 2 : 1;
    const size = isDir ? 96 : child.size;
    return [
      mode,
      padStart(String(links), 3),
      pad(USER, 8),
      pad("staff", 6),
      padStart(String(size), 6),
      stamp,
      isDir ? `${name}/` : name,
    ].join(" ");
  });
  return [`total ${names.length}`, ...lines].join("\n");
}

function renderTree(node: VDir, prefix: string, showHidden: boolean): string[] {
  const names = listEntries(node, showHidden);
  const lines: string[] = [];
  names.forEach((name, index) => {
    const last = index === names.length - 1;
    const child = node.children[name];
    lines.push(`${prefix}${last ? "`-- " : "|-- "}${name}${child.kind === "dir" ? "/" : ""}`);
    if (child.kind === "dir") {
      lines.push(...renderTree(child, `${prefix}${last ? "    " : "|   "}`, showHidden));
    }
  });
  return lines;
}

const NEOFETCH = `        ,--------.        ${USER}@${HOST}
       /          \\       ${"-".repeat(USER.length + HOST.length + 1)}
      |  ,------.  |      OS: System 7.5.3
      |  |      |  |      Host: Macintosh Plus
      |  | > _  |  |      Kernel: Darwin 24.0.0
      |  \`------'  |      Shell: zsh 5.9
      |            |      Terminal: Terminal.app
      |   ______   |      CPU: Motorola 68000 (8 MHz)
      |  |______|  |      GPU: none, and we managed
      \`------------'      Memory: 3.4 MB / 4 MB`;

const MATRIX = `        THE MATRIX HAS YOU...

Follow the white rabbit.

    /\\   /\\  /\\  /\\  /\\  /\\  /\\
   /  \\ /  \\/  \\/  \\/  \\/  \\/  \\
  ------------------------------

Wake up, Neo...`;

const ANSWER = `                  THE ANSWER

                    /|  ___
                   / | |__ \\
                  /  |    ) |
                 /   |   / /
                /    |  /_/
               /_____| (_)

"The answer to life, the universe, and everything"`;

const COMMANDS: Record<string, Command> = {
  help: {
    summary: "show this help message",
    usage: "help",
    run: () => {
      const names = Object.keys(COMMANDS).sort();
      const width = Math.max(...names.map((n) => n.length)) + 2;
      const body = names
        .map((name) => `  ${pad(name, width)}${COMMANDS[name].summary}`)
        .join("\n");
      return {
        output: `Available commands:\n${body}\n\nTab completes, Up and Down walk history, Ctrl+C abandons a line.\nRun 'man <command>' for usage.`,
      };
    },
  },

  ls: {
    summary: "list directory contents",
    usage: "ls [-a] [-l] [path]",
    run: ({ args, cwd }) => {
      const flags = args.filter((a) => a.startsWith("-")).join("");
      const target = args.find((a) => !a.startsWith("-"));
      const showHidden = flags.includes("a");
      const long = flags.includes("l");

      const path = target ? resolvePath(cwd, target) : cwd;
      if (!path) return { output: `ls: ${target}: No such file or directory` };
      const node = getNode(path);
      if (!node) return { output: `ls: ${target}: No such file or directory` };
      if (node.kind === "file") return { output: target ?? "" };

      const names = listEntries(node, showHidden);
      if (names.length === 0) return { output: "" };
      if (long) return { output: longFormat(node, names) };
      return {
        output: names
          .map((name) => (node.children[name].kind === "dir" ? `${name}/` : name))
          .join("\n"),
      };
    },
  },

  cd: {
    summary: "change the working directory",
    usage: "cd [path]",
    run: ({ args, cwd }) => {
      const target = args[0] ?? "~";
      const path = resolvePath(cwd, target);
      if (!path) return { output: `cd: ${target}: ~ is the top of this filesystem` };
      const node = getNode(path);
      if (!node) return { output: `cd: ${target}: No such file or directory` };
      if (node.kind !== "dir") return { output: `cd: ${target}: Not a directory` };
      return { cwd: path };
    },
  },

  pwd: {
    summary: "print the working directory",
    usage: "pwd",
    run: ({ cwd }) => ({ output: `/Users/${USER}${cwd.length ? `/${cwd.join("/")}` : ""}` }),
  },

  cat: {
    summary: "print a file to the terminal",
    usage: "cat <file> [file...]",
    run: ({ args, cwd }) => {
      if (args.length === 0) return { output: "usage: cat <file>" };
      const chunks = args.map((arg) => {
        const path = resolvePath(cwd, arg);
        const node = path && getNode(path);
        if (!node) return `cat: ${arg}: No such file or directory`;
        if (node.kind === "dir") return `cat: ${arg}: Is a directory`;
        return node.content;
      });
      return { output: chunks.join("\n") };
    },
  },

  tree: {
    summary: "show the directory tree",
    usage: "tree [-a] [path]",
    run: ({ args, cwd }) => {
      const showHidden = args.some((a) => a.startsWith("-") && a.includes("a"));
      const target = args.find((a) => !a.startsWith("-"));
      const path = target ? resolvePath(cwd, target) : cwd;
      if (!path) return { output: `tree: ${target}: No such file or directory` };
      const node = getNode(path);
      if (!node) return { output: `tree: ${target}: No such file or directory` };
      if (node.kind !== "dir") return { output: `tree: ${target}: Not a directory` };
      return { output: [pathToString(path), ...renderTree(node, "", showHidden)].join("\n") };
    },
  },

  echo: {
    summary: "print text back at you",
    usage: "echo [text]",
    run: ({ args, cwd }) =>
      ({
        output: args
          .map((arg) =>
            arg
              .replace(/\$USER/g, USER)
              .replace(/\$HOME/g, `/Users/${USER}`)
              .replace(/\$PWD/g, `/Users/${USER}${cwd.length ? `/${cwd.join("/")}` : ""}`)
              .replace(/\$SHELL/g, "/bin/zsh")
          )
          .join(" "),
      }),
  },

  open: {
    summary: "launch an app on this desktop",
    usage: "open <app-id>",
    run: ({ args }) => {
      const apps = window.__louisArListApps?.();
      if (!apps) {
        return { output: "open: unavailable outside the desktop window manager." };
      }
      if (args.length === 0) {
        const width = Math.max(...apps.map((a) => a.id.length)) + 2;
        return {
          output: `usage: open <app-id>\n\n${apps
            .map((a) => `  ${pad(a.id, width)}${a.title}`)
            .join("\n")}`,
        };
      }
      const title = window.__louisArOpenApp?.(args[0]);
      if (!title) return { output: `open: ${args[0]}: no such app. Run 'open' for the list.` };
      return { output: `Opening ${title}...` };
    },
  },

  which: {
    summary: "locate a command",
    usage: "which <command>",
    run: ({ args }) => {
      if (args.length === 0) return { output: "usage: which <command>" };
      return {
        output: args
          .map((arg) =>
            COMMANDS[arg.toLowerCase()] ? `/bin/${arg}` : `${arg} not found`
          )
          .join("\n"),
      };
    },
  },

  man: {
    summary: "show usage for a command",
    usage: "man <command>",
    run: ({ args }) => {
      if (args.length === 0) return { output: "What manual page do you want?" };
      const name = args[0].toLowerCase();
      const cmd = COMMANDS[name];
      if (!cmd) return { output: `No manual entry for ${args[0]}` };
      return {
        output: `NAME\n    ${name} - ${cmd.summary}\n\nSYNOPSIS\n    ${cmd.usage}`,
      };
    },
  },

  whoami: {
    summary: "print the current user",
    usage: "whoami",
    run: () => ({ output: USER }),
  },

  date: {
    summary: "show the current date and time",
    usage: "date",
    run: () => ({ output: new Date().toString() }),
  },

  uname: {
    summary: "print system information",
    usage: "uname [-a]",
    run: ({ args }) =>
      args.some((a) => a.includes("a"))
        ? {
            output: `Darwin ${USER}s-${HOST} 24.0.0 Darwin Kernel Version 24.0.0: Motorola 68000 Macintosh`,
          }
        : { output: "Darwin" },
  },

  uptime: {
    summary: "show how long this shell has been up",
    usage: "uptime",
    run: () => {
      const days = Math.floor(Math.random() * 100) + 1;
      const hours = Math.floor(Math.random() * 24);
      const mins = String(Math.floor(Math.random() * 60)).padStart(2, "0");
      return {
        output: `up ${days} days, ${hours}:${mins}, 1 user, load average: 0.42 0.31 0.28`,
      };
    },
  },

  neofetch: {
    summary: "print system info with ASCII art",
    usage: "neofetch",
    run: () => ({ output: NEOFETCH }),
  },

  history: {
    summary: "show or clear the command history",
    usage: "history [-c]",
    run: ({ args, history }) => {
      if (args.some((a) => a.includes("c"))) {
        return { output: "", clearHistory: true };
      }
      if (history.length === 0) return { output: "(no commands yet)" };
      return {
        output: history.map((cmd, i) => `  ${padStart(String(i + 1), 3)}  ${cmd}`).join("\n"),
      };
    },
  },

  clear: {
    summary: "clear the screen",
    usage: "clear",
    run: () => ({ clear: true }),
  },

  sudo: {
    summary: "execute a command as another user",
    usage: "sudo <command>",
    run: () => ({
      output: `Password: ******
Sorry, try again.
Password: ******
sudo: 1 incorrect password attempt

(There is no password. You are already as root as it gets here.)`,
    }),
  },

  matrix: {
    summary: "enter the Matrix",
    usage: "matrix",
    run: () => ({ output: MATRIX }),
  },

  "42": {
    summary: "the answer to everything",
    usage: "42",
    run: () => ({ output: ANSWER }),
  },

  exit: {
    summary: "close the terminal window",
    usage: "exit",
    run: () => {
      const closed = window.__louisArCloseApp?.("terminal");
      if (closed) return { output: "logout" };
      return { output: "logout\n(Use Cmd+W to close this window.)" };
    },
  },

  "set-default": {
    summary: "save the current window layout as your default",
    usage: "set-default",
    run: () => ({
      output:
        window.__louisArSetDefaultLayout?.() ??
        "set-default: unavailable outside the desktop window manager.",
    }),
  },

  "get-default": {
    summary: "print the current window layout as code",
    usage: "get-default",
    run: () => ({
      output:
        window.__louisArGetDefaultLayout?.() ??
        "get-default: unavailable outside the desktop window manager.",
    }),
  },
};

const COMMAND_NAMES = Object.keys(COMMANDS).sort();

// ── Tab completion ────────────────────────────────────────────────────────────

interface Completion {
  line: string;
  cursor: number;
  listing?: string;
}

function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (prefix && !value.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

function completionCandidates(
  cwd: string[],
  token: string,
  isFirstToken: boolean
): { candidates: string[]; replaceFrom: number; suffixOf: (name: string) => string } {
  if (isFirstToken && !token.includes("/")) {
    return {
      candidates: COMMAND_NAMES.filter((name) => name.startsWith(token)),
      replaceFrom: 0,
      suffixOf: () => " ",
    };
  }

  const slash = token.lastIndexOf("/");
  const dirPart = slash === -1 ? "" : token.slice(0, slash + 1);
  const filePart = slash === -1 ? token : token.slice(slash + 1);
  const dirPath = resolvePath(cwd, dirPart || ".");
  const node = dirPath && getNode(dirPath);

  if (!node || node.kind !== "dir") {
    return { candidates: [], replaceFrom: 0, suffixOf: () => "" };
  }

  const candidates = listEntries(node, filePart.startsWith(".")).filter((name) =>
    name.startsWith(filePart)
  );
  return {
    candidates,
    replaceFrom: dirPart.length,
    suffixOf: (name) => (node.children[name]?.kind === "dir" ? "/" : " "),
  };
}

function complete(line: string, cursor: number, cwd: string[]): Completion {
  const head = line.slice(0, cursor);
  const tail = line.slice(cursor);
  const tokenStart = Math.max(head.lastIndexOf(" "), head.lastIndexOf("\t")) + 1;
  const token = head.slice(tokenStart);
  const isFirstToken = head.slice(0, tokenStart).trim() === "";

  const { candidates, replaceFrom, suffixOf } = completionCandidates(cwd, token, isFirstToken);

  if (candidates.length === 0) return { line, cursor };

  const prefixStart = tokenStart + replaceFrom;
  const typed = head.slice(prefixStart);

  if (candidates.length === 1) {
    const replacement = candidates[0] + suffixOf(candidates[0]);
    const nextHead = head.slice(0, prefixStart) + replacement;
    return { line: nextHead + tail, cursor: nextHead.length };
  }

  const shared = longestCommonPrefix(candidates);
  if (shared.length > typed.length) {
    const nextHead = head.slice(0, prefixStart) + shared;
    return { line: nextHead + tail, cursor: nextHead.length };
  }

  return { line, cursor, listing: candidates.join("  ") };
}

// ── Component ─────────────────────────────────────────────────────────────────

const BOOT_TEXT = [
  "MacOS Terminal 1.0",
  "Copyright (c) 1984 Apple Computer Inc.",
  "",
  "Last login: today, on ttys000",
  "Type 'help' for commands. Tab completes, Up and Down walk history.",
  "",
];

export default function Terminal() {
  const [lines, setLines] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cursor, setCursor] = useState(0);
  const [cwd, setCwd] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [bootLine, setBootLine] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const cwdLabel = pathToString(cwd);

  // Boot banner, one line at a time. Driven by state rather than a mutable
  // closure counter so a re-run of this effect cannot skip or duplicate a line.
  useEffect(() => {
    if (bootLine >= BOOT_TEXT.length) {
      setBootComplete(true);
      return;
    }
    const timer = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        { id: -1 - bootLine, cwd: null, cmd: "", output: BOOT_TEXT[bootLine] },
      ]);
      setBootLine((n) => n + 1);
    }, 150);
    return () => clearTimeout(timer);
  }, [bootLine]);

  // Restart the blink on every edit so the cursor is solid the instant you type
  // or move it, then settles back into blinking while idle.
  useEffect(() => {
    setShowCursor(true);
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(cursorInterval);
  }, [input, cursor]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, input]);

  useEffect(() => {
    if (bootComplete) inputRef.current?.focus();
  }, [bootComplete]);

  // Keep the hidden input's caret in step with our own cursor state, so the
  // block cursor we draw and the native editing position never disagree.
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const clamped = Math.min(cursor, input.length);
    if (el.selectionStart !== clamped || el.selectionEnd !== clamped) {
      el.setSelectionRange(clamped, clamped);
    }
  }, [cursor, input]);

  const emit = useCallback((entries: Omit<HistoryEntry, "id">[]) => {
    // Stamp ids before handing the updater to React: the updater must stay pure
    // because React invokes it more than once in development.
    const stamped = entries.map((e) => ({ ...e, id: nextId.current++ }));
    setLines((prev) => [...prev, ...stamped]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const echoed = { cwd: cwdLabel, cmd: raw, output: "" };
      const trimmed = raw.trim();

      if (!trimmed) {
        emit([echoed]);
        return;
      }

      const nextHistory = [...cmdHistory, trimmed];
      setCmdHistory(nextHistory);

      const tokens = tokenize(trimmed);
      const name = tokens[0].toLowerCase();
      const command = COMMANDS[name];

      if (!command) {
        emit([{ ...echoed, output: `zsh: command not found: ${tokens[0]}` }]);
        return;
      }

      const result = command.run({
        args: tokens.slice(1),
        cwd,
        history: cmdHistory,
      });

      if (result.cwd) setCwd(result.cwd);
      if (result.clearHistory) setCmdHistory([]);

      if (result.clear) {
        setLines([]);
        return;
      }
      emit([{ ...echoed, output: result.output ?? "" }]);
    },
    [cmdHistory, cwd, cwdLabel, emit]
  );

  const setLine = (value: string, caret = value.length) => {
    setInput(value);
    setCursor(Math.max(0, Math.min(caret, value.length)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const caret = el.selectionStart ?? input.length;

    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setLine("");
      setHistIndex(null);
      setDraft("");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const result = complete(input, caret, cwd);
      if (result.listing) {
        emit([
          { cwd: cwdLabel, cmd: input, output: "" },
          { cwd: null, cmd: "", output: result.listing },
        ]);
      }
      setLine(result.line, result.cursor);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = histIndex === null ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      if (histIndex === null) setDraft(input);
      setHistIndex(next);
      setLine(cmdHistory[next]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const next = histIndex + 1;
      if (next >= cmdHistory.length) {
        setHistIndex(null);
        setLine(draft);
        return;
      }
      setHistIndex(next);
      setLine(cmdHistory[next]);
      return;
    }

    if (e.ctrlKey && !e.metaKey && !e.altKey) {
      const key = e.key.toLowerCase();

      if (key === "c") {
        e.preventDefault();
        emit([{ cwd: cwdLabel, cmd: `${input}^C`, output: "" }]);
        setLine("");
        setHistIndex(null);
        setDraft("");
        return;
      }
      if (key === "l") {
        e.preventDefault();
        setLines([]);
        return;
      }
      if (key === "a") {
        e.preventDefault();
        setCursor(0);
        return;
      }
      if (key === "e") {
        e.preventDefault();
        setCursor(input.length);
        return;
      }
      if (key === "u") {
        e.preventDefault();
        setLine(input.slice(caret), 0);
        return;
      }
      if (key === "k") {
        e.preventDefault();
        setLine(input.slice(0, caret), caret);
        return;
      }
      if (key === "w") {
        e.preventDefault();
        const head = input.slice(0, caret).replace(/\S+\s*$/, "");
        setLine(head + input.slice(caret), head.length);
        return;
      }
      if (key === "d") {
        e.preventDefault();
        if (input.length === 0) {
          emit([{ cwd: cwdLabel, cmd: "", output: "" }]);
          runCommand("exit");
          return;
        }
        setLine(input.slice(0, caret) + input.slice(caret + 1), caret);
        return;
      }
    }
  };

  // Native editing keys (characters, Backspace, arrows, Home, End) fall through
  // to the input; mirror wherever they left the caret.
  const syncCursor = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setCursor(e.currentTarget.selectionStart ?? e.currentTarget.value.length);
  };

  const focusTerminal = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) return; // let the user copy output
    inputRef.current?.focus();
  };

  const before = input.slice(0, cursor);
  const atCursor = input.slice(cursor, cursor + 1) || " ";
  const after = input.slice(cursor + 1);

  return (
    <div
      className="flex flex-col h-full bg-[var(--color-ink)] text-[var(--color-cream)] font-mono text-sm cursor-text"
      onClick={focusTerminal}
    >
      <div ref={scrollRef} className="flex-1 p-3 overflow-auto">
        {lines.map((entry) => (
          <div key={entry.id} className="whitespace-pre-wrap mb-1 break-words">
            {entry.cwd !== null && (
              <span>
                <span className="text-[#7dff7d]">
                  {USER}@{HOST}
                </span>
                <span>:</span>
                <span className="text-[#7dafff]">{entry.cwd}</span>
                <span>$ </span>
                {entry.cmd}
                {entry.output ? "\n" : ""}
              </span>
            )}
            {entry.output}
          </div>
        ))}
        {bootComplete && (
          <div className="relative whitespace-pre-wrap break-words">
            <span className="text-[#7dff7d]">
              {USER}@{HOST}
            </span>
            <span>:</span>
            <span className="text-[#7dafff]">{cwdLabel}</span>
            <span>$ </span>
            {before}
            <span
              className={
                showCursor
                  ? "bg-[var(--color-cream)] text-[var(--color-ink)]"
                  : undefined
              }
            >
              {atCursor}
            </span>
            {after}
            <input
              ref={inputRef}
              type="text"
              aria-label="Terminal command input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setCursor(e.target.selectionStart ?? e.target.value.length);
                setHistIndex(null);
              }}
              onKeyDown={handleKeyDown}
              onKeyUp={syncCursor}
              onSelect={syncCursor}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="absolute left-0 top-0 h-px w-px border-none bg-transparent p-0 text-transparent opacity-0 outline-none"
              autoFocus
            />
          </div>
        )}
      </div>
      <div className="px-3 py-1 bg-[var(--color-ink)] border-t border-[var(--color-cream)] border-opacity-20 text-[10px] text-[var(--color-ink-muted)]">
        zsh · 80x24 · UTF-8 · Tab completes · ↑↓ history · Ctrl+C cancels
      </div>
    </div>
  );
}
