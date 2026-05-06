"use client";

import { useState, useCallback } from "react";

type FileKind = "folder" | "document" | "application" | "image" | "config";

interface FileNode {
  name: string;
  kind: FileKind;
  size?: string;
  children?: FileNode[];
}

const KIND_LABELS: Record<FileKind, string> = {
  folder: "Folder",
  document: "Document",
  application: "Application",
  image: "JPEG Image",
  config: "Config File",
};

const REPO_TREE: FileNode[] = [
  {
    name: "src",
    kind: "folder",
    children: [
      {
        name: "app",
        kind: "folder",
        children: [
          { name: "globals.css", kind: "config", size: "8 KB" },
          { name: "layout.tsx", kind: "document", size: "4 KB" },
          { name: "page.tsx", kind: "document", size: "4 KB" },
        ],
      },
      {
        name: "components",
        kind: "folder",
        children: [
          {
            name: "animations",
            kind: "folder",
            children: [
              { name: "FadeInWhenVisible.tsx", kind: "document", size: "4 KB" },
              { name: "StaggerChildren.tsx", kind: "document", size: "4 KB" },
              { name: "TiltCard.tsx", kind: "document", size: "4 KB" },
            ],
          },
          {
            name: "mobile",
            kind: "folder",
            children: [
              { name: "MobileApp.tsx", kind: "application", size: "4 KB" },
              { name: "MobileSection.tsx", kind: "document", size: "4 KB" },
            ],
          },
          {
            name: "sections",
            kind: "folder",
            children: [
              { name: "AboutSection.tsx", kind: "document", size: "4 KB" },
              { name: "Calculator.tsx", kind: "application", size: "12 KB" },
              { name: "Clock.tsx", kind: "application", size: "8 KB" },
              { name: "ContactSection.tsx", kind: "document", size: "4 KB" },
              { name: "DinoGame.tsx", kind: "application", size: "12 KB" },
              { name: "DynamicHero.tsx", kind: "document", size: "4 KB" },
              { name: "ExperienceSection.tsx", kind: "document", size: "4 KB" },
              { name: "Finder.tsx", kind: "application", size: "9 KB" },
              { name: "HeroSection.tsx", kind: "document", size: "4 KB" },
              { name: "MacPaint.tsx", kind: "application", size: "12 KB" },
              { name: "MusicPlayer.tsx", kind: "application", size: "12 KB" },
              { name: "PhotoViewer.tsx", kind: "application", size: "20 KB" },
              { name: "ProjectsSection.tsx", kind: "document", size: "8 KB" },
              { name: "SnakeGame.tsx", kind: "application", size: "12 KB" },
              { name: "StickyNote.tsx", kind: "application", size: "12 KB" },
              { name: "SystemPreferences.tsx", kind: "application", size: "12 KB" },
              { name: "Terminal.tsx", kind: "application", size: "8 KB" },
            ],
          },
          {
            name: "ui",
            kind: "folder",
            children: [
              { name: "DraggableWindow.tsx", kind: "document", size: "8 KB" },
              { name: "MacWindow.tsx", kind: "document", size: "4 KB" },
              { name: "MenuBar.tsx", kind: "document", size: "12 KB" },
              { name: "TitleBar.tsx", kind: "document", size: "4 KB" },
            ],
          },
          { name: "ClientLayout.tsx", kind: "document", size: "4 KB" },
          { name: "Desktop.tsx", kind: "document", size: "20 KB" },
          { name: "DynamicClientLayout.tsx", kind: "document", size: "4 KB" },
        ],
      },
      {
        name: "data",
        kind: "folder",
        children: [
          { name: "apps.tsx", kind: "document", size: "20 KB" },
          { name: "experience.ts", kind: "document", size: "4 KB" },
          { name: "projects.ts", kind: "document", size: "4 KB" },
        ],
      },
      {
        name: "hooks",
        kind: "folder",
        children: [
          { name: "useBootSequence.ts", kind: "document", size: "4 KB" },
          { name: "useIsMobile.ts", kind: "document", size: "4 KB" },
          { name: "usePrefersReducedMotion.ts", kind: "document", size: "4 KB" },
          { name: "usePrefs.ts", kind: "document", size: "4 KB" },
          { name: "useTypewriter.ts", kind: "document", size: "4 KB" },
        ],
      },
      {
        name: "lib",
        kind: "folder",
        children: [{ name: "cn.ts", kind: "document", size: "< 1 KB" }],
      },
      {
        name: "types",
        kind: "folder",
        children: [
          { name: "experience.ts", kind: "document", size: "4 KB" },
          { name: "index.ts", kind: "document", size: "4 KB" },
          { name: "project.ts", kind: "document", size: "4 KB" },
        ],
      },
    ],
  },
  {
    name: "public",
    kind: "folder",
    children: [
      { name: ".nojekyll", kind: "config", size: "< 1 KB" },
      { name: "profile.jpeg", kind: "image", size: "52 KB" },
    ],
  },
  { name: "CLAUDE.md", kind: "document", size: "20 KB" },
  { name: "next.config.ts", kind: "config", size: "4 KB" },
  { name: "package.json", kind: "config", size: "4 KB" },
  { name: "tsconfig.json", kind: "config", size: "4 KB" },
];

interface FlatRow {
  node: FileNode;
  depth: number;
  path: string;
}

function flattenTree(
  nodes: FileNode[],
  depth: number,
  expanded: Set<string>,
  parentPath = ""
): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const node of nodes) {
    const path = parentPath ? `${parentPath}/${node.name}` : node.name;
    rows.push({ node, depth, path });
    if (node.children && expanded.has(path)) {
      rows.push(...flattenTree(node.children, depth + 1, expanded, path));
    }
  }
  return rows;
}

function totalCount(nodes: FileNode[]): { folders: number; files: number } {
  let folders = 0;
  let files = 0;
  for (const node of nodes) {
    if (node.kind === "folder") {
      folders++;
      if (node.children) {
        const c = totalCount(node.children);
        folders += c.folders;
        files += c.files;
      }
    } else {
      files++;
    }
  }
  return { folders, files };
}

// All icons use only currentColor so they invert correctly on selected rows
function FolderSvg({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="12" viewBox="0 0 16 12"
      fill="currentColor" aria-hidden="true"
      style={{ display: "inline", verticalAlign: "middle", flexShrink: 0 }}
    >
      {open ? (
        <path d="M0 4 L2 2 L6 2 L8 4 L16 4 L14 12 L0 12Z" />
      ) : (
        <path d="M0 2 L2 0 L6 0 L8 2 L16 2 L16 12 L0 12Z" />
      )}
    </svg>
  );
}

function DocSvg() {
  return (
    <svg
      width="12" height="14" viewBox="0 0 12 14"
      fill="currentColor" aria-hidden="true"
      style={{ display: "inline", verticalAlign: "middle", flexShrink: 0 }}
    >
      {/* Page with folded top-right corner */}
      <path d="M0 0 L8 0 L12 4 L12 14 L0 14Z" />
    </svg>
  );
}

function AppSvg() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 13 13"
      fill="currentColor" aria-hidden="true"
      style={{ display: "inline", verticalAlign: "middle", flexShrink: 0 }}
    >
      {/* Window chrome: title bar + body */}
      <rect width="13" height="3" />
      <rect y="5" width="13" height="8" />
    </svg>
  );
}

function ImageSvg() {
  return (
    <svg
      width="14" height="12" viewBox="0 0 14 12"
      fill="currentColor" aria-hidden="true"
      style={{ display: "inline", verticalAlign: "middle", flexShrink: 0 }}
    >
      {/* Landscape silhouette */}
      <path d="M0 0 L14 0 L14 12 L0 12Z" />
    </svg>
  );
}

function ConfigSvg() {
  return (
    <svg
      width="12" height="14" viewBox="0 0 12 14"
      fill="currentColor" aria-hidden="true"
      style={{ display: "inline", verticalAlign: "middle", flexShrink: 0 }}
    >
      {/* Config file: page with rounded notch instead of folded corner */}
      <path d="M0 0 L7 0 L12 5 L12 14 L0 14Z" />
    </svg>
  );
}

function FileIcon({ kind, open }: { kind: FileKind; open?: boolean }) {
  switch (kind) {
    case "folder":      return <FolderSvg open={!!open} />;
    case "application": return <AppSvg />;
    case "image":       return <ImageSvg />;
    case "config":      return <ConfigSvg />;
    default:            return <DocSvg />;
  }
}

export default function Finder() {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(["src", "public"])
  );
  const [selected, setSelected] = useState<string | null>(null);

  const toggleFolder = useCallback((path: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });
  }, []);

  const rows = flattenTree(REPO_TREE, 0, expanded);
  const { folders, files } = totalCount(REPO_TREE);
  const selectedRow = rows.find(r => r.path === selected);

  return (
    <div
      className="flex flex-col h-full select-none"
      style={{ fontFamily: "var(--font-space-mono)", fontSize: 11, color: "var(--color-ink)" }}
    >
      {/* Path / toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 10px",
          borderBottom: "2px solid var(--color-ink)",
          backgroundColor: "var(--color-cream-dark)",
        }}
      >
        <span style={{ fontWeight: "bold" }}>louis-ar</span>
        <span style={{ opacity: 0.4 }}>—</span>
        <span style={{ opacity: 0.55, fontSize: 10 }}>
          {folders} folders,&nbsp;{files} files
        </span>
      </div>

      {/* Column headers */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "2px 8px 2px 30px",
          borderBottom: "2px solid var(--color-ink)",
          backgroundColor: "var(--color-cream-dark)",
          fontWeight: "bold",
          fontSize: 10,
        }}
      >
        <div style={{ flex: 1 }}>Name</div>
        <div style={{ width: 88, textAlign: "right" }}>Kind</div>
        <div style={{ width: 56, textAlign: "right" }}>Size</div>
      </div>

      {/* File list */}
      <div
        className="flex-1 min-h-0 overflow-y-auto"
        style={{ backgroundColor: "var(--color-window-bg)" }}
      >
        {rows.map((row, i) => {
          const isFolder = row.node.kind === "folder";
          const isExpanded = expanded.has(row.path);
          const hasChildren = !!row.node.children?.length;
          const isSelected = selected === row.path;

          return (
            <div
              key={row.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                paddingTop: 1,
                paddingBottom: 1,
                paddingLeft: 6 + row.depth * 16,
                paddingRight: 8,
                cursor: "default",
                backgroundColor: isSelected
                  ? "var(--color-ink)"
                  : i % 2 === 0
                  ? "var(--color-window-bg)"
                  : "var(--color-cream-dark)",
                color: isSelected ? "var(--color-cream)" : "var(--color-ink)",
              }}
              onClick={() => setSelected(row.path === selected ? null : row.path)}
              onDoubleClick={() => isFolder && toggleFolder(row.path)}
            >
              {/* Disclosure triangle */}
              <button
                style={{
                  width: 14,
                  flexShrink: 0,
                  textAlign: "center",
                  lineHeight: 1,
                  visibility: hasChildren ? "visible" : "hidden",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "inherit",
                  fontSize: 8,
                }}
                onClick={(e) => { e.stopPropagation(); toggleFolder(row.path); }}
                aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
                tabIndex={hasChildren ? 0 : -1}
              >
                {isExpanded ? "▼" : "▶"}
              </button>

              {/* Icon */}
              <FileIcon kind={row.node.kind} open={isExpanded} />

              {/* Name */}
              <span
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginLeft: 3,
                }}
              >
                {row.node.name}
              </span>

              {/* Kind */}
              <span style={{ width: 88, flexShrink: 0, textAlign: "right", opacity: 0.6 }}>
                {KIND_LABELS[row.node.kind]}
              </span>

              {/* Size */}
              <span style={{ width: 56, flexShrink: 0, textAlign: "right", opacity: 0.6 }}>
                {row.node.size ?? "—"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "3px 10px",
          borderTop: "2px solid var(--color-ink)",
          backgroundColor: "var(--color-cream-dark)",
          fontSize: 10,
        }}
      >
        {selectedRow ? (
          <span>
            {selectedRow.node.name}
            {selectedRow.node.size ? ` — ${selectedRow.node.size}` : ""}
            {" — "}
            {KIND_LABELS[selectedRow.node.kind]}
          </span>
        ) : (
          <span>{rows.length} items visible</span>
        )}
      </div>
    </div>
  );
}
