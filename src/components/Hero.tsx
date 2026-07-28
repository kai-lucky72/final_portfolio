'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { FiMail } from 'react-icons/fi';
import { heroContent, heroFloatingIcons, contactInfo } from "@/constants/siteData";

export default function Hero() {
    const [showDuplicate, setShowDuplicate] = useState(false);
    const [showStar, setShowStar] = useState(false);
    const [showDots, setShowDots] = useState(false);

    const [showRightCard, setShowRightCard] = useState(false);
    const [showIcons, setShowIcons] = useState(false);

    // Liquid Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // New state for ping-pong icon animation
    const [activeIconIndex, setActiveIconIndex] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Ping-pong loop effect for icons
    useEffect(() => {
        let currentIndex = 0;
        // Ping-pong sequence for icons: 0 -> 1 -> 2 -> 1 -> 0
        const sequence = [0, 1, 2, 1, 0];

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sequence.length;
            setActiveIconIndex(sequence[currentIndex]);
        }, 1500); // 1.5s for each step for visibility

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

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
            const flyCount = 50;
            flies = [];
            for (let i = 0; i < flyCount; i++) {
                flies.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height, // Full screen (delocalized)
                    size: Math.random() * 1 + 0.5, // Thin but visible (0.5 to 1.5)
                    speedX: (Math.random() - 0.5) * 1.5,
                    speedY: (Math.random() - 0.5) * 1.5,
                    angle: Math.random() * Math.PI * 2,
                    angleSpeed: (Math.random() - 0.5) * 0.1
                });
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createFlies();
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            flies.forEach(fly => {
                // Update position with some erratic movement
                fly.angle += fly.angleSpeed;
                fly.x += fly.speedX + Math.cos(fly.angle) * 0.5;
                fly.y += fly.speedY + Math.sin(fly.angle) * 0.5;

                // Wrap around screen horizontally
                if (fly.x < -10) fly.x = canvas.width + 10;
                if (fly.x > canvas.width + 10) fly.x = -10;

                // Full screen wrap for Y (delocalized)
                if (fly.y < -10) fly.y = canvas.height + 10;
                if (fly.y > canvas.height + 10) fly.y = -10;

                // Draw fly (rect for sharpness)
                ctx.fillStyle = `rgba(26, 26, 46, ${Math.random() * 0.2 + 0.8})`; // Very strong opacity (0.8-1.0)
                ctx.fillRect(fly.x, fly.y, fly.size, fly.size); // Sharp square
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
        exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
    };



    useEffect(() => {
        const runAnimationCycle = () => {
            // 1. Start: Star, Dots, and Icons appear
            setShowStar(true);
            setShowDots(true);
            setShowIcons(true);

            // 2. Dots disappear, Card appears (after 1s)
            const cardTimer = setTimeout(() => {
                setShowDots(false);
                setShowDuplicate(true);
            }, 1000);

            // 3. Card disappears (after 3s total time, 2s visible)
            const hideCardTimer = setTimeout(() => {
                setShowDuplicate(false);
            }, 3000);

            // 4. Star disappears (after 3.5s)
            const hideStarTimer = setTimeout(() => {
                setShowStar(false);
            }, 3500);

            // 5. Right Card appears (staggered, e.g. at 2s)
            const rightCardTimer = setTimeout(() => {
                setShowRightCard(true);
            }, 2000);

            // 6. Right Card disappears (at 4s)
            const hideRightCardTimer = setTimeout(() => {
                setShowRightCard(false);
            }, 4000);

            // 7. Icons disappear (after 4.5s)
            const hideIconsTimer = setTimeout(() => {
                setShowIcons(false);
            }, 4500);

            return { cardTimer, hideCardTimer, hideStarTimer, hideIconsTimer, rightCardTimer, hideRightCardTimer };
        };

        const initialTimer = setTimeout(() => {
            let timers = runAnimationCycle();

            // Loop every 5 seconds
            const loopInterval = setInterval(() => {
                timers = runAnimationCycle();
            }, 5000);

            return () => {
                if (timers) {
                    clearTimeout(timers.cardTimer);
                    clearTimeout(timers.hideCardTimer);
                    clearTimeout(timers.hideStarTimer);
                    clearTimeout(timers.hideIconsTimer);
                    clearTimeout(timers.rightCardTimer);
                    clearTimeout(timers.hideRightCardTimer);
                }
                clearInterval(loopInterval);
            };
        }, 1000);

        return () => clearTimeout(initialTimer);
    }, []);

    return (
        <section id="hero" className="relative w-full min-h-screen bg-[#01010d] text-white overflow-hidden flex flex-col items-center justify-center py-20">

            {/* Flying Dots Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ opacity: 1 }} // Subtle global opacity
            />

            {/* Radial Light - Deep Blue Power */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#02021a]/40 rounded-full blur-[100px] z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#01010d]/80 rounded-full blur-[80px] z-0 pointer-events-none" />

            {/* Center Power Glow (New) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] opacity-100 z-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, #01010d 0%, transparent 60%)' }} />

            {/* Background Image */}
            <div
                style={{
                    position: 'absolute',
                    borderRadius: 'inherit',
                    // @ts-expect-error - Custom spring types
                    cornerShape: 'inherit',
                    inset: '0px'
                }}
            >
                <div
                    style={{
                        filter: 'grayscale(1)',
                        opacity: 0.4,
                        pointerEvents: 'none',
                        zIndex: 0,
                        flex: 'none',
                        width: '2458px',
                        height: '1701px',
                        position: 'absolute',
                        top: 'calc(55.75% - 850.5px)',
                        left: 'calc(50% - 1229px)'
                    }}
                >
                    <img
                        decoding="auto"
                        src="/images/download.avif"
                        alt=""
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            borderRadius: 'inherit',
                            // @ts-expect-error - Custom spring types
                            cornerShape: 'inherit',
                            objectPosition: 'center center',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(75% 64% at 50% 50%, #fff0 17.5676%, #01010d 100%)' }} />

            {/* Additional Dark Overlay (Step 579) */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, background: 'radial-gradient(75% 64% at 50% 50%, #fff0 17.5676%, #04070d 100%)' }} />

            {/* Dot Pattern (Subtle) */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(80,80,138,0.2)_1px,transparent_1px)] bg-[size:5px_5px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] z-0 pointer-events-none" />

            {/* Floating UI Elements Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none">

                {/* Floating Icons Row (Top Right) */}
                <AnimatePresence>
                    {showIcons && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-64 right-[10%] z-0 w-[300px] h-20 overflow-hidden"
                            style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
                        >
                            <motion.div
                                className="flex items-center gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                animate={{ x: 108 - (activeIconIndex * 72) }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            >
                                {heroFloatingIcons.map((icon, index) => {
                                    const isActive = index === activeIconIndex;
                                    return (
                                        <div
                                            key={index}
                                            className={`relative w-12 h-12 border border-[#181825] backdrop-blur-md transition-all duration-500 flex items-center justify-center 
                                        ${isActive ? 'opacity-100' : 'opacity-30'}`}
                                        >
                                            <div className="absolute -top-px -left-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -top-px -left-px w-[3px] h-[1px] bg-white"></div>
                                            <div className="absolute -top-px -right-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -top-px -right-px w-[3px] h-[1px] bg-white"></div>
                                            <div className="absolute -bottom-px -left-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -bottom-px -left-px w-[3px] h-[1px] bg-white"></div>
                                            <div className="absolute -bottom-px -right-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -bottom-px -right-px w-[3px] h-[1px] bg-white"></div>

                                            <svg className={`w-6 h-6 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={icon.path} />
                                            </svg>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Lower Left Blurred Icons (Inverted Flow) */}
                <AnimatePresence>
                    {showIcons && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-32 left-[10%] z-0 w-[300px] h-20 overflow-hidden"
                            style={{ filter: 'blur(2px)', maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
                        >
                            <motion.div
                                className="flex items-center gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                animate={{ x: -108 + (activeIconIndex * 72) }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            >
                                {heroFloatingIcons.map((icon, index) => {
                                    const isActive = index === activeIconIndex;
                                    return (
                                        <div
                                            key={index}
                                            className={`relative w-12 h-12 border border-[#181825] backdrop-blur-md transition-all duration-500 flex items-center justify-center 
                                        ${isActive ? 'opacity-100' : 'opacity-30'}`}
                                        >
                                            <div className="absolute -top-px -left-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -top-px -left-px w-[3px] h-[1px] bg-white"></div>
                                            <div className="absolute -top-px -right-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -top-px -right-px w-[3px] h-[1px] bg-white"></div>
                                            <div className="absolute -bottom-px -left-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -bottom-px -left-px w-[3px] h-[1px] bg-white"></div>
                                            <div className="absolute -bottom-px -right-px w-[1px] h-[3px] bg-white"></div>
                                            <div className="absolute -bottom-px -right-px w-[3px] h-[1px] bg-white"></div>

                                            <svg className={`w-6 h-6 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={icon.path} />
                                            </svg>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Google Meet Card */}
                <div
                    className="absolute top-[calc(50%-100px)] left-[calc(50%-550px)] flex flex-row items-center w-[300px] gap-2 opacity-90 z-20"
                >
                    <div className="flex flex-row items-center h-full w-full gap-2">
                        <div className="relative transform-none items-center flex opacity-100 flex-shrink-0">
                            <div
                                className="relative backdrop-blur-[5px] opacity-100 max-w-[250px] transform-none p-2  bg-transparent"
                                style={{
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderColor: '#181825'
                                }}
                            >
                                <div className="opacity-70 transform-none">
                                    <p className="text-xs text-[#0099ff] decoration-[#0099ff] leading-relaxed">
                                        <span className="text-gray-500">{heroContent.meetCardText}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-10 h-10 bg-transparent border border-[#181825] backdrop-blur-md flex items-center justify-center flex-shrink-0">
                            <div className="absolute -top-[1px] -left-px w-[3px] h-[1px] bg-white " />
                            <div className="absolute -top-[1px] -left-px w-[1px] h-[3px] bg-white " />
                            <div className="absolute -top-px -right-px w-[3px] h-[1px] bg-white " />
                            <div className="absolute -top-px -right-px w-[1px] h-[3px] bg-white " />
                            <div className="absolute -bottom-px -left-px w-[3px] h-[1px] bg-white " />
                            <div className="absolute -bottom-px -left-px w-[1px] h-[3px] bg-white " />
                            <div className="absolute -bottom-px -right-px w-[3px] h-[1px] bg-white " />
                            <div className="absolute -bottom-px -right-px w-[1px] h-[3px] bg-white " />
                            <svg className="w-5 h-5 text-white opacity-100" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Right Side Mirrored Card (Lucky) */}
                <AnimatePresence>
                    {showRightCard && (
                        <motion.div
                            key="right-card"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0, transition: { duration: 0.5 } }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="absolute top-[calc(50%+50px)] right-[calc(50%-550px)] flex flex-row items-center w-[300px] gap-2 z-20"
                            style={{ filter: 'blur(2px)' }}
                        >
                            <div className="flex flex-row items-center h-full w-full gap-2">
                                <div className="relative w-7 h-7 bg-transparent border border-[#181825] backdrop-blur-md flex items-center justify-center flex-shrink-0">
                                    <div className="absolute -top-px -left-px w-0.5 h-0.5 bg-white " />
                                    <div className="absolute -top-px -right-px w-0.5 h-0.5 bg-white " />
                                    <div className="absolute -bottom-px -left-px w-0.5 h-0.5 bg-white " />
                                    <div className="absolute -bottom-px -right-px w-0.5 h-0.5 bg-white " />
                                    <svg className="w-5 h-5 text-white opacity-100" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>

                                <div className="relative transform-none items-center flex opacity-100 flex-shrink-0">
                                    <div
                                        className="relative backdrop-blur-[5px] opacity-100 max-w-[250px] transform-none p-2 bg-transparent"
                                        style={{
                                            borderWidth: '1px',
                                            borderStyle: 'solid',
                                            borderColor: '#181825'
                                        }}
                                    >
                                        <div className="opacity-70 transform-none">
                                            <p className="text-xs text-[#0099ff] decoration-[#0099ff] leading-relaxed">
                                                <span className="text-gray-500">{heroContent.meetCardText}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated Duplicate Group */}
                <div className="absolute top-[calc(50%-20px)] left-[calc(50%-610px)] flex flex-row items-center gap-0 z-10 pointer-events-none">
                    <div className="relative w-[60px] min-h-15 flex-shrink-0 flex items-center justify-center">
                        <AnimatePresence>
                            {showStar && (
                                <motion.div
                                    key="star-decor"
                                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0, opacity: 0, rotate: 45, transition: { duration: 0.3 } }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="relative w-7 h-7 -top-[4px] bg-transparent border border-[#181825] backdrop-blur-md flex items-center justify-center"
                                >
                                    <div className="absolute -top-[1px] -left-px w-[3px] h-[1px] bg-white " />
                                    <div className="absolute -top-[1px] -left-px w-[1px] h-[3px] bg-white " />
                                    <div className="absolute -top-px -right-px w-[3px] h-[1px] bg-white " />
                                    <div className="absolute -top-px -right-px w-[1px] h-[3px] bg-white " />
                                    <div className="absolute -bottom-px -left-px w-[3px] h-[1px] bg-white " />
                                    <div className="absolute -bottom-px -left-px w-[1px] h-[3px] bg-white " />
                                    <div className="absolute -bottom-px -right-px w-[3px] h-[1px] bg-white " />
                                    <div className="absolute -bottom-px -right-px w-[1px] h-[3px] bg-white " />
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" fill="#181825" fillOpacity="0.6" />
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showDots && (
                                <motion.div
                                    key="loading-dots"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                    className="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-1.5 items-center"
                                >
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1.5 h-1.5 bg-gray-300 rounded-full"
                                            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: i * 0.15
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {showDuplicate && (
                            <motion.div
                                key="duplicate-card"
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="relative flex flex-row items-center w-[300px] gap-2 ml-4"
                            >
                                <div className="flex flex-row items-center h-full w-full gap-2">
                                    <div className="relative transform-none items-center flex opacity-100 flex-shrink-0">
                                        <div
                                            className="relative backdrop-blur-[5px] opacity-100 max-w-[250px] transform-none p-2 bg-transparent"
                                            style={{
                                                borderWidth: '1px',
                                                borderStyle: 'solid',
                                                borderColor: '#181825'
                                            }}
                                        >
                                            <div className="opacity-70 transform-none">
                                                <p className="text-xs text-[#0099ff] decoration-[#0099ff] leading-relaxed">
                                                    <span className="text-gray-500">{heroContent.meetCardText}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative w-10 h-10 bg-transparent border border-[#181825] backdrop-blur-md flex items-center justify-center flex-shrink-0">
                                        <div className="absolute -top-[1px] -left-px w-[3px] h-[1px] bg-white " />
                                        <div className="absolute -top-[1px] -left-px w-[1px] h-[3px] bg-white " />
                                        <div className="absolute -top-px -right-px w-[3px] h-[1px] bg-white " />
                                        <div className="absolute -top-px -right-px w-[1px] h-[3px] bg-white " />
                                        <div className="absolute -bottom-px -left-px w-[3px] h-[1px] bg-white " />
                                        <div className="absolute -bottom-px -left-px w-[1px] h-[3px] bg-white " />
                                        <div className="absolute -bottom-px -right-px w-[3px] h-[1px] bg-white " />
                                        <div className="absolute -bottom-px -right-px w-[1px] h-[3px] bg-white " />
                                        <svg className="w-5 h-5 text-white opacity-100" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Creative Corner Animations */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <motion.div
                    className="absolute top-10 left-5 sm:left-8 md:top-20 md:left-20 opacity-40"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="w-24 h-[1px] bg-gradient-to-r from-[#181825]/30 to-transparent" />
                    <div className="w-[1px] h-24 bg-gradient-to-b from-[#181825]/30 to-transparent" />
                    <motion.div
                        className="absolute top-0 left-0 w-2 h-2 bg-[#01010d] shadow-[0_0_10px_#181825]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>

                <motion.div
                    className="absolute top-10 right-5 sm:right-8 md:top-20 md:right-20 opacity-40"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#181825]/30 to-transparent" />
                    <div className="absolute top-0 right-0 w-[1px] h-24 bg-gradient-to-b from-[#181825]/30 to-transparent" />
                    <motion.div
                        className="absolute top-0 right-0 w-2 h-2 bg-[#01010d]  shadow-[0_0_10px_#181825]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-5 sm:left-8 md:bottom-12 md:left-20 opacity-40"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-[#181825]/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-[1px] h-24 bg-gradient-to-t from-[#181825]/30 to-transparent" />
                    <motion.div
                        className="absolute bottom-0 left-0 w-2 h-2 bg-[#01010d]  shadow-[0_0_10px_#181825]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                </motion.div>

                <motion.div
                    className="absolute bottom-8 right-5 sm:right-8 md:bottom-12 md:right-20 opacity-40"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#181825]/30 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-24 bg-gradient-to-t from-[#181825]/30 to-transparent" />
                    <motion.div
                        className="absolute bottom-0 right-0 w-2 h-2 bg-[#01010d]  shadow-[0_0_10px_#181825]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="relative z-20 flex flex-col items-center text-center max-w-screen-2xl px-4 space-y-4">
                {/* Triangular Badge Structure */}
                <div className="flex flex-col items-center gap-4 w-full max-w-screen-2xl mx-auto mb-4">
                    {/* Top Centered Badge */}
                    {/* Top Centered Badge - High Fidelity Standard */}
                    <div className="relative w-fit h-[38px] z-10 group/badge">
                        <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-2 gap-2 text-gray-600">
                            <div className="relative w-3 h-3 flex items-center justify-center">
                                <motion.div
                                    className="absolute w-full h-full bg-[rgba(240,240,255,0.5)] rounded-full shadow-[0_0_15px_#f0f0ff]"
                                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute w-full h-full bg-[rgba(240,240,255,0.3)] rounded-full shadow-[0_0_15px_#f0f0ff]"
                                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: 2 }}
                                />
                                <div className="relative w-2 h-2 bg-[rgb(240,240,255)] rounded-full shadow-[0_0_8px_rgba(240,240,255,0.8)]"></div>
                            </div>
                            <span className="uppercase text-white font-medium tracking-wide text-[10px] md:text-sm whitespace-nowrap">
                                <span>{heroContent.badge}</span>
                            </span>

                            {heroContent.badgeIcon && (
                                <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={heroContent.badgeIcon} />
                                </svg>
                            )}
                            {/* Corner Dots */}
                            <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                        </div>
                    </div>

                    {/* Bottom Sub-Badges (Sides) */}
                    <div className="grid grid-cols-2 w-full gap-32 md:gap-[300px] justify-between md:px-0">
                        <div className="flex justify-end pr-2 md:pr-0">
                            <div className="relative px-3 py-1 border-y border-[#181825] bg-[#01010d] text-[9px] md:text-[11px] font-medium tracking-wide flex items-center gap-2 text-gray-500">
                                <span className="md:hidden">Security</span>
                                <span className="hidden md:inline">{heroContent.subLabels[0].text}</span>
                                {heroContent.subLabels[0].icon && (
                                    <svg className="w-3 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={heroContent.subLabels[0].icon} />
                                    </svg>
                                )}
                                {/* Side Glows */}
                                <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                            </div>
                        </div>
                        <div className="flex justify-start pl-2 md:pl-0">
                            <div className="relative px-3 py-1 border-y border-[#181825] bg-[#01010d] text-[9px] md:text-[11px] font-medium tracking-wide flex items-center gap-2 text-gray-500">
                                <span className="md:hidden">Embedded</span>
                                <span className="hidden md:inline">{heroContent.subLabels[1].text}</span>
                                {heroContent.subLabels[1].icon && (
                                    <svg className="w-3 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={heroContent.subLabels[1].icon} />
                                    </svg>
                                )}
                                {/* Side Glows */}
                                <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                    <div className="relative w-32 h-32 md:w-[148px] md:h-[148px] flex-shrink-0 group">
                        <div className="absolute inset-0 border border-[#181825] z-0"></div>

                        <motion.div
                            className="absolute -top-2 -left-2 w-2 h-2 z-20"
                            animate={{ x: [0, -4, 0, 0], y: [0, -4, 0, 0] }}
                            transition={{ duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity }}
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute top-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>

                        <motion.div
                            className="absolute -top-2 -right-2 w-2 h-2 z-20"
                            animate={{ x: [0, 4, 0, 0], y: [0, -4, 0, 0] }}
                            transition={{ duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity }}
                        >
                            <div className="absolute top-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-2 -left-2 w-2 h-2 z-20"
                            animate={{ x: [0, -4, 0, 0], y: [0, 4, 0, 0] }}
                            transition={{ duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity }}
                        >
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-2 -right-2 w-2 h-2 z-20"
                            animate={{ x: [0, 4, 0, 0], y: [0, 4, 0, 0] }}
                            transition={{ duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity }}
                        >
                            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                        </motion.div>

                        <div className="absolute inset-0 m-auto w-[75%] h-[75%]">
                            <div
                                className="relative w-full h-full bg-[#01010d] flex items-center justify-center overflow-hidden z-0"
                                style={{
                                    boxShadow: "rgba(80, 80, 138, 0.73) 0px 0.706592px 0.706592px -0.666667px, rgba(80, 80, 138, 0.71) 0px 1.80656px 1.80656px -1.33333px, rgba(80, 80, 138, 0.68) 0px 3.62176px 3.62176px -2px, rgba(80, 80, 138, 0.62) 0px 6.8656px 6.8656px -2.66667px, rgba(80, 80, 138, 0.49) 0px 13.6468px 13.6468px -3.33333px, rgba(80, 80, 138, 0.19) 0px 30px 30px -4px",
                                    opacity: 1
                                }}
                            >
                                <div className="relative z-10 w-[55%] h-[55%] bg-white flex items-center justify-center">
                                    <div className="w-[50%] h-[50%] bg-[#01010d]"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#01010d] shadow-[0_9px_20px_#181825] z-20 overflow-hidden"></div>
                        </div>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-sm">
                        {heroContent.name}
                    </h1>
                </div>

                <p className="max-w-2xl text-gray-400 mt-10x text-lg md:text-xl font-light leading-relaxed tracking-wide">
                    {heroContent.description}
                </p>

                {/* CTA Button Container (Direct.tsx Style) */}
                <div className="w-full mt-10 max-w-[840px] flex items-center justify-center gap-[32px] p-[40px] border-t-[2px] border-[#181825]/20 relative box-border mx-auto">
                    {/* Top Glow Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0" style={{ background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    <motion.a
                        initial="initial"
                        whileHover="hover"
                        href={contactInfo.contactFormLink}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        onMouseMove={handleMouseMove}
                        className="relative w-full md:w-fit py-4 px-8 cursor-pointer border border-[#b8b8ff]/40 bg-[#01010d] text-white uppercase tracking-[0.2em] font-medium text-xs hover:border-[#18182560] transition-all shadow-[inset_0px_0px_12px_0px_rgba(105,105,150,0.4)] group flex items-center justify-center gap-2"
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

                        <FiMail className="w-5 h-5 relative z-20" />
                        <span className="relative z-20">{heroContent.ctaText}</span>
                    </motion.a>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 w-full h-[200px] backdrop-blur-[10px] z-20 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
            />

            <div className="absolute bottom-0 left-0 w-full flex justify-center z-30">
                <div className="w-full border-b border-[#181825]"></div>
            </div>
        </section>
    );
}
