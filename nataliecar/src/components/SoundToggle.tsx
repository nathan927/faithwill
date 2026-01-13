import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SoundToggleProps {
  onToggle: (muted: boolean) => void;
  className?: string;
}

export const SoundToggle = ({ onToggle, className = "" }: SoundToggleProps) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    onToggle(newMuted);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={`bg-card/80 backdrop-blur-sm hover:bg-card ${className}`}
      title={isMuted ? "開啟音效" : "關閉音效"}
    >
      <span className="text-xl">{isMuted ? "🔇" : "🔊"}</span>
    </Button>
  );
};
