'use client';

import React, { useRef, useEffect, useState } from 'react';
import { SiRedis, SiPostgresql, SiCloudflare } from 'react-icons/si';
import { VscGithub } from 'react-icons/vsc';
import { renderToStaticMarkup } from 'react-dom/server';

interface DeploymentCanvasProps {
    active: boolean;
    alt?: string;
    className?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface ServiceCard {
    id: string;
    name: string;
    url: string;
    status: 'completed' | 'online' | 'crashed';
    type: 'redis' | 'postgres' | 'backend' | 'frontend';
    iconKey: number;
    volumeLabel?: string;
    errorCount?: number;
}

const SERVICES: ServiceCard[] = [
    { id: '1', name: 'Redis', url: 'redis-production-1eb6.up.rail...', status: 'completed', type: 'redis', iconKey: 0, volumeLabel: 'redis-volume' },
    { id: '2', name: 'Postgres', url: 'postgres.up.rail...', status: 'online', type: 'postgres', iconKey: 1, volumeLabel: 'postgres-volume' },
    { id: '3', name: 'Backend', url: 'api.kagabo-lucky.workers.dev', status: 'online', type: 'backend', iconKey: 2 },
    { id: '4', name: 'Frontend', url: 'kagabo-lucky.workers.dev', status: 'online', type: 'frontend', iconKey: 3 },
];

export default function DeploymentCanvas({ active, alt = "", className = "" }: DeploymentCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const activeRef = useRef(active);
    const [iconsLoaded, setIconsLoaded] = useState(false);
    const iconImagesRef = useRef<HTMLImageElement[]>([]);

    useEffect(() => { activeRef.current = active; }, [active]);

    // Pre-render icons
    useEffect(() => {
        const iconConfigs = [
            { Icon: SiRedis, color: '#ff4b4b' },
            { Icon: SiPostgresql, color: '#336791' },
            { Icon: SiCloudflare, color: '#f38020' },
            { Icon: VscGithub, color: '#ffffff' }
        ];

        const loadIcons = async () => {
            const images = await Promise.all(iconConfigs.map(cfg => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const svgString = renderToStaticMarkup(<cfg.Icon size={48} style={{ color: cfg.color }} />);
                    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                    const url = URL.createObjectURL(svgBlob);
                    const img = new Image();
                    img.onload = () => {
                        URL.revokeObjectURL(url);
                        resolve(img);
                    };
                    img.src = url;
                });
            }));
            iconImagesRef.current = images;
            setIconsLoaded(true);
        };
        loadIcons();
    }, []);

    useEffect(() => {
        if (!iconsLoaded) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let rafId = 0;
        let frame = 0;
        let glowOpacity = 0;
        let isVisible = false;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width = Math.round(rect.width * dpr);
                canvas.height = Math.round(rect.height * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;
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

        const drawCard = (card: ServiceCard, x: number, y: number, w: number, h: number, alpha: number, isActive: boolean) => {
            const corner = 8;
            const titleH = h * 0.65;
            const I = glowOpacity;

            // 1. Shadow
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetY = 12;

            // 2. Background
            ctx.fillStyle = 'rgba(2, 2, 22, 0.98)';
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, corner);
            ctx.fill();
            ctx.shadowBlur = 0;

            // 3. Border
            ctx.strokeStyle = `rgba(184, 184, 255, ${alpha * 0.18})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, w, h);

            // 4. Header Section
            ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.05})`;
            ctx.beginPath();
            ctx.roundRect(x, y, w, 32, [corner, corner, 0, 0]);
            ctx.fill();

            // 5. Icon rendering
            const iconImg = iconImagesRef.current[card.iconKey];
            if (iconImg) {
                const iconSize = 16;
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.drawImage(iconImg, x + 12, y + 8, iconSize, iconSize);
                ctx.restore();
            }

            // 6. Text content
            ctx.textAlign = 'left';
            ctx.font = '600 12px sans-serif';
            ctx.fillStyle = `rgba(240, 240, 255, ${alpha})`;
            ctx.fillText(card.name, x + 34, y + 20);

            ctx.font = '400 9.5px sans-serif';
            ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.6})`;
            ctx.fillText(card.url, x + 16, y + 46);

            // 7. Status pulse
            const statusY = y + titleH + 4;
            const pSize = (Math.sin(frame * 0.1 + card.id.length) * 0.5 + 0.5) * 3 + 2;
            ctx.fillStyle = `rgba(130, 255, 160, ${alpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(x + 20, statusY - 3.5, pSize / 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = '500 10px sans-serif';
            ctx.fillText(card.status === 'completed' ? 'Completed' : 'Online', x + 34, statusY);

            // 8. Faint mini-chart
            if (isActive) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(130, 255, 160, ${alpha * 0.2})`;
                ctx.lineWidth = 1.2;
                for (let i = 0; i < 15; i++) {
                    const cx = x + w - 74 + i * 4;
                    const cy = statusY - 5 + Math.sin(frame * 0.05 + i + parseInt(card.id)) * 4;
                    if (i === 0) ctx.moveTo(cx, cy);
                    else ctx.lineTo(cx, cy);
                }
                ctx.stroke();
            }

            // 9. Footer (Volumes)
            if (card.volumeLabel) {
                ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.1})`;
                ctx.beginPath();
                ctx.roundRect(x, statusY + 14, w, h - (statusY + 14 - y), [0, 0, corner, corner]);
                ctx.fill();

                ctx.textAlign = 'left';
                ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.5})`;
                ctx.fillText('💾 ' + card.volumeLabel, x + 16, statusY + 32);
            }
        };

        const draw = () => {
            if (!isVisible) return;
            rafId = requestAnimationFrame(draw);

            const { width: w, height: h } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, w, h);

            const isActive = activeRef.current;
            const targetIntensity = isActive ? 1 : 0.45;
            glowOpacity = lerp(glowOpacity, targetIntensity, 0.05);
            const I = glowOpacity;
            const baseAlpha = lerp(0.3, 0.95, I);

            // 1. Background Atmosphere
            const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.9);
            g.addColorStop(0, `rgba(184, 184, 255, ${lerp(0.04, 0.15, I)})`);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            // Technical Grid
            ctx.fillStyle = `rgba(184, 184, 255, ${lerp(0.12, 0.25, I)})`;
            for (let x = 0; x < w; x += 40) {
                for (let y = 0; y < h; y += 40) {
                    ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI * 2); ctx.fill();
                }
            }

            // 2. Dash Rendering
            const cardW = 186;
            const cardH = 114;
            const gap = 16;
            const totalW = cardW * 2 + gap;
            const totalH = cardH * 2 + gap;
            const startX = (w - totalW) / 2;
            const startY = (h - totalH) / 2;

            SERVICES.forEach((s, i) => {
                const ix = i % 2;
                const iy = Math.floor(i / 2);
                const x = startX + ix * (cardW + gap);
                const y = startY + iy * (cardH + gap);

                const hoverY = Math.sin(frame * 0.035 + i) * 3.5;
                drawCard(s, x, y + hoverY, cardW, cardH, baseAlpha, isActive);
            });

            // 3. Scanline
            const scanY = (frame * 3) % h;
            ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(w, scanY);
            ctx.strokeStyle = `rgba(184, 184, 255, ${lerp(0.03, 0.1, I)})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            frame++;
        };

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            observer.disconnect();
        };
    }, [iconsLoaded]);

    if (!iconsLoaded) return <div className="w-full h-full bg-[#01010d]" />;

    return <canvas ref={canvasRef} aria-label={alt} role="img" className={`w-full h-full block ${className}`} />;
}
