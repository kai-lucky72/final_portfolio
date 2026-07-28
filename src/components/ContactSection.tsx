"use client";

import { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { contactInfo, contactSubjects, contactContent } from '@/constants/siteData';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import ConfettiButton from './ConfettiButton';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Liquid Hover Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const { badge, title, description, form } = contactContent;

    const getBrowserDetails = () => {
        if (typeof window === 'undefined') {
            return {
                user_os: 'Unknown OS',
                user_platform: 'Unknown Platform',
                user_browser: 'Unknown Browser',
                user_version: 'Unknown Version',
                user_referrer: 'Direct Link'
            };
        }

        const ua = navigator.userAgent;
        const platform = navigator.platform || '';

        // Simple OS detection
        let os = 'Unknown OS';
        if (ua.indexOf('Win') !== -1) os = 'Windows';
        else if (ua.indexOf('Mac') !== -1) os = 'MacOS';
        else if (ua.indexOf('X11') !== -1) os = 'UNIX';
        else if (ua.indexOf('Linux') !== -1) os = 'Linux';
        else if (/Android/.test(ua)) os = 'Android';
        else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

        // Simple Browser detection
        let browser = 'Unknown Browser';
        let version = 'Unknown Version';
        const browserMatches = ua.match(/(firefox|msie|chrome|safari|trident|opera|edge|edg)\/?\s*(\d+)/i) || [];
        if (browserMatches.length > 1) {
            browser = browserMatches[1];
            version = browserMatches[2];
            
            if (ua.indexOf('Edg') !== -1) {
                browser = 'Edge';
            } else if (ua.indexOf('Chrome') !== -1 && ua.indexOf('Safari') !== -1) {
                browser = 'Chrome';
            } else if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) {
                browser = 'Safari';
            }
        }

        return {
            user_os: os,
            user_platform: platform,
            user_browser: browser,
            user_version: version,
            user_referrer: document.referrer || 'Direct Link',
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_dxjomy5';
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_wdxajhk';
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'VXAOFBn5IvJp0WueR';

        // Fetch client-side IP and Country details with 2s timeout
        const ipDetails = { ip: 'Unavailable', country: 'Unavailable' };
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000);
            const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                const data = await res.json();
                ipDetails.ip = data.ip || 'Unknown';
                ipDetails.country = data.country_name || 'Unknown';
            }
        } catch (error) {
            console.warn('Geolocation API fetch failed or timed out:', error);
        }

        const browserDetails = getBrowserDetails();

        // Format message to guarantee inclusion of all metadata in the email body
        const formattedMessage = `
Sender Name: ${formData.fullName}
Sender Email: ${formData.email}
Subject: ${formData.subject || 'Portfolio Inquiry'}

Message:
------------------------------------------------
${formData.message}
------------------------------------------------

User Metadata & Analytics:
- OS: ${browserDetails.user_os}
- Platform: ${browserDetails.user_platform}
- Browser: ${browserDetails.user_browser} (v${browserDetails.user_version})
- Country: ${ipDetails.country}
- IP Address: ${ipDetails.ip}
- Referrer: ${browserDetails.user_referrer}
        `.trim();

        const templateParams = {
            from_name: formData.fullName,
            from_email: formData.email,
            reply_to: formData.email,
            subject: formData.subject || 'Portfolio Inquiry',
            message: formattedMessage,
            // Pass individual properties for custom templates
            user_os: browserDetails.user_os,
            user_platform: browserDetails.user_platform,
            user_browser: browserDetails.user_browser,
            user_version: browserDetails.user_version,
            user_country: ipDetails.country,
            user_ip: ipDetails.ip,
            user_referrer: browserDetails.user_referrer,
        };

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            setSubmitStatus('success');
            setFormData({ fullName: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="relative w-full bg-[#01010d] flex justify-center items-center overflow-hidden scroll-mt-14">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-[#181825] via-[#181825]/30 to-[#181825] z-10"></div>

            {/* Background Image - Top Aligned */}
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
            {/* Background Dots Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#181825 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}></div>

            {/* Main Container with Left and Right Borders */}
            <div className="relative w-[90%] max-w-[1200px] border-l border-r border-[#181825] flex flex-col pt-[50px] pb-[10px] px-5 md:px-[40px] z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center sm:px-4">
                    <div className="relative px-4 py-1 border border-[#181825] bg-[#01010d] flex items-center gap-2 w-fit mb-6 text-gray-500">
                        <span className="text-[14px] font-medium text-white/50 uppercase tracking-wider whitespace-nowrap">{badge}</span>
                        {/* Corner Dots - Static 1px as requested */}
                        <div className="absolute -top-px -left-px w-px h-px bg-[#01010d]"></div>
                        <div className="absolute -top-px -right-px w-px h-px bg-[#01010d]"></div>
                        <div className="absolute -bottom-px -left-px w-px h-px bg-[#01010d]"></div>
                        <div className="absolute -bottom-px -right-px w-px h-px bg-[#01010d]"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-[#f0f0ff]/50 max-w-2xl text-sm md:text-base leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr_1fr] mt-5 gap-6 max-w-6xl mx-auto w-full">
                    {/* Left Column - Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
                        {/* Email Card */}
                        <motion.div
                            initial="initial"
                            whileHover="hover"
                            className="relative px-8 py-5 border border-[#181825] bg-[#01010d] group transition-all duration-300 hover:border-[#18182520] h-full"
                        >
                            {/* Slanted Glare Effect - Wrapped for clipping */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-0 left-0 h-[40px] z-0" style={{ width: 'calc(100% + 40px)', background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)', transform: 'translateX(-20px) rotate(-2deg)', transformOrigin: 'top left' }}></div>
                            </div>
                            {/* Corner Animations */}
                            {/* Corner Accents (Always Visible) - 4px L-shapes */}
                             <div className="absolute -top-px -left-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -top-px -left-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -top-px -right-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -top-px -right-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -bottom-px -left-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -left-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -bottom-px -right-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -right-px w-1 h-px bg-[#01010d]"></div>


                            <div className="flex flex-col gap-3">
                                <div className="relative w-14 h-14 border border-[#181825] bg-[#01010d] flex items-center justify-center z-10 overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#01010d] shadow-[0_0_15px_#181825] z-100"></div>
                                    <FiMail className="w-7 h-7 text-white" />
                                    <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#01010d] shadow-[0_0_15px_#181825] z-100"></div>
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#181825]/50 to-transparent"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#181825]/50 to-transparent"></div>
                                </div>
                                <div>
                                    <h4 className="text-[#f0f0ff]/50 text-xs uppercase tracking-widest mb-1.5">Email</h4>
                                    <p className="text-white text-sm leading-relaxed mb-3">Have questions? I&apos;m here for you</p>
                                    <a href={`mailto:${contactInfo.email}`} className="text-white border-b border-[#181825]/20 hover:border-[#181825] transition-all text-sm font-medium">{contactInfo.email}</a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Phone Card */}
                        <motion.div
                            initial="initial"
                            whileHover="hover"
                            className="relative px-8 py-5 border border-[#181825] bg-[#01010d] group transition-all duration-300 hover:border-[#18182520] h-full"
                        >
                            {/* Slanted Glare Effect - Wrapped for clipping */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-0 left-0 h-[40px] z-0" style={{ width: 'calc(100% + 40px)', background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)', transform: 'translateX(-20px) rotate(-2deg)', transformOrigin: 'top left' }}></div>
                            </div>
                            {/* Corner Animations */}
                            {/* Corner Accents (Always Visible) - 4px L-shapes */}
                             <div className="absolute -top-px -left-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -top-px -left-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -top-px -right-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -top-px -right-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -bottom-px -left-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -left-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -bottom-px -right-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -right-px w-1 h-px bg-[#01010d]"></div>


                            <div className="flex flex-col gap-3">
                                <div className="relative w-14 h-14 border border-[#181825] bg-[#01010d] flex items-center justify-center z-10 overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#01010d] shadow-[0_0_15px_#181825] z-20"></div>
                                    <FiPhone className="w-7 h-7 text-white" />
                                    <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#01010d] shadow-[0_0_15px_#181825] z-20"></div>
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#181825]/50 to-transparent"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#181825]/50 to-transparent"></div>
                                </div>
                                <div>
                                    <h4 className="text-[#f0f0ff]/50 text-xs uppercase tracking-widest mb-1.5">Direct Call</h4>
                                    <p className="text-white text-sm leading-relaxed mb-3">Talk to me fast, no hassle.</p>
                                    <a href={`tel:${contactInfo.phone}`} className="text-white border-b border-[#181825]/20 hover:border-[#181825] transition-all text-sm font-medium">{contactInfo.phone}</a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Consultation Card - Moved here */}
                        <motion.div
                            initial="initial"
                            whileHover="hover"
                            className="relative px-8 py-5 border border-[#181825] bg-[#01010d] group transition-all duration-300 hover:border-[#18182520] md:col-span-2 h-full"
                        >
                            {/* Slanted Glare Effect - Wrapped for clipping */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-0 left-0 h-[40px] z-0" style={{ width: 'calc(100% + 40px)', background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)', transform: 'translateX(-20px) rotate(-2deg)', transformOrigin: 'top left' }}></div>
                            </div>
                            {/* Corner Animations */}
                            {/* Corner Accents (Always Visible) - 4px L-shapes */}
                             <div className="absolute -top-px -left-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -top-px -left-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -top-px -right-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -top-px -right-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -bottom-px -left-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -left-px w-1 h-px bg-[#01010d]"></div>

                            <div className="absolute -bottom-px -right-px w-px h-1 bg-[#01010d]"></div>
                            <div className="absolute -bottom-px -right-px w-1 h-px bg-[#01010d]"></div>


                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="relative w-14 h-14 border border-[#181825] bg-[#01010d] flex items-center justify-center z-10 overflow-hidden shrink-0">
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#01010d] shadow-[0_0_15px_#181825] z-20"></div>
                                    <FiCalendar className="w-7 h-7 text-white" />
                                    <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#01010d] shadow-[0_0_15px_#181825] z-20"></div>
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#181825]/50 to-transparent"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#181825]/50 to-transparent"></div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[#f0f0ff]/50 text-xs uppercase tracking-widest mb-1.5">Consultation</h4>
                                    <p className="text-white text-sm leading-relaxed mb-3">Free to book a call if that feels more convenient—I&apos;m happy to walk you through everything.</p>
                                    <a target="_blank" rel="noopener noreferrer" href={contactInfo.calLink} className="text-white border-b border-[#181825]/20 hover:border-[#181825] transition-all text-sm font-medium cursor-pointer w-fit leading-none pb-0.5">Book a call</a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial="initial"
                        whileHover="hover"
                        className="relative p-8 md:p-12 border border-[#181825] bg-[#01010d] w-full h-full"
                    >
                        {/* Slanted Glare Effect - Wrapped for clipping */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 left-0 h-[40px] z-0" style={{ width: 'calc(100% + 40px)', background: 'linear-gradient(to bottom, rgba(240, 240, 255, 0.10) 0%, rgba(240, 240, 255, 0.05) 25%, rgba(240, 240, 255, 0.02) 50%, rgba(240, 240, 255, 0.01) 70%, transparent 100%)', transform: 'translateX(-20px) rotate(-2deg)', transformOrigin: 'top left' }}></div>
                        </div>
                        {/* Corner Animations */}
                        {/* Corner Accents (Always Visible) - 4px L-shapes */}
                        <div className="absolute -top-px -left-px w-px h-1 bg-[#01010d]"></div>
                        <div className="absolute -top-px -left-px w-1 h-px bg-[#01010d]"></div>

                        <div className="absolute -top-px -right-px w-px h-1 bg-[#01010d]"></div>
                        <div className="absolute -top-px -right-px w-1 h-px bg-[#01010d]"></div>

                        <div className="absolute -bottom-px -left-px w-px h-1 bg-[#01010d]"></div>
                        <div className="absolute -bottom-px -left-px w-1 h-px bg-[#01010d]"></div>

                        <div className="absolute -bottom-px -right-px w-px h-1 bg-[#01010d]"></div>
                        <div className="absolute -bottom-px -right-px w-1 h-px bg-[#01010d]"></div>


                        <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-[#f0f0ff]/50">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder={form.namePlaceholder}
                                        className="w-full px-5 py-2 bg-[#181825]/20 border border-[#181825] text-white focus:outline-none focus:border-[#18182540] focus:ring-1 focus:ring-[#18182510] transition-all placeholder:text-white/30 text-sm"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#f0f0ff]/50">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={form.emailPlaceholder}
                                        className="w-full px-5 py-2 bg-[#181825]/20 border border-[#181825] text-white focus:outline-none focus:border-[#18182540] focus:ring-1 focus:ring-[#18182510] transition-all placeholder:text-white/30 text-sm"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="subject" className="text-xs uppercase tracking-widest text-[#f0f0ff]/50">Subject Of Interest</label>
                                <div className="relative">
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-5 py-2.5 bg-[#181825]/20 border border-[#181825] text-white focus:outline-none focus:border-[#18182540] focus:ring-1 focus:ring-[#18182510] transition-all appearance-none text-sm"
                                        required
                                        disabled={isSubmitting}
                                    >
                                        <option value="" disabled className="bg-[#01010d]">{form.subjectPlaceholder}</option>
                                        {contactSubjects.map((subj: { value: string, label: string }) => (
                                            <option key={subj.value} value={subj.value} className="bg-[#01010d]">
                                                {subj.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-[#f0f0ff]/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#f0f0ff]/50">How may I assist you?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder={form.messagePlaceholder}
                                    className="w-full px-5 py-2.5 bg-[#181825]/20 border border-[#181825] text-white focus:outline-none focus:border-[#18182540] focus:ring-1 focus:ring-[#18182510] transition-all resize-none placeholder:text-white/30 text-sm"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <ConfettiButton
                                isSubmitting={isSubmitting}
                                isSuccess={submitStatus === 'success'}
                                text={form.submitButtonText}
                            />
                            {submitStatus === 'error' && (
                                <p className="text-red-400 text-xs text-center mt-2">Failed to send message. Please try again.</p>
                            )}
                        </form>
                    </motion.div>
                </div>

                {/* Bottom CTA Banner */}
                <div className="w-full mt-20 max-w-[980px] flex flex-col md:flex-row items-center justify-between gap-[32px] px-0 md:px-[20px] py-[40px] border-t-2 border-[#181825]/20 relative box-border mx-auto z-10">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-[30px] z-0" style={{ background: 'radial-gradient(at center top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)' }}></div>
                    </div>
                    <h3 className="text-xl md:text-3xl lg:text-3xl text-white/70 tracking-tight text-center md:text-left font-medium sm:py-4 sm:px-6 relative z-10">
                        Join forces for a technical consultation
                    </h3>

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
                            <div className="absolute top-0 left-0 w-full h-px bg-[#01010d]"></div>
                            <div className="absolute top-0 left-0 w-px h-full bg-[#01010d]"></div>
                        </motion.div>
                        <motion.div
                            className="absolute -top-1 -right-1 w-2 h-2 z-20"
                            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        >
                            <div className="absolute top-0 right-0 w-full h-px bg-[#01010d]"></div>
                            <div className="absolute top-0 right-0 w-px h-full bg-[#01010d]"></div>
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 -left-1 w-2 h-2 z-20"
                            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        >
                            <div className="absolute bottom-0 left-0 w-full h-px bg-[#01010d]"></div>
                            <div className="absolute bottom-0 left-0 w-px h-full bg-[#01010d]"></div>
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 -right-1 w-2 h-2 z-20"
                            variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                        >
                            <div className="absolute bottom-0 right-0 w-full h-px bg-[#01010d]"></div>
                            <div className="absolute bottom-0 right-0 w-px h-full bg-[#01010d]"></div>
                        </motion.div>

                        <FiMail className="w-5 h-5 relative z-20" />
                        <span className="relative z-20 whitespace-nowrap">{contactContent.buttonText}</span>
                    </motion.button>
                </div>

                {/* Container Bottom Terminals */}
                <div className="absolute -bottom-px -left-px w-px h-px bg-[#01010d]"></div>
                <div className="absolute -bottom-px -right-px w-px h-px bg-[#01010d]"></div>
            </div>
        </section >
    );
}
