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
            className="mac-button flex-1 justify-center"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/louis-arbey"
            target="_blank"
            rel="noopener noreferrer"
            className="mac-button flex-1 justify-center"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}
