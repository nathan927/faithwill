import { motion } from 'framer-motion';
import { Sparkles, Heart, Gamepad2, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import natalieGirl from '@/assets/natalie-girl.png';

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-24 pb-16">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 rounded-full bg-secondary/40 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.4, 0.6] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-accent/50 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/40"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Heart className="w-4 h-4 md:w-6 md:h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-150px)]">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t.exploreWith}</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t.welcome}
              <br />
              <span className="text-gradient-kawaii">{t.natalie}</span>
              <br />
              {t.catParadise}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t.heroDescription}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/matching-game">
                <Button variant="kawaii" size="lg" className="group w-full sm:w-auto">
                  <Gamepad2 className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  {t.matchingGame}
                </Button>
              </Link>
              <Link to="/catch-game">
                <Button variant="kawaiiOutline" size="lg" className="group w-full sm:w-auto">
                  <MousePointer className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  {t.catchGame}
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex justify-center lg:justify-start gap-8 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: '10K+', label: t.members },
                { value: '500+', label: t.dailyShares },
                { value: '99%', label: t.happinessIndex },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Cat Image */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40 rounded-full blur-3xl scale-75" />
              
              {/* Natalie Girl Image */}
              <img
                src={natalieGirl}
                alt="可愛的Natalie小女孩和她的貓咪"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
              />
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-foreground/70" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-foreground/70 fill-current" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
