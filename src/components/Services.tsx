'use client';

import { motion, useTransform, useMotionValue, useMotionTemplate, animate, MotionValue } from "framer-motion";
import { FiMail } from 'react-icons/fi';
import { servicesList, servicesScrollingBanner, servicesWorkflowSteps, servicesContent } from "@/constants/siteData";
import React, { useEffect } from "react";
import Image from "next/image";

const ServiceScanner = () => {
    // 4 items. Physical height ~47px + 14px gap = ~61px.
    const CONST_HEIGHT = 62;
    // Container 200px. Center 100px.
    const TARGET_CENTER = 100;

    // To center Item 0 (Visual Height ~52px, Half ~26px) at 100: 
    // y = 100 - 26 = 74.
    const y = useMotionValue(74);

    useEffect(() => {
        const sequence = [0, 1, 2, 1, 0];
        let step = 0;

        const loop = async () => {
            while (true) {
                // Wait before moving
                await new Promise(r => setTimeout(r, 2000));

                step = (step + 1) % sequence.length;
                const targetIndex = sequence[step];

                // Animate to new position
                await animate(y, 74 - (targetIndex * CONST_HEIGHT), {
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    mass: 1.2
                });
            }
        }
        loop();
    }, [y]);

    // We only need the base services since we oscillate within them, no infinite scroll wrapping needed.
    const displayServices = servicesList;

    return (
        <div className="flex gap-8">
            {/* Left Side - Static Connector Icon */}
            <div className="hidden md:flex items-center justify-center relative z-20">
                <div className="relative w-14 h-14 border-y border-[#181825] bg-[#01010d] flex items-center justify-center text-gray-500 z-10 transition-colors duration-500">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L14.3 9.4L21.7 11.7L14.3 14L12 21.4L9.7 14L2.3 11.7L9.7 9.4L12 2Z" />
                    </svg>

                    {/* Glowing Side Accents - Star Badge Style */}
                    <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                    <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>

                    {/* Connection Line with Pulse */}
                    <div className="absolute -right-8 top-1/2 w-[31px] h-[1px] bg-[#181825] overflow-hidden">
                        <motion.div
                            animate={{ left: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-[#181825] to-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Vertical Scrolling List */}
            <div className="flex-1 relative h-[200px] border-[#181825]/30 px-2 overflow-hidden">
                {/* Gradient masks */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#01010d] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#01010d] to-transparent z-10 pointer-events-none"></div>

                <motion.div style={{ y }} className="flex flex-col gap-[14px] px-2 w-full items-start">
                    {displayServices.map((service, index) => (
                        <ServiceItem key={index} service={service} index={index} baseY={y} itemHeight={CONST_HEIGHT} targetCenter={TARGET_CENTER} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const ServiceItem = ({ service, index, baseY, itemHeight, targetCenter }: { service: { title: string; icon: string }, index: number, baseY: MotionValue<number>, itemHeight: number, targetCenter: number }) => {
    const myOffset = index * itemHeight;

    // Check distance from target center
    const distRaw = useTransform(baseY, (v: number) => {
        const currentY = myOffset + v;
        const itemCenter = currentY + (itemHeight / 2);
        return Math.abs(itemCenter - targetCenter);
    });

    // Matches user request: Bigger items.
    // Scale 0.95 -> 1.1.
    const scale = useTransform(distRaw, (dist: number) => {
        if (dist > 100) return 0.95;
        return 1.1 - (dist / 100) * 0.15;
    });

    const opacity = useTransform(distRaw, (dist: number) => {
        if (dist > 100) return 0.6;
        return 1 - (dist / 100) * 0.4;
    });

    const zIndex = useTransform(distRaw, (dist: number) => {
        if (dist > 50) return 0;
        return 10;
    });

    return (
        <motion.div
            style={{ scale, opacity, zIndex }}
            className="relative flex  items-center justify-around px-6 py-3 border border-[#181825] bg-[#01010d] w-full shrink-0"
        >
            {/* Corner Accents - L-shapes */}
            <div className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
            <div className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d]"></div>
            <div className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
            <div className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d]"></div>
            <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
            <div className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d]"></div>
            <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
            <div className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d]"></div>

            <div className="flex items-center justify-center gap-2">
                {/* Related Icon */}
                <svg className="w-5 h-5 text-white opacity-50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={service.icon} />
                </svg>

                {/* Label */}
                <span className="text-[#f0f0ff]/50 text-sm font-medium leading-[1.3em] whitespace-nowrap">
                    {service.title}
                </span>
            </div>
        </motion.div>
    );
}

const Typewriter = ({ texts }: { texts: string[] }) => {
    const [index, setIndex] = React.useState(0);
    const [textIndex, setTextIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);

    useEffect(() => {
        if (!texts || texts.length === 0) return;
        if (isPaused) return;

        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (index < currentText.length) {
                    setIndex(prev => prev + 1);
                } else {
                    setIsPaused(true);
                    setTimeout(() => {
                        setIsDeleting(true);
                        setIsPaused(false);
                    }, 2000);
                }
            } else {
                if (index > 0) {
                    setIndex(prev => prev - 1);
                } else {
                    setIsPaused(true);
                    // Cycle to next snippet
                    setTimeout(() => {
                        setIsDeleting(false);
                        setTextIndex((prev) => (prev + 1) % texts.length);
                        setIndex(0);
                        setIsPaused(false);
                    }, 300);
                }
            }
        }, isDeleting ? 10 : 15 + Math.random() * 15);

        return () => clearTimeout(timeout);
    }, [index, isDeleting, isPaused, texts, textIndex]);

    if (!texts || texts.length === 0) return null;

    return (
        <span className="whitespace-pre">
            {texts[textIndex].substring(0, index)}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-1.5 h-3 bg-[#01010d] ml-[2px] align-baseline"
            />
        </span>
    );
};

export default function Services() {
    const [activeWorkflowStep, setActiveWorkflowStep] = React.useState(0);

    useEffect(() => {
        let step = 0;
        const sequence = [0, 1, 2, 1, 0];
        const interval = setInterval(() => {
            step = (step + 1) % sequence.length;
            setActiveWorkflowStep(sequence[step]);
        }, 1500);
        return () => clearInterval(interval);
    }, [setActiveWorkflowStep]);

    const { badge, title, description, cards, ctaText } = servicesContent;

    // Liquid Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section id="services" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">

            {/* Background Image - Top Aligned */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[853px] h-[628px] z-0 select-none pointer-events-none opacity-40"
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

            {/* Top Border - Layered for full-screen connectivity */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#01010d]/5"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#181825]/30 to-transparent"></div>

            {/* Main Container with Borders & Width Constraints */}
            <div className="relative w-[90%] max-w-[1200px] mx-auto border-l border-r border-[#181825] flex flex-col items-center gap-[60px] py-[40px] sm:py-[80px] px-5 md:px-[40px] z-10">

                {/* Header */}
                <div className="flex flex-col items-center gap-4  max-w-2xl text-center">
                    <div className="relative px-4 py-1 border border-[#181825] bg-[#01010d] flex items-center gap-2 text-gray-500">
                        <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                        {/* Corner Dots */}
                        <span className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d] z-50 block"></span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-t from-[#18182580] to-[#181825]">
                            {title}
                        </span>
                    </h2>

                    <p className="text-[#f0f0ff]/50 text-lg">
                        {description}
                    </p>
                </div>

                {/* Main Flex Layout */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">

                    {/* Card 0 - Secure Full Stack Development */}
                    <div className="w-full md:w-[40%] border border-[#181825] bg-[#01010d] flex flex-col relative">
                        {/* Corner Edge Accents */}
                        <span className="absolute top-[-1px] left-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] left-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>

                        {/* Inner Overflow Container for Glare & Content */}
                        <div className="relative w-full h-full overflow-hidden p-8 flex flex-col justify-between">
                            <div className="absolute top-0 left-0 h-[40px] pointer-events-none z-0" style={{
                                width: 'calc(100% + 40px)',
                                background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)',
                                transform: 'translateX(-20px) rotate(-2deg)',
                                transformOrigin: 'top left'
                            }}></div>

                            <div className="relative z-10">
                                <ServiceScanner />
                            </div>

                            <div className="relative z-10 mt-8">
                                <div className="mb-4">
                                    <div className="relative w-fit px-4 py-2 border-y border-[#181825] bg-[#01010d] text-xs md:text-sm font-medium tracking-wide flex items-center text-gray-500 z-10">
                                        <span className="uppercase">{cards[0].title}</span>
                                        {/* Vertical Bars */}
                                        <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                        <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                                    </div>
                                </div>
                                <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">
                                    {cards[0].description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 1 - IoT Security & Integration */}
                    <div className="w-full md:w-[60%] border border-[#181825] bg-[#01010d] flex flex-col relative">
                        {/* Corner Edge Accents */}
                        <span className="absolute top-[-1px] left-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] left-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>

                        {/* Inner Overflow Container */}
                        <div className="relative w-full h-full overflow-hidden p-8 flex flex-col justify-between">
                            <div className="absolute top-0 left-0 h-[40px] pointer-events-none z-0" style={{
                                width: 'calc(100% + 40px)',
                                background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)',
                                transform: 'translateX(-20px) rotate(-2deg)',
                                transformOrigin: 'top left'
                            }}></div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="relative w-full h-[200px] border border-[#181825] bg-[#01010d] mb-6 flex items-start justify-start p-6 overflow-hidden">
                                    <pre className="text-white text-xs font-light leading-relaxed text-left w-full">
                                        <Typewriter texts={cards[1].codeSnippets || []} />
                                    </pre>
                                </div>

                                <div className="mt-2">
                                    <div className="mb-4">
                                        <div className="relative w-fit px-4 py-2 border-y border-[#181825] bg-[#01010d] text-xs md:text-sm font-medium tracking-wide flex items-center text-gray-500 z-10">
                                            <span className="uppercase">{cards[1].title}</span>
                                            <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                            <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                                        </div>
                                    </div>
                                    <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">
                                        {cards[1].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">

                    {/* Card 2 - Technical Consulting */}
                    <div className="w-full md:w-[60%] border border-[#181825] bg-[#01010d] flex flex-col relative">
                        {/* Corner Accents (Always Visible) - 4px L-shapes */}
                        <span className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] z-50 block"></span>

                        {/* Inner Overflow Container */}
                        <div className="relative w-full h-full overflow-hidden p-6 flex flex-col justify-between">
                            <div className="absolute top-0 left-0 h-[40px] pointer-events-none z-0" style={{
                                width: 'calc(100% + 40px)',
                                background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)',
                                transform: 'translateX(-20px) rotate(-2deg)',
                                transformOrigin: 'top left'
                            }}></div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex-1 flex items-center justify-center min-h-[130px]">
                                    <div className="relative w-14 h-14 border-y border-[#181825] bg-[#01010d] flex items-center justify-center text-gray-500 z-10 transition-colors duration-500">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L14.3 9.4L21.7 11.7L14.3 14L12 21.4L9.7 14L2.3 11.7L9.7 9.4L12 2Z" />
                                        </svg>
                                        <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                        <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                                    </div>

                                    <div className="flex-1 h-[1px] bg-[#181825] relative max-w-[450px] overflow-hidden">
                                        <motion.div
                                            animate={{ left: ["-20%", "120%"], opacity: [0, 1, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-1/2 -translate-y-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#181825] to-transparent blur-[1px]"
                                        />
                                    </div>

                                    <div className="relative w-14 h-14 border border-[#181825] bg-[#01010d] flex items-center justify-center z-10">
                                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="mb-4">
                                        <div className="relative w-fit px-4 py-2 border-y border-[#181825] bg-[#01010d] text-xs md:text-sm font-medium tracking-wide flex items-center text-gray-500 z-10">
                                            <span className="uppercase">{cards[2].title}</span>
                                            <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                            <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                                        </div>
                                    </div>
                                    <p className="text-[#f0f0ff]/50 text-sm leading-relaxed max-w-xl">
                                        {cards[2].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Secure Production Deployment */}
                    <div className="w-full md:w-[40%] border border-[#181825] bg-[#01010d] flex flex-col relative">
                        {/* Corner Edge Accents */}
                        <span className="absolute top-[-1px] left-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] left-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-1.5 h-[1px] bg-[#01010d] z-50 block"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1.5 bg-[#01010d] z-50 block"></span>

                        {/* Inner Overflow Container */}
                        <div className="relative w-full h-full overflow-hidden p-6 flex flex-col justify-between">
                            <div className="absolute top-0 left-0 h-[40px] pointer-events-none z-0" style={{
                                width: 'calc(100% + 40px)',
                                background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)',
                                transform: 'translateX(-20px) rotate(-2deg)',
                                transformOrigin: 'top left'
                            }}></div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="relative w-full h-[160px] bg-[#01010d] mb-6 flex flex-col items-center justify-center gap-0 overflow-hidden">
                                    <motion.div
                                        animate={{ x: 120 - (activeWorkflowStep * 80) }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="flex items-center gap-6 z-10"
                                    >
                                        {servicesWorkflowSteps.map((step, idx) => {
                                            const isActive = idx === activeWorkflowStep;
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`relative flex items-center justify-center w-14 h-14 border border-[#181825] bg-[#01010d] shrink-0 transition-all duration-700 ${isActive ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}
                                                >
                                                    {/* Corner Accents - L-shapes */}
                                                    <span className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] z-10 block"></span>
                                                    <span className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] z-10 block"></span>
                                                    <span className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] z-10 block"></span>
                                                    <span className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] z-10 block"></span>
                                                    <span className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d] z-10 block"></span>
                                                    <span className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d] z-10 block"></span>
                                                    <span className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d] z-10 block"></span>
                                                    <span className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d] z-10 block"></span>

                                                    <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'} opacity-70 shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <path d={step.icon} />
                                                    </svg>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                    <div className="h-8 w-[1px] bg-gradient-to-b from-[#181825]/40 to-[#181825]/10"></div>
                                    <div className="relative w-14 h-14 border-y border-[#181825] bg-[#01010d] flex items-center justify-center text-gray-500 z-10">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L14.3 9.4L21.7 11.7L14.3 14L12 21.4L9.7 14L2.3 11.7L9.7 9.4L12 2Z" />
                                        </svg>
                                        <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                        <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="mb-4">
                                        <div className="relative w-fit px-4 py-2 border-y border-[#181825] bg-[#01010d] text-xs md:text-sm font-medium tracking-wide flex items-center text-gray-500 z-10">
                                            <span className="uppercase">{cards[3].title}</span>
                                            <div className="absolute left-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[8px_0_15px_-1px_#181825] z-[100]"></div>
                                            <div className="absolute right-[-1px] top-[-1px] bottom-[-1px] w-[2px] bg-[#01010d] shadow-[-8px_0_15px_-1px_#181825] z-[100]"></div>
                                        </div>
                                    </div>
                                    <p className="text-[#f0f0ff]/50 text-sm leading-relaxed">
                                        {cards[3].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Bottom List */}
                <div className="w-full max-w-6xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#01010d] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#01010d] to-transparent z-10"></div>

                    <div className="flex gap-6 animate-scroll whitespace-nowrap" style={{ '--animation-duration': '20s' } as React.CSSProperties}>
                        {[...servicesScrollingBanner, ...servicesScrollingBanner].map((item, index) => (
                            <div key={index} className="relative flex items-center gap-3 px-6 py-3 border border-[#181825] bg-[#01010d]">
                                <div className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                                <div className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d]"></div>
                                <div className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                                <div className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d]"></div>
                                <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                                <div className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d]"></div>
                                <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                                <div className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d]"></div>

                                <svg className="w-5 h-5 text-white opacity-50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d={item.icon} />
                                </svg>
                                <span className="text-[#f0f0ff]/50 text-sm font-medium">{item.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="w-full mt-20 max-w-[980px] flex flex-col md:flex-row items-center justify-between gap-[32px] px-0 md:px-[20px] py-[40px] border-t-[2px] border-white/20 relative box-border mx-auto z-10">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-0 right-0 h-[30px] z-0" style={{ background: 'radial-gradient(at center top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                        </div>

                        <div className="flex items-center gap-3 text-white/70 text-xl md:text-3xl lg:text-3xl font-medium tracking-tight py-4 px-6 relative z-10">

                            <span style={{ opacity: 0.7 }}>Not Yet Convinced</span>
                        </div>

                        <motion.button
                            initial="initial"
                            whileHover="hover"
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
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
                            <span className="relative z-20 whitespace-nowrap">{ctaText}</span>
                        </motion.button>
                    </div>
                </div>
            </div >
        </section >
    );
}
