import { cn } from "@/lib/cn";
import TitleBar from "./TitleBar";

interface MacWindowProps {
  title: string;
  active?: boolean;
  showScrollTrack?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function MacWindow({
  title,
  active = true,
  showScrollTrack = false,
  className,
  children,
}: MacWindowProps) {
  return (
    <div className={cn("mac-window flex flex-col", className)}>
      <TitleBar title={title} active={active} />
      <div
        className={cn(
          "flex-1 relative overflow-hidden",
          showScrollTrack && "overflow-y-auto"
        )}
      >
        {children}
      </div>
    </div>
  );
}
