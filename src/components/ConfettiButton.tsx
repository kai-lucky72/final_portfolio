"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface ConfettiButtonProps {
    isSubmitting: boolean;
    isSuccess: boolean;
    onClick?: (e: React.FormEvent) => void;
    type?: "button" | "submit" | "reset";
    text: string;
}

export default function ConfettiButton({ isSubmitting, isSuccess, onClick, type = "submit", text }: ConfettiButtonProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [status, setStatus] = useState<'ready' | 'loading' | 'complete'>('ready');

    // Mouse hover effect (matching portfolio style)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    useEffect(() => {
        if (isSubmitting) {
            setStatus('loading');
        } else if (isSuccess) {
            setStatus('complete');
            initBurst();
            setTimeout(() => {
                setStatus('ready');
            }, 4000);
        } else {
            setStatus('ready');
        }
    }, [isSubmitting, isSuccess]);

    // Confetti Logic
    const confettiCount = 20;
    const sequinCount = 10;
    const gravityConfetti = 0.3;
    const gravitySequins = 0.55;
    const dragConfetti = 0.075;
    const dragSequins = 0.02;
    const terminalVelocity = 3;

    const colors = [
        { front: '#7b5cff', back: '#6245e0' }, // Purple
        { front: '#b3c7ff', back: '#8fa5e5' }, // Light Blue
        { front: '#5c86ff', back: '#345dd1' }  // Darker Blue
    ];

    const confetti = useRef<any[]>([]);
    const sequins = useRef<any[]>([]);

    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const initConfettoVelocity = (xRange: [number, number], yRange: [number, number]) => {
        const x = randomRange(xRange[0], xRange[1]);
        const range = yRange[1] - yRange[0] + 1;
        let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
        if (y >= yRange[1] - 1) {
            y += (Math.random() < .25) ? randomRange(1, 3) : 0;
        }
        return { x: x, y: -y };
    };

    class Confetto {
        randomModifier = randomRange(0, 99);
        color = colors[Math.floor(randomRange(0, colors.length))];
        dimensions = { x: randomRange(5, 9), y: randomRange(8, 15) };
        position = { x: 0, y: 0 };
        rotation = randomRange(0, 2 * Math.PI);
        scale = { x: 1, y: 1 };
        velocity = initConfettoVelocity([-9, 9], [6, 11]);

        constructor(rect: DOMRect) {
            // Adjust position relative to viewport
            this.position = {
                x: randomRange(rect.left + rect.width / 4, rect.left + 3 * rect.width / 4),
                y: randomRange(rect.top + rect.height / 2 + 8, rect.top + rect.height + 8),
            };
        }

        update() {
            this.velocity.x -= this.velocity.x * dragConfetti;
            this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity);
            this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
        }
    }

    class Sequin {
        color = colors[Math.floor(randomRange(0, colors.length))].back;
        radius = randomRange(1, 2);
        position = { x: 0, y: 0 };
        velocity = { x: randomRange(-6, 6), y: randomRange(-8, -12) };

        constructor(rect: DOMRect) {
            // Adjust position relative to viewport
            this.position = {
                x: randomRange(rect.left + rect.width / 3, rect.left + 2 * rect.width / 3),
                y: randomRange(rect.top + rect.height / 2 + 8, rect.top + rect.height + 8),
            };
        }

        update() {
            this.velocity.x -= this.velocity.x * dragSequins;
            this.velocity.y = this.velocity.y + gravitySequins;
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    }

    const initBurst = () => {
        const canvas = canvasRef.current;
        const button = buttonRef.current;
        if (!canvas || !button) return;

        const rect = button.getBoundingClientRect();

        for (let i = 0; i < confettiCount; i++) {
            confetti.current.push(new Confetto(rect));
        }
        for (let i = 0; i < sequinCount; i++) {
            sequins.current.push(new Sequin(rect));
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.current.forEach((confetto) => {
                let width = (confetto.dimensions.x * confetto.scale.x);
                let height = (confetto.dimensions.y * confetto.scale.y);

                ctx.translate(confetto.position.x, confetto.position.y);
                ctx.rotate(confetto.rotation);
                confetto.update();
                ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
                ctx.fillRect(-width / 2, -height / 2, width, height);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            });

            sequins.current.forEach((sequin) => {
                ctx.translate(sequin.position.x, sequin.position.y);
                sequin.update();
                ctx.fillStyle = sequin.color;
                ctx.beginPath();
                ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            });

            confetti.current = confetti.current.filter(c => c.position.y < (window.innerHeight + 100));
            sequins.current = sequins.current.filter(s => s.position.y < (window.innerHeight + 100));

            animationFrameId = window.requestAnimationFrame(render);
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
            />
            <motion.button
                ref={buttonRef}
                type={type}
                disabled={isSubmitting}
                onMouseMove={handleMouseMove}
                onClick={onClick}
                initial="initial"
                whileHover="hover"
                className={`relative w-full py-4 cursor-pointer border border-[#b8b8ff]/40 bg-transparent text-white uppercase tracking-[0.2em] font-medium text-xs hover:border-[#18182560] transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-visible`}
            >
                {/* Internal container to handle background and overflow */}
                <div className="absolute inset-0 bg-[#01010d] shadow-[inset_0px_0px_12px_0px_rgba(105,105,150,0.4)] overflow-hidden z-0">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute inset-0 z-0 bg-[#01010d]"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        120% 180% at ${mouseX}px ${mouseY}px,
                                        #181825 0%,
                                        #01010d 100%
                                    )
                                `
                            }}
                        />
                        <motion.div
                            className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        180px at ${mouseX}px ${mouseY}px,
                                        rgba(184, 184, 255, 0.12),
                                        transparent 80%
                                    )
                                `,
                            }}
                        />
                    </div>
                </div>

                {/* Corner Accents - Correctly placed outside overflow-hidden */}
                <motion.div
                    className="absolute -top-1 -left-1 w-2.5 h-2.5 z-20 pointer-events-none"
                    variants={{ initial: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                </motion.div>
                <motion.div
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 z-20 pointer-events-none"
                    variants={{ initial: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute top-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                    <div className="absolute top-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                </motion.div>
                <motion.div
                    className="absolute -bottom-1 -left-1 w-2.5 h-2.5 z-20 pointer-events-none"
                    variants={{ initial: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                    <div className="absolute bottom-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                </motion.div>
                <motion.div
                    className="absolute -bottom-1 -right-1 w-2.5 h-2.5 z-20 pointer-events-none"
                    variants={{ initial: { opacity: 0, scale: 0.8 }, hover: { opacity: 1, scale: 1 } }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                    <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 w-full h-full flex items-center justify-center min-h-[1.5rem]">
                    {/* Submit Message - Icon Removed */}
                    <div className={`flex items-center justify-center transition-all duration-500 absolute ${status === 'ready' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                        <span className="button-text">
                            {text.split('').map((char, i) => (
                                <span key={i} className="inline-block transition-all duration-200" style={{ transitionDelay: `${i * 30}ms` }}>{char === ' ' ? '\u00A0' : char}</span>
                            ))}
                        </span>
                    </div>

                    {/* Loading Message */}
                    <div className={`flex items-center justify-center transition-all duration-500 absolute ${status === 'loading' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <svg className="w-6 h-4 fill-[#5c86ff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
                            <circle className="animate-bounce-dot" style={{ animationDelay: '0s' }} cx="2.2" cy="10" r="1.6" />
                            <circle className="animate-bounce-dot" style={{ animationDelay: '0.1s' }} cx="9.5" cy="10" r="1.6" />
                            <circle className="animate-bounce-dot" style={{ animationDelay: '0.2s' }} cx="16.8" cy="10" r="1.6" />
                        </svg>
                    </div>

                    {/* Success Message */}
                    <div className={`flex items-center gap-2 transition-all duration-500 absolute ${status === 'complete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <svg className="w-4 h-4 text-[#5cffa1]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11">
                            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="1.4,5.8 5.1,9.5 11.6,2.1 " />
                        </svg>
                        <span className="button-text">Success</span>
                    </div>
                </div>
            </motion.button>
            <style jsx>{`
                @keyframes loading-dot {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce-dot {
                    animation: loading-dot 0.8s infinite ease-in-out;
                }
            `}</style>
        </>
    );
}
