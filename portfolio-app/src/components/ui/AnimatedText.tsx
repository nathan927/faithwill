'use client';

import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
}

const letterVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -90,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.03,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export function AnimatedLetters({ text, className = '', delay = 0 }: AnimatedTextProps) {
    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={`inline-block ${className}`}
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    custom={i + delay * 10}
                    variants={letterVariants}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export function AnimatedWords({ text, className = '', delay = 0 }: AnimatedTextProps) {
    const words = text.split(' ');

    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={className}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    custom={i + delay}
                    variants={wordVariants}
                    className="inline-block mr-2"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

export function TypewriterText({ text, className = '', delay = 0 }: AnimatedTextProps) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className={className}
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + i * 0.05 }}
                >
                    {char}
                </motion.span>
            ))}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 inline-block w-0.5 h-[1em] bg-purple-500 align-middle"
            />
        </motion.span>
    );
}
