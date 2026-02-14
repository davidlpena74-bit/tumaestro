'use client';

import { usePathname } from 'next/navigation';
import { useBackground } from '@/context/BackgroundContext';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function PageBackground() {
    const pathname = usePathname();
    const { backgroundImage, isImmersive, themeColor } = useBackground();

    // Don't show on Landing Page ('/')
    if (pathname === '/') return null;

    return (
        <div className={cn(
            "fixed inset-0 w-full h-full pointer-events-none transition-all duration-700",
            isImmersive ? "z-[60]" : "z-[-1]"
        )}>
            {/* Base Background (Dynamic Gradient or Black) */}
            <div className={cn(
                "absolute inset-0 transition-all duration-1000",
                isImmersive && themeColor ? `bg-gradient-to-br ${themeColor}` : "bg-black/40"
            )} />

            {/* Dark Overlay for Immersive Mode or Standard Mode */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                isImmersive ? "bg-slate-950/60 opacity-100" : "bg-black/20 opacity-0"
            )} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={backgroundImage || 'default-bg'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <img
                        src={backgroundImage || "/fondo.jpg"}
                        className={cn(
                            "w-full h-full object-cover scale-105 transition-all duration-1000",
                            isImmersive ? "blur-sm brightness-[0.4]" : ""
                        )}
                        alt=""
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Decorative Gradients (Only in non-immersive mode) */}
            {!isImmersive && (
                <div className="absolute inset-0 w-full h-full overflow-hidden opacity-50">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/20 rounded-full blur-[100px]" />
                </div>
            )}
        </div>
    );
}
