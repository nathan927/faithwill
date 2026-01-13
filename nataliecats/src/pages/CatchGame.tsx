import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw, Trophy, Clock, Target, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { MeowProvider } from '@/contexts/MeowContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Import cat images
import persian from '@/assets/cats/persian.png';
import british from '@/assets/cats/british-shorthair.png';
import siamese from '@/assets/cats/siamese.png';
import maineCoon from '@/assets/cats/maine-coon.png';
import scottishFold from '@/assets/cats/scottish-fold.png';
import ragdoll from '@/assets/cats/ragdoll.png';
import bengal from '@/assets/cats/bengal.png';
import munchkin from '@/assets/cats/munchkin.png';
import russianBlue from '@/assets/cats/russian-blue.png';
import sphynx from '@/assets/cats/sphynx.png';
import abyssinian from '@/assets/cats/abyssinian.png';
import norwegianForest from '@/assets/cats/norwegian-forest.png';

// Import evil dog images
import evilDog1 from '@/assets/dogs/evil-dog-1.png';
import evilDog2 from '@/assets/dogs/evil-dog-2.png';
import evilDog3 from '@/assets/dogs/evil-dog-3.png';

const catImages = [
  persian, british, siamese, maineCoon, scottishFold, ragdoll,
  bengal, munchkin, russianBlue, sphynx, abyssinian, norwegianForest
];

const dogImages = [evilDog1, evilDog2, evilDog3];

interface GameTarget {
  id: number;
  x: number;
  y: number;
  image: string;
  size: number;
  isDog: boolean;
}

const GAME_DURATION = 30; // seconds

const CatchGameContent = () => {
  const { t, language } = useLanguage();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [targets, setTargets] = useState<GameTarget[]>([]);
  const [targetIdCounter, setTargetIdCounter] = useState(0);
  const [showPenalty, setShowPenalty] = useState(false);

  const spawnTarget = useCallback(() => {
    // 25% chance to spawn a dog
    const isDog = Math.random() < 0.25;
    const imagePool = isDog ? dogImages : catImages;
    
    const newTarget: GameTarget = {
      id: targetIdCounter,
      x: Math.random() * 70 + 10, // 10-80% from left
      y: Math.random() * 60 + 15, // 15-75% from top
      image: imagePool[Math.floor(Math.random() * imagePool.length)],
      size: Math.random() * 30 + 50, // 50-80px
      isDog,
    };
    setTargetIdCounter(prev => prev + 1);
    setTargets(prev => [...prev, newTarget]);

    // Remove target after 1.5-2.5 seconds if not clicked
    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== newTarget.id));
    }, 1500 + Math.random() * 1000);
  }, [targetIdCounter]);

  const handleTargetClick = (target: GameTarget) => {
    setTargets(prev => prev.filter(t => t.id !== target.id));
    
    if (target.isDog) {
      // Clicked a dog - deduct 2 points
      setScore(prev => prev - 2);
      setShowPenalty(true);
      setTimeout(() => setShowPenalty(false), 500);
    } else {
      // Clicked a cat - add 1 point
      setScore(prev => prev + 1);
    }
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setTargets([]);
    setTargetIdCounter(0);
  };

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameover');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Spawn targets
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      spawnTarget();
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [gameState, spawnTarget]);

  const gameDescription = language === 'zh' 
    ? '點擊貓咪得分！小心惡狗會扣2分！' 
    : 'Click cats to score! Avoid evil dogs (-2 points)!';

  const penaltyText = language === 'zh' ? '-2 分!' : '-2 pts!';

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToMenu}
            </Button>
          </Link>

          {/* Game Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              🐱 <span className="text-gradient-kawaii">{t.catchGameTitle}</span> 🐶
            </h1>
            <p className="text-muted-foreground">{gameDescription}</p>
          </motion.div>

          {/* Game Stats */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg">{timeLeft}{t.seconds}</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              showPenalty ? 'bg-red-500/30' : 'bg-secondary/20'
            }`}>
              <Target className={`w-5 h-5 ${showPenalty ? 'text-red-500' : 'text-secondary'}`} />
              <span className={`font-bold text-lg ${showPenalty ? 'text-red-500' : ''}`}>{score}</span>
            </div>
          </div>

          {/* Penalty Indicator */}
          <AnimatePresence>
            {showPenalty && (
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-2xl flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  {penaltyText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game Area */}
          <div className="relative mx-auto max-w-4xl h-[400px] md:h-[500px] rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 overflow-hidden">
            {/* Menu State */}
            {gameState === 'menu' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex gap-4 mb-6">
                  <motion.div
                    className="text-5xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🐱
                  </motion.div>
                  <motion.div
                    className="text-5xl"
                    animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    🐶
                  </motion.div>
                </div>
                <p className="text-lg text-muted-foreground mb-2">{t.clickCatsToScore}</p>
                <p className="text-sm text-red-500 mb-6 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {language === 'zh' ? '小心惡狗！點擊會扣2分！' : 'Watch out for evil dogs! -2 points!'}
                </p>
                <Button variant="kawaii" size="lg" onClick={startGame}>
                  <Play className="w-5 h-5 mr-2" />
                  {t.start}
                </Button>
              </motion.div>
            )}

            {/* Playing State */}
            {gameState === 'playing' && (
              <AnimatePresence>
                {targets.map(target => (
                  <motion.div
                    key={target.id}
                    className={`absolute cursor-pointer ${target.isDog ? 'z-20' : 'z-10'}`}
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      width: target.size,
                      height: target.size,
                    }}
                    initial={{ scale: 0, opacity: 0, rotate: target.isDog ? -10 : 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      rotate: target.isDog ? [0, -5, 5, 0] : 0 
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.15 }}
                    transition={target.isDog ? { rotate: { duration: 0.5, repeat: Infinity } } : undefined}
                    onClick={() => handleTargetClick(target)}
                  >
                    <img
                      src={target.image}
                      alt={target.isDog ? "Evil Dog" : "Cat"}
                      className={`w-full h-full object-contain drop-shadow-lg ${
                        target.isDog ? 'filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : ''
                      }`}
                      draggable={false}
                    />
                    {target.isDog && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <span className="text-white text-xs font-bold">!</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}

            {/* Game Over State */}
            {gameState === 'gameover' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">{t.gameOver}</h2>
                <p className="text-lg text-muted-foreground mb-2">{t.finalScore}</p>
                <p className={`text-4xl font-bold mb-6 ${score < 0 ? 'text-red-500' : 'text-gradient-kawaii'}`}>
                  {score}
                </p>
                <div className="flex gap-4">
                  <Button variant="kawaii" onClick={startGame}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t.playAgain}
                  </Button>
                  <Link to="/">
                    <Button variant="kawaiiOutline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t.backToMenu}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Game Legend */}
          <div className="flex justify-center gap-8 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐱</span>
              <span>+1 {language === 'zh' ? '分' : 'pt'}</span>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <span className="text-xl">🐶</span>
              <span>-2 {language === 'zh' ? '分' : 'pts'}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CatchGame = () => {
  return (
    <LanguageProvider>
      <MeowProvider>
        <CatchGameContent />
      </MeowProvider>
    </LanguageProvider>
  );
};

export default CatchGame;
