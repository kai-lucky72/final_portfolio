"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { FiCalendar, FiMail } from 'react-icons/fi';
import { faqs, faqContent, contactInfo } from "@/constants/siteData";

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const { badge, title, description, ctaButtonText, contactText, email } = faqContent;

    return (
        <section id="faq" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
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
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
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
                        <h2 className="text-2xl md:text-5xl text-white tracking-tight leading-tight">
                            {title.split(' Answered')[0]}
                            <br />
                            Answered
                        </h2>
                        <p
                            className="max-w-md text-[#f0f0ff]/50 text-[14px] tracking-[-.02em] leading-[1.6em]"
                        >
                            {description}
                        </p>

                        <motion.a
                            href={contactInfo.calLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover="hover"
                            initial="initial"
                            className="relative group w-fit flex items-center cursor-pointer gap-2 px-6 py-3 text-sm transition-colors border border-[#b8b8ff]/40 bg-[radial-gradient(100%_150%_at_50%_50%,#01010d_0%,#181825_100%)] shadow-[inset_0px_0px_12px_0px_#69699666] text-white mt-4"
                        >
                            {/* Corner Animations */}
                            {/* Top Left */}
                            <motion.div
                                className="absolute -top-1 -left-1 w-2 h-2 z-20"
                                variants={{
                                    initial: { opacity: 0, x: 0, y: 0 },
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
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                                <div className="absolute top-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                            </motion.div>
                            {/* Top Right */}
                            <motion.div
                                className="absolute -top-1 -right-1 w-2 h-2 z-20"
                                variants={{
                                    initial: { opacity: 0, x: 0, y: 0 },
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
                                <div className="absolute top-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                                <div className="absolute top-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                            </motion.div>
                            {/* Bottom Left */}
                            <motion.div
                                className="absolute -bottom-1 -left-1 w-2 h-2 z-20"
                                variants={{
                                    initial: { opacity: 0, x: 0, y: 0 },
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
                                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#01010d]"></div>
                                <div className="absolute bottom-0 left-0 w-[1px] h-full bg-[#01010d]"></div>
                            </motion.div>
                            {/* Bottom Right */}
                            <motion.div
                                className="absolute -bottom-1 -right-1 w-2 h-2 z-20"
                                variants={{
                                    initial: { opacity: 0, x: 0, y: 0 },
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
                                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-[#01010d]"></div>
                                <div className="absolute bottom-0 right-0 w-[1px] h-full bg-[#01010d]"></div>
                            </motion.div>

                            <FiCalendar className="w-5 h-5" />
                            {ctaButtonText}
                        </motion.a>
                    </div>

                    {/* Right Column - FAQ Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = activeIndex === index;
                            return (
                                <motion.div
                                    initial="initial"
                                    whileHover="hover"
                                    key={index}
                                    onClick={() => setActiveIndex(isOpen ? null : index)}
                                    className={`relative p-6 border cursor-pointer group transition-all duration-500 ${isOpen
                                        ? "border-[#181825] bg-gradient-to-br from-[#181825] to-[#01010d]"
                                        : "border-transparent bg-[#01010d]"
                                        }`}
                                >
                                    <AnimatePresence>
                                        {(isOpen || true) && (
                                            <>
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


                                            </>
                                        )}
                                    </AnimatePresence>

                                    <div className="flex items-center justify-between select-none">
                                        <span className={`text-base md:text-lg transition-colors duration-300 ${isOpen ? "text-white font-bold" : "text-white font-medium"}`}>
                                            {faq.question}
                                        </span>
                                        <div className="relative w-4 h-4 flex items-center justify-center">
                                            <motion.div
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                className="absolute w-full h-[1.5px] bg-[#01010d]"
                                            />
                                            <motion.div
                                                animate={{ rotate: isOpen ? 135 : 90 }}
                                                className="absolute w-full h-[1.5px] bg-[#01010d]"
                                            />
                                        </div>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                    marginTop: 24,
                                                    transition: {
                                                        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                                                        opacity: { duration: 0.3, delay: 0.1 }
                                                    }
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                    marginTop: 0,
                                                    transition: {
                                                        height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                                                        opacity: { duration: 0.2 }
                                                    }
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-[#f0f0ff]/50 text-[15px] leading-relaxed max-w-2xl">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>



                {/* Bottom Statement with Slider */}
                <div className="w-full mt-5 max-w-[840px] flex flex-wrap items-center justify-center gap-[32px]  sm:px-[40px] text-center py-[40px] border-t-[2px] border-[#181825]/20 relative mx-auto box-border">
                    {/* Top Glow Effect - Wrapped for clipping */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0"
                            style={{ background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-sm text-[#f0f0ff]/50 flex-column sm:flex items-center justify-center gap-6">
                            <div className="flex gap-3">
                                <FiMail className="w-5 h-5 opacity-50" />
                                {contactText}
                            </div>
                            <div className="">
                                <a href={`mailto:${email}`} className="text-white hover:text-blue-400 border-b border-[#181825]/20 transition-all">
                                    {email}
                                </a>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
}
