"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import { navLinks, navbarContent, contactInfo } from "@/constants/siteData";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { logoText, ctaButtonText } = navbarContent;

    // Liquid Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#01010d]/85 backdrop-blur-[10px] border-b-[2px] border-white/7">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                        <span className="font-[family-name:var(--font-syncopate)] tracking-widest uppercase text-white">{logoText}</span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link, index) => {
                            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.preventDefault();
                                const href = link.href;
                                setTimeout(() => {
                                    const element = document.querySelector(href);
                                    if (element) {
                                        const top = element.getBoundingClientRect().top + window.pageYOffset - 56; // Adjusted for navbar height
                                        window.scrollTo({
                                            top,
                                            behavior: 'smooth'
                                        });
                                    }
                                }, 500);
                            };

                            return (
                                <div key={link.name} className="flex items-center gap-4">
                                    <a
                                        href={link.href}
                                        onClick={handleClick}
                                        className="text-sm font-medium text-white opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap cursor-pointer"
                                    >
                                        {link.name}
                                    </a>
                                    {index < navLinks.length - 1 && (
                                        <div className="w-[3px] h-[3px] bg-[#01010d] rounded-full"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        initial="initial"
                        whileHover="hover"
                        href={contactInfo.contactFormLink}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        onMouseMove={handleMouseMove}
                        className="hidden md:flex relative items-center gap-2 px-6 py-3 border border-[#b8b8ff]/40 bg-[#01010d] text-white uppercase tracking-[0.2em] font-medium text-xs hover:border-[#18182560] transition-all shadow-[inset_0px_0px_12px_0px_rgba(105,105,150,0.4)] cursor-pointer group"
                    >
                        {/* Liquid Hover Layer */}
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

                        <FiMail className="w-4 h-4 relative z-20" />
                        <span className="relative z-20">{ctaButtonText}</span>
                    </motion.a>


                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center text-white focus:outline-none z-50 pointer-events-auto"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-6 h-5 flex items-center justify-center">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute left-0 block h-[2px] w-full bg-white origin-center top-1/2 -translate-y-1/2"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 block h-[2px] w-full bg-white top-1/2 -translate-y-1/2"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute left-0 block h-[2px] w-full bg-white origin-center top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="md:hidden overflow-hidden border-t border-black/7"
                        >
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                                    closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } }
                                }}
                                className="py-6 space-y-4"
                            >
                                {navLinks.map((link) => {
                                    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.preventDefault();
                                        const href = link.href;
                                        setIsOpen(false);
                                        setTimeout(() => {
                                            const element = document.querySelector(href);
                                            if (element) {
                                                const top = element.getBoundingClientRect().top + window.pageYOffset - 56;
                                                window.scrollTo({
                                                    top,
                                                    behavior: 'smooth'
                                                });
                                            }
                                        }, 500);
                                    };

                                    return (
                                        <motion.div
                                            key={link.name}
                                            variants={{
                                                open: { y: 0, opacity: 1 },
                                                closed: { y: 10, opacity: 0 }
                                            }}
                                        >
                                            <a
                                                href={link.href}
                                                onClick={handleClick}
                                                className="block text-lg font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
                                            >
                                                {link.name}
                                            </a>
                                        </motion.div>
                                    );
                                })}
                                <motion.div
                                    variants={{
                                        open: { y: 0, opacity: 1 },
                                        closed: { y: 10, opacity: 0 }
                                    }}
                                    className="pt-2"
                                >
                                    <motion.a
                                        initial="initial"
                                        whileHover="hover"
                                        href={contactInfo.contactFormLink}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsOpen(false);
                                            setTimeout(() => {
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 300);
                                        }}
                                        className="relative w-full py-4 px-8 cursor-pointer border border-[#b8b8ff]/40 bg-[#01010d] text-white uppercase tracking-[0.2em] font-medium text-xs hover:border-[#18182560] transition-all shadow-[inset_0px_0px_12px_0px_rgba(105,105,150,0.4)] group flex items-center justify-center gap-2"
                                    >
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

                                        <FiMail className="w-4 h-4 relative z-20" />
                                        <span className="relative z-20">{ctaButtonText}</span>
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
