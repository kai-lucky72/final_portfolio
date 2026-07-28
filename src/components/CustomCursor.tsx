'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isInput, setIsInput] = useState(false);
    const [isActive, setIsActive] = useState(false);

    // Mouse position motion values
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring configuration for smooth follow
    const springConfig = { damping: 40, stiffness: 500, mass: 0.3 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Larger ring follow - snapier but smooth
    const ringSpringConfig = { damping: 35, stiffness: 350, mass: 0.5 };
    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);

    // Controlled MotionValues for springs to ensure reliable updates
    const scaleValue = useMotionValue(1);
    const dotScaleValue = useMotionValue(1);
    const ringScaleXValue = useMotionValue(1);
    const ringScaleYValue = useMotionValue(1);

    const hoverScale = useSpring(scaleValue, { damping: 25, stiffness: 300 });
    const dotScale = useSpring(dotScaleValue, { damping: 25, stiffness: 300 });
    const ringScaleX = useSpring(ringScaleXValue, { damping: 30, stiffness: 400 });
    const ringScaleY = useSpring(ringScaleYValue, { damping: 30, stiffness: 400 });

    const [mounted, setMounted] = useState(false);
    const lastTargetRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        scaleValue.set(isHovered ? 1.4 : 1);
        dotScaleValue.set(isHovered ? 0.5 : 1);
        ringScaleXValue.set(isInput ? 0.1 : 1);
        ringScaleYValue.set(isInput ? 1.2 : 1);
    }, [isHovered, isInput]);

    const updateCursorState = useCallback((target: HTMLElement | null) => {
        if (!target || target === lastTargetRef.current) return;
        lastTargetRef.current = target;

        const clickable = target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[role="button"]') ||
            window.getComputedStyle(target).cursor === 'pointer';

        const input = target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable ||
            target.closest('input') ||
            target.closest('textarea') ||
            target.closest('[contenteditable="true"]');

        setIsHovered(!!clickable);
        setIsInput(!!input);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Use translate3d implicitly via motion values
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isActive) setIsActive(true);
        updateCursorState(e.target as HTMLElement);
    }, [mouseX, mouseY, isActive, updateCursorState]);

    useEffect(() => {
        if (!mounted) return;

        const handleMouseDown = () => setIsActive(true);
        const handleMouseUp = () => setIsActive(true);
        const handleMouseLeave = () => setIsActive(false);
        const handleMouseEnter = () => setIsActive(true);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [handleMouseMove, mounted]);

    // Toggle class on body to hide native cursor when custom is active
    useEffect(() => {
        if (mounted && isActive) {
            document.documentElement.classList.add('has-custom-cursor');
        } else {
            document.documentElement.classList.remove('has-custom-cursor');
        }
        return () => {
            document.documentElement.classList.remove('has-custom-cursor');
        };
    }, [mounted, isActive]);

    if (!mounted || !isActive) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden transform-gpu translate-z-0">
            {/* Outer Ring */}
            <motion.div
                className="absolute top-0 left-0 w-6 h-6 rounded-full border border-white/20 mix-blend-difference pointer-events-none transform-gpu"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scaleX: ringScaleX,
                    scaleY: ringScaleY,
                    scale: hoverScale,
                    borderRadius: isInput ? 0 : "100%",
                    translateZ: 0,
                    willChange: 'transform'
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="absolute top-0 left-0 w-1.5 h-1.5 bg-white rounded-full mix-blend-difference pointer-events-none transform-gpu"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isInput ? 0 : dotScale,
                    opacity: isInput ? 0 : 1,
                    translateZ: 0,
                    willChange: 'transform'
                }}
            />
        </div>
    );
}
