import { cn } from "@/lib/cn";

interface TitleBarProps {
  title: string;
  active?: boolean;
  className?: string;
}

export default function TitleBar({ title, active = true, className }: TitleBarProps) {
  return (
    <div
      className={cn(
        "flex items-center h-[22px] relative border-b-2 border-[var(--color-ink)]",
        active ? "mac-titlebar-stripes" : "bg-[var(--color-cream-dark)]",
        className
      )}
    >
      {/* Left buttons */}
      <div className="flex items-center gap-[3px] pl-[6px] z-10">
        <button
          aria-label="close"
          className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)] hover:bg-[var(--color-ink)]"
        />
        <button
          aria-label="minimize"
          className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)] hover:bg-[var(--color-ink)]"
        />
        <button
          aria-label="zoom"
          className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)] hover:bg-[var(--color-ink)]"
        />
      </div>

      {/* Centred title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="bg-[var(--color-window-bg)] px-[8px] text-[11px] font-bold leading-none text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
