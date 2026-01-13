import { useState, useEffect } from 'react';
import { MeowProvider } from '@/contexts/MeowContext';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, RotateCcw, Trophy, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Cat breed data with Chinese and English names
const catBreedsData = {
  zh: [
    { id: 'persian', name: '波斯貓' },
    { id: 'british-shorthair', name: '英國短毛貓' },
    { id: 'siamese', name: '暹羅貓' },
    { id: 'maine-coon', name: '緬因貓' },
    { id: 'scottish-fold', name: '蘇格蘭摺耳貓' },
    { id: 'ragdoll', name: '布偶貓' },
    { id: 'bengal', name: '孟加拉貓' },
    { id: 'munchkin', name: '曼赤肯貓' },
    { id: 'russian-blue', name: '俄羅斯藍貓' },
    { id: 'sphynx', name: '斯芬克斯貓' },
    { id: 'abyssinian', name: '阿比西尼亞貓' },
    { id: 'norwegian-forest', name: '挪威森林貓' },
    { id: 'exotic-shorthair', name: '異國短毛貓' },
    { id: 'birman', name: '伯曼貓' },
    { id: 'american-shorthair', name: '美國短毛貓' },
    { id: 'bombay', name: '孟買貓' },
  ],
  en: [
    { id: 'persian', name: 'Persian' },
    { id: 'british-shorthair', name: 'British Shorthair' },
    { id: 'siamese', name: 'Siamese' },
    { id: 'maine-coon', name: 'Maine Coon' },
    { id: 'scottish-fold', name: 'Scottish Fold' },
    { id: 'ragdoll', name: 'Ragdoll' },
    { id: 'bengal', name: 'Bengal' },
    { id: 'munchkin', name: 'Munchkin' },
    { id: 'russian-blue', name: 'Russian Blue' },
    { id: 'sphynx', name: 'Sphynx' },
    { id: 'abyssinian', name: 'Abyssinian' },
    { id: 'norwegian-forest', name: 'Norwegian Forest' },
    { id: 'exotic-shorthair', name: 'Exotic Shorthair' },
    { id: 'birman', name: 'Birman' },
    { id: 'american-shorthair', name: 'American Shorthair' },
    { id: 'bombay', name: 'Bombay' },
  ],
};

// Import all cat images statically
import persian from '@/assets/cats/persian.png';
import britishShorthair from '@/assets/cats/british-shorthair.png';
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
import exoticShorthair from '@/assets/cats/exotic-shorthair.png';
import birman from '@/assets/cats/birman.png';
import americanShorthair from '@/assets/cats/american-shorthair.png';
import bombay from '@/assets/cats/bombay.png';

const catImages: Record<string, string> = {
  'persian': persian,
  'british-shorthair': britishShorthair,
  'siamese': siamese,
  'maine-coon': maineCoon,
  'scottish-fold': scottishFold,
  'ragdoll': ragdoll,
  'bengal': bengal,
  'munchkin': munchkin,
  'russian-blue': russianBlue,
  'sphynx': sphynx,
  'abyssinian': abyssinian,
  'norwegian-forest': norwegianForest,
  'exotic-shorthair': exoticShorthair,
  'birman': birman,
  'american-shorthair': americanShorthair,
  'bombay': bombay,
};

interface Card {
  id: string;
  breedId: string;
  name: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MatchingGameContent = () => {
  const { t, language } = useLanguage();
  const catBreeds = catBreedsData[language];
  
  const [gameMode, setGameMode] = useState<'select' | 'playing' | 'won'>('select');
  const [pairCount, setPairCount] = useState<8 | 16>(8);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameMode === 'playing' && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameMode, startTime]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = (pairs: 8 | 16) => {
    setPairCount(pairs);
    const selectedBreeds = shuffleArray(catBreeds).slice(0, pairs);
    
    const gameCards: Card[] = [];
    selectedBreeds.forEach((breed) => {
      // Create two cards for each breed
      for (let i = 0; i < 2; i++) {
        gameCards.push({
          id: `${breed.id}-${i}`,
          breedId: breed.id,
          name: breed.name,
          image: catImages[breed.id],
          isFlipped: false,
          isMatched: false,
        });
      }
    });

    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setGameMode('playing');
  };

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].breedId === cards[second].breedId) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(p => {
            const newPairs = p + 1;
            if (newPairs === pairCount) {
              setGameMode('won');
            }
            return newPairs;
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-foreground mb-6">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t.matchingGameTitle}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-gradient-kawaii">{t.matchingGameTitle}</span>
            </h1>
          </motion.div>

          <AnimatePresence mode="wait">
            {gameMode === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-xl mx-auto"
              >
                <div className="glass-card p-8 rounded-3xl text-center">
                  <h2 className="text-2xl font-bold mb-6">{t.startGame}</h2>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="kawaii"
                      size="lg"
                      onClick={() => startGame(8)}
                      className="flex-1"
                    >
                      <span className="text-xl mr-2">🐱</span>
                      {t.pairs8}
                    </Button>
                    <Button
                      variant="kawaiiOutline"
                      size="lg"
                      onClick={() => startGame(16)}
                      className="flex-1"
                    >
                      <span className="text-xl mr-2">🐱🐱</span>
                      {t.pairs16}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {gameMode === 'playing' && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Game Stats */}
                <div className="flex justify-center gap-6 mb-8">
                  <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{formatTime(elapsedTime)}</span>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-full">
                    <span className="font-medium">{t.moves}: {moves}</span>
                  </div>
                  <div className="glass-card px-4 py-2 rounded-full">
                    <span className="font-medium">{matchedPairs}/{pairCount}</span>
                  </div>
                </div>

                {/* Game Board */}
                <div className={`grid gap-3 md:gap-4 max-w-5xl mx-auto ${
                  pairCount === 8 ? 'grid-cols-4' : 'grid-cols-4 md:grid-cols-8'
                }`}>
                  {cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, rotateY: 180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="aspect-square"
                    >
                      <div
                        className={`relative w-full h-full cursor-pointer perspective-1000 ${
                          card.isMatched ? 'pointer-events-none' : ''
                        }`}
                        onClick={() => handleCardClick(index)}
                      >
                        <motion.div
                          className="absolute inset-0 w-full h-full"
                          animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                          transition={{ duration: 0.4 }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Card Back */}
                          <div
                            className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center backface-hidden shadow-lg hover:shadow-xl transition-shadow"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <span className="text-3xl md:text-4xl">🐾</span>
                          </div>
                          
                          {/* Card Front */}
                          <div
                            className={`absolute inset-0 w-full h-full rounded-xl bg-background border-2 ${
                              card.isMatched ? 'border-green-400 bg-green-50' : 'border-primary/30'
                            } flex flex-col items-center justify-center p-1 md:p-2 shadow-lg`}
                            style={{ 
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)'
                            }}
                          >
                            <img
                              src={card.image}
                              alt={card.name}
                              className="w-full h-3/4 object-contain"
                            />
                            <span className="text-[10px] md:text-xs font-medium text-center text-foreground mt-1 leading-tight">
                              {card.name}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Reset Button */}
                <div className="flex justify-center mt-8">
                  <Button
                    variant="kawaiiOutline"
                    onClick={() => setGameMode('select')}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t.restartGame}
                  </Button>
                </div>
              </motion.div>
            )}

            {gameMode === 'won' && (
              <motion.div
                key="won"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto"
              >
                <div className="glass-card p-8 rounded-3xl text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4 text-gradient-kawaii">{t.congratulations}</h2>
                  <div className="space-y-2 mb-6 text-muted-foreground">
                    <p>{formatTime(elapsedTime)}</p>
                    <p>{t.completedIn}: {moves} {t.moves}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="kawaii" onClick={() => startGame(pairCount)}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {t.playAgain}
                    </Button>
                    <Button variant="kawaiiOutline" onClick={() => setGameMode('select')}>
                      {t.backToMenu}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const MatchingGame = () => {
  return (
    <LanguageProvider>
      <MeowProvider>
        <MatchingGameContent />
      </MeowProvider>
    </LanguageProvider>
  );
};

export default MatchingGame;
