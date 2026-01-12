'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/nathan927',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: 'Email',
        href: 'mailto:contact@nathanyuen.org',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-32 overflow-hidden"
        >
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            </div>

            <div className="container relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-purple-500 text-sm font-medium uppercase tracking-widest mb-4 block">
                            Get in Touch
                        </span>
                        <h2 className="heading-section mb-6">
                            <span className="text-gradient">讓我們一起</span>
                            <br />
                            <span className="text-white">創造些什麼</span>
                        </h2>
                        <p className="text-body mb-12">
                            有任何問題或合作想法？歡迎隨時聯繫我。
                        </p>
                    </motion.div>

                    {/* Email CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-16"
                    >
                        <MagneticButton
                            href="mailto:contact@nathanyuen.org"
                            className="inline-flex items-center gap-3 text-3xl md:text-5xl font-bold text-gradient hover:opacity-80 transition-opacity"
                            strength={0.15}
                        >
                            <span>contact@nathanyuen.org</span>
                            <motion.svg
                                className="w-8 h-8 md:w-12 md:h-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ rotate: 45 }}
                                transition={{ duration: 0.3 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </motion.svg>
                        </MagneticButton>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex justify-center gap-6"
                    >
                        {socialLinks.map((link) => (
                            <MagneticButton
                                key={link.name}
                                href={link.href}
                                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                                strength={0.4}
                            >
                                {link.icon}
                            </MagneticButton>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
