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
import { ChromaImage } from "@/components/ChromaImage";

// Import obstacle and collectible images
import coneImg from "@/assets/obstacle-cone.png";
import oilImg from "@/assets/oil.png";
import taxiImg from "@/assets/taxi.png";
import coinImg from "@/assets/coin.png";
import starImg from "@/assets/star.png";
import heartImg from "@/assets/heart.png";
import rockImg from "@/assets/rock.png";
import trashImg from "@/assets/trash.png";
import bridgeImg from "@/assets/bridge.png";
import bombImg from "@/assets/bomb.png";
import cactusImg from "@/assets/cactus.png";
import trafficLightImg from "@/assets/traffic-light.png";
import speedLimitImg from "@/assets/speed-limit.png";
import diamondImg from "@/assets/diamond.png";
import pizzaImg from "@/assets/pizza.png";
import crownImg from "@/assets/crown.png";

interface DrivingSimulatorProps {
  vehicle: VehicleType;
  onBack: () => void;
}

type GamePhase = 'menu' | 'countdown' | 'playing' | 'paused' | 'success' | 'failed';

// Obstacle types with new additions
type ObstacleType = 'car' | 'cone' | 'oil' | 'rock' | 'puddle' | 'construction' | 'bomb' | 'cactus' | 'traffic_light' | 'speed_limit';

interface Obstacle {
  id: number;
  lane: number;
  y: number;
  type: ObstacleType;
}

// Collectible types with new power-ups
type CollectibleType = 'coin' | 'star' | 'heart' | 'diamond' | 'pizza' | 'crown';

interface Collectible {
  id: number;
  lane: number;
  y: number;
  type: CollectibleType;
  collected: boolean;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

interface CollectEffect {
  id: number;
  x: number;
  y: number;
  type: CollectibleType;
}

// Power-up state interface
interface PowerUp {
  active: boolean;
  duration: number;
  startTime: number;
}

// Scene types for background changes - 6 environments (defined outside component)
type SceneType = 'city' | 'suburb' | 'tunnel' | 'highway' | 'beach' | 'bridge';

// Weather types (defined outside component)
type WeatherType = 'clear' | 'rain' | 'snow' | 'fog';

export const DrivingSimulator = ({ vehicle, onBack }: DrivingSimulatorProps) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerLane, setPlayerLane] = useState(2); // 0, 1, 2, 3, 4 (5 lanes, start in center)
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [roadOffset, setRoadOffset] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isInvincible, setIsInvincible] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showHitEffect, setShowHitEffect] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [collectEffects, setCollectEffects] = useState<CollectEffect[]>([]);
  const [isSlipping, setIsSlipping] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  
  // Power-up states
  const [hasShield, setHasShield] = useState(false);
  const [speedBoost, setSpeedBoost] = useState(false);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const shieldTimerRef = useRef<NodeJS.Timeout | null>(null);
  const boostTimerRef = useRef<NodeJS.Timeout | null>(null);
  const multiplierTimerRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const obstacleIdRef = useRef(0);
  const collectibleIdRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const gameSpeedRef = useRef(5);
  const floatingIdRef = useRef(0);
  const effectIdRef = useRef(0);
  const [displaySpeed, setDisplaySpeed] = useState(0);

  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const { leaderboard, submitScore, isNewHighScore, rank, resetNewHighScore } = useLeaderboard('driving-simulator');
  const sounds = useGameSounds();

  const selectedVehicle = vehicles.find(v => v.id === vehicle)!;
  const vehicleSprite = useChromaKeyImage(selectedVehicle.image, { threshold: 50 });

  // Lane positions (percentage from left) - 5 lanes spanning road width (10% -> 90%)
  const lanePositions = [18, 34, 50, 66, 82];
  
  const [currentScene, setCurrentScene] = useState<SceneType>('city');
  const [currentWeather, setCurrentWeather] = useState<WeatherType>('clear');
  const weatherTimerRef = useRef(0);
  
  // Responsive detection with orientation
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || ('ontouchstart' in window);
      const landscape = window.innerWidth > window.innerHeight;
      setIsMobile(mobile);
      setIsLandscape(landscape);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  const startGame = (diff: 'easy' | 'hard') => {
    setDifficulty(diff);
    setPhase('countdown');
    setScore(0);
    setDistance(0);
    setLives(diff === 'easy' ? 5 : 3);
    setPlayerLane(2); // Start in center lane (5 lanes: 0-4)
    setCurrentScene('city');
    setCurrentWeather('clear');
    weatherTimerRef.current = 0;
    setObstacles([]);
    setCollectibles([]);
    setFloatingTexts([]);
    setCollectEffects([]);
    setRoadOffset(0);
    setCountdown(3);
    setCombo(0);
    setIsInvincible(false);
    setIsSlipping(false);
    setScreenShake(false);
    setHasShield(false);
    setSpeedBoost(false);
    setScoreMultiplier(1);
    obstacleIdRef.current = 0;
    collectibleIdRef.current = 0;
    floatingIdRef.current = 0;
    effectIdRef.current = 0;
    lastSpawnRef.current = 0;
    // Clear any existing power-up timers
    if (shieldTimerRef.current) clearTimeout(shieldTimerRef.current);
    if (boostTimerRef.current) clearTimeout(boostTimerRef.current);
    if (multiplierTimerRef.current) clearTimeout(multiplierTimerRef.current);
    // Slower speeds for better gameplay
    gameSpeedRef.current = diff === 'easy' ? 2 : 3;
    resetNewHighScore();
  };

  // Haptic feedback helper
  const vibrate = useCallback((pattern: number | number[]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  // Helper: add floating text
  const addFloatingText = (x: number, y: number, text: string, color: string) => {
    const id = floatingIdRef.current++;
    setFloatingTexts(prev => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1000);
  };

  // Helper: add collect effect
  const addCollectEffect = (x: number, y: number, type: CollectibleType) => {
    const id = effectIdRef.current++;
    setCollectEffects(prev => [...prev, { id, x, y, type }]);
    setTimeout(() => {
      setCollectEffects(prev => prev.filter(e => e.id !== id));
    }, 500);
  };

  // Countdown
  useEffect(() => {
    if (phase !== 'countdown') return;

    if (countdown > 0) {
      sounds.playCountdown();
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      sounds.playGameStart();
      setPhase('playing');
    }
  }, [phase, countdown, sounds]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (phase === 'playing') {
      setPhase('paused');
    } else if (phase === 'paused') {
      setPhase('playing');
    }
  }, [phase]);

  // Keyboard controls
  useEffect(() => {
    if (phase !== 'playing' && phase !== 'paused') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Pause controls
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P' || e.key === ' ') {
        e.preventDefault();
        togglePause();
        return;
      }
      
      // Only allow movement when playing (not paused)
      if (phase !== 'playing') return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setPlayerLane(l => Math.max(0, l - 1)); // 5 lanes: 0-4
        sounds.playClick();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setPlayerLane(l => Math.min(4, l + 1)); // 5 lanes: 0-4
        sounds.playClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, sounds, togglePause]);

  // Main game loop
  useEffect(() => {
    if (phase !== 'playing') return;

    let lastTime = performance.now();
    // Longer distances for more gameplay time
    const goalDistance = difficulty === 'hard' ? 2400 : 1200;

    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67;
      lastTime = currentTime;

      // Update road animation (pixel-based for seamless looping)
      setRoadOffset(prev => (prev + gameSpeedRef.current * deltaTime * 12) % 80);

      // Update distance (slower accumulation)
      setDistance(prev => {
        const newDist = prev + gameSpeedRef.current * deltaTime * 0.3;
        
        // Gradual speed increase based on distance
        const speedMultiplier = difficulty === 'easy' ? 1 : 1.4;
        if (newDist < 200) gameSpeedRef.current = 2 * speedMultiplier;
        else if (newDist < 400) gameSpeedRef.current = 2.3 * speedMultiplier;
        else if (newDist < 600) gameSpeedRef.current = 2.6 * speedMultiplier;
        else if (newDist < 800) gameSpeedRef.current = 2.9 * speedMultiplier;
        else if (newDist < 1000) gameSpeedRef.current = 3.2 * speedMultiplier;
        else gameSpeedRef.current = 3.5 * speedMultiplier;
        
        // Update display speed (convert game speed to km/h for display)
        setDisplaySpeed(Math.round(gameSpeedRef.current * 20));
        
        // Scene changes based on distance - 6 environments evenly distributed
        // Easy: 1200m total, each scene = 200m
        // Hard: 2400m total, each scene = 400m
        const sceneLength = goalDistance / 6;
        const sceneIndex = Math.floor(newDist / sceneLength) % 6;
        const scenes: SceneType[] = ['city', 'suburb', 'beach', 'tunnel', 'bridge', 'highway'];
        setCurrentScene(scenes[sceneIndex]);
        
        // Weather changes - random weather every ~150-300m, skip in tunnel
        weatherTimerRef.current += gameSpeedRef.current * deltaTime * 0.3;
        if (weatherTimerRef.current > 150 + Math.random() * 150) {
          weatherTimerRef.current = 0;
          if (scenes[sceneIndex] !== 'tunnel') {
            const weathers: WeatherType[] = ['clear', 'clear', 'rain', 'snow', 'fog'];
            setCurrentWeather(weathers[Math.floor(Math.random() * weathers.length)]);
          } else {
            setCurrentWeather('clear'); // No weather in tunnel
          }
        }

        // Check win
        if (newDist >= goalDistance) {
          setPhase('success');
          sounds.playVictory();
          return goalDistance;
        }
        return newDist;
      });

      // Spawn obstacles and collectibles (slower spawn rate)
      lastSpawnRef.current += deltaTime;
      if (lastSpawnRef.current > 60) {
        lastSpawnRef.current = 0;
        
        const lane = Math.floor(Math.random() * 5); // 5 lanes now
        
        // More balanced spawn rates - more collectibles, fewer obstacles
        if (Math.random() < 0.55) {
          // Spawn obstacle - more variety with new types
          const types: ObstacleType[] = [
            'car', 'cone', 'oil', 'rock', 'puddle', 'construction',
            'bomb', 'cactus', 'traffic_light', 'speed_limit'
          ];
          setObstacles(prev => {
            // Limit max obstacles on screen (increased for 5 lanes)
            if (prev.length >= 5) return prev;
            return [...prev, {
              id: obstacleIdRef.current++,
              lane,
              y: -15,
              type: types[Math.floor(Math.random() * types.length)]
            }];
          });
        } else {
          // Spawn collectible with new power-ups
          const types: CollectibleType[] = [
            'coin', 'coin', 'coin', 'star', 'heart', 
            'diamond', 'pizza', 'crown'
          ];
          setCollectibles(prev => {
            if (prev.length >= 8) return prev;
            return [...prev, {
              id: collectibleIdRef.current++,
              lane,
              y: -15,
              type: types[Math.floor(Math.random() * types.length)],
              collected: false
            }];
          });
        }
      }

      // Move obstacles (slower movement - reduced from 0.6 to 0.35)
      setObstacles(prev => prev
        .map(o => ({ ...o, y: o.y + gameSpeedRef.current * deltaTime * 0.35 }))
        .filter(o => o.y < 120)
      );

      // Move collectibles (slower movement - reduced from 0.6 to 0.35)
      setCollectibles(prev => prev
        .map(c => ({ ...c, y: c.y + gameSpeedRef.current * deltaTime * 0.35 }))
        .filter(c => c.y < 120 && !c.collected)
      );

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [phase, difficulty, sounds]);

  // Collision / pickup detection (runs whenever items move)
  useEffect(() => {
    if (phase !== 'playing') return;

    const PLAYER_Y_MIN = 78;
    const PLAYER_Y_MAX = 92;

    // Obstacles - different effects based on type
    // Shield blocks all damage from obstacles
    if (!isInvincible && !hasShield) {
      const hitObstacle = obstacles.find(
        (o) => o.lane === playerLane && o.y > PLAYER_Y_MIN && o.y < PLAYER_Y_MAX
      );

      if (hitObstacle) {
        setObstacles((prev) => prev.filter((o) => o.id !== hitObstacle.id));
        
        const x = lanePositions[hitObstacle.lane];
        const y = hitObstacle.y;

        if (hitObstacle.type === 'oil' || hitObstacle.type === 'puddle') {
          // Oil/Puddle: slip effect - random lane change, no damage
          sounds.playHit();
          vibrate([50, 30, 50]);
          setIsSlipping(true);
          setScreenShake(true);
          addFloatingText(x, y, hitObstacle.type === 'oil' ? '打滑!' : '濺水!', '#38bdf8');
          
          const slipDirection = Math.random() > 0.5 ? 1 : -1;
          setPlayerLane(l => Math.max(0, Math.min(4, l + slipDirection)));
          
          setTimeout(() => {
            setIsSlipping(false);
            setScreenShake(false);
          }, 500);
          
        } else if (hitObstacle.type === 'cone' || hitObstacle.type === 'rock' || hitObstacle.type === 'cactus') {
          // Cone/Rock/Cactus: slow down, minor damage
          sounds.playHit();
          vibrate([100, 50, 100]);
          setShowHitEffect(true);
          setScreenShake(true);
          const labels: Record<string, string> = { cone: '撞錐!', rock: '撞石!', cactus: '刺傷!' };
          addFloatingText(x, y, `${labels[hitObstacle.type]} -1 ❤️`, '#ef4444');
          gameSpeedRef.current = Math.max(1.5, gameSpeedRef.current * 0.7);
          
          setTimeout(() => {
            setShowHitEffect(false);
            setScreenShake(false);
          }, 300);

          setCombo(0);
          setIsInvincible(true);
          setTimeout(() => setIsInvincible(false), 1000);

          setLives((l) => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setPhase('failed');
              sounds.playGameOver();
            }
            return newLives;
          });
          
        } else if (hitObstacle.type === 'construction') {
          // Construction: strong slow down, moderate damage
          sounds.playHit();
          vibrate([150, 50, 150, 50, 150]);
          setShowHitEffect(true);
          setScreenShake(true);
          addFloatingText(x, y, '施工區! -1 ❤️', '#f97316');
          gameSpeedRef.current = Math.max(1, gameSpeedRef.current * 0.5);
          
          setTimeout(() => {
            setShowHitEffect(false);
            setScreenShake(false);
          }, 500);

          setCombo(0);
          setIsInvincible(true);
          setTimeout(() => setIsInvincible(false), 1200);

          setLives((l) => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setPhase('failed');
              sounds.playGameOver();
            }
            return newLives;
          });
          
        } else if (hitObstacle.type === 'bomb') {
          // Bomb: heavy damage (-2 lives), big explosion effect
          sounds.playHit();
          vibrate([300, 100, 300, 100, 300]);
          setShowHitEffect(true);
          setScreenShake(true);
          addFloatingText(x, y, '💥 爆炸! -2 ❤️', '#dc2626');
          
          setTimeout(() => {
            setShowHitEffect(false);
            setScreenShake(false);
          }, 600);

          setCombo(0);
          setIsInvincible(true);
          setTimeout(() => setIsInvincible(false), 2000);

          setLives((l) => {
            const newLives = l - 2;
            if (newLives <= 0) {
              setPhase('failed');
              sounds.playGameOver();
            }
            return Math.max(0, newLives);
          });
          
        } else if (hitObstacle.type === 'traffic_light') {
          // Traffic light: forced stop (big speed reduction)
          sounds.playHit();
          vibrate([200, 100, 200]);
          setShowHitEffect(true);
          setScreenShake(true);
          addFloatingText(x, y, '🚦 闖紅燈!', '#ef4444');
          gameSpeedRef.current = Math.max(0.5, gameSpeedRef.current * 0.3);
          
          setTimeout(() => {
            setShowHitEffect(false);
            setScreenShake(false);
          }, 800);

          setCombo(0);
          setIsInvincible(true);
          setTimeout(() => setIsInvincible(false), 1500);
          
        } else if (hitObstacle.type === 'speed_limit') {
          // Speed limit: temporary speed reduction (no damage)
          sounds.playHit();
          vibrate([50, 50, 50]);
          setScreenShake(true);
          addFloatingText(x, y, '🚫 限速區!', '#f59e0b');
          gameSpeedRef.current = Math.max(1, gameSpeedRef.current * 0.6);
          
          setTimeout(() => {
            setScreenShake(false);
          }, 300);
          
        } else {
          // Car: full damage
          sounds.playHit();
          vibrate([200, 100, 200]);
          setShowHitEffect(true);
          setScreenShake(true);
          addFloatingText(x, y, '撞車! -1 ❤️', '#ef4444');

          setTimeout(() => {
            setShowHitEffect(false);
            setScreenShake(false);
          }, 400);

          setCombo(0);
          setIsInvincible(true);
          setTimeout(() => setIsInvincible(false), 1500);

          setLives((l) => {
            const newLives = l - 1;
            if (newLives <= 0) {
              setPhase('failed');
              sounds.playGameOver();
            }
            return newLives;
          });
        }
      }
    } else if (hasShield) {
      // Shield active - destroy obstacle without taking damage
      const hitObstacle = obstacles.find(
        (o) => o.lane === playerLane && o.y > PLAYER_Y_MIN && o.y < PLAYER_Y_MAX
      );
      if (hitObstacle) {
        setObstacles((prev) => prev.filter((o) => o.id !== hitObstacle.id));
        const x = lanePositions[hitObstacle.lane];
        const y = hitObstacle.y;
        addFloatingText(x, y, '🛡️ 防護!', '#38bdf8');
        vibrate(30);
      }
    }

    // Collectibles with visual feedback
    const hitCollectible = collectibles.find(
      (c) => !c.collected && c.lane === playerLane && c.y > PLAYER_Y_MIN && c.y < PLAYER_Y_MAX
    );

    if (hitCollectible) {
      setCollectibles((prev) =>
        prev.map((c) => (c.id === hitCollectible.id ? { ...c, collected: true } : c))
      );

      const x = lanePositions[hitCollectible.lane];
      const y = hitCollectible.y;

      // Add collect effect
      addCollectEffect(x, y, hitCollectible.type);
      sounds.playCollect();

      if (hitCollectible.type === 'coin') {
        vibrate(20);
        const points = Math.floor(10 * scoreMultiplier * (1 + combo * 0.1));
        setScore((s) => s + points);
        setCombo((prev) => prev + 1);
        addFloatingText(x, y - 5, `+${points}`, '#fbbf24');
      } else if (hitCollectible.type === 'star') {
        vibrate([30, 20, 30, 20, 30]);
        const points = Math.floor(50 * scoreMultiplier);
        setScore((s) => s + points);
        setCombo((prev) => prev + 3);
        sounds.playCombo(Math.max(1, combo));
        addFloatingText(x, y - 5, `+${points} ⭐`, '#a855f7');
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 150);
      } else if (hitCollectible.type === 'heart') {
        vibrate([40, 30, 40]);
        setLives((l) => Math.min(difficulty === 'easy' ? 5 : 3, l + 1));
        addFloatingText(x, y - 5, '+1 ❤️', '#ef4444');
      } else if (hitCollectible.type === 'diamond') {
        // Diamond: Shield power-up (5 seconds of invincibility)
        vibrate([50, 30, 50, 30, 50]);
        sounds.playCombo(2);
        addFloatingText(x, y - 5, '🛡️ 護盾啟動!', '#38bdf8');
        setHasShield(true);
        if (shieldTimerRef.current) clearTimeout(shieldTimerRef.current);
        shieldTimerRef.current = setTimeout(() => {
          setHasShield(false);
        }, 5000);
      } else if (hitCollectible.type === 'pizza') {
        // Pizza: Speed boost (temporary speed increase + bonus points)
        vibrate([40, 20, 40, 20, 40]);
        sounds.playCombo(1);
        addFloatingText(x, y - 5, '🚀 加速!', '#22c55e');
        gameSpeedRef.current = Math.min(6, gameSpeedRef.current * 1.5);
        setSpeedBoost(true);
        if (boostTimerRef.current) clearTimeout(boostTimerRef.current);
        boostTimerRef.current = setTimeout(() => {
          setSpeedBoost(false);
        }, 4000);
        setScore((s) => s + 25);
      } else if (hitCollectible.type === 'crown') {
        // Crown: Double score multiplier (8 seconds)
        vibrate([60, 40, 60, 40, 60]);
        sounds.playCombo(3);
        addFloatingText(x, y - 5, '👑 雙倍得分!', '#eab308');
        setScoreMultiplier(2);
        if (multiplierTimerRef.current) clearTimeout(multiplierTimerRef.current);
        multiplierTimerRef.current = setTimeout(() => {
          setScoreMultiplier(1);
        }, 8000);
      }
    }
  }, [phase, obstacles, collectibles, playerLane, isInvincible, hasShield, combo, difficulty, sounds, lanePositions, scoreMultiplier, vibrate, addFloatingText, addCollectEffect]);

  // Submit score
  useEffect(() => {
    if (phase === 'success' || phase === 'failed') {
      const finalScore = Math.floor(score + distance);
      submitScore(finalScore, vehicle);
    }
  }, [phase, score, distance, vehicle, submitScore]);

  const handleTouchLane = (lane: number) => {
    if (phase !== 'playing') return;
    setPlayerLane(lane);
    sounds.playClick();
  };

  // Swipe gesture handling
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const swipeThreshold = 30; // minimum px to trigger swipe
  const swipeTimeLimit = 300; // max ms for swipe gesture

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (phase !== 'playing') return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  }, [phase]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (phase !== 'playing' || !touchStartRef.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    
    // Check if it's a valid horizontal swipe
    if (deltaTime < swipeTimeLimit && Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // Swipe right
        setPlayerLane(l => Math.min(4, l + 1));
        sounds.playClick();
      } else {
        // Swipe left
        setPlayerLane(l => Math.max(0, l - 1));
        sounds.playClick();
      }
    }
    
    touchStartRef.current = null;
  }, [phase, sounds]);

  const getObstacleImage = (type: ObstacleType) => {
    switch (type) {
      case 'car': return taxiImg;
      case 'cone': return coneImg;
      case 'oil': return oilImg;
      case 'rock': return rockImg;
      case 'puddle': return oilImg;
      case 'construction': return bridgeImg;
      case 'bomb': return bombImg;
      case 'cactus': return cactusImg;
      case 'traffic_light': return trafficLightImg;
      case 'speed_limit': return speedLimitImg;
      default: return coneImg;
    }
  };
  
  // Responsive size helper - dynamic based on device and orientation
  const getScale = () => {
    if (!isMobile) return 1;
    if (isLandscape) return 0.55;
    return 0.65;
  };
  
  const getObstacleSize = (type: ObstacleType) => {
    const scale = getScale();
    switch (type) {
      case 'car': return { width: 100 * scale, height: 100 * scale };
      case 'construction': return { width: 90 * scale, height: 90 * scale };
      case 'rock': return { width: 80 * scale, height: 80 * scale };
      case 'bomb': return { width: 70 * scale, height: 70 * scale };
      case 'cactus': return { width: 75 * scale, height: 75 * scale };
      case 'traffic_light': return { width: 65 * scale, height: 95 * scale };
      case 'speed_limit': return { width: 70 * scale, height: 70 * scale };
      default: return { width: 85 * scale, height: 85 * scale };
    }
  };

  const getCollectibleSize = (type: CollectibleType) => {
    const scale = getScale();
    switch (type) {
      case 'star': return { width: 90 * scale, height: 90 * scale };
      case 'diamond': return { width: 85 * scale, height: 85 * scale };
      case 'crown': return { width: 85 * scale, height: 85 * scale };
      case 'pizza': return { width: 80 * scale, height: 80 * scale };
      default: return { width: 80 * scale, height: 80 * scale };
    }
  };
  
  const getPlayerVehicleSize = () => {
    if (!isMobile) return 110;
    return isLandscape ? 55 : 70;
  };

  const getCollectibleImage = (type: CollectibleType) => {
    switch (type) {
      case 'coin': return coinImg;
      case 'star': return starImg;
      case 'heart': return heartImg;
      case 'diamond': return diamondImg;
      case 'pizza': return pizzaImg;
      case 'crown': return crownImg;
      default: return coinImg;
    }
  };

  const renderMenu = () => (
    <div className={`flex items-center justify-center h-full bg-gradient-to-b from-sky-400 to-green-400 overflow-y-auto safe-area-inset ${
      isLandscape && isMobile ? 'flex-row gap-6 px-6' : 'flex-col gap-3 p-4'
    }`}>
      <h2 className={`font-bold text-white drop-shadow-lg ${
        isLandscape && isMobile ? 'text-2xl absolute top-2 left-1/2 -translate-x-1/2' : 'text-2xl sm:text-3xl md:text-4xl'
      }`}>
        🚗 模擬駕駛 🏁
      </h2>

      <div className={`bg-white/95 rounded-2xl shadow-xl ${
        isLandscape && isMobile ? 'p-3 max-w-[45%] mt-8' : 'p-3 sm:p-4 max-w-sm w-full'
      }`}>
        <p className={`font-bold text-center text-primary ${isLandscape && isMobile ? 'text-sm mb-2' : 'text-base sm:text-lg mb-2 sm:mb-3'}`}>
          🎮 遊戲說明
        </p>
        <div className={`grid grid-cols-2 text-xs sm:text-sm ${isLandscape && isMobile ? 'gap-1' : 'gap-2'}`}>
          <div className={`bg-blue-50 rounded-xl text-center ${isLandscape && isMobile ? 'p-1.5' : 'p-2'}`}>
            <div className={isLandscape && isMobile ? 'text-lg mb-0.5' : 'text-xl sm:text-2xl mb-1'}>⬅️ ➡️</div>
            <div className="text-muted-foreground text-xs">左右切換車道</div>
          </div>
          <div className={`bg-yellow-50 rounded-xl text-center ${isLandscape && isMobile ? 'p-1.5' : 'p-2'}`}>
            <div className={isLandscape && isMobile ? 'text-lg mb-0.5' : 'text-xl sm:text-2xl mb-1'}>🪙</div>
            <div className="text-muted-foreground text-xs">收集金幣得分</div>
          </div>
          <div className={`bg-purple-50 rounded-xl text-center ${isLandscape && isMobile ? 'p-1.5' : 'p-2'}`}>
            <div className={isLandscape && isMobile ? 'text-lg mb-0.5' : 'text-xl sm:text-2xl mb-1'}>⭐</div>
            <div className="text-muted-foreground text-xs">星星=大量分數</div>
          </div>
          <div className={`bg-red-50 rounded-xl text-center ${isLandscape && isMobile ? 'p-1.5' : 'p-2'}`}>
            <div className={isLandscape && isMobile ? 'text-lg mb-0.5' : 'text-xl sm:text-2xl mb-1'}>❤️</div>
            <div className="text-muted-foreground text-xs">愛心補血</div>
          </div>
        </div>
        <div className={`bg-orange-100 rounded-xl text-center ${isLandscape && isMobile ? 'mt-1.5 p-1.5' : 'mt-2 sm:mt-3 p-2'}`}>
          <span className="text-orange-700 font-medium text-xs sm:text-sm">⚠️ 小心躲避障礙物！</span>
        </div>
      </div>

      <div className={`flex w-full ${
        isLandscape && isMobile 
          ? 'flex-col gap-2 max-w-[35%] mt-8' 
          : 'flex-col gap-2 sm:gap-3 max-w-xs'
      }`}>
        <Button
          onClick={() => startGame('easy')}
          className={`btn-bounce bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg ${
            isLandscape && isMobile ? 'text-base py-4' : 'text-lg sm:text-xl py-5 sm:py-6'
          }`}
        >
          😊 簡單模式
        </Button>
        <Button
          onClick={() => startGame('hard')}
          className={`btn-bounce bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white shadow-lg ${
            isLandscape && isMobile ? 'text-base py-4' : 'text-lg sm:text-xl py-5 sm:py-6'
          }`}
        >
          💪 困難模式
        </Button>
      </div>
    </div>
  );

  const renderCountdown = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-sky-400 to-green-400 safe-area-inset">
      <div className={`font-bold text-white drop-shadow-2xl animate-pulse ${
        isLandscape && isMobile ? 'text-6xl' : 'text-7xl sm:text-8xl md:text-9xl'
      }`}>
        {countdown > 0 ? countdown : 'GO!'}
      </div>
      <p className={`text-white/80 mt-3 ${isLandscape && isMobile ? 'text-sm' : 'text-base sm:text-lg'}`}>
        準備開始...
      </p>
    </div>
  );

  const renderGame = () => {
    const goalDistance = difficulty === 'hard' ? 2400 : 1200;
    const displayDistance = Math.min(Math.floor(distance), goalDistance);
    const progress = (displayDistance / goalDistance) * 100;

    // Scene-specific colors and scenery
    const sceneColors: Record<SceneType, { sky: string; road: string; grass: string[]; line: string }> = {
      city: { sky: 'from-sky-400 via-sky-300 to-blue-200', road: '#3a3a3a', grass: ['#4a5568', '#374151'], line: '#facc15' },
      suburb: { sky: 'from-blue-300 via-sky-200 to-green-100', road: '#4a4a4a', grass: ['#84cc16', '#65a30d'], line: '#facc15' },
      beach: { sky: 'from-cyan-400 via-sky-300 to-yellow-100', road: '#c9a869', grass: ['#fbbf24', '#f59e0b'], line: '#ffffff' },
      tunnel: { sky: 'from-gray-800 via-gray-700 to-gray-600', road: '#1a1a1a', grass: ['#374151', '#1f2937'], line: '#f97316' },
      bridge: { sky: 'from-slate-400 via-blue-300 to-cyan-200', road: '#555555', grass: ['#38bdf8', '#0ea5e9'], line: '#ffffff' },
      highway: { sky: 'from-orange-300 via-yellow-200 to-sky-300', road: '#2d2d2d', grass: ['#a3e635', '#84cc16'], line: '#ffffff' }
    };
    const colors = sceneColors[currentScene] || sceneColors.city;

    // Scene indicator text
    const sceneLabels: Record<SceneType, string> = {
      city: '🏙️ 城市',
      suburb: '🏡 郊區',
      beach: '🏖️ 海邊',
      tunnel: '🚇 隧道',
      bridge: '🌉 橋樑',
      highway: '🛣️ 高速公路'
    };

    // Render side scenery based on scene type - using CSS animation for smooth movement
    const renderScenery = (side: 'left' | 'right') => {
      const sideClass = side === 'left' ? 'left-0' : 'right-0';
      
      // Get scenery config based on scene
      const getSceneryContent = () => {
        switch (currentScene) {
          case 'city':
            return (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center mb-16">
                    <div 
                      className="w-[80%] bg-gradient-to-b from-slate-600 to-slate-700 rounded-t-sm"
                      style={{ height: `${40 + (i % 3) * 20}px` }}
                    >
                      <div className="grid grid-cols-2 gap-1 p-1">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="w-2 h-2 bg-yellow-200/80 rounded-sm" />
                        ))}
                      </div>
                    </div>
                    {i % 2 === 0 && (
                      <div className="mt-4 flex flex-col items-center">
                        <div className="w-1 h-8 bg-gray-600" />
                        <div className="w-3 h-2 bg-yellow-400 rounded-full" />
                      </div>
                    )}
                  </div>
                ))}
              </>
            );
          
          case 'suburb':
            return (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center mb-20">
                    {i % 2 === 0 ? (
                      <div className="flex flex-col items-center">
                        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[12px] border-l-transparent border-r-transparent border-b-red-600" />
                        <div className="w-[24px] h-[18px] bg-amber-100 flex items-center justify-center">
                          <div className="w-2 h-3 bg-amber-800" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-green-600 rounded-full" />
                        <div className="w-2 h-4 bg-amber-800" />
                      </div>
                    )}
                  </div>
                ))}
              </>
            );

          case 'beach':
            return (
              <>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center mb-20">
                    <div className="text-2xl">{i % 2 === 0 ? '🌴' : '🌊'}</div>
                  </div>
                ))}
              </>
            );

          case 'tunnel':
            return (
              <>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full mb-12">
                    <div className="w-full h-4 bg-gray-700 border-y border-gray-600" />
                    <div className="mt-2 mx-auto w-3 h-3 bg-orange-400 rounded-full shadow-lg shadow-orange-400/50" />
                  </div>
                ))}
              </>
            );

          case 'bridge':
            return (
              <>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full flex flex-col items-center mb-14">
                    <div className="w-full h-1 bg-red-600" />
                    <div className="w-1 h-12 bg-gray-500" />
                  </div>
                ))}
              </>
            );

          case 'highway':
            return (
              <>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center mb-16">
                    <div className="w-2 h-6 bg-gray-600" />
                    <div className="w-3 h-2 bg-orange-500 rounded-sm mt-1" />
                    {i % 2 === 0 && (
                      <div className="mt-3 w-6 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                        <span className="text-[6px] text-white font-bold">→</span>
                      </div>
                    )}
                  </div>
                ))}
              </>
            );

          default:
            return null;
        }
      };

      // Background colors for scenery area
      const bgColors: Record<SceneType, string> = {
        city: 'bg-gray-500',
        suburb: 'bg-green-500',
        beach: 'bg-amber-400',
        tunnel: 'bg-gray-800',
        bridge: 'bg-cyan-400',
        highway: 'bg-gray-400'
      };

      return (
        <div className={`absolute ${sideClass} top-0 bottom-0 w-[10%] overflow-hidden pointer-events-none ${bgColors[currentScene] || bgColors.city}`}>
          {/* Animated scenery container - seamless loop with duplicated content */}
          <div 
            className="absolute w-full top-0 animate-scenery-scroll"
          >
            {/* First set of scenery */}
            <div className="flex flex-col">
              {getSceneryContent()}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex flex-col">
              {getSceneryContent()}
            </div>
          </div>
        </div>
      );
    };

    // Weather labels
    const weatherLabels: Record<WeatherType, string> = {
      clear: '☀️',
      rain: '🌧️',
      snow: '❄️',
      fog: '🌫️'
    };

    // Render weather effects
    const renderWeatherEffects = () => {
      switch (currentWeather) {
        case 'rain':
          return (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              {/* Rain overlay */}
              <div className="absolute inset-0 bg-blue-900/10" />
              {/* Rain drops */}
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-300/60 to-blue-400/80 rounded-full"
                  style={{
                    left: `${(i * 2.1) % 100}%`,
                    height: `${15 + (i % 10)}px`,
                    top: `${((roadOffset * 3 + i * 37) % 120) - 20}%`,
                    transform: 'rotate(-15deg)',
                  }}
                />
              ))}
              {/* Wet road shine effect */}
              <div className="absolute left-[10%] right-[10%] bottom-0 h-[30%] bg-gradient-to-t from-blue-400/10 to-transparent" />
            </div>
          );
        
        case 'snow':
          return (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              {/* Snow overlay */}
              <div className="absolute inset-0 bg-white/5" />
              {/* Snowflakes */}
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${(i * 2.6 + Math.sin(roadOffset * 0.02 + i) * 5) % 100}%`,
                    width: `${3 + (i % 4)}px`,
                    height: `${3 + (i % 4)}px`,
                    top: `${((roadOffset * 1.5 + i * 29) % 120) - 20}%`,
                    opacity: 0.6 + (i % 4) * 0.1,
                  }}
                />
              ))}
              {/* Snow accumulation on sides */}
              <div className="absolute left-0 w-[10%] bottom-0 h-[20%] bg-gradient-to-t from-white/30 to-transparent" />
              <div className="absolute right-0 w-[10%] bottom-0 h-[20%] bg-gradient-to-t from-white/30 to-transparent" />
            </div>
          );
        
        case 'fog':
          return (
            <div className="absolute inset-0 pointer-events-none z-30">
              {/* Fog layers */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-300/40 via-gray-400/30 to-gray-500/50" />
              {/* Moving fog banks */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    top: `${((i * 25 + roadOffset * 0.3) % 120) - 10}%`,
                    opacity: 0.3 + (i % 2) * 0.2,
                    transform: `translateX(${Math.sin(roadOffset * 0.01 + i * 2) * 10}%)`,
                  }}
                />
              ))}
              {/* Reduced visibility effect at top */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-gray-400/60 to-transparent" />
            </div>
          );
        
        default:
          return null;
      }
    };

    return (
      <div className={`relative h-full overflow-hidden ${screenShake ? 'screen-shake' : ''} ${showHitEffect ? 'bg-red-500/30' : ''}`}>
        {/* Sky - changes with scene */}
        <div className={`absolute inset-0 bg-gradient-to-b ${colors.sky} transition-all duration-1000`} />
        
        {/* Scene & Weather indicator - native app top bar */}
        <div className="absolute top-11 md:top-12 left-2 z-40 flex gap-1.5">
          <div className="bg-black/60 backdrop-blur-md rounded-full px-2.5 py-1 text-xs md:text-sm text-white shadow-lg">
            {sceneLabels[currentScene]}
          </div>
          {currentWeather !== 'clear' && (
            <div className="bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-xs md:text-sm text-white shadow-lg animate-pulse">
              {weatherLabels[currentWeather]}
            </div>
          )}
        </div>

        {/* Road - 5 lanes, continuous design */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[80%] overflow-hidden transition-colors duration-1000"
          style={{ backgroundColor: colors.road }}
        >
          {/* Center line - seamless dashed */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, ${colors.line} 0px, ${colors.line} 40px, transparent 40px, transparent 80px)`,
              backgroundPosition: `0px ${roadOffset}px`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* 5 Lane dividers (4 divider lines for 5 lanes) */}
          {[20, 40, 60, 80].map((pos, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-1"
              style={{
                left: `${pos}%`,
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 25px, transparent 25px, transparent 50px)',
                backgroundPosition: `0px ${roadOffset}px`,
                backgroundRepeat: 'repeat',
              }}
            />
          ))}

          {/* Road edges - solid white lines */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-white" />
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-white" />
          
          {/* Tunnel ceiling effect */}
          {currentScene === 'tunnel' && (
            <>
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-12">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </>
          )}

          {/* Bridge effect - suspension cables at top */}
          {currentScene === 'bridge' && (
            <div className="absolute top-0 left-0 right-0 h-6 flex justify-around items-end">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-0.5 h-full bg-gray-500" style={{ height: `${12 + Math.abs(i - 3.5) * 3}px` }} />
              ))}
            </div>
          )}
        </div>

        {/* Side scenery - left and right */}
        {renderScenery('left')}
        {renderScenery('right')}

        {/* Weather effects overlay */}
        {renderWeatherEffects()}

        {/* Obstacles - with ChromaImage for background removal */}
        {obstacles.map(o => {
          const size = getObstacleSize(o.type);
          return (
            <div
              key={o.id}
              className={`absolute transition-none ${o.type === 'oil' || o.type === 'puddle' ? 'opacity-80' : ''}`}
              style={{
                left: `${lanePositions[o.lane]}%`,
                top: `${o.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <ChromaImage 
                src={getObstacleImage(o.type)} 
                alt={o.type}
                threshold={60}
                className="object-contain drop-shadow-lg"
                style={{
                  width: `${size.width}px`,
                  height: `${size.height}px`,
                  filter: o.type === 'puddle' ? 'hue-rotate(180deg) brightness(1.2)' : undefined
                }}
              />
            </div>
          );
        })}

        {/* Collectibles - with ChromaImage for background removal */}
        {collectibles.filter(c => !c.collected).map(c => {
          const size = getCollectibleSize(c.type);
          return (
            <div
              key={c.id}
              className="absolute transition-none animate-pulse"
              style={{
                left: `${lanePositions[c.lane]}%`,
                top: `${c.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <ChromaImage 
                src={getCollectibleImage(c.type)} 
                alt={c.type}
                threshold={60}
                className="object-contain drop-shadow-lg"
                style={{
                  width: `${size.width}px`,
                  height: `${size.height}px`,
                  filter: c.type === 'star' 
                    ? 'drop-shadow(0 0 12px #fbbf24)' 
                    : c.type === 'heart' 
                      ? 'drop-shadow(0 0 10px #ef4444)' 
                      : c.type === 'diamond'
                        ? 'drop-shadow(0 0 12px #38bdf8)'
                        : c.type === 'crown'
                          ? 'drop-shadow(0 0 12px #eab308)'
                          : c.type === 'pizza'
                            ? 'drop-shadow(0 0 10px #22c55e)'
                            : 'drop-shadow(0 0 8px #fbbf24)'
                }}
              />
            </div>
          );
        })}

        {/* Floating texts */}
        {floatingTexts.map(ft => (
          <div
            key={ft.id}
            className="absolute pointer-events-none z-30 animate-fade-in"
            style={{
              left: `${ft.x}%`,
              top: `${ft.y}%`,
              transform: 'translate(-50%, -50%)',
              animation: 'floatUp 1s ease-out forwards'
            }}
          >
            <span 
              className="text-lg md:text-xl font-bold drop-shadow-lg"
              style={{ color: ft.color, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            >
              {ft.text}
            </span>
          </div>
        ))}

        {/* Collect effects (sparkles) */}
        {collectEffects.map(ce => (
          <div
            key={ce.id}
            className="absolute pointer-events-none z-25"
            style={{
              left: `${ce.x}%`,
              top: `${ce.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ce.type === 'coin' ? '#fbbf24' : ce.type === 'star' ? '#a855f7' : ce.type === 'heart' ? '#ef4444' : ce.type === 'diamond' ? '#38bdf8' : ce.type === 'crown' ? '#eab308' : '#22c55e',
                    animation: `sparkle-out 0.5s ease-out forwards`,
                    animationDelay: `${i * 0.05}s`,
                    transform: `rotate(${i * 60}deg) translateY(-20px)`
                  }}
                />
              ))}
              <div 
                className="absolute w-8 h-8 rounded-full opacity-50"
                style={{
                  backgroundColor: ce.type === 'coin' ? '#fbbf24' : ce.type === 'star' ? '#a855f7' : ce.type === 'heart' ? '#ef4444' : ce.type === 'diamond' ? '#38bdf8' : ce.type === 'crown' ? '#eab308' : '#22c55e',
                  animation: 'pulse-out 0.5s ease-out forwards',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>
        ))}

        {/* Player vehicle (responsive size) */}
        <div
          className={`absolute transition-all duration-150 ${isInvincible ? 'animate-pulse opacity-70' : ''} ${isSlipping ? 'animate-wiggle' : ''}`}
          style={{
            left: `${lanePositions[playerLane]}%`,
            bottom: '12%',
            transform: `translate(-50%, 0) ${isSlipping ? 'rotate(5deg)' : ''}`
          }}
        >
          {/* Shield effect */}
          {hasShield && (
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(56, 189, 248, 0.1) 60%, transparent 100%)',
                transform: 'scale(1.8)',
                zIndex: -1
              }}
            />
          )}
          <img
            src={vehicleSprite}
            alt={selectedVehicle.name}
            className="object-contain drop-shadow-xl"
            style={{
              width: `${getPlayerVehicleSize()}px`,
              height: `${getPlayerVehicleSize()}px`,
              filter: isSlipping ? 'brightness(1.2)' : hasShield ? 'drop-shadow(0 0 8px #38bdf8)' : undefined
            }}
          />
          {/* Slip effect visual */}
          {isSlipping && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm md:text-lg">
              💨
            </div>
          )}
          {/* Speed boost effect */}
          {speedBoost && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-sm md:text-lg animate-bounce">
              🔥
            </div>
          )}
        </div>

        {/* HUD - Top (native app style, responsive for all modes) */}
        <div className={`absolute z-40 ${
          isLandscape && isMobile 
            ? 'top-1 left-12 right-12 flex justify-between items-start gap-1' 
            : 'top-2 md:top-3 left-2 md:left-3 right-12 md:right-14 flex justify-between items-start gap-2'
        }`}>
          {/* Lives - pill style */}
          <div className={`bg-black/70 backdrop-blur-md rounded-full shadow-lg ${
            isLandscape && isMobile ? 'px-2 py-1' : 'px-3 py-1.5'
          }`}>
            <div className="flex gap-0.5">
              {[...Array(difficulty === 'easy' ? 5 : 3)].map((_, i) => (
                <span key={i} className={`${isLandscape && isMobile ? 'text-sm' : 'text-base md:text-xl'} ${i < lives ? '' : 'opacity-30 grayscale'}`}>❤️</span>
              ))}
            </div>
          </div>

          {/* Score - pill style */}
          <div className={`bg-black/70 backdrop-blur-md rounded-full shadow-lg ${
            isLandscape && isMobile ? 'px-2 py-1' : 'px-3 py-1.5'
          }`}>
            <span className={`font-bold text-yellow-400 ${isLandscape && isMobile ? 'text-sm' : 'text-base md:text-xl'}`}>
              ⭐ {Math.floor(score)}
            </span>
          </div>

          {/* Speedometer - pill style */}
          <div className={`bg-black/70 backdrop-blur-md rounded-full shadow-lg ${
            isLandscape && isMobile ? 'px-2 py-1' : 'px-3 py-1.5'
          }`}>
            <div className="flex items-center gap-0.5">
              <span className={isLandscape && isMobile ? 'text-sm' : 'text-base md:text-xl'}>🏎️</span>
              <span className={`font-bold text-cyan-400 ${isLandscape && isMobile ? 'text-sm' : 'text-base md:text-xl'}`}>{displaySpeed}</span>
              <span className={`text-cyan-300 ${isLandscape && isMobile ? 'text-[10px]' : 'text-xs md:text-sm'}`}>km/h</span>
            </div>
          </div>
          
          {/* Power-up indicators */}
          <div className={`flex gap-1 ${isLandscape && isMobile ? 'flex-row' : 'flex-row'}`}>
            {hasShield && (
              <div className={`bg-cyan-500/80 backdrop-blur-md rounded-full shadow-lg animate-pulse ${
                isLandscape && isMobile ? 'px-2 py-1' : 'px-2 py-1.5'
              }`}>
                <span className={isLandscape && isMobile ? 'text-sm' : 'text-base md:text-lg'}>🛡️</span>
              </div>
            )}
            {speedBoost && (
              <div className={`bg-green-500/80 backdrop-blur-md rounded-full shadow-lg animate-pulse ${
                isLandscape && isMobile ? 'px-2 py-1' : 'px-2 py-1.5'
              }`}>
                <span className={isLandscape && isMobile ? 'text-sm' : 'text-base md:text-lg'}>🚀</span>
              </div>
            )}
            {scoreMultiplier > 1 && (
              <div className={`bg-yellow-500/80 backdrop-blur-md rounded-full shadow-lg animate-pulse ${
                isLandscape && isMobile ? 'px-2 py-1' : 'px-2 py-1.5'
              }`}>
                <span className={isLandscape && isMobile ? 'text-sm' : 'text-base md:text-lg'}>👑x{scoreMultiplier}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Progress bar - responsive positioning */}
        <div className={`absolute z-40 ${
          isLandscape && isMobile 
            ? 'bottom-1 left-1/2 -translate-x-1/2 w-40' 
            : 'bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-auto md:top-3 md:bottom-auto md:w-48 md:left-1/2 md:-translate-x-1/2'
        }`}>
          <div className={`bg-black/70 backdrop-blur-md rounded-full shadow-lg ${
            isLandscape && isMobile ? 'px-2 py-1' : 'px-3 py-2'
          }`}>
            <div className={`text-white text-center font-medium ${isLandscape && isMobile ? 'text-[10px] mb-0.5' : 'text-xs md:text-sm mb-1'}`}>
              🚗 {displayDistance}m / {goalDistance}m
            </div>
            <div className={`bg-white/30 rounded-full overflow-hidden ${isLandscape && isMobile ? 'h-1.5' : 'h-3 md:h-2'}`}>
              <div 
                className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Combo - floating badge native style */}
        {combo > 2 && (
          <div className={`absolute left-1/2 -translate-x-1/2 z-40 ${
            isLandscape && isMobile ? 'top-8' : 'top-16 md:top-16'
          }`}>
            <div className={`bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce shadow-lg shadow-orange-500/50 ${
              isLandscape && isMobile ? 'px-2 py-0.5' : 'px-4 py-1.5'
            }`}>
              <span className={`font-bold text-white ${isLandscape && isMobile ? 'text-xs' : 'text-sm md:text-lg'}`}>🔥 COMBO x{combo}</span>
            </div>
          </div>
        )}

        {/* Sound toggle - native app position */}
        <SoundToggle
          onToggle={sounds.setMuted}
          className={`absolute z-40 ${
            isLandscape && isMobile 
              ? 'top-1 right-12' 
              : 'top-14 md:top-3 right-2 md:right-16'
          }`}
        />

        {/* Swipe gesture area - only captures touch events, not mouse */}
        <div 
          className="absolute inset-0 z-20 touch-none"
          style={{ pointerEvents: 'none' }}
          onTouchStart={(e) => {
            handleTouchStart(e);
          }}
          onTouchEnd={(e) => {
            handleTouchEnd(e);
          }}
          ref={(el) => {
            if (el) {
              el.style.pointerEvents = 'auto';
              // Only enable touch events, allow mouse to pass through
              el.style.setProperty('pointer-events', 'auto');
              el.addEventListener('touchstart', () => {}, { passive: true });
            }
          }}
        />

        {/* Touch controls - tap zones for direct lane selection (touch devices only) */}
        <div className={`absolute left-0 right-0 flex z-25 ${
          isLandscape && isMobile ? 'bottom-0 h-[60%]' : 'bottom-0 h-[40%]'
        }`} style={{ pointerEvents: 'none' }}>
          {[0, 1, 2, 3, 4].map(lane => (
            <button
              key={lane}
              className={`flex-1 active:bg-white/30 transition-colors ${playerLane === lane ? 'bg-white/15' : ''}`}
              style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
              onTouchStart={(e) => {
                e.stopPropagation();
                handleTouchLane(lane);
              }}
              onClick={(e) => {
                // Also support mouse clicks for PC
                e.stopPropagation();
                handleTouchLane(lane);
              }}
            />
          ))}
        </div>

        {/* Lane indicators - floating buttons for touch devices only (hidden on PC) */}
        {/* In landscape mode, position on sides; in portrait, position at bottom */}
        {isMobile && (
          isLandscape ? (
            // Landscape: side buttons
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-16 rounded-xl bg-black/60 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg border-2 border-white/30 active:scale-95 active:bg-white/40 transition-all z-30"
                style={{ pointerEvents: 'auto' }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setPlayerLane(l => Math.max(0, l - 1));
                  sounds.playClick();
                }}
              >
                ◀️
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-16 rounded-xl bg-black/60 backdrop-blur-sm flex items-center justify-center text-xl shadow-lg border-2 border-white/30 active:scale-95 active:bg-white/40 transition-all z-30"
                style={{ pointerEvents: 'auto' }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setPlayerLane(l => Math.min(4, l + 1));
                  sounds.playClick();
                }}
              >
                ▶️
              </button>
            </>
          ) : (
            // Portrait: bottom buttons
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-30" style={{ pointerEvents: 'none' }}>
              <button
                className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg border-2 border-white/30 active:scale-95 active:bg-white/40 transition-all"
                style={{ pointerEvents: 'auto' }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setPlayerLane(l => Math.max(0, l - 1));
                  sounds.playClick();
                }}
              >
                ◀️
              </button>
              
              {/* Current lane indicator */}
              <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center text-lg font-bold shadow-lg">
                {playerLane + 1}
              </div>
              
              <button
                className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg border-2 border-white/30 active:scale-95 active:bg-white/40 transition-all"
                style={{ pointerEvents: 'auto' }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setPlayerLane(l => Math.min(4, l + 1));
                  sounds.playClick();
                }}
              >
                ▶️
              </button>
            </div>
          )
        )}

        {/* Pause button */}
        <button
          onClick={togglePause}
          className={`absolute z-40 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30 active:scale-95 active:bg-white/40 transition-all ${
            isLandscape && isMobile 
              ? 'top-1 left-12 w-8 h-8 text-base' 
              : 'top-14 md:top-3 left-2 w-10 h-10 text-xl'
          }`}
        >
          ⏸️
        </button>
      </div>
    );
  };

  const renderResult = (isSuccess: boolean) => {
    const finalScore = Math.floor(score + distance);
    const goalDistance = difficulty === 'hard' ? 2400 : 1200;
    
    return (
      <div className={`flex items-center justify-center h-full overflow-y-auto safe-area-inset ${
        isSuccess 
          ? 'bg-gradient-to-b from-yellow-400 via-orange-400 to-pink-500' 
          : 'bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900'
      } ${isLandscape && isMobile ? 'flex-row gap-4 px-4' : 'flex-col gap-3 p-4'}`}>
        
        {/* Left side in landscape / Top in portrait */}
        <div className={`flex flex-col items-center ${isLandscape && isMobile ? 'gap-1' : 'gap-2'}`}>
          <div className={`animate-bounce ${isLandscape && isMobile ? 'text-4xl' : 'text-5xl sm:text-6xl'}`}>
            {isSuccess ? '🏆' : '💥'}
          </div>
          
          <h2 className={`font-bold text-white drop-shadow-lg ${
            isLandscape && isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'
          }`}>
            {isSuccess ? '恭喜通關！' : '遊戲結束'}
          </h2>

          <div className={`bg-white/20 backdrop-blur rounded-2xl text-center w-full ${
            isLandscape && isMobile ? 'p-2 max-w-[200px] text-xs' : 'p-3 sm:p-4 max-w-xs text-sm'
          }`}>
            <div className="flex justify-between text-white/90 mb-1">
              <span>行駛距離</span>
              <span className="font-bold">{Math.floor(distance)} / {goalDistance} 米</span>
            </div>
            <div className="flex justify-between text-white/90 mb-1">
              <span>收集分數</span>
              <span className="font-bold">{Math.floor(score)}</span>
            </div>
            <div className="border-t border-white/30 pt-1 mt-1">
              <p className={`text-yellow-300 font-bold ${isLandscape && isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>⭐ {finalScore} 分</p>
            </div>
          </div>

          {isNewHighScore && (
            <div className={`bg-yellow-400 rounded-xl animate-pulse shadow-lg ${
              isLandscape && isMobile ? 'px-2 py-1' : 'px-4 py-2'
            }`}>
              <span className={`font-bold ${isLandscape && isMobile ? 'text-sm' : 'text-lg sm:text-xl'}`}>🎉 新紀錄！第 {rank} 名！</span>
            </div>
          )}
        </div>

        {/* Right side in landscape / Bottom in portrait */}
        <div className={`flex flex-col items-center ${isLandscape && isMobile ? 'gap-2' : 'gap-3'}`}>
          {!isLandscape && (
            <Leaderboard
              entries={leaderboard}
              currentScore={isNewHighScore ? finalScore : undefined}
              isNewHighScore={isNewHighScore}
              rank={rank}
            />
          )}

          <div className={`flex w-full ${isLandscape && isMobile ? 'flex-col gap-2 max-w-[180px]' : 'flex-col gap-2 sm:gap-3 max-w-xs'}`}>
            <Button
              onClick={() => startGame(difficulty)}
              className={`btn-bounce bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg ${
                isLandscape && isMobile ? 'text-sm py-3' : 'text-lg sm:text-xl py-5 sm:py-6'
              }`}
            >
              🔄 再玩一次
            </Button>
            <Button
              onClick={() => setPhase('menu')}
              variant="outline"
              className={`bg-white/20 border-white/40 text-white hover:bg-white/30 ${
                isLandscape && isMobile ? 'text-sm py-2' : 'text-base sm:text-lg py-3 sm:py-4'
              }`}
            >
              📋 返回選單
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderPaused = () => (
    <div className={`absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center ${
      isLandscape && isMobile ? 'flex-row gap-6' : 'flex-col gap-4'
    }`}>
      <div className={`flex flex-col items-center ${isLandscape && isMobile ? 'gap-1' : 'gap-2'}`}>
        <div className={`animate-pulse ${isLandscape && isMobile ? 'text-4xl' : 'text-5xl sm:text-6xl md:text-7xl'}`}>⏸️</div>
        <h2 className={`font-bold text-white drop-shadow-lg ${
          isLandscape && isMobile ? 'text-xl' : 'text-2xl sm:text-3xl md:text-4xl'
        }`}>遊戲暫停</h2>
        <p className={`text-white/70 ${isLandscape && isMobile ? 'text-xs' : 'text-sm md:text-base'}`}>
          {isMobile ? '點擊繼續' : '按 空白鍵 / P / ESC 繼續'}
        </p>
      </div>
      <div className={`flex ${isLandscape && isMobile ? 'flex-col gap-2' : 'flex-col gap-3 mt-2'}`}>
        <Button
          onClick={togglePause}
          className={`btn-bounce bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg ${
            isLandscape && isMobile ? 'text-base py-4 px-6' : 'text-lg sm:text-xl py-5 sm:py-6 px-8'
          }`}
        >
          ▶️ 繼續遊戲
        </Button>
        <Button
          onClick={() => setPhase('menu')}
          variant="outline"
          className={`bg-white/20 border-white/40 text-white hover:bg-white/30 ${
            isLandscape && isMobile ? 'text-sm py-3' : 'text-base sm:text-lg py-3 sm:py-4'
          }`}
        >
          📋 返回選單
        </Button>
      </div>
    </div>
  );

  const renderPhase = () => {
    switch (phase) {
      case 'menu': return renderMenu();
      case 'countdown': return renderCountdown();
      case 'playing': return renderGame();
      case 'paused': return (
        <>
          {renderGame()}
          {renderPaused()}
        </>
      );
      case 'success': return renderResult(true);
      case 'failed': return renderResult(false);
      default: return null;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative ${
        isFullscreen 
          ? 'fixed inset-0 z-[9999] bg-black' 
          : 'w-full'
      }`}
    >
      <FullscreenButton
        isFullscreen={isFullscreen}
        onToggle={toggleFullscreen}
        className={`absolute z-50 ${
          isFullscreen 
            ? 'top-2 right-2 md:top-4 md:right-4' 
            : 'top-1 right-1 md:top-2 md:right-2'
        }`}
      />
      <div className={`${isFullscreen ? '' : 'card-playful'} overflow-hidden h-full`}>
        <div 
          className={`game-container bg-card relative ${
            isFullscreen 
              ? 'w-full h-full' 
              : 'aspect-[9/16] sm:aspect-[3/4] md:aspect-[4/3]'
          }`}
        >
          {renderPhase()}
        </div>
      </div>
    </div>
  );
};
