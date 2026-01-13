import { LeaderboardEntry } from "@/hooks/useLeaderboard";
import { vehicles } from "@/components/VehicleSelector";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentScore?: number;
  isNewHighScore?: boolean;
  rank?: number | null;
}

export const Leaderboard = ({ entries, currentScore, isNewHighScore, rank }: LeaderboardProps) => {
  const getVehicleEmoji = (vehicleId: string) => {
    switch (vehicleId) {
      case 'taxi': return '🚕';
      case 'minibus': return '🚐';
      case 'bus': return '🚌';
      case 'tram': return '🚃';
      default: return '🚗';
    }
  };

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}`;
    }
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-3 w-full max-w-xs">
      <h3 className="text-lg font-bold text-center mb-2 text-foreground flex items-center justify-center gap-2">
        🏆 排行榜
      </h3>
      
      {isNewHighScore && (
        <div className="text-center mb-2 animate-scale-in">
          <span className="text-xl">🎉</span>
          <span className="text-base font-bold text-primary ml-1">新紀錄!</span>
        </div>
      )}
      
      <div className="space-y-1.5">
        {entries.slice(0, 5).map((entry, index) => {
          const isCurrentScore = currentScore !== undefined && 
            entry.score === currentScore && 
            rank === index + 1;
          
          return (
            <div 
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                isCurrentScore 
                  ? 'bg-primary/20 ring-2 ring-primary animate-scale-in' 
                  : 'bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base w-7 text-center">{getRankEmoji(index)}</span>
                <span className="text-base">{getVehicleEmoji(entry.vehicle)}</span>
              </div>
              <span className={`font-bold text-base ${isCurrentScore ? 'text-primary' : 'text-foreground'}`}>
                {entry.score} ⭐
              </span>
            </div>
          );
        })}
        
        {entries.length === 0 && (
          <div className="text-center text-muted-foreground py-3 text-base">
            暫無紀錄，快來挑戰！
          </div>
        )}
      </div>
    </div>
  );
};
