'use client';

import { motion } from 'framer-motion';

export default function Philosophy() {
    return (
        <section id="philosophy" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#181825] via-[#f0f0ff]/30 to-[#181825] z-10"></div>

            <div className="relative w-[90%] max-w-[1200px] border-l border-r border-[#181825] flex flex-col py-[80px] px-5 md:px-[40px] z-10">
                {/* Badge */}
                <div className="flex flex-col gap-6 text-center items-center">
                    <div className="relative w-fit h-[30px] z-10">
                        <div className="relative h-full border border-[#181825] bg-[#01010d] flex items-center px-4 py-1 text-gray-300">
                            <span className="text-[14px] font-medium text-[#f0f0ff]/50 uppercase tracking-wider whitespace-nowrap">Philosophy</span>
                            <div className="absolute top-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#f0f0ff]"></div>
                            <div className="absolute top-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#f0f0ff]"></div>
                            <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-[1px] bg-[#f0f0ff]"></div>
                            <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-[1px] bg-[#f0f0ff]"></div>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl text-[#f0f0ff] tracking-tight max-w-3xl">
                        Engineering Philosophy
                    </h2>
                </div>

                {/* Philosophy Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 max-w-3xl mx-auto"
                >
                    <div className="relative border border-[#181825] bg-[#01010d] p-8 md:p-12">
                        {/* Corner Accents */}
                        <div className="absolute top-[-1px] left-[-1px] w-[1px] h-1 bg-[#f0f0ff]"></div>
                        <div className="absolute top-[-1px] left-[-1px] w-1 h-[1px] bg-[#f0f0ff]"></div>
                        <div className="absolute top-[-1px] right-[-1px] w-[1px] h-1 bg-[#f0f0ff]"></div>
                        <div className="absolute top-[-1px] right-[-1px] w-1 h-[1px] bg-[#f0f0ff]"></div>
                        <div className="absolute bottom-[-1px] left-[-1px] w-[1px] h-1 bg-[#f0f0ff]"></div>
                        <div className="absolute bottom-[-1px] left-[-1px] w-1 h-[1px] bg-[#f0f0ff]"></div>
                        <div className="absolute bottom-[-1px] right-[-1px] w-[1px] h-1 bg-[#f0f0ff]"></div>
                        <div className="absolute bottom-[-1px] right-[-1px] w-1 h-[1px] bg-[#f0f0ff]"></div>

                        <blockquote className="text-lg md:text-xl text-[#f0f0ff]/80 leading-relaxed tracking-wide font-light">
                            &ldquo;I believe software engineering is about understanding problems before writing code. I enjoy designing systems that are simple, reliable, and maintainable, while continuously learning and adapting to new technologies. My goal is to build software that creates lasting value for businesses and the people who use it.&rdquo;
                        </blockquote>

                        {/* Decorative Line */}
                        <div className="mt-8 w-16 h-[1px] bg-[#f0f0ff]/20"></div>

                        <p className="mt-4 text-sm text-[#f0f0ff]/40 uppercase tracking-widest">
                            Kagabo Irene Lucky
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
