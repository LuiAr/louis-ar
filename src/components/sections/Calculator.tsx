"use client";

import { useEffect, useReducer, useCallback } from "react";

type Op = "+" | "−" | "×" | "÷" | null;

interface CalcState {
  display: string;
  stored: number | null;
  op: Op;
  fresh: boolean; // next digit replaces display rather than appending
}

type Action =
  | { type: "digit"; value: string }
  | { type: "dot" }
  | { type: "op"; value: NonNullable<Op> }
  | { type: "equals" }
  | { type: "clear" }
  | { type: "negate" }
  | { type: "percent" }
  | { type: "backspace" };

const INIT: CalcState = { display: "0", stored: null, op: null, fresh: false };

function applyOp(a: number, op: Op, b: number): number {
  switch (op) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b === 0 ? NaN : a / b;
  }
  return b;
}

function fmt(n: number): string {
  if (!isFinite(n)) return "Error";
  // up to 10 significant digits, strip trailing zeros
  const s = parseFloat(n.toPrecision(10)).toString();
  return s.length > 12 ? n.toExponential(5) : s;
}

function reducer(state: CalcState, action: Action): CalcState {
  switch (action.type) {
    case "digit": {
      if (state.fresh) {
        return { ...state, display: action.value === "0" ? "0" : action.value, fresh: false };
      }
      if (state.display === "0" && action.value !== ".") {
        return { ...state, display: action.value };
      }
      if (state.display.length >= 12) return state;
      return { ...state, display: state.display + action.value };
    }
    case "dot": {
      const base = state.fresh ? "0" : state.display;
      if (base.includes(".")) return { ...state, fresh: false };
      return { ...state, display: base + ".", fresh: false };
    }
    case "op": {
      const cur = parseFloat(state.display);
      if (state.stored !== null && !state.fresh) {
        const result = applyOp(state.stored, state.op, cur);
        return { display: fmt(result), stored: result, op: action.value, fresh: true };
      }
      return { ...state, stored: cur, op: action.value, fresh: true };
    }
    case "equals": {
      if (state.stored === null || state.op === null) return state;
      const result = applyOp(state.stored, state.op, parseFloat(state.display));
      return { display: fmt(result), stored: null, op: null, fresh: true };
    }
    case "clear":
      return INIT;
    case "negate": {
      const n = parseFloat(state.display);
      return { ...state, display: fmt(-n) };
    }
    case "percent": {
      const n = parseFloat(state.display);
      return { ...state, display: fmt(n / 100) };
    }
    case "backspace": {
      if (state.fresh) return state;
      if (state.display.length <= 1 || state.display === "-0") {
        return { ...state, display: "0" };
      }
      return { ...state, display: state.display.slice(0, -1) };
    }
    default:
      return state;
  }
}

// ── Button component ───────────────────────────────────────────────────────────

interface BtnProps {
  label: string;
  onClick: () => void;
  wide?: boolean;
  variant?: "number" | "op" | "fn" | "equals";
}

function Btn({ label, onClick, wide, variant = "number" }: BtnProps) {
  const base =
    "flex items-center justify-center text-[15px] select-none cursor-pointer border-2 border-[var(--color-ink)] active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:none] transition-none";

  const colors: Record<string, string> = {
    number: "bg-[var(--color-window-bg)] text-[var(--color-ink)] [box-shadow:2px_2px_0px_var(--color-ink)]",
    op:     "bg-[var(--color-ink)] text-[var(--color-cream)] [box-shadow:2px_2px_0px_var(--color-ink-muted)]",
    fn:     "bg-[var(--color-cream-dark)] text-[var(--color-ink)] [box-shadow:2px_2px_0px_var(--color-ink)]",
    equals: "bg-[var(--color-ink)] text-[var(--color-cream)] [box-shadow:2px_2px_0px_var(--color-ink-muted)]",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${colors[variant]} ${wide ? "col-span-2" : ""}`}
      style={{ height: 44, fontFamily: "var(--font-mono)" }}
    >
      {label}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, INIT);

  const handleKey = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    if (e.key >= "0" && e.key <= "9") {
      dispatch({ type: "digit", value: e.key });
    } else if (e.key === ".") {
      dispatch({ type: "dot" });
    } else if (e.key === "+" || e.key === "-") {
      dispatch({ type: "op", value: e.key === "+" ? "+" : "−" });
    } else if (e.key === "*") {
      dispatch({ type: "op", value: "×" });
    } else if (e.key === "/") {
      e.preventDefault();
      dispatch({ type: "op", value: "÷" });
    } else if (e.key === "Enter" || e.key === "=") {
      dispatch({ type: "equals" });
    } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
      dispatch({ type: "clear" });
    } else if (e.key === "Backspace") {
      dispatch({ type: "backspace" });
    } else if (e.key === "%") {
      dispatch({ type: "percent" });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const d = (v: string) => dispatch({ type: "digit", value: v });
  const op = (v: NonNullable<Op>) => dispatch({ type: "op", value: v });

  const isPendingOp = (o: NonNullable<Op>) => state.op === o && state.fresh;

  return (
    <div
      className="flex flex-col h-full items-center justify-center"
      style={{ background: "var(--color-cream)", padding: 16 }}
    >
      <div
        style={{
          width: 240,
          border: "2px solid var(--color-ink)",
          boxShadow: "4px 4px 0px var(--color-ink)",
          background: "var(--color-window-bg)",
        }}
      >
        {/* Display */}
        <div
          style={{
            background: "var(--color-ink)",
            color: "var(--color-cream)",
            padding: "10px 14px 8px",
            textAlign: "right",
            borderBottom: "2px solid var(--color-ink)",
            minHeight: 60,
          }}
        >
          {/* Op indicator */}
          <div
            style={{
              height: 14,
              fontSize: 11,
              color: "var(--color-cream-dark)",
              fontFamily: "var(--font-mono)",
              opacity: state.op ? 1 : 0,
            }}
          >
            {state.stored !== null ? fmt(state.stored) : ""} {state.op ?? ""}
          </div>
          {/* Main readout */}
          <div
            style={{
              fontSize: state.display.length > 9 ? 18 : 28,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            {state.display}
          </div>
        </div>

        {/* Button grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, padding: 8 }}>
          <Btn label="C"  onClick={() => dispatch({ type: "clear" })}   variant="fn" />
          <Btn label="±"  onClick={() => dispatch({ type: "negate" })}  variant="fn" />
          <Btn label="%"  onClick={() => dispatch({ type: "percent" })} variant="fn" />
          <Btn label={isPendingOp("÷") ? "[÷]" : "÷"} onClick={() => op("÷")} variant="op" />

          <Btn label="7" onClick={() => d("7")} />
          <Btn label="8" onClick={() => d("8")} />
          <Btn label="9" onClick={() => d("9")} />
          <Btn label={isPendingOp("×") ? "[×]" : "×"} onClick={() => op("×")} variant="op" />

          <Btn label="4" onClick={() => d("4")} />
          <Btn label="5" onClick={() => d("5")} />
          <Btn label="6" onClick={() => d("6")} />
          <Btn label={isPendingOp("−") ? "[−]" : "−"} onClick={() => op("−")} variant="op" />

          <Btn label="1" onClick={() => d("1")} />
          <Btn label="2" onClick={() => d("2")} />
          <Btn label="3" onClick={() => d("3")} />
          <Btn label={isPendingOp("+") ? "[+]" : "+"} onClick={() => op("+")} variant="op" />

          <Btn label="0"  onClick={() => d("0")} wide />
          <Btn label="."  onClick={() => dispatch({ type: "dot" })} />
          <Btn label="="  onClick={() => dispatch({ type: "equals" })} variant="equals" />
        </div>
      </div>

      {/* Keyboard hint */}
      <div
        style={{
          marginTop: 10,
          fontSize: 10,
          color: "var(--color-ink-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        keyboard: 0–9  + − * /  Enter  Esc  ⌫
      </div>
    </div>
  );
}
