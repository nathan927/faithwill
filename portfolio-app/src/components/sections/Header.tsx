'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { MagneticLink } from '../ui/MagneticButton';

const navLinks = [
    { href: '#projects', label: '作品集' },
    { href: '#vision', label: '願景' },
    { href: '#contact', label: '聯絡' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious();
        if (previous !== undefined) {
            if (latest > previous && latest > 150) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
        }
        setIsScrolled(latest > 50);
    });

    // Theme toggle with fancy transition
    const toggleTheme = useCallback(() => {
        setIsTransitioning(true);

        // Wait for flash animation to peak
        setTimeout(() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }, 300);

        // Remove transition state
        setTimeout(() => {
            setIsTransitioning(false);
        }, 800);
    }, [theme]);

    // Load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    return (
        <>
            {/* Theme transition overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.2, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="fixed inset-0 z-[9999] pointer-events-none"
                        style={{
                            background: theme === 'dark'
                                ? 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(59,130,246,0.6) 50%, transparent 100%)'
                                : 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(168,85,247,0.4) 50%, transparent 100%)'
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.header
                initial={{ y: -100 }}
                animate={{ y: isHidden ? -100 : 0 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-black/50 backdrop-blur-xl border-b border-white/5'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container">
                    <nav className="flex items-center justify-between h-20">
                        {/* Logo - Dynamic styling */}
                        <motion.a
                            href="/"
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="name-glow font-display text-2xl md:text-3xl tracking-tight">
                                Nathan Yuen
                            </span>
                        </motion.a>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <MagneticLink
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/70 hover:text-white transition-colors font-medium"
                                >
                                    {link.label}
                                </MagneticLink>
                            ))}
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-4">
                            {/* Theme toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-purple-500/50 transition-colors overflow-hidden"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{
                                        rotate: theme === 'dark' ? 0 : 180,
                                        scale: isTransitioning ? 1.5 : 1
                                    }}
                                    transition={{ duration: 0.5, type: 'spring' }}
                                >
                                    {theme === 'dark' ? (
                                        <span className="text-xl">🌙</span>
                                    ) : (
                                        <span className="text-xl">☀️</span>
                                    )}
                                </motion.div>

                                {/* Glow ring on transition */}
                                {isTransitioning && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        initial={{ boxShadow: '0 0 0 0 rgba(168, 85, 247, 0.8)' }}
                                        animate={{ boxShadow: '0 0 0 20px rgba(168, 85, 247, 0)' }}
                                        transition={{ duration: 0.6 }}
                                    />
                                )}
                            </motion.button>

                            {/* Status indicator */}
                            <motion.div
                                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs text-white/60 font-medium">可接專案</span>
                            </motion.div>

                            {/* Mobile menu button */}
                            <button className="md:hidden p-2 text-white/70 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </motion.header>
        </>
    );
}
