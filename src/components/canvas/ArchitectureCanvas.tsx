'use client';

import React, { useRef, useEffect } from 'react';

interface ArchitectureCanvasProps {
    active: boolean;
    alt?: string;
    className?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// Refined code snippets for split-pane view
const CODE_SAMPLES = [
    {
        left: [
            'interface User {',
            '  id: string;',
            '  email: string;',
            '  role: Role;',
            '}',
            '',
            'enum Role {',
            '  ADMIN = "admin",',
            '  USER = "user"',
            '}'
        ],
        right: [
            'async function sync() {',
            '  const users = await',
            '    db.users.find();',
            '  return users.map(u =>',
            '    new User(u));',
            '}'
        ]
    },
    {
        left: [
            'const Button = ({',
            '  label,',
            '  onClick',
            '}) => (',
            '  <button',
            '    className="p-2"',
            '    onClick={onClick}',
            '  >',
            '    {label}',
            '  </button>',
            ');'
        ],
        right: [
            'describe("Button", () => {',
            '  it("renders label", () => {',
            '    const { getByText } =',
            '      render(<Button />)',
            '    expect(getByText)',
            '      .toBeInTheDocument();',
            '  });',
            '});'
        ]
    },
    {
        left: [
            'import { api } from "./api"',
            '',
            'export const fetchAll =',
            '  async (id: number) => {',
            '    const res = await',
            '      api.get(`/u/${id}`)',
            '    return res.data',
            '  }'
        ],
        right: [
            '# API Config',
            'timeout: 5000',
            'retries: 3',
            'endpoint: "https://"',
            'env: "production"'
        ]
    },
    {
        left: [
            'def calculate_roi(p, r):',
            '  """Returns computed"""',
            '  val = p * (1 + r)',
            '  return round(val, 2)',
            '',
            '# Compute metrics',
            'roi = calculate_roi(10, 2)'
        ],
        right: [
            'import pandas as pd',
            '',
            'df = pd.read_csv("d.csv")',
            'clean = df.dropna()',
            'stats = clean.describe()',
            'print(stats)'
        ]
    }
];

interface EditorWindow {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    z: number;
    targetZ: number;
    sampleIdx: number;
    id: number;
    opacity: number;
}

export default function ArchitectureCanvas({ active, alt = "", className = "" }: ArchitectureCanvasProps) {
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

        const windows: EditorWindow[] = [];
        const windowCount = 7; // Increased density from 4 to 7

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2) * 2;
                canvas.width = Math.round(rect.width * dpr);
                canvas.height = Math.round(rect.height * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                if (windows.length === 0) {
                    for (let i = 0; i < windowCount; i++) {
                        windows.push({
                            x: 10 + i * 10,
                            y: 20 + i * 10,
                            targetX: 10 + i * 10,
                            targetY: 20 + i * 10,
                            z: i,
                            targetZ: i,
                            sampleIdx: i % CODE_SAMPLES.length,
                            id: i,
                            opacity: 1
                        });
                    }
                }
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

        const drawGlow = (x: number, y: number, radius: number, alpha: number) => {
            const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
            g.addColorStop(0, `rgba(184, 184, 255, ${alpha})`);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        };

        const renderCode = (lines: string[], x: number, y: number, alpha: number) => {
            ctx.textAlign = 'left';
            ctx.font = '400 8.5px "JetBrains Mono", monospace';

            lines.forEach((line, i) => {
                const ly = y + i * 12;
                ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.3})`;
                ctx.fillText(`${i + 1}`, x - 18, ly);

                const tokens = line.split(/(\s+|\(|\)|\{|\}|"|'|=|>|const|async|await|return|def|if|interface|enum|import|export|describe|it|expect)/);
                let tx = x;
                tokens.forEach(token => {
                    if (!token) return;
                    if (['const', 'async', 'await', 'return', 'def', 'if', 'interface', 'enum', 'import', 'export', 'describe', 'it', 'expect'].includes(token)) {
                        ctx.fillStyle = `rgba(150, 180, 255, ${alpha})`;
                    } else if (['"', "'", '=', '>'].includes(token)) {
                        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
                    } else if (['(', ')', '{', '}'].includes(token)) {
                        ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.7})`;
                    } else {
                        ctx.fillStyle = `rgba(240, 240, 255, ${alpha * 0.85})`;
                    }
                    ctx.fillText(token, tx, ly);
                    tx += ctx.measureText(token).width;
                });
            });
        };

        const drawWindow = (win: EditorWindow, I: number, baseAlpha: number) => {
            const sample = CODE_SAMPLES[win.sampleIdx];
            const w = 340;
            const h = 200;
            const xOffset = (win.z * 10);
            const yOffset = (win.z * 8);
            const x = win.x + xOffset;
            const y = win.y + yOffset;

            const scale = lerp(0.75, 1, win.z / (windowCount - 1));
            const alpha = win.opacity * baseAlpha * (0.3 + (win.z / windowCount) * 0.7);

            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale, scale);

            // Shadow
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 20;

            // Background
            ctx.fillStyle = 'rgba(1, 1, 13, 0.98)';
            ctx.fillRect(0, 0, w, h);
            ctx.shadowBlur = 0;

            // Border
            ctx.strokeStyle = `rgba(184, 184, 255, ${alpha * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.strokeRect(0, 0, w, h);

            // Tab Bar
            ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.12})`;
            ctx.fillRect(0, 0, w, 22);

            // Active Tab UI
            ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.8})`;
            ctx.fillRect(10, 20, 60, 2);
            ctx.fillRect(w / 2 + 10, 20, 60, 2);

            // Buttons
            [10, 22, 34].forEach(bx => {
                ctx.fillStyle = `rgba(184, 184, 255, ${alpha * 0.25})`;
                ctx.beginPath();
                ctx.arc(bx, 11, 3, 0, Math.PI * 2);
                ctx.fill();
            });

            // Split Bar
            ctx.strokeStyle = `rgba(184, 184, 255, ${alpha * 0.1})`;
            ctx.beginPath(); ctx.moveTo(w / 2, 22); ctx.lineTo(w / 2, h); ctx.stroke();

            renderCode(sample.left, 28, 40, alpha);
            renderCode(sample.right, w / 2 + 28, 40, alpha);

            ctx.restore();
        };

        const swapInterval = 180;

        const draw = () => {
            if (!isVisible) return;
            rafId = requestAnimationFrame(draw);

            const { width: w, height: h } = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, w, h);

            const isActive = activeRef.current;
            const targetIntensity = isActive ? 1 : 0.45;
            glowOpacity = lerp(glowOpacity, targetIntensity, 0.08);
            const I = glowOpacity;

            const baseAlpha = lerp(0.3, 0.95, I);

            // 1. Background Atmosphere Elements
            // Deep Radial Glow
            const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.8);
            g.addColorStop(0, `rgba(184, 184, 255, ${lerp(0.02, 0.1, I)})`);
            g.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            // Technical Grid/Wireframe
            ctx.beginPath();
            ctx.strokeStyle = `rgba(184, 184, 255, ${lerp(0.015, 0.045, I)})`;
            ctx.lineWidth = 0.45;
            const gridSize = 50;
            for (let x = 0; x < w; x += gridSize) {
                ctx.moveTo(x, 0); ctx.lineTo(x, h);
                for (let y = 0; y < h; y += gridSize) {
                    if (x === 0) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
                    // Small technical nodes
                    if (isActive && Math.random() > 0.985) {
                        ctx.save();
                        ctx.fillStyle = `rgba(184, 184, 255, ${baseAlpha * 0.12})`;
                        ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();
                        ctx.restore();
                    }
                }
            }
            ctx.stroke();

            // Vertical Data Streams
            for (let i = 0; i < 7; i++) {
                const streamX = (w * (i + 1) / 8) + Math.sin(frame * 0.012 + i) * 25;
                const streamAlpha = lerp(0.012, 0.06, I);
                ctx.strokeStyle = `rgba(184, 184, 255, ${streamAlpha})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath(); ctx.moveTo(streamX, 0); ctx.lineTo(streamX, h); ctx.stroke();

                // Moving pulses on streams
                const pulseY = (frame * (1.8 + i % 4) + i * 150) % h;
                const pg = ctx.createLinearGradient(0, pulseY - 25, 0, pulseY + 25);
                pg.addColorStop(0, 'rgba(0,0,0,0)');
                pg.addColorStop(0.5, `rgba(184, 184, 255, ${streamAlpha * 4.5})`);
                pg.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = pg;
                ctx.fillRect(streamX - 1.2, pulseY - 25, 2.4, 50);
            }

            // 2. Window Animation Logic
            if (frame % swapInterval === 0 && frame > 0) {
                const front = windows.reduce((prev, curr) => (curr.z > prev.z ? curr : prev));
                front.targetZ = 0;
                front.targetX = 10;
                front.targetY = 20;
                front.sampleIdx = (front.sampleIdx + windowCount) % CODE_SAMPLES.length;

                windows.forEach(win => {
                    if (win.id !== front.id) {
                        win.targetZ = win.z + 1;
                        win.targetX = 10;
                        win.targetY = 20;
                    }
                });
            }

            windows.forEach(win => {
                win.z = lerp(win.z, win.targetZ, 0.08);
                win.x = lerp(win.x, win.targetX, 0.05);
                win.y = lerp(win.y, win.targetY, 0.05);
                const isSwapping = Math.abs(win.z - win.targetZ) > 0.1 && win.targetZ === 0;
                win.opacity = lerp(win.opacity, isSwapping ? 0.3 : 1, 0.1);
            });

            // 3. Editor Windows Rendering
            const sortedWindows = [...windows].sort((a, b) => a.z - b.z);
            sortedWindows.forEach(win => drawWindow(win, I, baseAlpha));

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
