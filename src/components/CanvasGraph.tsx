'use client';

import React, { useRef, useEffect } from 'react';

interface CanvasGraphProps {
    type?: 'uptrend' | 'pulse' | 'pulse-static' | 'sparkline' | 'data-stream' | 'radar-ping';
    color?: string;
    height?: number;
    className?: string;
    speed?: number;
    active?: boolean;
}

export default function CanvasGraph({
    type = 'uptrend',
    color = '#181825',
    height = 100,
    className = "",
    speed = 1,
    active = false
}: CanvasGraphProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let offset = 0;
        const points: number[] = [];
        const maxPoints = 50;
        let isVisible = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    draw();
                } else {
                    cancelAnimationFrame(animationFrameId);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(canvas);

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = height;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Add glow only when active to save performance
            if (active) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
            }

            if (type === 'uptrend') {
                const step = canvas.width / maxPoints;
                ctx.moveTo(0, canvas.height * 0.8);
                for (let i = 0; i < maxPoints; i++) {
                    const x = i * step;
                    const noise = Math.sin(i * 0.2 + offset) * 5;
                    const trend = (i / maxPoints) * canvas.height * 0.6;
                    const y = canvas.height * 0.8 - trend + noise;
                    ctx.lineTo(x, y);
                }
            } else if (type === 'pulse' || type === 'pulse-static') {
                const step = 2;
                const freq = 0.05;
                const amp = active || type === 'pulse-static' ? canvas.height * 0.3 : 2;
                ctx.moveTo(0, canvas.height / 2);
                for (let x = 0; x < canvas.width; x += step) {
                    const y = canvas.height / 2 + Math.sin(x * freq + offset) * amp;
                    ctx.lineTo(x, y);
                }
            } else if (type === 'sparkline') {
                const step = canvas.width / maxPoints;
                ctx.moveTo(0, canvas.height / 2);
                for (let i = 0; i < maxPoints; i++) {
                    const x = i * step;
                    const y = canvas.height / 2 + Math.sin(i * 0.5 + offset) * (canvas.height * 0.2);
                    ctx.lineTo(x, y);
                }
            } else if (type === 'data-stream') {
                const barCount = 15;
                const barWidth = 2;
                const spacing = canvas.width / barCount;
                for (let i = 0; i < barCount; i++) {
                    const x = i * spacing + spacing / 2;
                    const h = (Math.sin(i * 0.5 + offset) * 0.5 + 0.5) * canvas.height * 0.6;
                    ctx.moveTo(x, canvas.height / 2 - h / 2);
                    ctx.lineTo(x, canvas.height / 2 + h / 2);
                }
            } else if (type === 'radar-ping') {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const maxRadius = Math.max(canvas.width, canvas.height) * 0.6;
                const pulseCount = 3;
                for (let i = 0; i < pulseCount; i++) {
                    const r = ((offset * 20 + (i * maxRadius / pulseCount)) % maxRadius);
                    const alpha = 1 - (r / maxRadius);
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                    ctx.strokeStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
                    ctx.stroke();
                }
                return; // Early return for radar-ping as it handles its own stroke/color
            }

            ctx.stroke();

            // Draw gradient fill below the line
            if (type === 'uptrend' || type === 'sparkline') {
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                grad.addColorStop(0, `${color}22`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.fill();
            }

            offset += 0.05 * speed;
            if (!isVisible) return;
            animationFrameId = requestAnimationFrame(draw);
        };

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [type, color, height, speed, active]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full pointer-events-none ${className}`}
        />
    );
}
