'use client';

import { Trophy, Timer, GlobeHemisphereWest, ArrowCounterClockwise, XCircle, CheckCircle } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GameHUDProps {
    title?: string;
    score: number;
    errors: number;
    timeLeft: number;
    totalTargets?: number;
    remainingTargets?: number;
    targetName?: string;
    message?: string;
    onReset: () => void;

    // Metadata
    region?: string;
    gameType?: string;

    // Customization
    colorTheme?: 'blue' | 'emerald' | 'purple' | 'orange' | 'teal' | 'yellow';
    icon?: React.ReactNode;
    gameMode?: 'challenge' | 'practice';
    elapsedTime?: number;
}

const THEMES = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-400', sub: 'text-blue-300' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-400', sub: 'text-emerald-300' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-400', sub: 'text-purple-300' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-400', sub: 'text-orange-300' },
    teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-400', sub: 'text-teal-300' },
    yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-400', sub: 'text-yellow-300' },
};

export default function GameHUD({
    title = 'Juego',
    score,
    errors,
    timeLeft,
    totalTargets = 0,
    remainingTargets = 0,
    targetName,
    message,
    onReset,
    colorTheme = 'blue',
    icon,
    gameMode = 'challenge',
    elapsedTime = 0
}: GameHUDProps) {
    const { t } = useLanguage();
    const theme = THEMES[colorTheme];

    // Calculate accuracy
    const completed = totalTargets - remainingTargets;
    const totalAttempts = completed + errors;
    const accuracy = totalAttempts > 0 ? Math.round((completed / totalAttempts) * 100) : 100;

    const displayTime = gameMode === 'challenge' ? timeLeft : elapsedTime;

    return (
        <div className="w-full relative z-20">
            {/* HUD CARD - Darker Slate Glass (bg-slate-900/60) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl gap-4">

                {/* LEFT: Score & Accuracy */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={cn("p-3 rounded-xl", icon ? "bg-blue-500/20" : theme.bg)}>
                        {icon ? (
                            <div className="text-blue-400">{icon}</div>
                        ) : (
                            <GlobeHemisphereWest className={cn("w-8 h-8", theme.text)} weight="duotone" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white leading-none">
                            {score} <span className={cn("text-sm font-normal", theme.sub)}>pts</span>
                        </h2>
                        <div className={cn("flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold mt-1 uppercase tracking-wider", theme.sub)}>
                            <span>{accuracy}% Acierto</span>
                        </div>
                    </div>
                </div>

                {/* CENTER: Target Display - Only show if targetName is provided */}
                {targetName !== "" && (
                    <div className="flex-1 text-center bg-slate-900/50 px-1 py-2 rounded-xl border border-white/10 w-full md:w-auto flex flex-col items-center justify-center min-h-[80px]">
                        <div className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Encuentra</div>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={targetName || 'loading'}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className={cn("text-xl md:text-2xl font-black drop-shadow-sm px-2 text-balance leading-tight", theme.text)}
                            >
                                {targetName || '...'}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* RIGHT: Timer, Errors, Reset */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">

                    {/* Timer & Remaining */}
                    <div className="flex flex-col items-center gap-1">
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl font-mono font-bold text-xl border transition-all shadow-lg min-w-[100px] justify-center",
                            gameMode === 'challenge' && timeLeft < 20
                                ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                                : "bg-slate-800/80 border-white/10 " + theme.text
                        )}>
                            <Timer className="w-5 h-5" weight="bold" />
                            <span>
                                {Math.floor(displayTime / 60)}:{(displayTime % 60).toString().padStart(2, '0')}
                            </span>
                        </div>
                        {remainingTargets > 0 && (
                            <span className={cn("text-[10px] uppercase font-bold tracking-wider", theme.sub)}>
                                {t.common.remaining}: {remainingTargets}
                            </span>
                        )}
                    </div>

                    {/* Errors */}
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-red-400 font-bold text-lg leading-none">{errors}</span>
                        <span className="text-red-400/60 text-[10px] uppercase font-bold">{t.common.errors}</span>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={onReset}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-white border border-white/5 hover:border-white/20"
                        title="Reiniciar"
                    >
                        <ArrowCounterClockwise className="w-5 h-5" weight="bold" />
                    </button>
                </div>
            </div>

            {/* FEEDBACK BANNER (Absolute) */}
            <AnimatePresence>
                {message && (
                    <div className="absolute left-0 right-0 -bottom-16 md:bottom-auto md:top-24 flex justify-center pointer-events-none z-30">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "px-6 py-2 rounded-full border shadow-xl backdrop-blur-md font-bold text-lg flex items-center gap-2",
                                message.includes('Correcto') || message.includes('Success')
                                    ? "bg-green-500/90 border-green-400 text-white"
                                    : "bg-red-500/90 border-red-400 text-white"
                            )}
                        >
                            {message.includes('Correcto') || message.includes('Success') ? <CheckCircle className="w-5 h-5" weight="fill" /> : <XCircle className="w-5 h-5" weight="fill" />}
                            {message}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
