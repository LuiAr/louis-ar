"use client";

import { useRef, useState } from "react";
import { motion, useDragControls, useMotionValue } from "motion/react";
import { cn } from "@/lib/cn";

export interface DraggableWindowProps {
  title: string;
  isActive: boolean;
  isMinimized: boolean;
  defaultPosition: { x: number; y: number };
  defaultWidth: number;
  defaultHeight: number;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onPositionChange?: (pos: { x: number; y: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

const MIN_WIDTH = 220;
const MIN_HEIGHT = 120;

export default function DraggableWindow({
  title,
  isActive,
  isMinimized,
  defaultPosition,
  defaultWidth,
  defaultHeight,
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  onPositionChange,
  onSizeChange,
  desktopRef,
  children,
}: DraggableWindowProps) {
  const dragControls = useDragControls();
  const x = useMotionValue(defaultPosition.x);
  const y = useMotionValue(defaultPosition.y);
  const [isZoomed, setIsZoomed] = useState(false);

  // Manual resize state
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  function handleResizePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
    resizeStart.current = { x: e.clientX, y: e.clientY, width, height };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleResizePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!e.buttons) return;
    const dx = e.clientX - resizeStart.current.x;
    const dy = e.clientY - resizeStart.current.y;
    setWidth(Math.max(MIN_WIDTH, resizeStart.current.width + dx));
    setHeight(Math.max(MIN_HEIGHT, resizeStart.current.height + dy));
  }

  function handleResizeLostCapture() {
    onSizeChange?.({ width, height });
  }

  function handleZoom(e: React.MouseEvent) {
    e.stopPropagation();
    setIsZoomed((prev) => !prev);
  }

  // When zoomed: fill the desktop, omit x/y so motion values don't interfere
  const motionStyle = isZoomed
    ? ({ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex } as const)
    : ({
        x,
        y,
        zIndex,
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height: isMinimized ? "auto" : height,
      } as const);

  return (
    <motion.div
      drag={!isZoomed}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={desktopRef as React.RefObject<Element>}
      style={motionStyle}
      onPointerDown={onFocus}
      onDragEnd={() => onPositionChange?.({ x: x.get(), y: y.get() })}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="mac-window flex flex-col"
    >
      {/* Title bar — drag handle */}
      <div
        className={cn(
          "flex-shrink-0 flex items-center h-[22px] relative border-b-2 border-[var(--color-ink)] select-none",
          isZoomed ? "cursor-default" : "cursor-move",
          isActive ? "mac-titlebar-stripes" : "bg-[var(--color-cream-dark)]"
        )}
        onPointerDown={(e) => !isZoomed && dragControls.start(e)}
      >
        {/* Window control buttons */}
        <div
          className="flex items-center gap-[3px] pl-[6px] z-10"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            aria-label="close"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)] hover:bg-[var(--color-ink)]"
          />
          <button
            aria-label="minimize"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)] hover:bg-[var(--color-ink)]"
          />
          <button
            aria-label="zoom"
            onClick={handleZoom}
            className={cn(
              "w-[11px] h-[11px] border border-[var(--color-ink)] hover:bg-[var(--color-ink)]",
              isZoomed ? "bg-[var(--color-ink)]" : "bg-[var(--color-button-bg)]"
            )}
          />
        </div>

        {/* Centered title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="bg-[var(--color-window-bg)] px-2 text-[11px] font-bold leading-none text-[var(--color-ink)]">
            {title}
          </span>
        </div>
      </div>

      {/* Content area */}
      {!isMinimized && (
        <div className="flex-1 min-h-0 overflow-auto">
          {children}
        </div>
      )}

      {/* Resize handle — hidden when zoomed or minimized */}
      {!isMinimized && !isZoomed && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onLostPointerCapture={handleResizeLostCapture}
          style={{ touchAction: "none" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="4" y1="15" x2="15" y2="4" stroke="var(--color-ink-muted)" strokeWidth="1" />
            <line x1="8" y1="15" x2="15" y2="8" stroke="var(--color-ink-muted)" strokeWidth="1" />
            <line x1="12" y1="15" x2="15" y2="12" stroke="var(--color-ink-muted)" strokeWidth="1" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
