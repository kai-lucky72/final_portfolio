'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievementsWords, whoWeAreContent, securityPositioning } from "@/constants/siteData";
import Image from "next/image";

export const Highlight = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <span
            className={`relative inline-flex items-center bg-[radial-gradient(66%_75%_at_50%_50%,#01010d_0%,#181825_100%)] border border-[#1f2937]/10 text-white group ${className}`}
            style={{ verticalAlign: 'middle' }}
        >
            {/* Corner Accents (Always Visible) - 4px L-shapes */}
            <span className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] block"></span>
            <span className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] block"></span>

            <span className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] block"></span>
            <span className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] block"></span>

            <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] block"></span>
            <span className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] block"></span>

            <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] block"></span>
            <span className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] block"></span>

            <span
                className="relative z-10 px-3 py-1 inline-flex items-center"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
                {children}
            </span>
        </span>
    );
};

export default function WhoWeAre() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % achievementsWords.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const { badge, mainQuote, engineeringLabel } = whoWeAreContent;

    return (
        <section id="about" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
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

            {/* Main Container with Borders & Width Constraints */}
            <div className="relative w-[90%] max-w-[1200px] mx-auto border-l border-r border-[#181825] flex flex-col items-center sm:gap-[60px] gap-[40px] py-[40px] sm:py-[80px] px-5 md:px-[40px] z-10">

                <div className="relative flex flex-col items-center">
                    <div className="relative px-4 py-1 border border-[#181825] bg-[#01010d] flex items-center gap-2 w-fit mb-6 text-gray-500">
                        <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                        {/* Corner Dots - Static 1px as requested */}
                        <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                        <div className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                        <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                        <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                    </div>
                </div>

                {/* Content - Flex Layout for controlled wrapping */}
                <div className="w-full max-w-5xl flex flex-wrap items-center justify-center text-center sm:text-left gap-x-3 gap-y-6 text-xl md:text-3xl lg:text-3xl font-medium text-gray-500 tracking-tight">
                    <div className='gap-y-3 flex flex-wrap items-center justify-center'>
                        <span className="opacity-80">&quot;{mainQuote.prefix}</span>
                        <Highlight>{mainQuote.highlight1}</Highlight>
                        <span className="opacity-80">{mainQuote.mid1}</span>
                        <Highlight>{mainQuote.highlight2}</Highlight>
                        <span className="opacity-80">{mainQuote.mid2}</span>
                        <Highlight>{mainQuote.highlight3}</Highlight>
                        <span className="opacity-80">{mainQuote.suffix}&quot;</span>

                    </div>
                    {/* Positioning Paragraph */}
                    <div className="mt-8 w-full space-y-6">
                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto">
                            {securityPositioning.paragraph}
                        </p>
                        <p className="text-white text-xl font-medium tracking-tight">
                            {securityPositioning.strategicLine}
                        </p>


                    </div>
                </div>

                {/* Bottom Statement with Slider */}
                <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-4 py-4 sm:py-8 md:px-[40px] md:py-[40px] border-t-[2px] border-white/20 relative mx-auto box-border">
                    {/* Top Glow Effect - Wrapped for clipping */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0"
                            style={{ background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    {/* Icon & Label */}
                    <div className="flex items-center text-center sm:text-left gap-3 text-white/70 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight md:whitespace-nowrap z-10 transition-all duration-300">

                        <span style={{ opacity: 0.7 }}>{engineeringLabel}</span>
                    </div>

                    {/* Slider Container - Wrapper for Stacking & Overflow Control */}
                    <div className="relative w-full max-w-[450px] z-10 transition-all duration-300">
                        <div className="relative px-4 py-2 border-y border-[#181825] bg-[#01010d] text-xl md:text-2xl lg:text-3xl font-medium tracking-tight flex items-center min-h-[52px] w-full text-gray-500 overflow-hidden">
                            {/* Vertical Bars */}
                            <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[4px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                            <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[4px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>

                            <div className="relative w-full h-full flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="flex items-center gap-3 whitespace-nowrap"
                                    >
                                        <span className="text-white">{achievementsWords[index].text}</span>
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={achievementsWords[index].icon}></path>
                                        </svg>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
