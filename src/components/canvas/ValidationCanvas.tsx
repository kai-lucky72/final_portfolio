'use client';

import React, { useRef, useEffect } from 'react';

interface ValidationCanvasProps {
    active: boolean;
    alt?: string;
    className?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface TerminalLine {
    text: string;
    type: 'info' | 'success' | 'process' | 'accent';
    timestamp: string;
    opacity: number;
}

const LOG_TEMPLATES = [
    { text: '[Nest] 1240  - %TIME%     LOG [InstanceLoader] AppModule dependencies initialized', type: 'info' },
    { text: '[Nest] 1240  - %TIME%     LOG [RoutesResolver] DiscoveryController {/api/v1}: +1ms', type: 'accent' },
    { text: '2026-02-19 16:33:40.123  INFO --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer', type: 'info' },
    { text: '√  Build completed successfully in 452ms', type: 'success' },
    { text: '[Nest] 1240  - %TIME%     LOG [Database] Connection established to CLUSTER_PRIMARY', type: 'success' },
    { text: '→  GET /api/v1/health 200 OK +2ms', type: 'accent' },
    { text: '::: Spring Boot :::  (v3.2.0)', type: 'process' },
    { text: '[System] Synchronizing global telemetry mesh...', type: 'process' },
    { text: '[Identity] Validating vault handshake token...', type: 'process' },
    { text: '[SUCCESS] Core orchestration node online', type: 'success' },
    { text: '→  POST /api/v1/auth/validate 201 Created', type: 'success' },
];

export default function ValidationCanvas({ active, alt = "", className = "" }: ValidationCanvasProps) {
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

        const lines: TerminalLine[] = [];
        const maxLines = 14;

        const addLine = () => {
            const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
            const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            lines.push({
                text: template.text.replace('%TIME%', time),
                type: template.type as any,
                timestamp: time,
                opacity: 0
            });
            if (lines.length > maxLines) lines.shift();
        };

        const drawWindowFrame = (w: number, h: number, x: number, y: number, alpha: number) => {
            const corner = 6;
            const titleH = 22;

            // Shadow
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 20;
            ctx.shadowOffsetY = 10;

            // Window Background
            ctx.fillStyle = 'rgba(1, 1, 13, 0.98)';
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, corner);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;

            // Title Bar
            ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.12})`;
            ctx.beginPath();
            ctx.roundRect(x, y, w, titleH, [corner, corner, 0, 0]);
            ctx.fill();

            // Border
            ctx.strokeStyle = `rgba(184, 184, 255, ${alpha * 0.3})`;
            ctx.lineWidth = 0.8;
            ctx.strokeRect(x, y, w, h);

            // Controls
            const colors = ['#ff5f56', '#ffbd2e', '#27c93f'];
            colors.forEach((c, i) => {
                ctx.fillStyle = `${c}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
                ctx.beginPath();
                ctx.arc(x + 12 + i * 16, y + titleH / 2, 4, 0, Math.PI * 2);
                ctx.fill();
            });

            // Title
            ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.6})`;
            ctx.font = '500 8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('zsh — build-process — 80x24', x + w / 2, y + 14);
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

            const baseAlpha = lerp(0.15, 0.95, I);

            // 1. Background Depth Elements
            // Deep Radial Glow
            const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.8);
            g.addColorStop(0, `rgba(184, 184, 255, ${lerp(0.02, 0.1, I)})`);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            // Technical Grid/Wireframe
            ctx.beginPath();
            ctx.strokeStyle = `rgba(184, 184, 255, ${lerp(0.01, 0.04, I)})`;
            ctx.lineWidth = 0.4;
            const gridSize = 40;
            for (let x = 0; x < w; x += gridSize) {
                ctx.moveTo(x, 0); ctx.lineTo(x, h);
                for (let y = 0; y < h; y += gridSize) {
                    if (x === 0) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
                    // Small nodes at intersections
                    if (isActive && Math.random() > 0.98) {
                        ctx.save();
                        ctx.fillStyle = `rgba(184, 184, 255, ${baseAlpha * 0.1})`;
                        ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2); ctx.fill();
                        ctx.restore();
                    }
                }
            }
            ctx.stroke();

            // Vertical Data Streams
            for (let i = 0; i < 6; i++) {
                const streamX = (w * (i + 1) / 7) + Math.sin(frame * 0.01 + i) * 20;
                const streamAlpha = lerp(0.01, 0.05, I);
                ctx.strokeStyle = `rgba(184, 184, 255, ${streamAlpha})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.moveTo(streamX, 0); ctx.lineTo(streamX, h); ctx.stroke();

                // Moving pulses on streams
                const pulseY = (frame * (2 + i % 3) + i * 100) % h;
                const pg = ctx.createLinearGradient(0, pulseY - 20, 0, pulseY + 20);
                pg.addColorStop(0, 'rgba(0,0,0,0)');
                pg.addColorStop(0.5, `rgba(184, 184, 255, ${streamAlpha * 4})`);
                pg.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = pg;
                ctx.fillRect(streamX - 1, pulseY - 20, 2, 40);
            }

            // 2. Terminal Rendering
            if (frame % (isActive ? 25 : 60) === 0) {
                addLine();
            }

            const winW = Math.min(w * 0.85, 340);
            const winH = 240;
            const winX = (w - winW) / 2;
            const winY = (h - winH) / 2;

            drawWindowFrame(winW, winH, winX, winY, baseAlpha);

            // Terminal Content
            ctx.save();
            ctx.beginPath();
            ctx.rect(winX + 1, winY + 23, winW - 2, winH - 24);
            ctx.clip();

            const padding = 15;
            const lineHeight = 14;
            ctx.font = '400 8.5px "JetBrains Mono", monospace';
            ctx.textAlign = 'left';

            lines.forEach((line, i) => {
                line.opacity = lerp(line.opacity, 1, 0.1);
                const alpha = line.opacity * baseAlpha;
                const ly = winY + 40 + i * lineHeight;

                let textColor = `rgba(184, 184, 255, ${alpha * 0.75})`;
                if (line.type === 'success') textColor = `rgba(130, 255, 160, ${alpha})`;
                if (line.type === 'accent') textColor = `rgba(150, 180, 255, ${alpha})`;
                if (line.type === 'process') textColor = `rgba(240, 240, 255, ${alpha * 0.9})`;

                ctx.fillStyle = textColor;
                ctx.fillText(line.text, winX + padding, ly);

                if (i === lines.length - 1 && isActive) {
                    const textW = ctx.measureText(line.text).width;
                    const cursorAlpha = (Math.sin(frame * 0.1) * 0.5 + 0.5) * alpha;
                    ctx.fillStyle = `rgba(184, 184, 255, ${cursorAlpha})`;
                    ctx.fillRect(winX + padding + textW + 4, ly - 7, 5, 9);
                }
            });
            ctx.restore();

            const scanY = (frame * 1.5) % h;
            ctx.beginPath();
            ctx.moveTo(0, scanY); ctx.lineTo(w, scanY);
            ctx.strokeStyle = `rgba(184, 184, 255, ${lerp(0.02, 0.07, I)})`;
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
