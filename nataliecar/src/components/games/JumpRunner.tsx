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
import obstacleImg from "@/assets/obstacle-cone.png";
import cityBg from "@/assets/city-bg.png";
import passengerImg from "@/assets/passenger.png";
import bombImg from "@/assets/bomb.png";
import rockImg from "@/assets/rock.png";
import cactusImg from "@/assets/cactus.png";
import bananaImg from "@/assets/banana.png";
import oilImg from "@/assets/oil.png";
import duckImg from "@/assets/duck.png";
import trashImg from "@/assets/trash.png";
import pizzaImg from "@/assets/pizza.png";
import cartImg from "@/assets/cart.png";
import icecreamImg from "@/assets/icecream.png";
import toiletpaperImg from "@/assets/toiletpaper.png";

interface JumpRunnerProps {
  vehicle: VehicleType;
  onBack: () => void;
}

type GamePhase = 'menu' | 'playing' | 'success1' | 'success2' | 'gameover' | 'failed';

interface Position {
  x: number;
  y: number;
}

interface Obstacle {
  id: number;
  x: number;
  y: number;
  type: ObstacleType;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
}

type ObstacleType = 'cone' | 'bomb' | 'rock' | 'cactus' | 'banana' | 'oil' | 'duck' | 'trash' | 'pizza' | 'cart' | 'icecream' | 'toiletpaper';

const obstacleImages: Record<ObstacleType, string> = {
  cone: obstacleImg,
  bomb: bombImg,
  rock: rockImg,
  cactus: cactusImg,
  banana: bananaImg,
  oil: oilImg,
  duck: duckImg,
  trash: trashImg,
  pizza: pizzaImg,
  cart: cartImg,
  icecream: icecreamImg,
  toiletpaper: toiletpaperImg,
};

const obstacleTypes: ObstacleType[] = ['cone', 'bomb', 'rock', 'cactus', 'banana', 'oil', 'duck', 'trash', 'pizza', 'cart', 'icecream', 'toiletpaper'];

export const JumpRunner = ({ vehicle, onBack }: JumpRunnerProps) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'hard' | null>(null);
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [vehiclePos, setVehiclePos] = useState<Position>({ x: 12, y: 50 });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [speed, setSpeed] = useState(1);
  const [gameShake, setGameShake] = useState(false);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const obstacleIdRef = useRef(0);
  
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const { leaderboard, submitScore, isNewHighScore, rank, resetNewHighScore } = useLeaderboard('jump-runner');
  const sounds = useGameSounds();
  
  const keysPressed = useRef<Set<string>>(new Set());
  const vehiclePosRef = useRef<Position>({ x: 12, y: 50 });
  const collidedIds = useRef<Set<number>>(new Set());
  const lastSpawnTime = useRef(0);
  const scoreRef = useRef(0);
  const difficultyRef = useRef<'easy' | 'hard'>('easy');

  const selectedVehicle = vehicles.find(v => v.id === vehicle)!;
  const vehicleSprite = useChromaKeyImage(selectedVehicle.image, { threshold: 50 });

  const startGame = (diff: 'easy' | 'hard') => {
    difficultyRef.current = diff;
    setDifficulty(diff);
    setTimeLeft(diff === 'easy' ? 30 : 60);
    setPhase('playing');
    setScore(0);
    scoreRef.current = 0;
    setLives(3);
    setObstacles([]);
    setExplosions([]);
    setSpeed(1);
    setVehiclePos({ x: 12, y: 50 });
    vehiclePosRef.current = { x: 12, y: 50 };
    obstacleIdRef.current = 0;
    keysPressed.current.clear();
    collidedIds.current.clear();
    lastSpawnTime.current = Date.now();
    resetNewHighScore();
    sounds.playGameStart();
  };

  // Handle keyboard controls
  useEffect(() => {
    if (phase !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
        keysPressed.current.add(e.key.toLowerCase());
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [phase]);

  // Handle touch controls
  const handleTouch = useCallback((e: React.TouchEvent) => {
    if (phase !== 'playing' || !gameRef.current) return;
    
    const rect = gameRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const relX = ((touch.clientX - rect.left) / rect.width) * 100;
    const relY = ((touch.clientY - rect.top) / rect.height) * 100;
    
    const newX = Math.max(5, Math.min(25, relX));
    const newY = Math.max(15, Math.min(85, relY));
    
    vehiclePosRef.current = { x: newX, y: newY };
    setVehiclePos({ x: newX, y: newY });
  }, [phase]);

  // Main game loop
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    let animationId: number;

    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;

      // Update vehicle position based on keys
      const moveSpeed = 3 * deltaTime;
      let newX = vehiclePosRef.current.x;
      let newY = vehiclePosRef.current.y;

      if (keysPressed.current.has('arrowup') || keysPressed.current.has('w')) {
        newY = Math.max(15, newY - moveSpeed);
      }
      if (keysPressed.current.has('arrowdown') || keysPressed.current.has('s')) {
        newY = Math.min(85, newY + moveSpeed);
      }
      if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) {
        newX = Math.max(5, newX - moveSpeed);
      }
      if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) {
        newX = Math.min(25, newX + moveSpeed);
      }

      if (newX !== vehiclePosRef.current.x || newY !== vehiclePosRef.current.y) {
        vehiclePosRef.current = { x: newX, y: newY };
        setVehiclePos({ x: newX, y: newY });
      }

      // Move obstacles
      setObstacles(prev => {
        const updated: Obstacle[] = [];
        let collided = false;
        let collidedObsId = -1;

        prev.forEach(obs => {
          const newObsX = obs.x - speed * deltaTime * 0.5;
          
          // Collision detection - smaller hitbox for more precise detection
          const vx = vehiclePosRef.current.x;
          const vy = vehiclePosRef.current.y;
          const hitX = newObsX > vx - 3 && newObsX < vx + 4;
          const hitY = Math.abs(obs.y - vy) < 6;
          
          if (hitX && hitY && !collidedIds.current.has(obs.id)) {
            collided = true;
            collidedObsId = obs.id;
            // Create explosion at collision point
            setExplosions(prev => [...prev, { id: Date.now(), x: newObsX, y: obs.y }]);
          }
          
          if (newObsX > -10) {
            updated.push({ ...obs, x: newObsX });
          } else {
            // Passed obstacle - add score
            scoreRef.current += 10;
            setScore(scoreRef.current);
            sounds.playCollect();
          }
        });

        if (collided && collidedObsId >= 0) {
          collidedIds.current.add(collidedObsId);
          sounds.playHit();
          setLives(l => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setPhase('failed');
              sounds.playGameOver();
            }
            return newLives;
          });
          setGameShake(true);
          setTimeout(() => setGameShake(false), 400);
        }

        return updated;
      });

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [phase, speed, sounds]);

  // Spawn obstacles - consistent spawn to always have obstacles
  useEffect(() => {
    if (phase !== 'playing') return;

    const spawnObstacle = () => {
      const lanes = [20, 35, 50, 65, 80];
      // Always spawn 1-3 obstacles
      const numObstacles = Math.floor(Math.random() * 2) + 1 + (speed > 2 ? 1 : 0);
      const selectedLanes = [...lanes].sort(() => Math.random() - 0.5).slice(0, numObstacles);
      
      selectedLanes.forEach((lane, index) => {
        // Random obstacle type from all 12 types
        const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        setObstacles(prev => [
          ...prev,
          { id: obstacleIdRef.current++, x: 105 + index * 12, y: lane, type }
        ]);
      });
    };

    // Consistent spawn rate - between 800ms and 1500ms
    const baseInterval = Math.max(800, 1500 - speed * 150);
    const spawnInterval = setInterval(spawnObstacle, baseInterval);
    
    // Initial spawn
    spawnObstacle();

    return () => clearInterval(spawnInterval);
  }, [phase, speed]);

  // Timer and gradual difficulty increase
  useEffect(() => {
    if (phase !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Add completion bonus when time runs out (success)
          const completionBonus = difficultyRef.current === 'hard' ? 150 : 100;
          scoreRef.current += completionBonus;
          setScore(scoreRef.current);
          setPhase('success1');
          sounds.playVictory();
          return 0;
        }
        return prev - 1;
      });

      // Gradual speed increase - from 1 to max 3
      setSpeed(s => Math.min(3, s + 0.07));
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, sounds]);

  // Submit score when game ends successfully
  useEffect(() => {
    if (phase === 'gameover') {
      const result = submitScore(score, vehicle);
      if (result.isHighScore) {
        sounds.playNewHighScore();
      }
    }
  }, [phase, score, vehicle, submitScore, sounds]);

  const renderPhase = () => {
    switch (phase) {
      case 'menu':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">🚗 送客快車 🏁</h2>
            <p className="text-lg text-muted-foreground">
              用方向鍵 ↑↓←→ 或 WASD 控制車輛<br />
              手機用戶可觸碰屏幕移動！<br />
              <span className="text-destructive font-bold">撞到障礙物2次就輸了！</span>
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <ChromaImage src={bananaImg} alt="香蕉" className="w-10 h-10 object-contain" />
              <ChromaImage src={duckImg} alt="鴨子" className="w-10 h-10 object-contain" />
              <ChromaImage src={pizzaImg} alt="披薩" className="w-10 h-10 object-contain" />
              <ChromaImage src={icecreamImg} alt="雪糕" className="w-10 h-10 object-contain" />
            </div>
            
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <Button 
                onClick={() => startGame('easy')}
                className="btn-bounce bg-secondary text-secondary-foreground text-xl py-6"
              >
                😊 容易模式 (30秒)
              </Button>
              <Button 
                onClick={() => startGame('hard')}
                className="btn-bounce bg-primary text-primary-foreground text-xl py-6"
              >
                💪 困難模式 (60秒)
              </Button>
            </div>
          </div>
        );

      case 'playing':
        return (
          <div 
            ref={gameRef}
            className={`relative h-full overflow-hidden cursor-pointer touch-none ${gameShake ? 'shake' : ''}`}
            onTouchMove={handleTouch}
            onTouchStart={handleTouch}
          >
            {/* Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${cityBg})` }}
            />
            
            {/* Sound Toggle */}
            <SoundToggle 
              onToggle={sounds.setMuted} 
              className="absolute top-4 right-14 z-20"
            />
            
            {/* HUD */}
            <div className="absolute top-4 left-4 right-24 flex justify-between z-10">
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span className="text-2xl font-bold text-foreground">{timeLeft}s</span>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="text-2xl">❤️</span>
                <span className={`text-2xl font-bold ${lives <= 1 ? 'text-destructive' : 'text-foreground'}`}>{lives}</span>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-2xl font-bold text-foreground">{score}</span>
              </div>
            </div>

            {/* Road lanes */}
            <div className="absolute inset-0 bg-game-road/70">
              {[20, 35, 50, 65, 80].map(lane => (
                <div 
                  key={lane}
                  className="absolute left-0 right-0 h-0.5 bg-accent/30"
                  style={{ top: `${lane}%` }}
                />
              ))}
            </div>

            {/* Vehicle */}
            <div 
              className="absolute z-20 will-change-transform"
              style={{ 
                left: `${vehiclePos.x}%`,
                top: `${vehiclePos.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <img 
                src={vehicleSprite} 
                alt={selectedVehicle.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>

            {/* Obstacles with background removal */}
            {obstacles.map(obs => (
              <div
                key={obs.id}
                className="absolute z-10 will-change-transform"
                style={{ 
                  left: `${obs.x}%`,
                  top: `${obs.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <ChromaImage 
                  src={obstacleImages[obs.type]}
                  alt="障礙物"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md"
                />
              </div>
            ))}

            {/* Explosion effects */}
            {explosions.map(exp => (
              <div
                key={exp.id}
                className="absolute z-30 pointer-events-none explosion-effect"
                style={{ 
                  left: `${exp.x}%`,
                  top: `${exp.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onAnimationEnd={() => {
                  setExplosions(prev => prev.filter(e => e.id !== exp.id));
                }}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl explosion-star">💥</span>
                  <span className="absolute -top-2 -left-2 text-2xl explosion-particle-1">⭐</span>
                  <span className="absolute -top-2 -right-2 text-2xl explosion-particle-2">✨</span>
                  <span className="absolute -bottom-2 -left-2 text-2xl explosion-particle-3">💫</span>
                  <span className="absolute -bottom-2 -right-2 text-2xl explosion-particle-4">🔥</span>
                </div>
              </div>
            ))}

            {/* Control instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-bold bg-foreground/60 px-4 py-2 rounded-full">
              ⬆️⬇️⬅️➡️ 或觸碰移動
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-6 text-center bg-gradient-to-b from-destructive/80 to-primary animate-fade-in">
            <div className="flex flex-col items-center gap-3">
              <div className="text-6xl">💥</div>
              <h2 className="text-3xl font-bold text-primary-foreground">撞車了！</h2>
              <p className="text-lg text-primary-foreground/90">下次小心一點喔！完成全程才能上榜！</p>
              <div className="flex items-center gap-2 text-2xl text-primary-foreground mt-2">
                <span>得分：</span>
                <span className="font-bold">{score} ⭐</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button 
                onClick={() => setPhase('menu')}
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

      case 'success1':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8 text-center bg-gradient-to-b from-sky to-secondary animate-fade-in">
            <div className="text-6xl celebrate">🎉</div>
            <h2 className="text-3xl font-bold text-foreground">乘客順利到站！</h2>
            <img src={passengerImg} alt="乘客" className="w-32 h-32 object-contain float-animation" />
            <p className="text-xl text-foreground">太棒了！你成功送乘客到達目的地！</p>
            <Button 
              onClick={() => setPhase('success2')}
              className="btn-bounce bg-accent text-accent-foreground text-xl py-4 px-8"
            >
              繼續 ➡️
            </Button>
          </div>
        );

      case 'success2':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-6 p-8 text-center bg-gradient-to-b from-accent to-secondary animate-fade-in">
            <div className="text-6xl">🙏</div>
            <h2 className="text-3xl font-bold text-foreground">多謝司機大哥！</h2>
            <img src={passengerImg} alt="乘客" className="w-32 h-32 object-contain" />
            <p className="text-xl text-foreground">乘客向你揮手道謝！</p>
            <div className="flex items-center gap-2 text-2xl">
              <span>最終得分：</span>
              <span className="font-bold text-primary">{score} ⭐</span>
            </div>
            <Button 
              onClick={() => setPhase('gameover')}
              className="btn-bounce bg-primary text-primary-foreground text-xl py-4 px-8"
            >
              繼續 ➡️
            </Button>
          </div>
        );

      case 'gameover':
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 p-4 text-center bg-gradient-to-b from-primary to-orange animate-fade-in overflow-y-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="text-5xl sparkle">🏆</div>
              <h2 className="text-2xl font-bold text-primary-foreground">遊戲結束！</h2>
              <p className="text-lg text-primary-foreground">多謝參與！</p>
              <div className="flex items-center gap-2 text-xl text-primary-foreground">
                <span>得分：</span>
                <span className="font-bold">{score} ⭐</span>
              </div>
            </div>
            
            <Leaderboard 
              entries={leaderboard} 
              currentScore={score}
              isNewHighScore={isNewHighScore}
              rank={rank}
            />
            
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button 
                onClick={() => setPhase('menu')}
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
