"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import { socialLinks, footerContent, contactInfo, navLinks } from "@/constants/siteData";

export default function Footer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { name, statement, ctaButtonText, copyright } = footerContent;

    // Liquid Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const buttonGlow = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, rgba(184, 184, 255, 0.12), transparent 80%)`;

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Intersection Observer for Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(canvas);

        let animationFrameId: number;
        let flies: Fly[] = [];

        interface Fly {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            angle: number;
            angleSpeed: number;
        }

        const createFlies = () => {
            const flyCount = 100;
            flies = [];
            for (let i = 0; i < flyCount; i++) {
                flies.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1 + 0.5,
                    speedX: (Math.random() - 0.5) * 1.5,
                    speedY: (Math.random() - 0.5) * 1.5,
                    angle: Math.random() * Math.PI * 2,
                    angleSpeed: (Math.random() - 0.5) * 0.1
                });
            }
        };

        const resizeCanvas = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
                createFlies();
            }
        };

        const animate = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            flies.forEach(fly => {
                fly.angle += fly.angleSpeed;
                fly.x += fly.speedX + Math.cos(fly.angle) * 0.5;
                fly.y += fly.speedY + Math.sin(fly.angle) * 0.5;
                if (fly.x < -10) fly.x = canvas.width + 10;
                if (fly.x > canvas.width + 10) fly.x = -10;
                if (fly.y < -10) fly.y = canvas.height + 10;
                if (fly.y > canvas.height + 10) fly.y = -10;
                ctx.fillStyle = `rgba(220, 220, 255, ${Math.random() * 0.2 + 0.8})`;
                ctx.fillRect(fly.x, fly.y, fly.size, fly.size);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (!animationFrameId) animate();
        };

        const stopAnimation = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = 0;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            stopAnimation();
            observer.disconnect();
        };
    }, []);

    return (
        <motion.footer
            initial="initial"
            whileHover="hover"
            className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden py-20 min-h-[600px]"
        >
            {/* 1. Background Layers (from Hero) */}

            {/* Flying Dots Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ opacity: 0.6 }}
            />

            {/* Radial Light - Deep Blue Power */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f0f0f8]/40 rounded-full blur-[100px] z-0 pointer-events-none" />

            {/* Center Power Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] opacity-100 z-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, #01010d 0%, transparent 60%)' }} />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(75% 64% at 50% 50%, #fff0 17.5676%, #01010d 100%)' }} />

            {/* Additional Dark Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(75% 64% at 50% 50%, #fff0 17.5676%, #04070d 100%)' }} />

            {/* Dot Pattern (Subtle) */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(80,80,138,0.2)_1px,transparent_1px)] bg-[size:5px_5px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] z-0 pointer-events-none" />

            {/* Corner Animations */}
            {/* Top Left */}
            <motion.div
                variants={{
                    initial: { opacity: 1, x: 0, y: 0 },
                    hover: {
                        opacity: 1,
                        x: [0, -3, 0, 0],
                        y: [0, -3, 0, 0],
                        transition: {
                            x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            opacity: { duration: 0.2 }
                        }
                    }
                }}
                className="absolute top-[-1px] left-[-1px] w-2 h-2 z-20"
            >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                <div className="absolute top-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
            </motion.div>
            {/* Top Right */}
            <motion.div
                variants={{
                    initial: { opacity: 1, x: 0, y: 0 },
                    hover: {
                        opacity: 1,
                        x: [0, 3, 0, 0],
                        y: [0, -3, 0, 0],
                        transition: {
                            x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            opacity: { duration: 0.2 }
                        }
                    }
                }}
                className="absolute top-[-1px] right-[-1px] w-2 h-2 z-20"
            >
                <div className="absolute top-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                <div className="absolute top-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
            </motion.div>
            {/* Bottom Left */}
            <motion.div
                variants={{
                    initial: { opacity: 1, x: 0, y: 0 },
                    hover: {
                        opacity: 1,
                        x: [0, -3, 0, 0],
                        y: [0, 3, 0, 0],
                        transition: {
                            x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            opacity: { duration: 0.2 }
                        }
                    }
                }}
                className="absolute bottom-[-1px] left-[-1px] w-2 h-2 z-20"
            >
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                <div className="absolute bottom-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
            </motion.div>
            {/* Bottom Right */}
            <motion.div
                variants={{
                    initial: { opacity: 1, x: 0, y: 0 },
                    hover: {
                        opacity: 1,
                        x: [0, 3, 0, 0],
                        y: [0, 3, 0, 0],
                        transition: {
                            x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                            opacity: { duration: 0.2 }
                        }
                    }
                }}
                className="absolute bottom-[-1px] right-[-1px] w-2 h-2 z-20"
            >
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
            </motion.div>

            {/* Top Border Accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#181825] to-transparent z-10"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#181825] via-[#181825]/30 to-[#181825] z-10"></div>

            {/* 1.5. Background Decorations (Circular Rotating Blueprint Groups) */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Top Left Blueprint Group */}
                <motion.div
                    className="absolute top-[10%] left-[10%] w-64 h-64 opacity-30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <div className="relative w-full h-full border border-white/20 rounded-full">
                        {/* 4 Strong Corner Terminals around the circle */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 border-t border-white/60"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-4 h-4 border-b border-white/60"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-4 h-4 border-l border-white/60"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-4 h-4 border-r border-white/60"></div>

                        {/* Internal Circular Grid */}
                        <div className="absolute inset-4 border border-white/10 rounded-full"></div>
                        <div className="absolute inset-12 border border-white/5 rounded-full"></div>

                        {/* Crosshair Lines */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10"></div>
                        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/10"></div>

                        {/* Decorative Active Dot */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-[#01010d] shadow-[0_0_10px_#181825] rounded-full"></div>
                    </div>
                </motion.div>

                {/* Bottom Right Blueprint Group */}
                <motion.div
                    className="absolute bottom-[10%] right-[10%] w-64 h-64 opacity-30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                >
                    <div className="relative w-full h-full border border-white/20 rounded-full">
                        {/* 4 Strong Corner Terminals around the circle */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 border-t border-white/60"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-4 h-4 border-b border-white/60"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-4 h-4 border-l border-white/60"></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-4 h-4 border-r border-white/60"></div>

                        {/* Internal Circular Grid */}
                        <div className="absolute inset-4 border border-white/10 rounded-full"></div>
                        <div className="absolute inset-12 border border-white/5 rounded-full"></div>

                        {/* Crosshair Lines */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10"></div>
                        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/10"></div>

                        {/* Decorative Active Dot */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#01010d] shadow-[0_0_10px_#181825] rounded-full"></div>
                    </div>
                </motion.div>

            </div>

            {/* 1.6. Background Massive Responsive Text */}
            <div className="absolute inset-x-0 bottom-[-2%] flex items-end justify-center z-5 pointer-events-none select-none overflow-hidden h-[60%] px-10">
                <div className="relative font-black text-white uppercase tracking-[-0.08em] md:tracking-[-0.1em] leading-none text-center w-full">
                    <div className="flex md:hidden justify-center items-baseline text-[22vw]">
                        {"KAGABO".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0.015 }}
                                whileHover={{ opacity: 0.15, textShadow: "0 0 40px rgba(255, 255, 255, 0.4)", color: "#ffffff", transition: { duration: 0.2 } }}
                                className="pointer-events-auto cursor-default inline-block px-[0.01em]"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                    <div className="hidden md:flex justify-center items-baseline text-[10vw]">
                        {"IRENE LUCKY".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0.015 }}
                                whileHover={{ opacity: 0.15, textShadow: "0 0 50px rgba(255, 255, 255, 0.4)", color: "#ffffff", transition: { duration: 0.2 } }}
                                className="pointer-events-auto cursor-default inline-block px-[0.01em]"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Main Content (z-20 to appear above animation layers) */}
            <div className="relative w-[90%] max-w-[1200px]  flex flex-col items-center sm:py-20 px-5 md:px-[40px] z-20">
                {/* Container Bottom Terminals */}
                <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>


                <div className="flex items-center gap-8 mb-12">
                    {socialLinks.map((social: { name: string; href: string; icon: string }) => (
                        <React.Fragment key={social.name}>
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-300"
                            >
                                <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={social.icon} />
                                </svg>
                            </a>
                            {social.name !== socialLinks[socialLinks.length - 1].name && (
                                <div className="w-[1px] h-6 bg-[#181825]"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* 2. Logo & Brand Name */}
                <motion.div
                    whileHover="hover"
                    initial="initial"
                    className="flex items-center gap-6 mb-8 group cursor-default"
                >
                    {/* Small Glowing Logo Box (Replicating Hero Style) */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <div className="absolute inset-0 border border-[#181825]"></div>

                        {/* Animated Corners */}
                        {/* Top Left */}
                        <motion.div
                            className="absolute -top-[2px] -left-[2px] w-2 h-2 z-20"
                            variants={{
                                initial: { opacity: 1, x: 0, y: 0 },
                                hover: {
                                    opacity: 1,
                                    x: [0, -4, 0, 0],
                                    y: [0, -4, 0, 0],
                                    transition: {
                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        opacity: { duration: 0.2 }
                                    }
                                }
                            }}
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/80"></div>
                            <div className="absolute top-0 left-0 w-[1px] h-full bg-white/80"></div>
                        </motion.div>

                        {/* Top Right */}
                        <motion.div
                            className="absolute -top-[2px] -right-[2px] w-2 h-2 z-20"
                            variants={{
                                initial: { opacity: 1, x: 0, y: 0 },
                                hover: {
                                    opacity: 1,
                                    x: [0, 4, 0, 0],
                                    y: [0, -4, 0, 0],
                                    transition: {
                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        opacity: { duration: 0.2 }
                                    }
                                }
                            }}
                        >
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-white/80"></div>
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-white/80"></div>
                        </motion.div>

                        {/* Bottom Left */}
                        <motion.div
                            className="absolute -bottom-[2px] -left-[2px] w-2 h-2 z-20"
                            variants={{
                                initial: { opacity: 1, x: 0, y: 0 },
                                hover: {
                                    opacity: 1,
                                    x: [0, -4, 0, 0],
                                    y: [0, 4, 0, 0],
                                    transition: {
                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        opacity: { duration: 0.2 }
                                    }
                                }
                            }}
                        >
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/80"></div>
                            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-white/80"></div>
                        </motion.div>

                        {/* Bottom Right */}
                        <motion.div
                            className="absolute -bottom-[2px] -right-[2px] w-2 h-2 z-20"
                            variants={{
                                initial: { opacity: 1, x: 0, y: 0 },
                                hover: {
                                    opacity: 1,
                                    x: [0, 4, 0, 0],
                                    y: [0, 4, 0, 0],
                                    transition: {
                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                        opacity: { duration: 0.2 }
                                    }
                                }
                            }}
                        >
                            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/80"></div>
                            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white/80"></div>
                        </motion.div>


                        {/* Inner Logo Box */}
                        <div className="absolute inset-0 m-auto w-[70%] h-[70%] bg-[#01010d] flex items-center justify-center border border-[#181825]">
                            {/* Inner Logo Corners (Subtle) */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

                            {/* The Logo (White Square with Black Hole) */}
                            <div className="w-[60%] h-[60%] bg-[#01010d] flex items-center justify-center">
                                <div className="w-[50%] h-[50%] bg-[#01010d]"></div>
                            </div>

                            {/* Blue Bottom Glow Line */}
                            <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#b8b8ff] shadow-[0_0_15px_rgba(184,184,255,0.8)] z-30"></div>
                        </div>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl opacity-90 transition-opacity group-hover:opacity-100">
                        {name}
                    </h2>
                </motion.div>

                {/* 3. Statement */}
                <p className="text-[#f0f0ff]/50 text-sm md:text-base font-light mb-8 max-w-xl text-center leading-relaxed">
                    {statement}
                </p>

                {/* 4. Footer Navigation Links (Header Style) */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                    {navLinks.map((link, index) => (
                        <div key={link.name} className="flex items-center gap-6">
                            <a
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.querySelector(link.href);
                                    if (element) {
                                        const top = element.getBoundingClientRect().top + window.pageYOffset - 56;
                                        window.scrollTo({ top, behavior: 'smooth' });
                                    }
                                }}
                                className="text-sm font-medium text-white/70 hover:text-white transition-opacity whitespace-nowrap cursor-pointer"
                            >
                                {link.name}
                            </a>
                            {index < navLinks.length - 1 && (
                                <div className="w-[3px] h-[3px] bg-[#01010d] rounded-full opacity-30"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 4. CTA Button Container (Direct.tsx Style) */}
                <div className="w-full sm:mt-20 max-w-[840px] flex flex-col md:flex-row items-center justify-between gap-[32px] px-0 md:px-[40px] py-[40px] border-t-[2px] border-white/20 relative box-border mx-auto mb-6 z-10">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0" style={{ background: 'radial-gradient(at center top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        initial="initial"
                        whileHover="hover"
                        href={contactInfo.calLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={handleMouseMove}
                        className="relative w-full md:w-fit py-4 px-8 cursor-pointer border border-[#b8b8ff]/40 bg-[#01010d] text-white uppercase tracking-[0.2em] font-medium text-xs hover:border-[#18182560] transition-all shadow-[inset_0px_0px_12px_0px_rgba(105,105,150,0.4)] group flex items-center justify-center md:justify-center gap-2 z-10"
                    >
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
                                    `,
                                }}
                            />
                            <motion.div
                                className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                                style={{
                                    background: buttonGlow,
                                }}
                            />
                        </div>

                        {/* Corner Accents */}
                        <motion.div
                            className="absolute -top-1 -left-1 w-2 h-2 z-20"
                            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute top-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>
                        <motion.div
                            className="absolute -top-1 -right-1 w-2 h-2 z-20"
                            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        >
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 -left-1 w-2 h-2 z-20"
                            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        >
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 -right-1 w-2 h-2 z-20"
                            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        >
                            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>

                        <FiCalendar className="w-5 h-5 relative z-20" />
                        <span className="relative z-20">{ctaButtonText}</span>
                    </motion.a>
                </div>



                {/* 6. Copyright Statement */}
                <div className="pt-8 border-t border-[#181825] w-full max-w-2xl text-center">
                    <p className="text-[12px] text-[#f0f0ff]/40 tracking-widest leading-loose">
                        Kagabo Irene Lucky © {new Date().getFullYear()}.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}
