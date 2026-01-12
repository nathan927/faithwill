'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedLetters } from '../ui/AnimatedText';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 pb-32"
        >
            <motion.div
                style={{ opacity, y, scale }}
                className="relative z-10 max-w-5xl mx-auto"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                    <span className="text-sm text-purple-300 font-medium">AI Solutions Developer</span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="heading-hero mb-6">
                    <span className="block text-white">
                        <AnimatedLetters text="運用" delay={0} />
                        <span className="text-gradient ml-4">
                            <AnimatedLetters text="AI" delay={0.1} />
                        </span>
                        <AnimatedLetters text=" 突破界限" delay={0.15} />
                    </span>
                    <span className="block mt-2">
                        <AnimatedLetters text="重塑工作方式" delay={0.3} />
                    </span>
                </h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-body max-w-2xl mx-auto mb-12"
                >
                    專注開發 AI 驅動的高效能自動化工具，致力改善人們的工作流程。
                    <br className="hidden sm:block" />
                    我的願景是運用 AI 完成目前人類未能達成的任務，創造真正有意義的技術解決方案。
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <MagneticButton
                        href="#projects"
                        className="btn-primary"
                    >
                        <span>探索作品</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </MagneticButton>

                    <MagneticButton
                        href="mailto:contact@nathanyuen.org"
                        className="btn-secondary"
                    >
                        <span>聯絡我</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </MagneticButton>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-2 bg-purple-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
