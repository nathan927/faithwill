import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Home, Image, HeartHandshake, Users, Menu, X, Cat, Globe } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useMeowMode } from '@/contexts/MeowContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { meowMode, toggleMeowMode } = useMeowMode();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t.home, href: '/', icon: Home },
    { name: t.gallery, href: '/gallery', icon: Image },
    { name: t.catCare, href: '/cat-care', icon: HeartHandshake },
    { name: t.community, href: '/community', icon: Users },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <PawPrint className="w-10 h-10 text-primary fill-primary" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <PawPrint className="w-10 h-10 text-secondary fill-secondary opacity-50" />
              </motion.div>
            </div>
            <span className="text-xl font-bold text-foreground">
              {t.siteName} <span className="text-primary">{t.siteNameHighlight}</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href}>
              <motion.div
                className={`flex items-center gap-2 transition-colors font-medium ${
                  location.pathname === link.href 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full px-3"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'zh' ? 'EN' : '中文'}</span>
          </Button>

          {/* Meow Mode Toggle */}
          <div className="flex items-center gap-3">
            <Cat className={`w-5 h-5 transition-colors ${meowMode ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="text-sm font-medium text-foreground/80">{t.meowMode}</span>
            <Switch
              checked={meowMode}
              onCheckedChange={toggleMeowMode}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-full bg-primary/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card-strong mt-2 mx-4 rounded-3xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.div
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
                      location.pathname === link.href 
                        ? 'bg-primary/20 text-primary' 
                        : 'hover:bg-primary/20'
                    }`}
                    whileHover={{ x: 10 }}
                  >
                    <link.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{link.name}</span>
                  </motion.div>
                </Link>
              ))}
              
              {/* Language Toggle Mobile */}
              <div className="flex items-center justify-between p-3 border-t border-border mt-2 pt-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{language === 'zh' ? 'English' : '中文'}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleLanguage} className="rounded-full">
                  {language === 'zh' ? 'EN' : '中文'}
                </Button>
              </div>
              
              {/* Meow Mode Mobile */}
              <div className="flex items-center justify-between p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Cat className={`w-5 h-5 ${meowMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium">{t.meowMode}</span>
                </div>
                <Switch
                  checked={meowMode}
                  onCheckedChange={toggleMeowMode}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
