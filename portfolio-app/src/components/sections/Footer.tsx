'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative py-8 border-t border-white/5">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-sm text-white/40"
                    >
                        © {new Date().getFullYear()} Nathan Yuen. All rights reserved.
                    </motion.p>

                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-6 text-sm text-white/40"
                    >
                        <a href="/faithwill/" className="hover:text-white transition-colors">
                            信毅會
                        </a>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <a href="#projects" className="hover:text-white transition-colors">
                            作品集
                        </a>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <a href="mailto:contact@nathanyuen.org" className="hover:text-white transition-colors">
                            聯絡
                        </a>
                    </motion.div>

                    {/* Built with */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xs text-white/30"
                    >
                        Built with Next.js + Three.js + GSAP
                    </motion.p>
                </div>
            </div>
        </footer>
    );
}
