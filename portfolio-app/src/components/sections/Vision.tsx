'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TypewriterText } from '../ui/AnimatedText';

export default function Vision() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={sectionRef}
            id="vision"
            className="relative py-32 overflow-hidden"
        >
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-50" />

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 1, type: 'spring' }}
                        className="inline-block mb-8"
                    >
                        <div className="relative w-24 h-24 mx-auto">
                            <motion.div
                                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500"
                                animate={{
                                    boxShadow: [
                                        '0 0 30px rgba(168, 85, 247, 0.3)',
                                        '0 0 60px rgba(168, 85, 247, 0.5)',
                                        '0 0 30px rgba(168, 85, 247, 0.3)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-4xl">
                                🚀
                            </div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="heading-section text-gradient mb-8"
                    >
                        我的願景
                    </motion.h2>

                    {/* Vision content with typewriter effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                            {isInView && (
                                <TypewriterText
                                    text="我相信 AI 不僅是提升效率的工具，更是突破人類現有能力邊界的關鍵。"
                                    delay={0.6}
                                />
                            )}
                        </p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 2 }}
                            className="text-lg text-white/60 leading-relaxed"
                        >
                            透過開發智能自動化解決方案，我致力於改變人們的工作方式，
                            讓繁瑣的任務變得簡單高效。
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 2.5 }}
                            className="text-lg text-white/60 leading-relaxed"
                        >
                            未來，我將持續探索 AI 的無限可能，挑戰並完成目前人類未能達成的任務，
                            為社會創造真正有價值的技術貢獻。
                        </motion.p>
                    </motion.div>

                    {/* Decorative lines */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 3 }}
                        className="mt-12"
                    >
                        <div className="neon-line mx-auto max-w-md" />
                    </motion.div>

                    {/* Stats or highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 3.2 }}
                        className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10"
                    >
                        {[
                            { value: '4+', label: '個專案' },
                            { value: 'AI', label: '驅動' },
                            { value: '∞', label: '可能性' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <motion.div
                                    className="text-3xl md:text-4xl font-bold text-gradient mb-2"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{
                                        duration: 0.5,
                                        delay: 3.4 + index * 0.1,
                                        type: 'spring',
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm text-white/40">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
