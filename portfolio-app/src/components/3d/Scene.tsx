'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface StarFieldProps {
    count?: number;
    mouse: React.MutableRefObject<{ x: number; y: number }>;
}

// Starfield - Creates a cosmic galaxy effect
function StarField({ count = 5000, mouse }: StarFieldProps) {
    const ref = useRef<THREE.Points>(null);

    const [positions, sizes, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const siz = new Float32Array(count);
        const col = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Distribute stars in a spherical pattern
            const radius = 3 + Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);

            // Varying star sizes
            siz[i] = Math.random() * 0.5 + 0.1;

            // Star colors - mix of white, blue, purple, cyan
            const colorChoice = Math.random();
            if (colorChoice < 0.5) {
                // White/blue stars
                col[i * 3] = 0.8 + Math.random() * 0.2;
                col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
                col[i * 3 + 2] = 1;
            } else if (colorChoice < 0.75) {
                // Purple stars
                col[i * 3] = 0.6 + Math.random() * 0.2;
                col[i * 3 + 1] = 0.3;
                col[i * 3 + 2] = 0.9 + Math.random() * 0.1;
            } else {
                // Cyan stars
                col[i * 3] = 0.2;
                col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
                col[i * 3 + 2] = 0.9 + Math.random() * 0.1;
            }
        }

        return [pos, siz, col];
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;

        const time = state.clock.getElapsedTime();

        // Slow cosmic rotation with mouse parallax
        ref.current.rotation.y = time * 0.02 + mouse.current.x * 0.1;
        ref.current.rotation.x = mouse.current.y * 0.05;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.03}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

// Twinkling stars layer - smaller, more numerous
function TwinklingStars({ count = 2000 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }

        return pos;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const material = ref.current.material as THREE.PointsMaterial;

        // Twinkling effect
        const time = state.clock.getElapsedTime();
        material.opacity = 0.4 + Math.sin(time * 2) * 0.2;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.008}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
}

// Nebula-like colored clouds 
function NebulaCloud() {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(500 * 3);

        for (let i = 0; i < 500; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 4;

            pos[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
            pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2 - 5;
        }

        return pos;
    }, []);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        ref.current.rotation.z = time * 0.01;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#a855f7"
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.15}
            />
        </Points>
    );
}

export default function Scene() {
    const mouse = useRef({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent) => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    return (
        <div
            className="fixed inset-0 z-0"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <color attach="background" args={['#030014']} />

                {/* Ambient lighting for depth */}
                <ambientLight intensity={0.1} />

                {/* Main starfield */}
                <StarField mouse={mouse} count={6000} />

                {/* Twinkling layer */}
                <TwinklingStars count={3000} />

                {/* Nebula clouds */}
                <NebulaCloud />

                {/* Post-processing for glow */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        intensity={0.8}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
