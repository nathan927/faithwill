import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
  className?: string;
}

export const FullscreenButton = ({ isFullscreen, onToggle, className = "" }: FullscreenButtonProps) => {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="icon"
      className={`bg-background/80 backdrop-blur-sm hover:bg-background ${className}`}
      title={isFullscreen ? "退出全螢幕" : "全螢幕"}
    >
      {isFullscreen ? (
        <Minimize2 className="h-5 w-5" />
      ) : (
        <Maximize2 className="h-5 w-5" />
      )}
    </Button>
  );
};
