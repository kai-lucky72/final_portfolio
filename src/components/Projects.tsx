"use client";

import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { FiMail } from 'react-icons/fi';
import { useState } from "react";
import { projectData, projectsContent } from "@/constants/siteData";
import Image from "next/image";

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = projectData[activeIndex];
    const { badge, title, description, ctaText, buttonText, stats } = projectsContent;

    // Liquid Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section id="projects" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#181825] via-[#181825]/30 to-[#181825] z-10"></div>

            {/* Background Image */}
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
            {/* Main Container with Left and Right Borders */}
            <div className="relative w-[90%] max-w-[1200px] border-l border-r border-[#181825] flex flex-col  py-[80px] px-5 md:px-[40px] z-10">

                {/* Header and Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column - Text and Project List */}
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6 text-left">
                            {/* Section Label */}
                            <div className="relative w-fit h-[30px] z-10">
                                <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-1 text-gray-500">
                                    <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                                    {/* Corner Dots - Static 1px as requested */}
                                    <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                                    <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#01010d]"></div>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl md:text-5xl text-white tracking-tight">
                                {title}
                            </h2>

                            {/* Description */}
                            <p className="text-[#f0f0ff]/50 text-sm md:text-base max-w-xl">
                                {description}
                            </p>
                        </div>

                        {/* Project List */}
                        <div className="flex flex-col gap-2">
                            {projectData.map((project, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`group relative flex items-center justify-between px-5 py-3 border transition-all cursor-pointer border-[#181825] bg-[#01010d] ${activeIndex === index ? 'border-[#18182520]' : 'border-transparent hover:border-[#181825]'}`}
                                >
                                    {/* Corner Animations - Visible on hover or when active */}
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
                                        animate={activeIndex === index ? "hover" : "initial"}
                                        className="absolute top-[-1px] left-[-1px] w-1.5 h-1.5 z-20"
                                    >
                                        <div className="absolute top-0 left-0 w-1 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute top-0 left-0 w-[1px] h-1 bg-[#01010d]"></div>
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
                                        animate={activeIndex === index ? "hover" : "initial"}
                                        className="absolute top-[-1px] right-[-1px] w-2 h-2 z-20"
                                    >
                                        <div className="absolute top-0 right-0 w-1 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute top-0 right-0 w-[1px] h-1 bg-[#01010d]"></div>
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
                                        animate={activeIndex === index ? "hover" : "initial"}
                                        className="absolute bottom-[-1px] left-[-1px] w-1.5 h-1.5 z-20"
                                    >
                                        <div className="absolute bottom-0 left-0 w-1 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute bottom-0 left-0 w-[1px] h-1 bg-[#01010d]"></div>
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
                                        animate={activeIndex === index ? "hover" : "initial"}
                                        className="absolute bottom-[-1px] right-[-1px] w-1.5 h-1.5 z-20"
                                    >
                                        <div className="absolute bottom-0 right-0 w-1 h-[1px] bg-[#01010d]"></div>
                                        <div className="absolute bottom-0 right-0 w-[1px] h-1 bg-[#01010d]"></div>
                                    </motion.div>

                                    <span className={`text-base transition-colors ${activeIndex === index ? 'text-white' : 'text-[#f0f0ff]/50 group-hover:text-white'}`}>{project.name}</span>
                                    <span className={`text-xs transition-colors ${activeIndex === index ? 'text-[#f0f0ff]/50' : 'text-[#f0f0ff]/25 group-hover:text-[#f0f0ff]/50'}`}>{project.year}</span>

                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Featured Project Card */}
                    <motion.div
                        layout
                        variants={{
                            initial: { opacity: 0, scale: 0.95 },
                            hover: {}
                        }}
                        initial="initial"
                        whileHover="hover"
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative border border-[#181825] bg-[#01010d] group min-h-[450px] flex flex-col"
                    >
                        {/* Corner Animations */}
                        {/* Corner Accents (Always Visible) - 4px L-shapes */}
                        <div className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                        <div className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d]"></div>

                        <div className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                        <div className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d]"></div>

                        <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                        <div className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#01010d]"></div>

                        <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#01010d]"></div>
                        <div className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#01010d]"></div>


                        {/* Project Image */}
                        <div className="relative w-full h-[300px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.image}
                                    variants={{
                                        initial: { opacity: 0, scale: 1.1 },
                                        animate: { opacity: 0.6, scale: 1 },
                                        hover: { opacity: 1 },
                                        exit: { opacity: 0, scale: 0.95 }
                                    }}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        fill
                                        className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                    />
                                </motion.div>
                            </AnimatePresence>
                            {/* Overlay Gradient */}
                            <motion.div
                                variants={{
                                    initial: { opacity: 1 },
                                    hover: { opacity: 0 }
                                }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 bg-gradient-to-t from-[#01010d] via-transparent to-transparent pointer-events-none"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-0 relative z-10  flex flex-col gap-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl text-white">
                                        {activeProject.title}
                                    </h3>
                                    <p className="text-[#f0f0ff]/50 text-sm leading-relaxed max-w-md mt-4">
                                        {activeProject.description}
                                    </p>
                                    {activeProject.link && (
                                        <motion.a
                                            href={activeProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="inline-flex items-center gap-2 mt-6 text-white hover:text-white group/link transition-colors"
                                        >
                                            <span className="text-sm font-medium tracking-wide uppercase border-b border-[#181825]/20 pb-0.5">View Project</span>
                                            <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.a>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Glow Effect - Wrapped for clipping */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#01010d]/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Logos and Stats Section */}
                <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-12 py-10  border-[#181825]/50 overflow-hidden">
                    {/* Logos - 80% Width on desktop, with marquee effect */}
                    <div className="flex-1 relative md:w-[80%] overflow-hidden flex items-center">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#01010d] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#01010d] to-transparent z-10 pointer-events-none"></div>

                        <motion.div
                            className="flex items-center gap-16 md:gap-32 whitespace-nowrap"
                            animate={{ x: [0, -1000] }}
                            transition={{
                                repeat: Infinity,
                                duration: 30,
                                ease: "linear"
                            }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center gap-16 md:gap-32 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                                    <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase">KEC</span>
                                    <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white">BCode</span>
                                    <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white uppercase italic">RCA</span>
                                    <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white lowercase font-mono">LMS</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Divider Lines (Desktop only) */}
                    <div className="hidden md:block w-[1px] bg-[#181825] relative">
                    </div>

                    {/* Stats - 20% Width on desktop */}
                    <div className="md:w-[20%] flex items-center justify-center md:justify-end gap-12 md:gap-8 min-w-fit">
                        {stats.map((stat: { value: string; label: string }, index: number) => (
                            <div key={index} className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
                                <span className="text-3xl text-white">{stat.value}</span>
                                <span className="text-[10px] uppercase tracking-widest text-white/40 leading-none whitespace-nowrap">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA Banner */}
                <div className="w-full mt-20 max-w-[980px] flex flex-col md:flex-row items-center justify-between gap-[32px] px-0 md:px-[20px] py-[40px] border-t-[2px] border-[#181825]/20 relative box-border mx-auto z-10">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0" style={{ background: 'radial-gradient(at center top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    <div className="flex items-center gap-3 text-white/70 text-xl md:text-3xl lg:text-3xl font-medium tracking-tight py-4 text-center sm:text-left sm:px-6 relative z-10">

                        <span style={{ opacity: 0.7 }}>{ctaText}</span>
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
                        <span className="relative z-20 whitespace-nowrap">{buttonText}</span>
                    </motion.button>
                </div>
            </div >
        </section >
    );
}
