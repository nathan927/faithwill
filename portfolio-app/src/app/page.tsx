'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Vision from '@/components/sections/Vision';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import SmoothScroll from '@/components/effects/SmoothScroll';
import CustomCursor from '@/components/effects/CustomCursor';

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-[#030014]" />
  ),
});

export default function Home() {
  return (
    <SmoothScroll>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* 3D Background Scene */}
      <Scene />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />

        <main>
          <Hero />
          <Projects />
          <Vision />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
