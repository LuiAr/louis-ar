"use client";

import { useEffect, useRef, useState } from "react";

interface HistoryEntry {
  cmd: string;
  output: string;
}

const COMMANDS: Record<string, () => string> = {
  help: () => `Available commands:
  help      - Show this help message
  date      - Show current date & time
  whoami    - Display current user
  ls        - List files in current directory
  cat [file]- Display file contents
  echo      - Print text to terminal
  clear     - Clear the terminal
  pwd       - Print working directory
  uname     - System information
  uptime    - System uptime
  matrix    - Enter the Matrix...
  42        - The answer to everything
  sudo      - Execute a command as another user
  history   - Show command history
  exit      - Close terminal`,

  date: () => new Date().toString(),

  whoami: () => "louisar",

  ls: () => `Documents/
Projects/
Photos/
ReadMe.txt
secret_plans.txt
hello_world.cpp`,

  "cat readme": () => `Welcome to Louis's Terminal!
This is a fake terminal with some easter eggs.
Try running 'help' to see what commands are available.
Have fun exploring!`,

  "cat readme.txt": () => `Welcome to Louis's Terminal!
This is a fake terminal with some easter eggs.
Try running 'help' to see what commands are available.
Have fun exploring!`,

  "cat secret_plans": () => `⚠️ ACCESS DENIED
This file has been classified by the NSA.
Just kidding, there are no secret plans here.
But nice try! 🫡`,

  "cat secret_plans.txt": () => `⚠️ ACCESS DENIED
This file has been classified by the NSA.
Just kidding, there are no secret plans here.
But nice try! 🫡`,

  "cat hello_world.cpp": () => `#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,

  cat: () => "Usage: cat [filename]",

  echo: () => "Usage: echo [text]",

  clear: () => "__CLEAR__",

  pwd: () => "/Users/louisar",

  uname: () => "Darwin louisars-macbook 24.0.0 Darwin Kernel Version 24.0.0",

  uptime: () => {
    const uptime = Math.floor(Math.random() * 100) + 1;
    return `${uptime} days, ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;
  },

  matrix: () => `        ⚡ THE MATRIX HAS YOU... ⚡
    
Follow the white rabbit.

    ██╗   ██╗ ██████╗ ██╗██████╗ 
    ██║   ██║██╔═══██╗██║██╔══██╗
    ██║   ██║██║   ██║██║██║  ██║
    ╚██╗ ██╔╝██║   ██║██║██║  ██║
     ╚████╔╝ ╚██████╔╝██║██████╔╝
      ╚═══╝   ╚═════╝ ╚═╝╚═════╝

Wake up, Neo...`,
  "42": () => `                  THE ANSWER
                  
         ██╗
         ██║
         ██║
    ████████║
    ╚══════██║
         ██║
         ██║
         ██║
         ╚═╝
         
"The answer to life, the universe, and everything"`,
  sudo: () => `Password: ******
Access denied.
This incident will be reported.
(Just kidding, there's no password. But you can't sudo here!)`,
  history: () => "__HISTORY__",
  exit: () => "__EXIT__",
};

const BOOT_TEXT = [
  "MacOS Terminal 1.0",
  "Copyright © 1984 Apple Computer Inc.",
  "",
  "Terminal ready.",
  "",
];

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [bootComplete, setBootComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lineIndex = 0;
    const bootInterval = setInterval(() => {
      if (lineIndex < BOOT_TEXT.length) {
        setHistory((prev) => [
          ...prev,
          { cmd: "", output: BOOT_TEXT[lineIndex] },
        ]);
        lineIndex++;
      } else {
        clearInterval(bootInterval);
        setBootComplete(true);
      }
    }, 150);
    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootComplete]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const lowerCmd = trimmed.toLowerCase();
    let output = "";

    if (COMMANDS[lowerCmd]) {
      output = COMMANDS[lowerCmd]();
    } else if (Object.keys(COMMANDS).some((k) => lowerCmd.startsWith(k + " "))) {
      const baseCmd = Object.keys(COMMANDS).find((k) => lowerCmd.startsWith(k + " "));
      if (baseCmd && COMMANDS[baseCmd]) {
        output = COMMANDS[baseCmd]();
      }
    } else {
      output = `zsh: command not found: ${trimmed}`;
    }

    if (output === "__CLEAR__") {
      setHistory([]);
    } else if (output === "__HISTORY__") {
      const histOutput = history.map((h, i) => `  ${i + 1}  ${h.cmd}`).join("\n");
      setHistory((prev) => [...prev, { cmd, output: histOutput || "(no commands yet)" }]);
    } else if (output === "__EXIT__") {
      setHistory((prev) => [...prev, { cmd, output: "Use Cmd+W to close this window" }]);
    } else {
      setHistory((prev) => [...prev, { cmd, output }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex flex-col h-full bg-[var(--color-ink)] text-[var(--color-cream)] font-mono text-sm select-none cursor-text"
      onClick={focusTerminal}
    >
      <div ref={terminalRef} className="flex-1 p-3 overflow-auto">
        {history.map((entry, i) => (
          <div key={i} className="whitespace-pre-wrap mb-1">
            {entry.cmd && (
              <span>
                <span className="text-[#7dff7d]">louisar@macbook</span>
                <span>:</span>
                <span className="text-[#7dafff]">~</span>
                <span>$ </span>
                {entry.cmd}
              </span>
            )}
            {entry.output}
          </div>
        ))}
        {bootComplete && (
          <div className="flex items-center">
            <span className="text-[#7dff7d]">louisar@macbook</span>
            <span>:</span>
            <span className="text-[#7dafff]">~</span>
            <span>$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[var(--color-cream)] font-mono text-sm"
              autoFocus
            />
            {showCursor && <span className="w-2 h-4 bg-[var(--color-cream)] ml-[-2px] inline-block" />}
          </div>
        )}
      </div>
      <div className="px-3 py-1 bg-[var(--color-ink)] border-t border-[var(--color-cream)] border-opacity-20 text-[10px] text-[var(--color-ink-muted)]">
        zsh — 80x24 — UTF-8
      </div>
    </div>
  );
}