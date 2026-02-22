'use client';

import { Trophy, Timer, GlobeHemisphereWest, ArrowCounterClockwise, XCircle, CheckCircle, ChatCircleText, Star } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import RatingSystem from './RatingSystem';
import { MessageSquareText, Star as StarLucide, X } from 'lucide-react';

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
    colorTheme?: 'blue' | 'emerald' | 'purple' | 'orange' | 'teal' | 'yellow' | 'cyan' | 'rose' | 'sky';
    icon?: React.ReactNode;
    gameMode?: 'challenge' | 'practice';
    elapsedTime?: number;
    activityId?: string;
}

const THEMES = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-400', sub: 'text-blue-300' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-400', sub: 'text-emerald-300' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-400', sub: 'text-purple-300' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-400', sub: 'text-orange-300' },
    teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-400', sub: 'text-teal-300' },
    yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-400', sub: 'text-yellow-300' },
    cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-400', sub: 'text-cyan-300' },
    rose: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-400', sub: 'text-violet-300' },
    sky: { bg: 'bg-sky-500/20', text: 'text-sky-400', border: 'border-sky-400', sub: 'text-sky-300' },
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
    elapsedTime = 0,
    gameType,
    activityId
}: GameHUDProps) {
    const { t, language } = useLanguage();
    const theme = THEMES[colorTheme as keyof typeof THEMES] || THEMES.blue;
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [hudMessage, setHudMessage] = useState<string | null>(null);
    const [ratingData, setRatingData] = useState<{ avg: number; count: number } | null>(null);
    const [records, setRecords] = useState<{
        bestScore: number | null; bestScoreName: string | null;
        bestTime: number | null; bestTimeName: string | null;
        myBestScore: number | null;
        myBestTime: number | null;
    }>({ bestScore: null, bestScoreName: null, bestTime: null, bestTimeName: null, myBestScore: null, myBestTime: null });

    // Fetch activity ratings
    useEffect(() => {
        if (!activityId) return;
        let isMounted = true;

        const fetchActivityRatings = async () => {
            try {
                const { data, error } = await supabase
                    .from('activity_ratings')
                    .select('rating')
                    .eq('activity_id', activityId);

                if (!isMounted) return;
                if (error) throw error;
                if (data && data.length > 0) {
                    const count = data.length;
                    const avg = data.reduce((acc, curr) => acc + curr.rating, 0) / count;
                    if (isMounted) setRatingData({ avg, count });
                } else {
                    if (isMounted) setRatingData({ avg: 0, count: 0 });
                }
            } catch (err: any) {
                if (err?.name === 'AbortError') return; // Expected in React StrictMode
                if (isMounted) console.error('Error fetching game ratings:', err);
            }
        };

        fetchActivityRatings();
        return () => { isMounted = false; };
    }, [activityId, isRatingModalOpen]);

    // Fetch global best + personal best (with user names)
    useEffect(() => {
        if (!activityId) return;
        let isMounted = true;
        const run = async () => {
            try {
                // 1. Global best SCORE (top scorer name + score)
                const { data: topScore } = await supabase
                    .from('activity_scores')
                    .select('score, time_spent, profiles(full_name)')
                    .eq('activity_id', activityId)
                    .order('score', { ascending: false })
                    .limit(1)
                    .single();

                if (!isMounted) return;

                // 2. Global best TIME (fastest player name + time)
                const { data: topTime } = await supabase
                    .from('activity_scores')
                    .select('score, time_spent, profiles(full_name)')
                    .eq('activity_id', activityId)
                    .order('time_spent', { ascending: true })
                    .limit(1)
                    .single();

                if (!isMounted) return;

                const getFirstName = (d: any) => {
                    const name = d?.profiles?.full_name as string | undefined;
                    if (!name) return null;
                    return name.split(' ')[0];
                };

                const bestScore = (topScore as any)?.score ?? null;
                const bestScoreName = getFirstName(topScore);
                const bestTime = (topTime as any)?.time_spent ?? null;
                const bestTimeName = getFirstName(topTime);

                // 3. My personal bests
                let myBestScore: number | null = null;
                let myBestTime: number | null = null;
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user && isMounted) {
                    const { data: mine } = await supabase
                        .from('activity_scores')
                        .select('score, time_spent')
                        .eq('activity_id', activityId)
                        .eq('user_id', session.user.id);

                    if (!isMounted) return;
                    if (mine && mine.length > 0) {
                        myBestScore = Math.max(...mine.map((r: any) => r.score));
                        myBestTime = Math.min(...mine.map((r: any) => r.time_spent));
                    }
                }

                if (isMounted) setRecords({ bestScore, bestScoreName, bestTime, bestTimeName, myBestScore, myBestTime });
            } catch (err: any) {
                if (err?.name === 'AbortError') return;
            }
        };
        run();
        return () => { isMounted = false; };
    }, [activityId]);

    const handleOpenRating = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setHudMessage(language === 'es' ? 'Inicia sesión para valorar la actividad' : 'Log in to rate the activity');
                setTimeout(() => setHudMessage(null), 3000);
                return;
            }
            setIsRatingModalOpen(true);
        } catch (err: any) {
            if (err?.name === 'AbortError') return;
            console.error('Error checking session for rating:', err);
        }
    };

    // Calculate accuracy
    const completed = totalTargets - remainingTargets;
    const totalAttempts = completed + errors;
    const accuracy = totalAttempts > 0 ? Math.round((completed / totalAttempts) * 100) : 100;

    const displayTime = gameMode === 'challenge' ? timeLeft : elapsedTime;

    return (
        <div className="w-full relative z-20">
            {/* Global Rating Button (Above HUD) */}
            {activityId && (
                <div className="absolute -top-7 right-6 flex items-center gap-2 z-50">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">Comenta:</span>
                    <button
                        onClick={handleOpenRating}
                        className="p-1 px-3 bg-slate-900/60 backdrop-blur-xl hover:bg-slate-800/80 text-yellow-500 border border-white/10 rounded-xl transition-all flex items-center gap-2 group shadow-xl"
                        title="Valorar actividad"
                    >
                        <MessageSquareText className="w-4 h-4" />
                        <div className="flex items-center gap-0.5">
                            {ratingData && ratingData.count > 0 ? (
                                <>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <StarLucide
                                            key={s}
                                            className={cn(
                                                "w-3 h-3",
                                                s <= Math.round(ratingData.avg) ? "fill-yellow-500 text-yellow-500" : "text-slate-500 fill-transparent"
                                            )}
                                        />
                                    ))}
                                    <span className="text-[10px] font-black text-yellow-500 ml-1">
                                        {ratingData.avg.toFixed(1)}
                                    </span>
                                </>
                            ) : (
                                <div className="flex items-center gap-0.5 opacity-40">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <StarLucide key={s} className="w-3 h-3 text-white fill-transparent" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </button>
                </div>
            )}

            {/* Records strip — centered, same row as Comenta button */}
            {activityId && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 pointer-events-none">
                    <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1 shadow-xl">

                        {/* 🏆 Mejor puntuación global */}
                        <div className="flex items-center gap-1.5">
                            <Trophy className="w-3 h-3 text-yellow-400 flex-shrink-0" weight="fill" />
                            <div className="flex flex-col leading-none">
                                <span className="text-yellow-400/50 text-[7px] font-black uppercase tracking-wider">RÉCORD PTS</span>
                                <span className="text-yellow-300 font-black text-[10px]">
                                    {records.bestScore !== null ? `${records.bestScore}pts` : '—'}
                                    {records.bestScoreName && (
                                        <span className="text-yellow-400/60 font-normal"> · {records.bestScoreName}</span>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="w-px h-5 bg-white/10" />

                        {/* ⏱ Mejor tiempo global */}
                        <div className="flex items-center gap-1.5">
                            <Timer className="w-3 h-3 text-sky-400 flex-shrink-0" weight="fill" />
                            <div className="flex flex-col leading-none">
                                <span className="text-sky-400/50 text-[7px] font-black uppercase tracking-wider">RÉCORD TIEMPO</span>
                                <span className="text-sky-300 font-black text-[10px]">
                                    {records.bestTime !== null
                                        ? `${Math.floor(records.bestTime / 60)}:${(records.bestTime % 60).toString().padStart(2, '0')}`
                                        : '—'}
                                    {records.bestTimeName && (
                                        <span className="text-sky-400/60 font-normal"> · {records.bestTimeName}</span>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="w-px h-5 bg-white/10" />

                        {/* ⭐ Mis mejores marcas */}
                        <div className="flex items-center gap-1.5">
                            <Star className="w-3 h-3 text-emerald-400 flex-shrink-0" weight="fill" />
                            <div className="flex flex-col leading-none">
                                <span className="text-emerald-400/50 text-[7px] font-black uppercase tracking-wider">MI MEJOR</span>
                                <span className="text-emerald-300 font-black text-[10px]">
                                    {records.myBestScore !== null ? `${records.myBestScore}pts` : '—'}
                                    {records.myBestTime !== null && (
                                        <span className="text-emerald-400/60 font-normal">
                                            {' · '}{Math.floor(records.myBestTime / 60)}:{(records.myBestTime % 60).toString().padStart(2, '0')}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Auth Message Toast (above HUD) */}
            <AnimatePresence>
                {hudMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-yellow-500/30 px-4 py-2 rounded-full text-xs font-bold text-yellow-400 shadow-2xl z-[60] backdrop-blur-md"
                    >
                        {hudMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD CARD - Darker Slate Glass (bg-slate-900/60) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl gap-4">

                {/* LEFT: Score & Accuracy */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={cn("p-3 rounded-xl", theme.bg)}>
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
                            <span>{accuracy}% {t.common.accuracy}</span>
                        </div>
                    </div>
                </div>

                {/* CENTER: Target Display - Only show if targetName is provided */}
                {targetName !== "" && (
                    <div className="flex-1 text-center bg-slate-900/50 px-1 py-2 rounded-xl border border-white/10 w-full md:w-auto flex flex-col items-center justify-center min-h-[80px]">
                        <div className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                            {(gameType === 'pronunciation' || gameType === 'writing') ? (language === 'es' ? 'Conjuga el verbo:' : 'Conjugate the verb:') : t.common.find}
                        </div>
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
                                ((message.includes(t.common.correct) || message.includes('🎉') || message.includes('✅') || message.includes('Success')) && !message.includes('❌') && !message.toLowerCase().includes('incorrect'))
                                    ? "bg-green-500/90 border-green-400 text-white"
                                    : "bg-red-500/90 border-red-400 text-white"
                            )}
                        >
                            {((message.includes(t.common.correct) || message.includes('🎉') || message.includes('✅') || message.includes('Success')) && !message.includes('❌') && !message.toLowerCase().includes('incorrect')) ? <CheckCircle className="w-5 h-5" weight="fill" /> : <XCircle className="w-5 h-5" weight="fill" />}
                            {message}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Rating Modal */}
            <AnimatePresence>
                {isRatingModalOpen && activityId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setIsRatingModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <RatingSystem
                                activityId={activityId}
                                onClose={() => setIsRatingModalOpen(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
