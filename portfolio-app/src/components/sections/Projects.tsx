'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    titleEn: string;
    description: string;
    tags: { name: string; type: 'ai' | 'tool' | 'health' | 'edu' }[];
    image: string;
    link: string;
    color: string;
}

const projects: Project[] = [
    {
        id: 'faithwill',
        title: '信毅會',
        titleEn: 'Faith Learning Society',
        description: 'AI 驅動的特殊教育資源平台，為有學習障礙的孩子提供專屬教學資源，讓信心與毅力成為他們前進的力量。',
        tags: [
            { name: 'AI', type: 'ai' },
            { name: '教育科技', type: 'edu' },
        ],
        image: '/images/portfolio/faithwill.png',
        link: '/faithwill/',
        color: '#a855f7',
    },
    {
        id: 'cancer-qa',
        title: '癌症知識問與答',
        titleEn: 'Cancer Knowledge Kit',
        description: '整合癌症風險評估、知識百科與照顧指南的完整平台，協助用戶深入了解癌症預防、檢查與治療資訊。',
        tags: [
            { name: 'AI', type: 'ai' },
            { name: '健康醫療', type: 'health' },
        ],
        image: '/images/portfolio/cancer-qa.png',
        link: '/cancer-knowledge-kit/',
        color: '#06b6d4',
    },
    {
        id: 'vba-bible',
        title: 'VBA 全能查詢工具',
        titleEn: 'VBA Bible',
        description: '收錄超過 2000 條 VBA 指令說明的離線查詢工具，涵蓋 Excel、Word、Outlook、PowerPoint 等全方位應用。',
        tags: [
            { name: '工具', type: 'tool' },
            { name: '離線版', type: 'tool' },
        ],
        image: '/images/portfolio/vba-bible.png',
        link: '/VBA-Bible/VBA離線全能查詢2.5.html',
        color: '#3b82f6',
    },
    {
        id: 'word-extractor',
        title: 'Word Extractor Pro',
        titleEn: 'Document Automation',
        description: '本地端 Word 文檔批量提取工具，支援自訂規則配置，可快速從多個文件中提取關鍵資訊並匯出結果。',
        tags: [
            { name: '工具', type: 'tool' },
            { name: '自動化', type: 'tool' },
        ],
        image: '/images/portfolio/word-extractor.png',
        link: '/Word Extractor Pro (offline)/Word Extractor Pro (full ver).html',
        color: '#22c55e',
    },
];

const tagColors: Record<string, string> = {
    ai: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    tool: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    health: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    edu: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative flex-shrink-0 w-[380px] md:w-[420px]"
        >
            <a href={project.link} className="block h-full">
                <div
                    className="project-card h-full flex flex-col"
                    style={{ '--card-color': project.color } as React.CSSProperties}
                >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={420}
                                height={208}
                                className="w-full h-full object-cover object-top"
                                unoptimized
                            />
                        </motion.div>

                        {/* Floating number badge */}
                        <div
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-sm font-bold z-20 border border-white/20"
                            style={{ background: project.color }}
                        >
                            0{index + 1}
                        </div>
                    </div>

                    {/* Content - Ensure all text visible */}
                    <div className="p-6 flex flex-col flex-grow">
                        {/* Tags */}
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {project.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className={`px-3 py-1 text-xs font-semibold border ${tagColors[tag.type]}`}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-1 group-hover:text-gradient transition-all duration-300 font-display">
                            {project.title}
                        </h3>
                        <p className="text-sm text-white/40 mb-4 font-medium">{project.titleEn}</p>

                        {/* Description - Full visibility */}
                        <p className="text-sm text-white/70 leading-relaxed mb-6 flex-grow">
                            {project.description}
                        </p>

                        {/* Link - Always at bottom */}
                        <div className="flex items-center gap-2 text-sm font-bold mt-auto" style={{ color: project.color }}>
                            <span>瀏覽專案</span>
                            <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ x: 5 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headerRef, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const section = sectionRef.current;
        const container = containerRef.current;

        // Calculate scroll distance
        const scrollWidth = container.scrollWidth - window.innerWidth + 200;

        const ctx = gsap.context(() => {
            gsap.to(container, {
                x: -scrollWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${scrollWidth}`,
                    pin: true,
                    scrub: 1.5,
                    anticipatePin: 1,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-screen overflow-hidden py-20"
        >
            {/* Section Header */}
            <div ref={headerRef} className="container mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <span className="text-purple-500 text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                        Featured Work
                    </span>
                    <h2 className="heading-section text-gradient mb-4">作品展示</h2>
                    <p className="text-body">
                        透過 AI 與創新技術，打造實用且高效的解決方案
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex gap-8 px-8 pl-[calc((100vw-1400px)/2+2rem)]"
                style={{ willChange: 'transform' }}
            >
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}

                {/* End card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex-shrink-0 w-[280px] flex items-center justify-center"
                >
                    <a
                        href="#contact"
                        className="group flex flex-col items-center gap-4 text-center p-8"
                    >
                        <div className="w-20 h-20 border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500/10 transition-all duration-300">
                            <svg className="w-8 h-8 text-white/40 group-hover:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-white/40 group-hover:text-white transition-colors font-medium">
                            更多項目即將推出
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 text-sm">
                <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>滾動瀏覽</span>
            </div>
        </section>
    );
}
