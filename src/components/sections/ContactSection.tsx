function GitHubIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.69 5.47 7.77.4.08.55-.18.55-.4l-.01-1.54c-2.23.49-2.7-.98-2.7-.98-.36-.95-.89-1.2-.89-1.2-.73-.51.06-.5.06-.5.81.06 1.23.85 1.23.85.72 1.26 1.88.9 2.34.69.07-.53.28-.9.51-1.1-1.78-.21-3.64-.91-3.64-4.04 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.5 7.5 0 0 1 8 3.96c.68 0 1.36.09 2 .27 1.52-1.06 2.19-.84 2.19-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.14-1.87 3.83-3.65 4.04.29.26.54.76.54 1.53l-.01 2.26c0 .22.15.48.55.4A8.14 8.14 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3.58 16H.26V5.33h3.32V16ZM1.92 3.87A1.93 1.93 0 1 1 1.92 0a1.93 1.93 0 0 1 0 3.87ZM16 16h-3.31v-5.19c0-1.24-.03-2.83-1.73-2.83-1.73 0-1.99 1.35-1.99 2.74V16H5.66V5.33h3.18v1.46h.05c.44-.84 1.52-1.73 3.13-1.73 3.35 0 3.98 2.21 3.98 5.08V16Z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <div className="p-8 space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 border-2 border-[var(--color-ink)] flex items-center justify-center text-3xl bg-[var(--color-cream-dark)]">
          ✉
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[13px] font-bold">Let&apos;s work together</p>
        <p className="text-[12px] text-[var(--color-ink-muted)]">
          Open to new opportunities, collaborations,
          <br />
          and interesting projects.
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <a
          href="mailto:louis.arbey@redfield.se"
          className="mac-button mac-button-default w-full justify-center text-center"
        >
          Send Email
        </a>
        <div className="flex gap-2">
          <a
            href="https://github.com/LuiAr"
            target="_blank"
            rel="noopener noreferrer"
            className="mac-button flex-1 justify-center gap-2"
          >
            <GitHubIcon />
            <span>GitHub ↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/louis-arbey"
            target="_blank"
            rel="noopener noreferrer"
            className="mac-button flex-1 justify-center gap-2"
          >
            <LinkedInIcon />
            <span>LinkedIn ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
