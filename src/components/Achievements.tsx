"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Highlight } from "./WhoWeAre";
import Image from "next/image";
import { achievementsWords, achievementsMetrics, achievementsContent } from "@/constants/siteData";
import CanvasGraph from "./CanvasGraph";

interface Metric {
    value: string;
    label: string;
}

const MetricCard = ({ metric, index }: { metric: Metric, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    const canvasMap: Record<string, 'uptrend' | 'data-stream' | 'pulse' | 'radar-ping'> = {
        'Production Systems': 'uptrend',
        'Backend Technologies': 'data-stream',
        'System Availability': 'pulse',
        'Secure Monitoring': 'radar-ping'
    };

    const canvasType = canvasMap[metric.label] || 'sparkline';

    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex flex-col items-center gap-2 p-6 border border-[#181825] bg-[#01010d] relative group h-full"
        >
            {/* Background Canvas */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity z-0 pointer-events-none">
                <CanvasGraph
                    type={canvasType}
                    height={100}
                    speed={isHovered ? 1.5 : 0.5}
                    active={isHovered}
                />
            </div>

            {/* Corner Accents */}
            <div className="absolute -top-px -left-px z-50 w-px h-1 bg-[#01010d]"></div>
            <div className="absolute -top-px -left-px w-1 h-px bg-[#01010d]"></div>
            <div className="absolute -top-px -right-px w-px h-1 bg-[#01010d]"></div>
            <div className="absolute -top-px -right-px w-1 h-px bg-[#01010d]"></div>
            <div className="absolute -bottom-px -left-px w-px h-1 bg-[#01010d]"></div>
            <div className="absolute -bottom-px -left-px w-1 h-px bg-[#01010d]"></div>
            <div className="absolute -bottom-px -right-px w-px h-1 bg-[#01010d]"></div>
            <div className="absolute -bottom-px -right-px w-1 h-px bg-[#01010d]"></div>

            {/* Slanted Glare Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <div className="absolute top-0 left-0 h-[30px] z-0" style={{
                    width: 'calc(100% + 40px)',
                    background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)',
                    transform: 'translateX(-20px) rotate(-2deg)',
                    transformOrigin: 'top left'
                }}></div>
            </div>

            <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter relative z-20">{metric.value}</span>
            <span className="text-[10px] md:text-[12px] uppercase tracking-widest text-[#f0f0ff]/30 text-center relative z-20">{metric.label}</span>
        </motion.div>
    );
};

export default function Achievements() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % achievementsWords.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const { badge, mainQuote } = achievementsContent;

    return (
        <section id="achievements" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
            {/* ... top border and background image ... */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-[#181825] via-[#181825]/30 to-[#181825] z-10"></div>
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

            <div className="relative w-[90%] max-w-[1200px] border-l border-r border-[#181825] flex flex-col pt-[50px] px-5 md:px-[40px] z-10">
                {/* ... header ... */}
                <div className="flex justify-center">
                    <div className="relative w-fit h-[30px] z-10">
                        <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-1 text-gray-500">
                            <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                            <div className="absolute -top-px -left-px w-px h-px bg-[#01010d]"></div>
                            <div className="absolute -top-px -right-px w-px h-px bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -left-px w-px h-px bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -right-px w-px h-px bg-[#01010d]"></div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-lg md:text-3xl lg:text-4xl text-[#f0f0ff]/50 leading-[2.5] md:leading-[1.8] tracking-tight">
                        &quot;{mainQuote.prefix}
                        <Highlight className="text-lg md:text-3xl lg:text-4xl mx-2">{mainQuote.highlight1}</Highlight>
                        {mainQuote.mid1}
                        <Highlight className="text-lg md:text-3xl lg:text-4xl mx-2">{mainQuote.highlight2}</Highlight>
                        {mainQuote.mid2}
                        <Highlight className="text-lg md:text-3xl lg:text-4xl mx-2">{mainQuote.highlight3}</Highlight>
                        &quot;
                    </h2>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-20">
                    {achievementsMetrics.map((metric, idx) => (
                        <MetricCard key={idx} metric={metric} index={idx} />
                    ))}
                </div>

                {/* Bottom Statement with Slider */}
                <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-center gap-[32px] sm:px-[40px]  py-[20px] border-t-2 border-[#181825]/20 relative mx-auto box-border">
                    {/* Top Glow Effect - Wrapped for clipping */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0"
                            style={{ background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    {/* Icon & "Engineering away" */}
                    <div className="flex items-center gap-3 text-white/70 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight py-4 px-6 z-10 transition-all duration-300">

                        <span style={{ opacity: 0.7 }}>Engineering away</span>
                    </div>

                    {/* Slider Container - Wrapper for Stacking & Overflow Control */}
                    <div className="relative w-full max-w-[450px] z-10 transition-all duration-300">
                        <div className="relative px-4 py-2 border-y border-[#181825] bg-[#01010d] text-xl md:text-2xl lg:text-3xl font-medium tracking-tight flex items-center min-h-[52px] w-full text-gray-500 overflow-hidden">
                            {/* Vertical Bars */}
                            <div className="absolute -left-px -top-px -bottom-px w-[4px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-100"></div>
                            <div className="absolute -right-px -top-px -bottom-px w-[4px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-100"></div>

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
