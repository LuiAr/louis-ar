import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 pb-32">
      <div className="max-w-md mx-auto">
        <FadeInWhenVisible>
          <div
            className="relative"
            style={{
              border: "2px solid var(--color-ink)",
              boxShadow: "0 0 0 4px var(--color-window-bg), 0 0 0 6px var(--color-ink), 5px 5px 0 6px var(--color-ink)",
            }}
          >
            {/* Dialog title bar */}
            <div className="flex items-center justify-center h-[22px] border-b-2 border-[var(--color-ink)] bg-[var(--color-cream-dark)]">
              <span className="text-[11px] font-bold">Get In Touch</span>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 bg-[var(--color-window-bg)]">
              {/* Icon row */}
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

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:hello@example.com"
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
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mac-button flex-1 justify-center"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
