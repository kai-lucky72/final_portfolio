'use client';

import React, { useRef, useEffect } from 'react';

interface DiscoveryCanvasProps {
    active: boolean;
    alt?: string;
    className?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// Technical labels for the cards
const BLOCK_TITLES = [
    'CORE_ORCHESTRATOR_V2', 'IDENTITY_VAULT_PRO', 'ELASTIC_CLUSTER_NODE', 'STORAGE_GATEWAY_S4',
    'MESSAGE_BUS_KAFKA', 'TELEMETRY_ENGINE_X', 'CLOUD_FABRIC_SYNC', 'EDGE_GATEWAY_MAIN',
    'DISTRIBUTED_CACHE_L3', 'AUDIT_LEDGER_CHAIN', 'FISCAL_PROCESSOR_INT', 'WS_RELAY_CLUSTER'
];

interface SystemBlock {
    x: number;
    y: number;
    w: number;
    h: number;
    title: string;
    fields: number;
    id: number;
}

export default function DiscoveryCanvas({ active, alt = "", className = "" }: DiscoveryCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const activeRef = useRef(active);

    useEffect(() => { activeRef.current = active; }, [active]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let rafId = 0;
        let frame = 0;
        let glowOpacity = 0;
        let isVisible = false;

        const blocks: SystemBlock[] = [];

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                // Ultra HD scaling (DPR x 2 for extra sharpness)
                const dpr = Math.min(window.devicePixelRatio || 1, 2) * 1.5;
                canvas.width = Math.round(rect.width * dpr);
                canvas.height = Math.round(rect.height * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                if (blocks.length === 0) {
                    // Create a dense, static, high-fidelity grid
                    // Some blocks are placed partially outside for the "expansive" feel
                    const cardW = 140;
                    const cardH = 100;

                    const positions = [
                        { x: -40, y: 20 }, { x: 140, y: -20 }, { x: 320, y: 40 },
                        { x: 20, y: 160 }, { x: 200, y: 180 }, { x: 380, y: 150 },
                        { x: -20, y: 300 }, { x: 160, y: 320 }, { x: 340, y: 280 }
                    ];

                    positions.forEach((p, i) => {
                        blocks.push({
                            x: p.x,
                            y: p.y,
                            w: cardW,
                            h: cardH,
                            title: BLOCK_TITLES[i % BLOCK_TITLES.length],
                            fields: 5,
                            id: i
                        });
                    });
                }
            }
        };

        const drawGlow = (x: number, y: number, radius: number, alpha: number) => {
            const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
            g.addColorStop(0, `rgba(184, 184, 255, ${alpha})`);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        };

        const drawConnection = (b1: SystemBlock, b2: SystemBlock, I: number, baseAlpha: number) => {
            const x1 = b1.x + b1.w / 2;
            const y1 = b1.y + b1.h / 2;
            const x2 = b2.x + b2.w / 2;
            const y2 = b2.y + b2.h / 2;

            const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            if (dist > 450) return;

            // Ultra-thin high-fidelity connection lines
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(184, 184, 255, ${lerp(0.015, 0.08, I) * (1 - dist / 450)})`;
            ctx.lineWidth = 0.3; // Very thin as requested
            ctx.stroke();

            // Faster, trailing data strikes
            const path1Len = Math.abs(x2 - x1);
            const path2Len = Math.abs(y2 - y1);
            const totalLen = path1Len + path2Len;

            const t = (frame * 0.008 + b1.id * 0.2) % 1.4;
            const strikeLen = 0.12;
            const startProgress = Math.max(0, t - strikeLen);
            const endProgress = Math.min(1, t);

            if (t > 0 && t < 1 + strikeLen) {
                const getPoint = (p: number) => {
                    const ratio = path1Len / (totalLen || 1);
                    if (p < ratio) return { x: lerp(x1, x2, p / ratio), y: y1 };
                    return { x: x2, y: lerp(y1, y2, (p - ratio) / (1 - ratio)) };
                };

                const pStart = getPoint(startProgress);
                const pEnd = getPoint(endProgress);

                ctx.beginPath();
                ctx.moveTo(pStart.x, pStart.y);
                const ratio = path1Len / (totalLen || 1);
                if (startProgress < ratio && endProgress > ratio) {
                    ctx.lineTo(x2, y1); // Handle the corner
                }
                ctx.lineTo(pEnd.x, pEnd.y);
                ctx.strokeStyle = `rgba(240, 240, 255, ${baseAlpha * 0.8})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();

                if (activeRef.current && endProgress < 1) {
                    drawGlow(pEnd.x, pEnd.y, 4, baseAlpha * 0.2);
                }
            }
        };

        const drawCard = (b: SystemBlock, I: number, baseAlpha: number) => {
            const accentBlue = 'rgba(184, 184, 255,';
            const digitalWhite = 'rgba(240, 240, 255,';

            // Card container
            ctx.fillStyle = 'rgba(1, 1, 13, 0.95)';
            ctx.fillRect(b.x, b.y, b.w, b.h);

            // Multi-layered border for HD feel
            ctx.strokeStyle = `${accentBlue} ${lerp(0.1, 0.3, I)})`;
            ctx.lineWidth = 0.8;
            ctx.strokeRect(b.x, b.y, b.w, b.h);

            ctx.strokeStyle = `${accentBlue} ${lerp(0.05, 0.15, I)})`;
            ctx.lineWidth = 0.4;
            ctx.strokeRect(b.x + 1.5, b.y + 1.5, b.w - 3, b.h - 3);

            // Header
            ctx.fillStyle = `${accentBlue} ${lerp(0.08, 0.2, I)})`;
            ctx.fillRect(b.x, b.y, b.w, 18);

            ctx.font = '700 8.5px "JetBrains Mono", monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = `${digitalWhite} ${baseAlpha})`;
            ctx.fillText(b.title, b.x + 7, b.y + 9.5);

            for (let i = 0; i < b.fields; i++) {
                const fy = b.y + 30 + i * 11;
                ctx.font = '400 6.5px monospace';
                ctx.fillStyle = `${accentBlue} ${baseAlpha * 0.35})`;
                ctx.fillText(`0${i + 1}`, b.x + 7, fy + 4);

                ctx.fillStyle = `${accentBlue} ${baseAlpha * 0.1})`;
                ctx.fillRect(b.x + 20, fy + 4, b.w - 27, 0.4);

                ctx.fillStyle = `${accentBlue} ${baseAlpha * 0.22})`;
                ctx.fillRect(b.x + 20, fy + 7, b.w * rand(0.3, 0.6), 0.8);
            }

            // Accent brackets
            ctx.fillStyle = `${accentBlue} ${baseAlpha * 0.5})`;
            ctx.fillRect(b.x - 1, b.y - 1, 3, 0.8);
            ctx.fillRect(b.x - 1, b.y - 1, 0.8, 3);
            ctx.fillRect(b.x + b.w - 2, b.y - 1, 3, 0.8);
            ctx.fillRect(b.x + b.w, b.y - 1, 0.8, 3);

            if (activeRef.current) {
                drawGlow(b.x + b.w / 2, b.y + b.h / 2, 50, lerp(0, 0.15, I));
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible) draw();
                else cancelAnimationFrame(rafId);
            },
            { threshold: 0.1 }
        );

        observer.observe(canvas);
        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            if (!isVisible) return;
            rafId = requestAnimationFrame(draw);

            const { width: w, height: h } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, w, h);

            const isActive = activeRef.current;
            const targetIntensity = isActive ? 1 : 0.45;
            glowOpacity = lerp(glowOpacity, targetIntensity, 0.08);
            const I = glowOpacity;

            const baseAlpha = lerp(0.4, 1, I);

            // Draw connections - Denser mesh with diagonal pairs
            const connectionPairs = [
                [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
                [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8],
                [0, 4], [1, 5], [3, 7], [4, 8]
            ];
            connectionPairs.forEach(pair => {
                if (blocks[pair[0]] && blocks[pair[1]]) {
                    drawConnection(blocks[pair[0]], blocks[pair[1]], I, baseAlpha);
                }
            });

            // Draw blocks
            blocks.forEach(b => drawCard(b, I, baseAlpha));

            // Ultra HD Grid (Very subtle, high fidelity)
            ctx.beginPath();
            ctx.strokeStyle = `rgba(184, 184, 255, ${lerp(0.02, 0.05, I)})`;
            ctx.lineWidth = 0.5;
            for (let i = -100; i < w + 100; i += 40) {
                ctx.moveTo(i, -100); ctx.lineTo(i, h + 100);
            }
            for (let j = -100; j < h + 100; j += 40) {
                ctx.moveTo(-100, j); ctx.lineTo(w + 100, j);
            }
            ctx.stroke();

            // Technical scan line (ultra thin)
            const scanY = (frame * 1.5) % h;
            ctx.beginPath();
            ctx.moveTo(0, scanY);
            ctx.lineTo(w, scanY);
            ctx.strokeStyle = `rgba(184, 184, 255, ${lerp(0.02, 0.08, I)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            frame++;
        };

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            observer.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} aria-label={alt} role="img" className={`w-full h-full block ${className}`} />;
}
