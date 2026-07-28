"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FiMail } from 'react-icons/fi';
import { processSteps, workflowContent } from "@/constants/siteData";
import CanvasImage from "./CanvasImage";
import React, { useState } from 'react';

const StepCard = ({ title, description, badgeTitle, image, index, delay = 0 }: { title: string, description: string, badgeTitle: string, image: string, index: number, delay?: number }) => {
    // Strict alternation for single-column layout
    const isReversed = index % 2 !== 0;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`group relative border border-[#181825] bg-[#01010d] flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} h-auto md:h-[320px]`}
        >
            {/* Corner Accents - Static L-shapes */}
            <div className="absolute -top-[1px] -left-[1px] w-1 h-1 z-20">
                <div className="absolute top-0 left-0 w-1 h-[1px] bg-[#01010d]"></div>
                <div className="absolute top-0 left-0 w-[1px] h-1 bg-[#01010d]"></div>
            </div>
            <div className="absolute -top-[1px] -right-[1px] w-1 h-1 z-20">
                <div className="absolute top-0 right-0 w-1 h-[1px] bg-[#01010d]"></div>
                <div className="absolute top-0 right-0 w-[1px] h-1 bg-[#01010d]"></div>
            </div>
            <div className="absolute -bottom-[1px] -left-[1px] w-1 h-1 z-20">
                <div className="absolute bottom-0 left-0 w-1 h-[1px] bg-[#01010d]"></div>
                <div className="absolute bottom-0 left-0 w-[1px] h-1 bg-[#01010d]"></div>
            </div>
            <div className="absolute -bottom-[1px] -right-[1px] w-1 h-1 z-20">
                <div className="absolute bottom-0 right-0 w-1 h-[1px] bg-[#01010d]"></div>
                <div className="absolute bottom-0 right-0 w-[1px] h-1 bg-[#01010d]"></div>
            </div>

            {/* Canvas Image Area */}
            <div className={`relative w-full md:w-[45%] h-[200px] md:h-full bg-[#02020a] border-b md:border-b-0 ${isReversed ? 'md:border-l' : 'md:border-r'} border-[#181825] overflow-hidden`}>
                <div className="absolute inset-0 z-0">
                    <CanvasImage
                        type={index === 0 ? 'discovery-design' : index === 1 ? 'architecture-build' : index === 2 ? 'validation-optimization' : 'deployment-operations'}
                        alt={title}
                        active={isHovered}
                        className="transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                {/* Overlay Vignette */}
                <motion.div
                    animate={{ opacity: isHovered ? 0 : 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-t from-[#01010d] via-transparent to-transparent pointer-events-none"
                />
            </div>

            {/* Content Area */}
            <div className="relative flex-1 p-8 md:p-12 flex flex-col justify-center">
                {/* Top Flare Effect - Wrapped for clipping */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 h-[40px] z-0"
                        style={{
                            width: 'calc(100% + 40px)',
                            background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.08) 0%, rgba(240, 240, 255, 0.04) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)',
                            transform: 'translateX(-20px) rotate(-1deg)',
                            transformOrigin: 'top left'
                        }}></div>
                </div>

                <div className="mb-4">
                    <div className="relative w-fit h-[26px] z-10 mb-4">
                        <div className="relative h-full border border-[#181825] bg-[#02020d] flex items-center px-3 py-1 text-gray-500">
                            <span className="text-[12px] font-medium tracking-widest uppercase text-white/50 whitespace-nowrap">{badgeTitle}</span>
                            {/* Corner Dots - Static 1px as requested */}
                            <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl text-white mb-4 tracking-tight">
                    {title}
                </h3>
                <p className="text-[#f0f0ff]/50 text-sm md:text-base leading-relaxed max-w-lg">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default function Direct() {
    const { badge, title, description, ctaText, buttonText } = workflowContent;
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section id="workflow" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#181825] via-[#181825]/30 to-[#181825] z-10"></div>

            {/* Background Dots Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#181825 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}></div>

            {/* Main Container with Left and Right Borders */}
            <div className="relative w-[90%] max-w-[1200px] border-l border-r border-[#181825] flex flex-col pt-[100px] pb-[40px] px-5 md:px-[40px] z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center  mb-20">
                    <div className="relative w-fit h-[30px] z-10 mb-6">
                        <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-1 text-gray-500">
                            <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                            {/* Corner Dots - Static 1px as requested */}
                            <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                            <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-[#f0f0ff]/50 max-w-2xl text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Steps Cards */}
                <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
                    {processSteps.map((step, index) => (
                        <StepCard
                            key={step.id}
                            index={index}
                            title={step.title}
                            description={step.description}
                            badgeTitle={step.badgeTitle}
                            image={step.image}
                            delay={step.delay}
                        />
                    ))}
                </div>


                {/* Bottom CTA Banner */}
                <div className="w-full mt-20 max-w-[980px] flex flex-col md:flex-row items-center justify-between gap-[32px] px-0 md:px-[20px] py-[40px] border-t-[2px] border-[#181825]/20 relative box-border mx-auto z-10">
                    {/* Radial Glow at Top - Wrapped for clipping */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0" style={{ background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    <div className="flex items-center gap-3 text-white/70 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight py-4 text-center sm:text-left sm:px-6 relative z-10">

                        <span style={{ opacity: 0.7 }}>{ctaText}</span>
                    </div>

                    <motion.a
                        initial="initial"
                        whileHover="hover"
                        href="#contact"
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
                        <span className="relative z-20 whitespace-nowrap">{buttonText}</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
