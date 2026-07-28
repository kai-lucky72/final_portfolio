"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FiMail } from 'react-icons/fi';
import { specializationsData, testimonialsData, reviewsContent } from "@/constants/siteData";
import Image from "next/image";

export default function Reviews() {
    const { badge, title, description } = reviewsContent;

    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused) {
                container.scrollLeft += 0.8; // Smooth slow scroll

                // Seamless loop: reset to 0 when we've scrolled past the first set
                // (scrollWidth / 2 is the exact middle for doubled data)
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    // Liquid Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section id="reviews" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#181825] via-[#181825]/30 to-[#181825] z-10"></div>

            {/* Background Image - Centered Fixed Size */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[853px] h-[628px] z-0 select-none pointer-events-none opacity-40"
                style={{
                    filter: 'brightness(1.24)',
                    mixBlendMode: 'normal'
                }}>
                <Image
                    src="/images/who%20we%20are.avif"
                    alt=""
                    fill
                    className="object-cover object-center"
                />
            </div>
            {/* Main Container with Left and Right Borders */}
            <div className="relative w-[90%] max-w-[1200px] border-l border-r border-[#181825] flex flex-col pt-[50px] pb-[10px] px-5 md:px-[40px] z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative flex flex-col items-center">
                        <div className="relative w-fit h-[30px] z-10">
                            <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-1 text-gray-500 pointer-events-auto cursor-default">
                                <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                                {/* Corner Dots - Static 1px as requested */}
                                <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                                <div className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                                <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                                <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-4xl text-white tracking-tight text-center">
                        {title}
                    </h2>
                    <p
                        className="max-w-2xl text-center text-white/60 text-lg md:text-xl leading-relaxed tracking-tight"
                    >
                        {description}
                    </p>
                </div>

                {/* Alternating Technical Specializations Grid */}
                <div className="flex flex-col gap-12 mt-12 mb-20">
                    {specializationsData.slice(0, 3).map((item, idx) => (
                        <div key={idx} className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Connecting Stroke */}
                            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-[#181825] z-0">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-[#01010d] shadow-[0_0_8px_rgba(240,240,255,0.6)]"></div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[2px] bg-[#01010d] shadow-[0_0_8px_rgba(240,240,255,0.6)]"></div>
                            </div>

                            {/* Image Part */}
                            <motion.div
                                initial="initial"
                                whileHover="hover"
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                variants={{
                                    initial: { opacity: 0, x: idx % 2 === 0 ? -20 : 20 },
                                    hover: {}
                                }}
                                className={`relative aspect-video md:aspect-auto md:h-[320px] border border-[#181825] order-1 group ${idx % 2 !== 0 ? 'md:order-2' : ''}`}
                            >
                                <div className="absolute inset-0 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.brand}
                                        fill
                                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>

                                {/* Corner Animations */}
                                {/* Top Left */}
                                <motion.div
                                    className="absolute -top-[1px] -left-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute top-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute top-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>
                                {/* Top Right */}
                                <motion.div
                                    className="absolute -top-[1px] -right-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute top-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute top-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>
                                {/* Bottom Left */}
                                <motion.div
                                    className="absolute -bottom-[1px] -left-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute bottom-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute bottom-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>
                                {/* Bottom Right */}
                                <motion.div
                                    className="absolute -bottom-[1px] -right-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute bottom-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute bottom-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>
                            </motion.div>

                            {/* Text Part */}
                            <motion.div
                                initial="initial"
                                whileHover="hover"
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                variants={{
                                    initial: { opacity: 0, x: idx % 2 === 0 ? 20 : -20 },
                                    hover: {}
                                }}
                                className={`relative p-6 md:p-8 md:h-[320px] border border-[#181825] bg-[#01010d] flex flex-col justify-center gap-4 order-2 ${idx % 2 !== 0 ? 'md:order-1' : ''}`}
                            >
                                {/* Slanted Glare Effect - Wrapped for clipping */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute top-0 left-0 h-[40px] z-0" style={{ width: 'calc(100% + 40px)', background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)', transform: 'translateX(-20px) rotate(-2deg)', transformOrigin: 'top left' }}></div>
                                </div>
                                {/* Corner Animations */}
                                {/* Top Left */}
                                <motion.div
                                    className="absolute -top-[1px] -left-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute top-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute top-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>
                                {/* Top Right */}
                                <motion.div
                                    className="absolute -top-[1px] -right-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute top-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute top-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>
                                {/* Bottom Left */}
                                <motion.div
                                    className="absolute -bottom-[1px] -left-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute bottom-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute bottom-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>
                                {/* Bottom Right */}
                                <motion.div
                                    className="absolute -bottom-[1px] -right-[1px] w-2 h-2 z-20"
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
                                >
                                    <div className="absolute bottom-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute bottom-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                </motion.div>

                                <div className="relative w-fit h-[22px] z-10">
                                    <div className="relative h-full border border-[#181825] bg-[#02020d] flex items-center px-3 py-1 text-gray-500">
                                        <span className="text-[10px] font-medium tracking-widest uppercase text-white opacity-80 whitespace-nowrap">{item.badge}</span>
                                        {/* Corner Animations */}
                                        {/* Top Left */}
                                        <motion.div
                                            variants={{
                                                initial: { opacity: 1, x: 0, y: 0 },
                                                hover: {
                                                    opacity: 1,
                                                    x: [0, -2, 0, 0],
                                                    y: [0, -2, 0, 0],
                                                    transition: {
                                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        opacity: { duration: 0.2 }
                                                    }
                                                }
                                            }}
                                            className="absolute top-[-1px] left-[-1px] w-2 h-2"
                                        >
                                            <div className="absolute top-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                            <div className="absolute top-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                        </motion.div>
                                        {/* Top Right */}
                                        <motion.div
                                            variants={{
                                                initial: { opacity: 1, x: 0, y: 0 },
                                                hover: {
                                                    opacity: 1,
                                                    x: [0, 2, 0, 0],
                                                    y: [0, -2, 0, 0],
                                                    transition: {
                                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        opacity: { duration: 0.2 }
                                                    }
                                                }
                                            }}
                                            className="absolute top-[-1px] right-[-1px] w-2 h-2"
                                        >
                                            <div className="absolute top-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                            <div className="absolute top-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                        </motion.div>
                                        {/* Bottom Left */}
                                        <motion.div
                                            variants={{
                                                initial: { opacity: 1, x: 0, y: 0 },
                                                hover: {
                                                    opacity: 1,
                                                    x: [0, -2, 0, 0],
                                                    y: [0, 2, 0, 0],
                                                    transition: {
                                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        opacity: { duration: 0.2 }
                                                    }
                                                }
                                            }}
                                            className="absolute bottom-[-1px] left-[-1px] w-2 h-2"
                                        >
                                            <div className="absolute bottom-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                            <div className="absolute bottom-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                        </motion.div>
                                        {/* Bottom Right */}
                                        <motion.div
                                            variants={{
                                                initial: { opacity: 1, x: 0, y: 0 },
                                                hover: {
                                                    opacity: 1,
                                                    x: [0, 2, 0, 0],
                                                    y: [0, 2, 0, 0],
                                                    transition: {
                                                        x: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        y: { duration: 4, times: [0, 0.1, 0.2, 1], ease: "easeOut", repeat: Infinity },
                                                        opacity: { duration: 0.2 }
                                                    }
                                                }
                                            }}
                                            className="absolute bottom-[-1px] right-[-1px] w-2 h-2"
                                        >
                                            <div className="absolute bottom-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                            <div className="absolute bottom-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                        </motion.div>
                                    </div>
                                </div>

                                <h3 className="text-xl md:text-2xl text-white tracking-tight">
                                    {item.brand}
                                </h3>

                                <p className="text-[#f0f0ff]/50 text-sm md:text-base leading-relaxed line-clamp-6">
                                    {item.text}
                                </p>

                                <div className="flex items-center gap-3 mt-2">
                                    <div className="w-6 h-[1px] bg-[#01010d]/30"></div>
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#f0f0ff]/30">{item.author}</span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div
                    className="relative w-full mt-12 overflow-hidden group/marquee"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                    }}
                >
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide select-none active:cursor-grabbing"
                        style={{
                            scrollBehavior: isPaused ? 'smooth' : 'auto'
                        }}
                    >
                        <div className="flex gap-6 py-4 px-2" style={{ width: 'max-content' }}>
                            {[...testimonialsData, ...testimonialsData].map((rev: any, idx) => (
                                <div
                                    key={idx}
                                    className="relative p-6 border-t border-x border-[#181825] bg-[#01010d] flex flex-col gap-4 w-[400px] h-[250px] group/card shrink-0"
                                >
                                    {/* Slanted Glare Effect - Wrapped for clipping */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute top-0 left-0 h-[40px] z-0" style={{ width: 'calc(100% + 40px)', background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)', transform: 'translateX(-20px) rotate(-2deg)', transformOrigin: 'top left' }}></div>
                                    </div>

                                    {/* Corner Accents (Always Visible) */}
                                    {/* Top Left */}
                                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 z-20">
                                        <div className="absolute top-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute top-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                    </div>
                                    {/* Top Right */}
                                    <div className="absolute -top-[1px] -right-[1px] w-2 h-2 z-20">
                                        <div className="absolute top-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute top-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                    </div>
                                    {/* Bottom Left */}
                                    <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 z-20">
                                        <div className="absolute bottom-0 left-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute bottom-0 left-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                    </div>
                                    {/* Bottom Right */}
                                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 z-20">
                                        <div className="absolute bottom-0 right-0 w-1.5 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute bottom-0 right-0 w-[1px] h-1.5 bg-[#01010d]"></div>
                                    </div>

                                    <div className="flex items-center justify-between gap-5 relative z-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 border border-[#181825] bg-[#02020a] flex items-center justify-center relative overflow-hidden">
                                                <Image
                                                    src={rev.image}
                                                    alt={rev.brand}
                                                    fill
                                                    className="object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-medium text-white">{rev.brand}</h4>
                                                <p className="text-[11px] text-[#f0f0ff]/30 uppercase tracking-wider">{rev.badge}</p>
                                            </div>
                                        </div>

                                        {rev.githubLink && (
                                            <a
                                                href={rev.githubLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 border border-[#181825] bg-[#02020a] hover:border-[#18182530] hover:bg-[#181825] transition-all duration-300 text-[#f0f0ff]/30 hover:text-white"
                                                aria-label="GitHub Profile"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-[#f0f0ff]/50 text-sm leading-relaxed line-clamp-5">
                                        &quot;{rev.text}&quot;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="w-full mt-20 max-w-[980px] flex flex-col md:flex-row items-center justify-between gap-[32px] px-0 md:px-[20px] py-[40px] border-t-[2px] border-[#181825]/20 relative box-border mx-auto z-10">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0" style={{ background: 'radial-gradient(at center top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    <div className="flex items-center gap-3 text-white/70 text-xl md:text-3xl lg:text-3xl font-medium tracking-tight py-4 text-center sm:text-left sm:px-6 relative z-10">

                        <span style={{ opacity: 0.7 }}>Experience the technical excellence first-hand.</span>
                    </div>

                    <motion.button
                        initial="initial"
                        whileHover="hover"
                        onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                        onMouseMove={handleMouseMove}
                        className="relative w-full md:w-fit py-4 px-8 cursor-pointer border border-[#b8b8ff]/40 bg-[#01010d] text-white uppercase tracking-[0.2em] font-medium text-xs hover:border-[#18182560] transition-all shadow-[inset_0px_0px_12px_0px_rgba(105,105,150,0.4)] group flex items-center justify-center gap-2 z-10"
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
                        <span className="relative z-20 whitespace-nowrap">{reviewsContent.buttonText}</span>
                    </motion.button>
                </div>

            </div>

        </section>
    );
}
