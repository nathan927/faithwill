import { useState, useEffect, useCallback, useRef } from "react";
import { VehicleType } from "@/types/game";
import { vehicles } from "@/components/VehicleSelector";
import { Button } from "@/components/ui/button";
import { useChromaKeyImage } from "@/hooks/useChromaKeyImage";
import { ChromaImage } from "@/components/ChromaImage";
import { useFullscreen } from "@/hooks/useFullscreen";
import { FullscreenButton } from "@/components/FullscreenButton";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useGameSounds } from "@/hooks/useGameSounds";
import { Leaderboard } from "@/components/Leaderboard";
import { SoundToggle } from "@/components/SoundToggle";
import coinImg from "@/assets/coin.png";
import starImg from "@/assets/star.png";
import heartImg from "@/assets/heart.png";
import diamondImg from "@/assets/diamond.png";
import crownImg from "@/assets/crown.png";
import cupcakeImg from "@/assets/cupcake.png";
import bombImg from "@/assets/bomb.png";
import rockImg from "@/assets/rock.png";
import cactusImg from "@/assets/cactus.png";
import beeImg from "@/assets/bee.png";
import cheeseImg from "@/assets/cheese.png";
import cityBg from "@/assets/city-bg.png";

interface CoinCollectorProps {
  vehicle: VehicleType;
  onBack: () => void;
}

type GamePhase = 'menu' | 'playing' | 'gameover';

type ItemType = 'coin' | 'star' | 'heart' | 'diamond' | 'crown' | 'cupcake' | 'bomb' | 'rock' | 'cactus' | 'bee' | 'cheese';

interface GameItem {
  id: number;
  x: number;
  y: number;
  type: ItemType;
}

const itemConfig: Record<ItemType, { image: string; points: number; isGood: boolean; name: string }> = {
  coin: { image: coinImg, points: 10, isGood: true, name: '金幣' },
  star: { image: starImg, points: 20, isGood: true, name: '星星' },
  heart: { image: heartImg, points: 15, isGood: true, name: '愛心' },
  diamond: { image: diamondImg, points: 50, isGood: true, name: '鑽石' },
  crown: { image: crownImg, points: 40, isGood: true, name: '皇冠' },
  cupcake: { image: cupcakeImg, points: 25, isGood: true, name: '杯子蛋糕' },
  bomb: { image: bombImg, points: -30, isGood: false, name: '炸彈' },
  rock: { image: rockImg, points: -20, isGood: false, name: '石頭' },
  cactus: { image: cactusImg, points: -25, isGood: false, name: '仙人掌' },
  bee: { image: beeImg, points: -35, isGood: false, name: '蜜蜂' },
  cheese: { image: cheeseImg, points: -15, isGood: false, name: '臭芝士' },
};

const goodItems: ItemType[] = ['coin', 'star', 'heart', 'diamond', 'crown', 'cupcake'];
const badItems: ItemType[] = ['bomb', 'rock', 'cactus', 'bee', 'cheese'];

export const CoinCollector = ({ vehicle, onBack }: CoinCollectorProps) => {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [vehicleX, setVehicleX] = useState(50);
  const [items, setItems] = useState<GameItem[]>([]);
  const [showEffect, setShowEffect] = useState<{ type: 'good' | 'bad' | null; x: number; y: number; points: number }>({ type: null, x: 0, y: 0, points: 0 });
  const [combo, setCombo] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1.0);
  
  const itemIdRef = useRef(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const vehicleXRef = useRef(50);
  
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const { leaderboard, submitScore, isNewHighScore, rank, resetNewHighScore } = useLeaderboard('coin-collector');
  const sounds = useGameSounds();
  
  const itemsRef = useRef<GameItem[]>([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const gameSpeedRef = useRef(1.0);

  const selectedVehicle = vehicles.find(v => v.id === vehicle)!;
  const vehicleSprite = useChromaKeyImage(selectedVehicle.image, { threshold: 50 });

  const startGame = () => {
    setPhase('playing');
    setScore(0);
    setTimeLeft(45);
    setVehicleX(50);
    setItems([]);
    setCombo(0);
    setGameSpeed(0.7);
    itemIdRef.current = 0;
    vehicleXRef.current = 50;
    itemsRef.current = [];
    scoreRef.current = 0;
    comboRef.current = 0;
    gameSpeedRef.current = 0.7;
    resetNewHighScore();
    sounds.playGameStart();
  };

  // Handle mouse/touch movement
  const handleMove = useCallback((clientX: number) => {
    if (!gameContainerRef.current || phase !== 'playing') return;
    
    const rect = gameContainerRef.current.getBoundingClientRect();
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    const newX = Math.max(10, Math.min(90, relativeX));
    vehicleXRef.current = newX;
    setVehicleX(newX);
  }, [phase]);

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  };

  // Keyboard controls for arrow keys
  useEffect(() => {
    if (phase !== 'playing') return;

    const keysPressed = new Set<string>();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'd', 'A', 'D'].includes(e.key)) {
        e.preventDefault();
        keysPressed.add(e.key.toLowerCase());
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.key.toLowerCase());
    };

    const moveInterval = setInterval(() => {
      const moveAmount = 3;
      let newX = vehicleXRef.current;
      
      if (keysPressed.has('arrowleft') || keysPressed.has('a')) {
        newX = Math.max(10, newX - moveAmount);
      }
      if (keysPressed.has('arrowright') || keysPressed.has('d')) {
        newX = Math.min(90, newX + moveAmount);
      }
      
      if (newX !== vehicleXRef.current) {
        vehicleXRef.current = newX;
        setVehicleX(newX);
      }
    }, 16);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(moveInterval);
    };
  }, [phase]);

  // Main game loop using requestAnimationFrame
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    let animationId: number;

    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;

      const moveSpeed = 1.2 * deltaTime * gameSpeedRef.current;
      const updated: GameItem[] = [];
      let hasChanges = false;

      itemsRef.current.forEach(item => {
        const newY = item.y + moveSpeed;
        const config = itemConfig[item.type];
        
        // Collision detection with vehicle
        if (newY >= 75 && newY <= 92) {
          const distance = Math.abs(item.x - vehicleXRef.current);
          if (distance < 12) {
            hasChanges = true;
            const bonus = config.isGood ? (1 + Math.floor(comboRef.current / 3)) : 1;
            const points = config.points * bonus;
            
            scoreRef.current = Math.max(0, scoreRef.current + points);
            
            if (config.isGood) {
              comboRef.current += 1;
              setShowEffect({ type: 'good', x: item.x, y: 68, points });
              sounds.playCollect();
              if (comboRef.current > 1) {
                sounds.playCombo(comboRef.current);
              }
            } else {
              comboRef.current = 0;
              setShowEffect({ type: 'bad', x: item.x, y: 68, points });
              sounds.playHit();
            }
            
            setScore(scoreRef.current);
            setCombo(comboRef.current);
            setTimeout(() => setShowEffect({ type: null, x: 0, y: 0, points: 0 }), 400);
            return;
          }
        }
        
        if (newY < 105) {
          updated.push({ ...item, y: newY });
        } else if (config.isGood) {
          hasChanges = true;
          comboRef.current = 0;
          setCombo(0);
        }
      });

      if (hasChanges || updated.length !== itemsRef.current.length) {
        itemsRef.current = updated;
        setItems([...updated]);
      } else {
        itemsRef.current = updated;
        setItems([...updated]);
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [phase, sounds]);

  // Spawn items
  useEffect(() => {
    if (phase !== 'playing') return;

    let spawnIntervalId: NodeJS.Timeout;
    
    const scheduleSpawn = () => {
      const baseInterval = Math.max(600, 1200 - (gameSpeedRef.current - 1) * 200);
      
      spawnIntervalId = setTimeout(() => {
        const isGood = Math.random() < 0.65;
        const itemList = isGood ? goodItems : badItems;
        const type = itemList[Math.floor(Math.random() * itemList.length)];
        
        const newItem: GameItem = {
          id: itemIdRef.current++,
          x: Math.random() * 75 + 12.5,
          y: -8,
          type
        };
        itemsRef.current = [...itemsRef.current, newItem];
        setItems([...itemsRef.current]);
        
        scheduleSpawn();
      }, baseInterval);
    };
    
    scheduleSpawn();
    return () => clearTimeout(spawnIntervalId);
  }, [phase]);

  // Timer and speed increase
  useEffect(() => {
    if (phase !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Add completion bonus
          scoreRef.current += 50;
          setScore(scoreRef.current);
          setPhase('gameover');
          return 0;
        }
        return prev - 1;
      });
      
      gameSpeedRef.current = Math.min(1.8, gameSpeedRef.current + 0.025);
      setGameSpeed(gameSpeedRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // Submit score when game ends
  useEffect(() => {
    if (phase === 'gameover') {
      const result = submitScore(score, vehicle);
      if (result.isHighScore) {
        sounds.playNewHighScore();
      } else {
        sounds.playVictory();
      }
    }
  }, [phase, score, vehicle, submitScore, sounds]);

  const renderPhase = () => {
    switch (phase) {
      case 'menu':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-center overflow-y-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">🪙 金幣收集 🪙</h2>
            <div className="flex gap-2 md:gap-3 items-center justify-center flex-wrap">
              <ChromaImage src={coinImg} alt="金幣" className="w-10 h-10 object-contain float-animation" />
              <ChromaImage src={starImg} alt="星星" className="w-10 h-10 object-contain float-animation" />
              <ChromaImage src={heartImg} alt="愛心" className="w-10 h-10 object-contain float-animation" />
              <ChromaImage src={diamondImg} alt="鑽石" className="w-10 h-10 object-contain float-animation" />
              <ChromaImage src={crownImg} alt="皇冠" className="w-10 h-10 object-contain float-animation" />
              <ChromaImage src={cupcakeImg} alt="蛋糕" className="w-10 h-10 object-contain float-animation" />
            </div>
            <div className="text-sm md:text-base text-muted-foreground space-y-1 mt-2">
              <p className="text-secondary font-bold">✅ 收集加分：金幣、星星、愛心、鑽石、皇冠、蛋糕</p>
              <p className="text-destructive font-bold">❌ 避開扣分：炸彈、石頭、仙人掌、蜜蜂、臭芝士</p>
              <p>連續收集可獲得連擊獎勵！</p>
            </div>
            <div className="flex gap-2 md:gap-3 items-center flex-wrap justify-center">
              <ChromaImage src={bombImg} alt="炸彈" className="w-9 h-9 object-contain" />
              <ChromaImage src={rockImg} alt="石頭" className="w-9 h-9 object-contain" />
              <ChromaImage src={cactusImg} alt="仙人掌" className="w-9 h-9 object-contain" />
              <ChromaImage src={beeImg} alt="蜜蜂" className="w-9 h-9 object-contain" />
              <ChromaImage src={cheeseImg} alt="臭芝士" className="w-9 h-9 object-contain" />
            </div>
            
            <Button
              onClick={startGame}
              className="btn-bounce bg-accent text-accent-foreground text-xl py-5 px-8 mt-4"
            >
              🎮 開始遊戲！
            </Button>
          </div>
        );

      case 'playing':
        return (
          <div 
            ref={gameContainerRef}
            className="relative h-full overflow-hidden cursor-none select-none touch-none"
            style={{ backgroundImage: `url(${cityBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchMove}
          >
            {/* Sound Toggle */}
            <SoundToggle 
              onToggle={sounds.setMuted} 
              className="absolute top-4 right-14 z-20"
            />
            
            {/* HUD */}
            <div className="absolute top-4 left-4 right-24 flex justify-between z-10">
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <span className="text-xl font-bold text-foreground">{timeLeft}s</span>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <span className="text-xl font-bold text-foreground">x{combo}</span>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <span className="text-xl font-bold text-foreground">{score}</span>
              </div>
            </div>

            {/* Items with background removal */}
            {items.map(item => {
              const config = itemConfig[item.type];
              return (
                <div
                  key={item.id}
                  className="absolute will-change-transform"
                  style={{ 
                    left: `${item.x}%`, 
                    top: `${item.y}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <ChromaImage 
                    src={config.image}
                    alt={config.name}
                    className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg"
                  />
                </div>
              );
            })}

            {/* Effect */}
            {showEffect.type && (
              <div
                className={`absolute text-2xl md:text-3xl animate-scale-in pointer-events-none z-20 font-bold`}
                style={{ 
                  left: `${showEffect.x}%`, 
                  top: `${showEffect.y}%`,
                  transform: 'translate(-50%, -50%)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  color: showEffect.type === 'good' ? '#FFD700' : '#FF4444'
                }}
              >
                {showEffect.type === 'good' ? `+${showEffect.points}` : showEffect.points}
              </div>
            )}

            {/* Road at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-game-road">
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent/50" />
            </div>

            {/* Vehicle */}
            <div 
              className="absolute bottom-5 z-10 will-change-transform vehicle-container"
              style={{ left: `${vehicleX}%`, transform: 'translateX(-50%)' }}
            >
              <img 
                src={vehicleSprite} 
                alt={selectedVehicle.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>

            {/* Instructions */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-primary-foreground text-xs md:text-sm font-bold bg-foreground/60 px-3 py-1 rounded-full">
              👆 左右滑動控制車輛
            </div>
          </div>
        );

      case 'gameover':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-center bg-gradient-to-b from-accent to-orange animate-fade-in overflow-y-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="text-5xl sparkle">🏆</div>
              <h2 className="text-2xl font-bold text-foreground">時間到！</h2>
              <p className="text-xl text-foreground">得分：<span className="font-bold text-primary">{score}</span> ⭐</p>
              <p className="text-base text-muted-foreground">
                {score >= 600 ? '🌟 金幣大師！太厲害了！' : 
                 score >= 400 ? '👍 做得好！繼續努力！' :
                 score >= 200 ? '😊 不錯喔！再試試看！' :
                 '💪 加油！多練習就會進步！'}
              </p>
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
