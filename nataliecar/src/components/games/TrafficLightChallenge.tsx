import { useState, useEffect, useCallback, useRef } from "react";
import { VehicleType } from "@/types/game";
import { vehicles } from "@/components/VehicleSelector";
import { Button } from "@/components/ui/button";
import { useChromaKeyImage } from "@/hooks/useChromaKeyImage";
import { useFullscreen } from "@/hooks/useFullscreen";
import { FullscreenButton } from "@/components/FullscreenButton";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useGameSounds } from "@/hooks/useGameSounds";
import { Leaderboard } from "@/components/Leaderboard";
import { SoundToggle } from "@/components/SoundToggle";
import trafficLightImg from "@/assets/traffic-light.png";
import cityBg from "@/assets/city-bg.png";
import passengerImg from "@/assets/passenger.png";

interface TrafficLightChallengeProps {
  vehicle: VehicleType;
  onBack: () => void;
}

type LightColor = 'red' | 'yellow' | 'green';
type GamePhase = 'menu' | 'countdown' | 'playing' | 'success' | 'failed';
type ChallengeType = 'normal' | 'reverse' | 'quick' | 'double' | 'sequence';

interface Challenge {
  type: ChallengeType;
  instruction: string;
  targetColor: LightColor;
  requiredAction: 'go' | 'stop';
  timeLimit?: number;
}

export const TrafficLightChallenge = ({ vehicle, onBack }: TrafficLightChallengeProps) => {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentLight, setCurrentLight] = useState<LightColor>('red');
  const [isWaiting, setIsWaiting] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [vehiclePosition, setVehiclePosition] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(10);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const { leaderboard, submitScore, isNewHighScore, rank, resetNewHighScore } = useLeaderboard('traffic-light');
  const sounds = useGameSounds();

  const selectedVehicle = vehicles.find(v => v.id === vehicle)!;
  const vehicleSprite = useChromaKeyImage(selectedVehicle.image, { threshold: 50 });

  // Generate random challenge
  const generateChallenge = useCallback((roundNum: number): Challenge => {
    const challengeTypes: ChallengeType[] = ['normal', 'normal', 'quick'];
    if (roundNum >= 3) challengeTypes.push('reverse');
    if (roundNum >= 5) challengeTypes.push('double', 'sequence');
    if (roundNum >= 7) challengeTypes.push('quick', 'quick');
    
    const type = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
    
    switch (type) {
      case 'reverse':
        const revColor = Math.random() > 0.5 ? 'red' : 'green';
        return {
          type: 'reverse',
          instruction: '🔄 相反模式！紅燈要前進，綠燈要停車！',
          targetColor: revColor as LightColor,
          requiredAction: revColor === 'red' ? 'go' : 'stop',
        };
      
      case 'quick':
        const quickColor = Math.random() > 0.5 ? 'red' : 'green';
        return {
          type: 'quick',
          instruction: '⚡ 極速反應！快啲做決定！',
          targetColor: quickColor as LightColor,
          requiredAction: quickColor === 'green' ? 'go' : 'stop',
          timeLimit: 1500,
        };
      
      case 'double':
        return {
          type: 'double',
          instruction: '✌️ 雙重確認！要按兩下先得！',
          targetColor: 'green',
          requiredAction: 'go',
        };
      
      case 'sequence':
        return {
          type: 'sequence',
          instruction: '🚦 黃燈要等一等！唔好郁！',
          targetColor: 'yellow',
          requiredAction: 'stop',
        };
      
      default:
        const normalColor = Math.random() > 0.5 ? 'red' : 'green';
        return {
          type: 'normal',
          instruction: normalColor === 'green' ? '🟢 綠燈！前進！' : '🔴 紅燈！停車！',
          targetColor: normalColor as LightColor,
          requiredAction: normalColor === 'green' ? 'go' : 'stop',
        };
    }
  }, []);

  const handleAction = useCallback((action: 'go' | 'stop') => {
    if (phase !== 'playing' || isWaiting || !currentChallenge) return;

    const isCorrect = action === currentChallenge.requiredAction && 
                      currentLight === currentChallenge.targetColor;

    if (isCorrect) {
      const points = 15 * (combo + 1);
      setScore(s => s + points);
      setCombo(c => {
        const newCombo = c + 1;
        setMaxCombo(m => Math.max(m, newCombo));
        return newCombo;
      });
      setShowFeedback('correct');
      setVehiclePosition(p => Math.min(100, p + (100 / totalRounds)));
      sounds.playCorrect();
      
      // Check if won
      if (round >= totalRounds) {
        setTimeout(() => {
          setPhase('success');
          sounds.playVictory();
        }, 500);
      } else {
        setTimeout(() => {
          setRound(r => r + 1);
          nextChallenge();
        }, 800);
      }
    } else {
      setLives(l => l - 1);
      setCombo(0);
      setShowFeedback('wrong');
      sounds.playWrong();
      
      if (lives <= 1) {
        setTimeout(() => {
          setPhase('failed');
          sounds.playGameOver();
        }, 500);
      }
    }

    setTimeout(() => setShowFeedback(null), 500);
  }, [phase, isWaiting, currentChallenge, currentLight, combo, round, totalRounds, lives, sounds]);

  const nextChallenge = useCallback(() => {
    setIsWaiting(true);
    
    // Brief pause between challenges
    setTimeout(() => {
      const challenge = generateChallenge(round);
      setCurrentChallenge(challenge);
      setCurrentLight(challenge.targetColor);
      setIsWaiting(false);
      
      if (challenge.timeLimit) {
        setTimeLeft(challenge.timeLimit);
        
        // Auto-fail if time runs out
        timerRef.current = setTimeout(() => {
          setLives(l => l - 1);
          setCombo(0);
          setShowFeedback('wrong');
          sounds.playWrong();
          setTimeout(() => setShowFeedback(null), 500);
          
          if (lives <= 1) {
            setPhase('failed');
            sounds.playGameOver();
          } else {
            setRound(r => r + 1);
            nextChallenge();
          }
        }, challenge.timeLimit);
      }
    }, 600);
  }, [generateChallenge, round, lives, sounds]);

  const startGame = () => {
    setPhase('countdown');
    setScore(0);
    setLives(3);
    setCombo(0);
    setMaxCombo(0);
    setVehiclePosition(0);
    setRound(1);
    setCountdown(3);
    resetNewHighScore();
  };

  // Countdown effect
  useEffect(() => {
    if (phase !== 'countdown') return;

    if (countdown > 0) {
      sounds.playCountdown();
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setPhase('playing');
      sounds.playGameStart();
      nextChallenge();
    }
  }, [phase, countdown, nextChallenge, sounds]);

  // Time limit countdown
  useEffect(() => {
    if (phase !== 'playing' || !currentChallenge?.timeLimit || isWaiting) return;
    
    const interval = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 100));
    }, 100);
    
    return () => clearInterval(interval);
  }, [phase, currentChallenge, isWaiting]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowRight') {
        e.preventDefault();
        handleAction('go');
      } else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
        e.preventDefault();
        handleAction('stop');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAction]);

  // Submit score when game ends
  useEffect(() => {
    if (phase === 'success' || phase === 'failed') {
      const result = submitScore(score, vehicle);
      if (result.isHighScore) {
        sounds.playNewHighScore();
      }
    }
  }, [phase, score, vehicle, submitScore, sounds]);

  const getLightStyle = (color: LightColor) => {
    const isActive = currentLight === color && !isWaiting;
    const baseStyle = "w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-200";
    
    switch (color) {
      case 'red':
        return `${baseStyle} ${isActive ? 'bg-game-danger shadow-[0_0_30px_hsl(0,85%,55%)]' : 'bg-game-danger/30'}`;
      case 'yellow':
        return `${baseStyle} ${isActive ? 'bg-game-warning shadow-[0_0_30px_hsl(45,100%,55%)]' : 'bg-game-warning/30'}`;
      case 'green':
        return `${baseStyle} ${isActive ? 'bg-game-success shadow-[0_0_30px_hsl(120,60%,45%)]' : 'bg-game-success/30'}`;
    }
  };

  const renderPhase = () => {
    switch (phase) {
      case 'menu':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-5 p-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">🚦 交通燈挑戰 🚦</h2>
            <img src={trafficLightImg} alt="交通燈" className="w-20 h-20 object-contain float-animation" />
            <div className="text-base text-muted-foreground space-y-1">
              <p>完成 <span className="font-bold text-primary">{totalRounds}</span> 關挑戰！</p>
              <p>🟢 綠燈 → 前進 | 🔴 紅燈 → 停車</p>
              <p>⚠️ 小心特殊關卡！</p>
            </div>
            <div className="flex gap-2 text-2xl">
              <span>🔄</span>
              <span>⚡</span>
              <span>✌️</span>
              <span>🚦</span>
            </div>
            
            <Button
              onClick={startGame}
              className="btn-bounce bg-secondary text-secondary-foreground text-xl py-6 px-8"
            >
              🎮 開始挑戰！
            </Button>
          </div>
        );

      case 'countdown':
        return (
          <div 
            className="relative h-full overflow-hidden flex items-center justify-center"
            style={{ backgroundImage: `url(${cityBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="text-9xl font-bold text-white animate-scale-in" style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.5)' }}>
              {countdown || '開始！'}
            </div>
          </div>
        );

      case 'playing':
        return (
          <div 
            className="relative h-full overflow-hidden"
            style={{ backgroundImage: `url(${cityBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Sound Toggle */}
            <SoundToggle 
              onToggle={sounds.setMuted} 
              className="absolute top-4 right-14 z-20"
            />
            
            {/* HUD */}
            <div className="absolute top-4 left-4 right-24 flex justify-between z-10">
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-center gap-2">
                <span className="text-lg">❤️</span>
                <span className="text-lg font-bold text-foreground">{lives}</span>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="text-lg font-bold text-foreground">x{combo}</span>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span className="text-lg font-bold text-foreground">{score}</span>
              </div>
            </div>

            {/* Round indicator */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full font-bold text-lg">
              第 {round} / {totalRounds} 關
            </div>

            {/* Challenge instruction */}
            {currentChallenge && (
              <div className="absolute top-24 left-4 right-4 text-center">
                <div className={`inline-block bg-card/95 backdrop-blur-sm rounded-2xl px-4 py-2 text-lg font-bold ${
                  currentChallenge.type === 'reverse' ? 'text-orange' :
                  currentChallenge.type === 'quick' ? 'text-destructive' :
                  'text-foreground'
                }`}>
                  {currentChallenge.instruction}
                </div>
                
                {/* Time limit bar */}
                {currentChallenge.timeLimit && timeLeft > 0 && (
                  <div className="mt-2 mx-auto w-48 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-destructive transition-all duration-100"
                      style={{ width: `${(timeLeft / currentChallenge.timeLimit) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Traffic Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground/90 rounded-3xl p-3 flex flex-col gap-2">
              <div className={getLightStyle('red')} />
              <div className={getLightStyle('yellow')} />
              <div className={getLightStyle('green')} />
            </div>

            {/* Progress bar (road) */}
            <div className="absolute bottom-28 left-8 right-8 h-3 bg-game-road rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary transition-all duration-500"
                style={{ width: `${vehiclePosition}%` }}
              />
            </div>

            {/* Vehicle */}
            <div 
              className="absolute bottom-32 transition-all duration-500"
              style={{ left: `calc(${vehiclePosition}% + 16px)` }}
            >
              <img 
                src={vehicleSprite} 
                alt={selectedVehicle.name}
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl animate-scale-in`}>
                {showFeedback === 'correct' ? '✅' : '❌'}
              </div>
            )}

            {/* Control buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-4">
              <Button 
                onClick={() => handleAction('stop')}
                disabled={isWaiting}
                className="flex-1 btn-bounce bg-game-danger text-primary-foreground text-xl py-8 rounded-2xl disabled:opacity-50"
              >
                🛑 停車
              </Button>
              <Button 
                onClick={() => handleAction('go')}
                disabled={isWaiting}
                className="flex-1 btn-bounce bg-game-success text-primary-foreground text-xl py-8 rounded-2xl disabled:opacity-50"
              >
                🚗 前進
              </Button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-center bg-gradient-to-b from-secondary to-sky animate-fade-in overflow-y-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="text-5xl celebrate">🎉</div>
              <h2 className="text-2xl font-bold text-foreground">恭喜過關！</h2>
              <img src={passengerImg} alt="乘客" className="w-16 h-16 object-contain float-animation" />
              <p className="text-base text-foreground">你成功完成所有交通燈挑戰！</p>
              <p className="text-xl text-foreground">得分：<span className="font-bold text-primary">{score}</span> ⭐</p>
              <p className="text-base text-muted-foreground">最高連擊：{maxCombo} 🔥</p>
            </div>
            
            <Leaderboard 
              entries={leaderboard} 
              currentScore={score}
              isNewHighScore={isNewHighScore}
              rank={rank}
            />
            
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button 
                onClick={startGame}
                className="btn-bounce bg-primary text-primary-foreground text-lg py-4"
              >
                🔄 再玩一次
              </Button>
              <Button 
                onClick={onBack}
                variant="outline"
                className="text-lg py-4"
              >
                🏠 返回主頁
              </Button>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-center bg-gradient-to-b from-destructive/80 to-primary animate-fade-in overflow-y-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="text-5xl">💥</div>
              <h2 className="text-2xl font-bold text-primary-foreground">挑戰失敗！</h2>
              <p className="text-base text-primary-foreground/90">下次要更專心喔！</p>
              <p className="text-xl text-primary-foreground">得分：<span className="font-bold">{score}</span> ⭐</p>
              <p className="text-base text-primary-foreground/80">到達：第 {round} 關</p>
            </div>
            
            <Leaderboard 
              entries={leaderboard} 
              currentScore={score}
              isNewHighScore={isNewHighScore}
              rank={rank}
            />
            
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button 
                onClick={startGame}
                className="btn-bounce bg-card text-foreground text-lg py-4"
              >
                🔄 再玩一次
              </Button>
              <Button 
                onClick={onBack}
                variant="outline"
                className="text-lg py-4 border-foreground text-foreground hover:bg-foreground/10"
              >
                🏠 返回主頁
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`game-container w-full bg-card relative ${
        isFullscreen 
          ? 'h-screen landscape:h-screen' 
          : 'h-[500px] md:h-[600px]'
      }`}
    >
      <FullscreenButton 
        isFullscreen={isFullscreen}
        onToggle={toggleFullscreen}
        className="absolute top-2 right-2 z-50"
      />
      {renderPhase()}
    </div>
  );
};
