import { ReactNode } from "react";

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  onClick: () => void;
}

export const GameCard = ({ title, description, icon, color, onClick }: GameCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`card-playful w-full text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-playful group`}
    >
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-4 text-3xl group-hover:animate-wiggle`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </button>
  );
};
