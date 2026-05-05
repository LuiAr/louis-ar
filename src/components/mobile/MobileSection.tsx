import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

interface MobileSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function MobileSection({ id, title, children }: MobileSectionProps) {
  return (
    <FadeInWhenVisible>
      <section
        id={id}
        className="mac-window scroll-mt-9"
      >
        {/* Title bar */}
        <div className="flex items-center h-[22px] relative mac-titlebar-stripes border-b-2 border-[var(--color-ink)]">
          <div className="flex items-center gap-[3px] pl-[6px] z-10">
            <div className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)]" />
            <div className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)]" />
            <div className="w-[11px] h-[11px] border border-[var(--color-ink)] bg-[var(--color-button-bg)]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-[var(--color-window-bg)] px-2 text-[11px] font-bold">
              {title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[var(--color-window-bg)]">
          {children}
        </div>
      </section>
    </FadeInWhenVisible>
  );
}
