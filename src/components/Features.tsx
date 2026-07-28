'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { featuresData, featuresContent } from "@/constants/siteData";
import CanvasGraph from "./CanvasGraph";
import Image from "next/image";

interface FeatureCardProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    delay?: number;
    isHorizontal?: boolean;
    imageSrc?: string;
    techStack?: React.ElementType[];
    graphType?: 'uptrend' | 'pulse' | 'pulse-static' | 'sparkline';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, className = "", delay = 0, isHorizontal = false, techStack, graphType }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`relative border border-[#181825] bg-[#01010d] flex group ${className}`}
            style={{
                zIndex: 2,
                flex: "1 0 0",
                minWidth: "300px",
                height: "100px",
                position: "relative"
            }}
        >
            {/* Corner Accents (Always Visible) - 4px L-shapes */}
            <span className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
            <span className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>

            <span className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
            <span className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>

            <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
            <span className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>

            <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
            <span className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>


            {/* Inner Content Wrapper - handles overflow clipping for gradient */}
            <div className={`relative w-full h-full overflow-hidden p-8 flex ${isHorizontal ? 'flex-col md:flex-row items-center gap-8' : 'flex-col justify-between'}`}>
                {/* Top Gradient Glow - smooth fog-like fade */}
                <div className="absolute top-0 left-0 h-[40px] pointer-events-none z-0"
                    style={{
                        width: 'calc(100% + 40px)',
                        background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)',
                        transform: 'translateX(-20px) rotate(-2deg)',
                        transformOrigin: 'top left'
                    }}></div>

                {/* Content Section */}
                <div className={`${isHorizontal ? 'w-full md:w-1/2 flex flex-col justify-center' : 'flex flex-col items-center justify-center text-center h-full'}`}>
                    {!techStack && title && (
                        <div className="relative w-fit h-[38px] z-10 mb-6 mx-auto md:mx-0">
                            <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-2 text-gray-500">
                                <span className="uppercase font-[400] text-xs md:text-sm text-white tracking-wide whitespace-nowrap">{title}</span>
                                {/* Corner Dots - Static 1px as requested */}
                                <span className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                                <span className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                                <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                                <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                            </div>
                        </div>
                    )}

                    {techStack ? (
                        <div className="flex flex-col gap-6 w-full">
                            <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-6 lg:grid-cols-9 gap-4 w-full justify-items-center">
                                {techStack.map((TechIcon: React.ElementType, idx: number) => (
                                    <div key={idx} className="text-white/40 hover:text-white transition-colors duration-300">
                                        <TechIcon size={24} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="text-white/20 group-hover:text-white transition-colors duration-500 [&>svg]:w-16 [&>svg]:h-16">
                                {icon}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default function Features() {
    const { badge, title, description } = featuresContent;

    return (
        <section id="features" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
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
            <div className="relative w-[90%] max-w-[1200px] border-l border-r border-[#181825] flex flex-col gap-[80px] py-[100px] px-5 md:px-[40px] z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-fit h-[30px] z-10 mb-6">
                        <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-1 text-gray-500 pointer-events-auto cursor-default">
                            <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                            {/* Corner Dots - Static 1px as requested */}
                            <span className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                            <span className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                            <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                            <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-[#f0f0ff]/50 max-w-2xl text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {featuresData.map((feature: { className: string; title: string; icon: string; techStack?: React.ElementType[]; isHorizontal?: boolean; graphType?: string }, index: number) => (
                        <FeatureCard
                            key={index}
                            className={feature.className}
                            title={feature.title}
                            icon={
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feature.icon} />
                                </svg>
                            }
                            techStack={feature.techStack}
                            isHorizontal={feature.isHorizontal}
                            graphType={feature.graphType as any}
                            delay={index * 0.1}
                        />
                    ))}
                </div>


            </div>
        </section>
    );
}
