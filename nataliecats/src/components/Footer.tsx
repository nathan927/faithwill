import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, Heart, ArrowUp, PawPrint } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export const Footer = () => {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-primary/10 pt-20 pb-8">
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-20 fill-primary/10"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Brand Column */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <PawPrint className="w-10 h-10 text-primary fill-primary" />
            <span className="text-2xl font-bold">
              {t.siteName} <span className="text-primary">{t.siteNameHighlight}</span>
            </span>
          </motion.a>
          <p className="text-muted-foreground mb-6 max-w-sm">
            {t.footerDescription}
          </p>
          
          {/* Social Links */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-3">{t.followUs}</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            {t.copyright}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </p>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-medium">{t.backToTop}</span>
            <motion.div
              className="relative"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <ArrowUp className="w-4 h-4" />
              {/* Tail wagging effect */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-primary rounded-full origin-top"
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
