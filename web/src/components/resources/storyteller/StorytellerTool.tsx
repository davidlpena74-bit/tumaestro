'use client';

import { useState, useRef, useEffect, useMemo, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    BookOpen,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    ArrowLeft,
    SpeakerHigh,
    MusicNotes,
    BookmarkSimple,
    Clock,
    TextT,
    Translate,
    ArrowsOut,
    ArrowsIn,
    CaretDown,
    Star,
    StarHalf
} from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BOOKS, Book } from './books-data';
import { getBestVoice } from '@/lib/speech-utils';
import { useLanguage } from '@/context/LanguageContext';
import { useBackground } from '@/context/BackgroundContext';
import { supabase } from '@/lib/supabaseClient';
import StorySearch from './StorySearch';
import RatingSystem from '@/components/games/RatingSystem';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StorytellerTool({ initialBookId, initialLanguage = 'es', category = 'classic' }: { initialBookId?: string, initialLanguage?: 'es' | 'en' | 'fr' | 'de', category?: 'classic' | 'juvenile' }) {
    const { t, language } = useLanguage();
    const { setBackgroundImage, setIsImmersive, setThemeColor } = useBackground();
    const router = useRouter();
    const [selectedBook, setSelectedBook] = useState<Book | null>(
        initialBookId ? (BOOKS.find(b => b.id === initialBookId) || null) : null
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechRate, setSpeechRate] = useState(1.0);
    const SPEED_OPTIONS = [
        { key: 'slowest', value: 0.7 },
        { key: 'slower', value: 0.85 },
        { key: 'normal', value: 1.0 },
        { key: 'faster', value: 1.15 },
        { key: 'fastest', value: 1.3 }
    ] as const;
    const [fontSize, setFontSize] = useState(24);
    const [audioLanguage, setAudioLanguage] = useState<'es' | 'en' | 'fr' | 'de'>(initialLanguage);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    // Sync state if prop changes (navigation)
    useEffect(() => {
        setAudioLanguage(initialLanguage);
    }, [initialLanguage]);

    const [charIndex, setCharIndex] = useState(0);
    const [isMaximized, setIsMaximized] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [bookRatings, setBookRatings] = useState<Record<string, { avg: number, count: number }>>({});


    const synthRef = useRef<SpeechSynthesis | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const progressRef = useRef<number>(0);
    const currentSpeedRef = useRef<number>(0.012);
    const lastBoundaryTimeRef = useRef<number>(0);
    const lastBoundaryCharIndexRef = useRef<number>(0);
    const isUsingAudioRef = useRef(false);
    const isPlayingRef = useRef(false);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const currentBookContent = useMemo(() => {
        if (!selectedBook) return [];
        if (audioLanguage === 'en' && selectedBook.contentEn) {
            return selectedBook.contentEn;
        }
        if (audioLanguage === 'fr' && selectedBook.contentFr) {
            return selectedBook.contentFr;
        }
        if (audioLanguage === 'de' && selectedBook.contentDe) {
            return selectedBook.contentDe;
        }
        return selectedBook.content;
    }, [selectedBook, audioLanguage]);

    // Sync Background with context
    useEffect(() => {
        if (isMaximized && selectedBook) {
            setIsImmersive(true);
            const currentImg = currentBookContent[currentPage]?.image || selectedBook.chipImage || selectedBook.coverImage;
            setBackgroundImage(currentImg || null);
            setThemeColor(selectedBook.themeColor || null);
        } else {
            setIsImmersive(false);
            setBackgroundImage(null);
            setThemeColor(null);
        }

        // Cleanup when story closed
        return () => {
            if (!selectedBook) {
                setIsImmersive(false);
                setBackgroundImage(null);
                setThemeColor(null);
            }
        };
    }, [isMaximized, selectedBook, currentPage, currentBookContent]);

    // Initialize synthesis
    useEffect(() => {
        if (typeof window !== 'undefined' && !synthRef.current) {
            synthRef.current = window.speechSynthesis;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (synthRef.current) synthRef.current.cancel();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

            // Clean global background definitively on unmount
            setIsImmersive(false);
            setBackgroundImage(null);
            setThemeColor(null);
        };
    }, []);

    useEffect(() => {
        if (initialBookId) {
            const book = BOOKS.find(b => b.id === initialBookId);
            if (book) setSelectedBook(book);
        } else {
            setSelectedBook(null);
        }
    }, [initialBookId]);

    useEffect(() => {
        const fetchAllStoryRatings = async () => {
            try {
                const { data, error } = await supabase
                    .from('activity_ratings')
                    .select('activity_id, rating')
                    .like('activity_id', 'story-%');

                if (error) throw error;

                if (data) {
                    const ratingsMap: Record<string, { sum: number, count: number }> = {};
                    data.forEach(r => {
                        const id = r.activity_id.replace('story-', '');
                        if (!ratingsMap[id]) ratingsMap[id] = { sum: 0, count: 0 };
                        ratingsMap[id].sum += r.rating;
                        ratingsMap[id].count += 1;
                    });

                    const finalRatings: Record<string, { avg: number, count: number }> = {};
                    Object.entries(ratingsMap).forEach(([id, stats]) => {
                        finalRatings[id] = {
                            avg: Number((stats.sum / stats.count).toFixed(1)),
                            count: stats.count
                        };
                    });
                    setBookRatings(finalRatings);
                }
            } catch (err) {
                console.error('Error fetching all story ratings:', err);
            }
        };

        fetchAllStoryRatings();
    }, []);

    useEffect(() => {
        if (selectedBook) {
            setCurrentPage(0);
            setIsPlaying(false);
            isPlayingRef.current = false;
            setCharIndex(0);
            progressRef.current = 0;
            if (synthRef.current) synthRef.current.cancel();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [selectedBook, audioLanguage]);

    // State-driven playback (Regression to pre-1.6 logic)
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying && selectedBook) {
            // Small delay to allow UI to update and animations to settle
            timer = setTimeout(() => {
                speakPage();
            }, 100);
        } else {
            // Stop everything if isPlaying becomes false
            if (synthRef.current) synthRef.current.cancel();
            if (audioRef.current) {
                audioRef.current.pause();
                // We don't reset currentTime here to allow "Pause" behavior if needed, 
                // but usually we want to stop.
            }
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, currentPage, audioLanguage, speechRate]);


    const requestProgressLoop = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        lastTimeRef.current = performance.now();

        const loop = (time: number) => {
            if (!isPlayingRef.current) return;

            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            const text = currentBookContent[currentPage]?.text || "";

            if (isUsingAudioRef.current && audioRef.current) {
                const duration = audioRef.current.duration || 1;
                if (Number.isFinite(duration) && duration > 0) {
                    const progress = (audioRef.current.currentTime / duration) * text.length;
                    progressRef.current = progress;
                    setCharIndex(Math.min(text.length, Math.floor(progress)));
                }
            } else if (progressRef.current < text.length) {
                const char = text[Math.floor(progressRef.current)];
                let speedMultiplier = 1;
                if (char === '.' || char === '?' || char === '!' || char === ':') {
                    speedMultiplier = 0.12;
                } else if (char === ',') {
                    speedMultiplier = 0.35;
                }
                progressRef.current += deltaTime * currentSpeedRef.current * speedMultiplier;
                setCharIndex(Math.min(text.length, Math.floor(progressRef.current)));
            }
            animationFrameRef.current = requestAnimationFrame(loop);
        };
        animationFrameRef.current = requestAnimationFrame(loop);
    };

    const handlePageFinished = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        if (selectedBook && currentPage < currentBookContent.length - 1) {
            // Reset character index visually before moving to next page
            setCharIndex(0);
            progressRef.current = 0;
            setCurrentPage(prev => prev + 1);
            // isPlaying remains true, which triggers speakPage via useEffect
        } else {
            setIsPlaying(false);
            isPlayingRef.current = false;
        }
    };

    const speakPage = async () => {
        if (!selectedBook || !synthRef.current) return;

        // Cleanup previous
        synthRef.current.cancel();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const page = currentBookContent[currentPage];
        const text = page?.text || "";

        setCharIndex(0);
        progressRef.current = 0;

        // Define TTS Logic
        const startTTS = () => {
            if (!isPlayingRef.current) return;

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }

            const utterance = new SpeechSynthesisUtterance(text);

            // Language selection logic
            if (audioLanguage === 'en') {
                utterance.lang = 'en-US';
                const voices = synthRef.current?.getVoices() || [];
                const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Zira") || v.lang.startsWith('en'));
                if (preferredVoice) utterance.voice = preferredVoice;
            } else if (audioLanguage === 'fr') {
                utterance.lang = 'fr-FR';
                const voices = synthRef.current?.getVoices() || [];
                const preferredVoice = voices.find(v => v.lang.startsWith('fr') && !v.name.includes("Canada"));
                if (preferredVoice) utterance.voice = preferredVoice;
            } else if (audioLanguage === 'de') {
                utterance.lang = 'de-DE';
                const voices = synthRef.current?.getVoices() || [];
                const preferredVoice = voices.find(v => v.lang.startsWith('de'));
                if (preferredVoice) utterance.voice = preferredVoice;
            } else {
                utterance.lang = 'es-ES';
                const bestVoice = getBestVoice('es-ES');
                if (bestVoice) {
                    utterance.voice = bestVoice;
                }
            }

            const langBase = audioLanguage === 'es' ? 0.015 : 0.014;
            currentSpeedRef.current = (speechRate || 1) * langBase;
            isUsingAudioRef.current = false;

            utterance.rate = speechRate * (audioLanguage === 'en' ? 0.9 : 0.88);
            utterance.pitch = 1.08;
            utterance.volume = 1.0;

            utterance.onstart = () => {
                if (isPlayingRef.current) {
                    lastTimeRef.current = performance.now();
                    lastBoundaryTimeRef.current = performance.now();
                    lastBoundaryCharIndexRef.current = 0;
                    requestProgressLoop();
                }
            };

            utterance.onboundary = (event) => {
                if (isPlayingRef.current && event.name === 'word') {
                    const currentIndex = event.charIndex;
                    const now = performance.now();
                    const timeDiff = now - lastBoundaryTimeRef.current;
                    const charDiff = currentIndex - lastBoundaryCharIndexRef.current;

                    if (timeDiff > 100 && charDiff > 0) {
                        const measuredSpeed = charDiff / timeDiff;
                        currentSpeedRef.current = (currentSpeedRef.current * 0.7) + (measuredSpeed * 0.3);
                    }

                    lastBoundaryTimeRef.current = now;
                    lastBoundaryCharIndexRef.current = currentIndex;
                    progressRef.current = currentIndex;
                    setCharIndex(currentIndex);
                }
            };

            utterance.onend = () => {
                if (isPlayingRef.current) {
                    handlePageFinished();
                }
            };

            utteranceRef.current = utterance;
            if (synthRef.current) synthRef.current.speak(utterance);
        };

        // Try MP3
        const langSubfolder = audioLanguage === 'es' ? "" : `/${audioLanguage}`;
        const audioPath = `/audio/storyteller/${selectedBook.id}${langSubfolder}/page_${currentPage}.mp3`;

        if (!audioRef.current) audioRef.current = new Audio();
        const audio = audioRef.current;

        // Async check using fetch is safer than loading audio on main thread for logic
        // But for regression we go back to "Try to load"

        const checkAudio = async () => {
            return new Promise<boolean>((resolve) => {
                const tempAudio = new Audio();
                tempAudio.src = audioPath;
                tempAudio.oncanplaythrough = () => resolve(true);
                tempAudio.onerror = () => resolve(false);
                // Timeout fallback
                setTimeout(() => resolve(false), 2000);
            });
        };

        // This was the old logic essentially, or similar
        // Simplification: Just try to play it.

        audio.src = audioPath;
        audio.playbackRate = speechRate;
        audio.onended = () => {
            if (isPlayingRef.current) handlePageFinished();
        };
        audio.onerror = () => {
            startTTS();
        };

        try {
            await audio.play();
            // Success
            isUsingAudioRef.current = true;
            requestProgressLoop();
        } catch (e) {
            // Failed
            startTTS();
        }
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const nextPage = () => {
        if (selectedBook && currentPage < currentBookContent.length - 1) {
            setCurrentPage(prev => prev + 1);
            setIsPlaying(false);
            isPlayingRef.current = false;
            setCharIndex(0);
            if (synthRef.current) synthRef.current.cancel();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = ""; // Clear src to prevent incorrect resume
            }
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
            setIsPlaying(false);
            isPlayingRef.current = false;
            setCharIndex(0);
            if (synthRef.current) synthRef.current.cancel();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = ""; // Clear src to prevent incorrect resume
            }
        }
    };

    if (selectedBook) {
        return (
            <div className="w-full max-w-5xl mx-auto p-4 animate-in fade-in duration-500">
                {/* Fondo Fijo Inmersivo ahora gestionado por PageBackground vía Context */}

                {!isMaximized && (
                    <div className="flex relative pointer-events-none w-full transition-all duration-500 justify-center -mb-16 z-50 px-4">
                        <div className="w-full px-0 flex justify-start max-w-4xl">
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onMouseEnter={() => setTooltipOpen(true)}
                                onMouseLeave={() => setTooltipOpen(false)}
                                onClick={() => {
                                    setIsMaximized(false);
                                    setSelectedBook(null);
                                    const backPath = selectedBook?.category === 'juvenile' ? 'lectura-juvenil' : 'cuentos-clasicos';
                                    router.push(`/material/${backPath}`);
                                }}
                                className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-teal-600 hover:border-teal-100 transition-all z-20 cursor-pointer pointer-events-auto"
                            >
                                <ArrowLeft size={20} weight="bold" />
                                <AnimatePresence>
                                    {tooltipOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50"
                                        >
                                            {t.storyteller.backToLibrary}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                )}

                {/* Área de Lectura */}
                <div className={cn(
                    "w-full mx-auto flex flex-col transition-all duration-500",
                    isMaximized
                        ? "fixed inset-0 z-[80] bg-transparent items-center justify-start pt-10 md:pt-14 lg:pt-16 px-8 gap-0 overflow-hidden"
                        : "max-w-4xl gap-8 relative"
                )}>
                    {/* Chip Flotante (Solo Normal Mode + No Cover Page) */}
                    {!isMaximized && !currentBookContent[currentPage]?.image && selectedBook.chipImage && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`chip-${selectedBook.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="flex justify-center relative z-20 -mb-6 pointer-events-none"
                            >
                                <div className="w-28 h-28 rounded-full shadow-2xl overflow-hidden flex items-center justify-center text-center relative z-30 filter drop-shadow-lg bg-[#fffdf5]">
                                    {selectedBook.chipImage.includes('/') ? (
                                        <img src={selectedBook.chipImage} className="w-full h-full object-cover mix-blend-multiply" alt="Character" />
                                    ) : (
                                        <span className="text-[10px] font-black uppercase text-slate-400 leading-tight bg-white w-full h-full flex items-center justify-center">
                                            {selectedBook.chipImage}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* Texto Principal */}
                    <div className={cn(
                        "transition-all duration-500 relative flex flex-col justify-center",
                        isMaximized
                            ? "w-full max-w-5xl max-h-[78vh] z-10 px-8 md:px-12 lg:px-20 py-4 md:py-6 lg:py-10 text-white flex flex-col mb-8"
                            : "bg-white/40 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white/20 flex-grow shadow-2xl min-h-[400px]"
                    )}>
                        {/* Glass Overlay for Immersive Mode */}
                        {isMaximized && <div className="absolute inset-0 bg-white/10 backdrop-blur-[120px] rounded-[3rem] border border-white/20 shadow-2xl" />}

                        {/* Maximize Toggle Button */}
                        <div className="absolute top-6 right-6 z-50">
                            <button
                                onClick={() => setIsMaximized(!isMaximized)}
                                className={cn(
                                    "p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg cursor-pointer",
                                    isMaximized
                                        ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                                        : "bg-white/50 hover:bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200/50"
                                )}
                                title={isMaximized ? t.storyteller.minimize : t.storyteller.maximize}
                            >
                                {isMaximized ? <ArrowsIn weight="bold" size={24} /> : <ArrowsOut weight="bold" size={20} />}
                            </button>
                        </div>

                        {/* Rating Logic Trigger */}
                        <div className={cn(
                            "absolute z-50 transition-all duration-500",
                            isMaximized ? "top-4 left-1/2 -translate-x-1/2" : "-top-14 -right-2"
                        )}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsRatingModalOpen(true)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-2xl shadow-xl transition-all border cursor-pointer",
                                    isMaximized
                                        ? "bg-white/10 backdrop-blur-md border-white/20 text-white"
                                        : "bg-white border-yellow-200 text-slate-700 hover:border-yellow-400"
                                )}
                            >
                                <Star weight="fill" className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" size={18} />
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Valorar</span>
                                    {selectedBook.rating && <span className="text-xs font-bold">{selectedBook.rating}</span>}
                                </div>
                            </motion.button>
                        </div>


                        <div className={cn(
                            "flex-grow flex flex-col items-center justify-center overflow-hidden w-full relative z-10",
                            selectedBook.category === 'juvenile' ? "font-handwriting" : "font-serif"
                        )}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPage}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className={cn(
                                        "relative z-10 leading-relaxed text-center flex flex-col items-center justify-center w-full h-full overflow-hidden",
                                        selectedBook.category === 'juvenile' ? "text-left items-start md:px-16" : "text-center items-center"
                                    )}
                                    style={{ fontSize: `${isMaximized ? fontSize + 4 : fontSize}px`, color: isMaximized ? 'white' : undefined }}
                                >
                                    <div className={cn(
                                        "relative max-w-4xl overflow-y-auto custom-scrollbar px-4 py-8 rounded-xl",
                                        selectedBook.category === 'juvenile' && !isMaximized ? "bg-[#fffdf5] shadow-inner border border-amber-100 min-h-[500px] w-full" : ""
                                    )}>
                                        {selectedBook.category === 'juvenile' && !isMaximized && (
                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2.5rem' }} />
                                        )}
                                        <span className={cn(
                                            "transition-all duration-75 whitespace-pre-wrap",
                                            selectedBook.category === 'juvenile' ? "text-blue-900 font-bold" : "font-medium",
                                            isMaximized ? "text-white" : "text-slate-900"
                                        )}>
                                            {currentBookContent[currentPage]?.text.slice(0, charIndex)}
                                        </span>
                                        <span className={cn(
                                            "whitespace-pre-wrap",
                                            selectedBook.category === 'juvenile' ? "text-blue-900/40 font-bold" : "font-medium",
                                            isMaximized ? "text-white/50" : "text-slate-500"
                                        )}>
                                            {currentBookContent[currentPage]?.text.slice(charIndex)}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Decoración sutil */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <SpeakerHigh size={120} weight="thin" />
                        </div>
                    </div>


                    {/* Progress Bar & Indicators (Normal Mode Only - Hidden in Immersive) */}
                    {!isMaximized && (
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2 px-4">
                                {currentBookContent.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1.5 flex-grow rounded-full transition-all duration-500",
                                            i <= currentPage ? "bg-slate-900" : "bg-slate-200"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}



                    <div className={cn(
                        "flex items-center transition-all duration-500 z-50",
                        isMaximized
                            ? "fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-black/20 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-4 shadow-3xl justify-between"
                            : "bg-white/40 backdrop-blur-md rounded-2xl py-3 px-6 border border-slate-200/50 shadow-lg mb-6 justify-between gap-6"
                    )}>
                        {/* Lado Izquierdo: Salir + Velocidad (Centrada entre Salir y Skip) */}
                        <div className={cn("items-center", isMaximized ? "flex-1 flex justify-start px-2" : "flex flex-none gap-6")}>
                            {isMaximized && (
                                <button
                                    onClick={() => {
                                        setIsMaximized(false);
                                        setSelectedBook(null);
                                        const backPath = selectedBook?.category === 'juvenile' ? 'lectura-juvenil' : 'cuentos-clasicos';
                                        router.push(`/material/${backPath}`);
                                    }}
                                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 h-[44px]"
                                    title={t.storyteller.backToLibrary}
                                >
                                    <ArrowLeft weight="bold" size={20} />
                                    <span className="text-xs font-bold hidden md:block">Salir</span>
                                </button>
                            )}

                            <div className={cn("flex items-center", isMaximized ? "flex-1 justify-center" : "gap-6")}>
                                <div className={cn("flex flex-col gap-1.5 transition-all",
                                    isMaximized
                                        ? "bg-white/10 p-2 rounded-xl border border-white/10 w-48 h-[44px] justify-center"
                                        : "bg-white/40 p-2 rounded-xl border border-slate-200/50 w-64"
                                )}>
                                    <div className="flex justify-between items-center px-1">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={12} className={isMaximized ? "text-white/60" : "text-slate-500"} />
                                            <span className={cn(
                                                isMaximized ? "text-xs font-bold text-white/80" : "text-[9px] font-black uppercase tracking-widest text-slate-600"
                                            )}>
                                                {isMaximized ? "Velocidad voz" : (t.storyteller.speeds[SPEED_OPTIONS.find(o => o.value === speechRate)?.key as keyof typeof t.storyteller.speeds] || t.storyteller.speeds.normal)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 h-1.5">
                                        {SPEED_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.key}
                                                onClick={() => setSpeechRate(opt.value)}
                                                className={cn(
                                                    "flex-grow h-full rounded-full transition-all duration-300 cursor-pointer relative group",
                                                    speechRate === opt.value
                                                        ? (isMaximized ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "bg-slate-900 shadow-lg shadow-slate-900/20")
                                                        : (isMaximized ? "bg-white/20 hover:bg-white/40" : "bg-slate-200 hover:bg-slate-300")
                                                )}
                                                title={t.storyteller.speeds[opt.key as keyof typeof t.storyteller.speeds]}
                                            >
                                                {speechRate === opt.value && (
                                                    <motion.div
                                                        layoutId="activeSpeed"
                                                        className="absolute inset-0 rounded-full"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. CENTRO: SkipBack + Play + SkipForward (Simetría perfecta) */}
                        <div className="flex items-center gap-4 z-10">
                            <button onClick={prevPage} disabled={currentPage === 0}
                                className={cn("p-3 rounded-xl transition-all cursor-pointer flex-none",
                                    isMaximized ? "bg-white/10 hover:bg-white/20 text-white disabled:opacity-30" : "bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                                )}>
                                <SkipBack weight="fill" size={20} />
                            </button>

                            <button
                                onClick={togglePlay}
                                className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer flex-none",
                                    isMaximized ? "bg-white text-slate-900 shadow-white/20" : "bg-slate-900 text-white shadow-slate-900/20"
                                )}
                            >
                                {isPlaying ? <Pause weight="fill" size={24} /> : <Play weight="fill" size={24} className="ml-1" />}
                            </button>

                            <button onClick={nextPage} disabled={currentPage === currentBookContent.length - 1}
                                className={cn("p-3 rounded-xl transition-all cursor-pointer flex-none",
                                    isMaximized ? "bg-white/10 hover:bg-white/20 text-white disabled:opacity-30" : "bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                                )}>
                                <SkipForward weight="fill" size={20} />
                            </button>
                        </div>

                        {/* 3. Lado Derecho: Herramientas (Idioma, Fuente, Contador) */}
                        <div className={cn("items-center gap-6", isMaximized ? "flex-1 flex justify-end" : "flex flex-none")}>

                            {/* 5. Otros (Idioma, Fuente, Contador) */}
                            <div className={cn("flex items-center gap-4 flex-none", isMaximized ? "" : "flex")}>
                                <div className={cn(
                                    "text-[10px] font-black uppercase tracking-wider px-3 rounded-xl border transition-all flex items-center",
                                    isMaximized
                                        ? "text-white/60 bg-white/10 border-white/10 h-[44px]"
                                        : "text-slate-500 bg-slate-100/50 border-slate-200/50 py-1.5"
                                )}>
                                    Página {currentPage + 1} / {currentBookContent.length}
                                </div>
                                {/* Language Selector */}
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsLangMenuOpen(!isLangMenuOpen);
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all border cursor-pointer",
                                            isMaximized
                                                ? "bg-white/10 hover:bg-white/20 border-white/10 text-white h-[44px]"
                                                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                                        )}
                                    >
                                        <img
                                            src={
                                                audioLanguage === 'es' ? "/images/flags/es.svg" :
                                                    audioLanguage === 'en' ? "/images/flags/gb.svg" :
                                                        audioLanguage === 'fr' ? "/images/flags/fr.svg" :
                                                            "/images/flags/de.svg"
                                            }
                                            alt={audioLanguage.toUpperCase()}
                                            className="w-5 h-auto rounded-[2px] shadow-sm"
                                        />
                                        <span className="text-xs font-bold">{audioLanguage.toUpperCase()}</span>
                                        <CaretDown size={12} weight="bold" className="opacity-50" />
                                    </button>

                                    {/* Dropdown */}
                                    {isLangMenuOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-[90]"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsLangMenuOpen(false);
                                                }}
                                            />
                                            <div className={cn(
                                                "absolute bottom-full right-0 mb-2 w-32 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all transform origin-bottom-right z-[100] animate-in fade-in zoom-in-95 duration-200",
                                                isMaximized ? "bg-slate-800 border-slate-700" : ""
                                            )}>
                                                <div className={cn("px-3 py-2 text-[10px] font-bold uppercase tracking-wider", isMaximized ? "text-slate-400" : "text-slate-400")}>
                                                    Idioma Audio
                                                </div>

                                                {selectedBook && (
                                                    <>
                                                        <Link
                                                            href={`/material/cuentos-clasicos/${selectedBook.id}`}
                                                            onClick={(e) => setIsLangMenuOpen(false)}
                                                            className={cn("w-full flex items-center gap-2.5 px-2.5 py-1.5 transition-colors cursor-pointer relative z-50",
                                                                isMaximized
                                                                    ? (audioLanguage === 'es' ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300")
                                                                    : (audioLanguage === 'es' ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50 text-slate-700")
                                                            )}
                                                        >
                                                            <img src="/images/flags/es.svg" alt="Español" className="w-5 h-auto rounded-[2px]" />
                                                            <span className="text-sm font-medium">Español</span>
                                                        </Link>

                                                        {selectedBook?.contentEn && (
                                                            <Link
                                                                href={`/material/cuentos-clasicos/${selectedBook.id}/en`}
                                                                onClick={(e) => setIsLangMenuOpen(false)}
                                                                className={cn("w-full flex items-center gap-2.5 px-2.5 py-1.5 transition-colors cursor-pointer relative z-50",
                                                                    isMaximized
                                                                        ? (audioLanguage === 'en' ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300")
                                                                        : (audioLanguage === 'en' ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50 text-slate-700")
                                                                )}
                                                            >
                                                                <img src="/images/flags/gb.svg" alt="English" className="w-5 h-auto rounded-[2px]" />
                                                                <span className="text-sm font-medium">English</span>
                                                            </Link>
                                                        )}

                                                        {selectedBook?.contentFr && (
                                                            <Link
                                                                href={`/material/cuentos-clasicos/${selectedBook.id}/fr`}
                                                                onClick={(e) => setIsLangMenuOpen(false)}
                                                                className={cn("w-full flex items-center gap-2.5 px-2.5 py-1.5 transition-colors cursor-pointer relative z-50",
                                                                    isMaximized
                                                                        ? (audioLanguage === 'fr' ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300")
                                                                        : (audioLanguage === 'fr' ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50 text-slate-700")
                                                                )}
                                                            >
                                                                <img src="/images/flags/fr.svg" alt="Français" className="w-5 h-auto rounded-[2px]" />
                                                                <span className="text-sm font-medium">Français</span>
                                                            </Link>
                                                        )}

                                                        {selectedBook?.contentDe && (
                                                            <Link
                                                                href={`/material/cuentos-clasicos/${selectedBook.id}/de`}
                                                                onClick={(e) => setIsLangMenuOpen(false)}
                                                                className={cn("w-full flex items-center gap-2.5 px-2.5 py-1.5 transition-colors cursor-pointer relative z-50",
                                                                    isMaximized
                                                                        ? (audioLanguage === 'de' ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300")
                                                                        : (audioLanguage === 'de' ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50 text-slate-700")
                                                                )}
                                                            >
                                                                <img src="/images/flags/de.svg" alt="Deutsch" className="w-5 h-auto rounded-[2px]" />
                                                                <span className="text-sm font-medium">Deutsch</span>
                                                            </Link>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Font Size */}
                                <div className={cn("flex items-center rounded-xl transition-all",
                                    isMaximized
                                        ? "bg-white/10 backdrop-blur-md border border-white/10 h-[44px] px-2"
                                        : "bg-white/40 border border-slate-200 p-1"
                                )}>
                                    <button onClick={() => setFontSize(prev => Math.max(16, prev - 2))} className={cn("p-1.5 rounded-lg transition-colors cursor-pointer", isMaximized ? "hover:bg-white/20 text-white" : "hover:bg-white/60 text-slate-700")}><TextT size={14} /></button>
                                </div>
                            </div>
                        </div>

                        {/* Imagen de la Página (Normal Mode Only) - Moved below controls */}
                        {!isMaximized && (
                            <AnimatePresence mode="wait">
                                {currentBookContent[currentPage]?.image && (
                                    <motion.div
                                        key={`img-${currentPage}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white mt-4 mb-2"
                                    >
                                        <img
                                            src={currentBookContent[currentPage].image}
                                            className="w-full h-full object-cover"
                                            alt={`Ilustración página ${currentPage + 1}`}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </div>

                {/* Rating Modal Integration */}
                <AnimatePresence>
                    {isRatingModalOpen && selectedBook && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsRatingModalOpen(false)}
                                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-lg bg-slate-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-3xl"
                            >
                                <RatingSystem
                                    activityId={`story-${selectedBook.id}`}
                                    onClose={() => setIsRatingModalOpen(false)}
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-0 relative z-10">
            <div className="p-0 md:p-8 relative overflow-hidden">
                {/* Gradient Overlay removed */}

                <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="relative flex items-center">
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onMouseEnter={() => setTooltipOpen(true)}
                                onMouseLeave={() => setTooltipOpen(false)}
                                onClick={() => router.push('/material')}
                                className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-teal-600 hover:border-teal-100 transition-all z-20 cursor-pointer"
                            >
                                <ArrowLeft size={20} weight="bold" />
                                <AnimatePresence>
                                    {tooltipOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-xl pointer-events-none z-50"
                                        >
                                            {t.storyteller.backToResources}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>

                    <header className="text-center mb-8 -mt-24">
                        <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">{t.storyteller.title}</h2>
                        <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-8">
                            {t.storyteller.subtitle}
                        </p>

                        {/* Search Component */}
                        <StorySearch books={BOOKS} />
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BOOKS.filter(b => category === 'juvenile' ? b.category === 'juvenile' : b.category !== 'juvenile').map((book) => (
                            <motion.div
                                key={book.id}
                                whileHover={{ y: -10 }}
                                className="group relative cursor-pointer"
                                onClick={() => {
                                    setSelectedBook(book);
                                    const basePath = book.category === 'juvenile' ? 'lectura-juvenil' : 'cuentos-clasicos';
                                    router.push(`/material/${basePath}/${book.id}`);
                                }}
                            >
                                {/* Sombra Dinámica */}
                                <div className="absolute inset-x-8 -bottom-4 h-12 bg-slate-900/10 blur-2xl group-hover:bg-slate-900/20 transition-all rounded-full" />

                                <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-slate-200/50 overflow-hidden relative shadow-xl hover:shadow-2xl hover:shadow-slate-400/20 transition-all h-full flex flex-col group-hover:bg-white/20">
                                    {/* Portada */}
                                    {/* Portada */}
                                    <div
                                        className={`aspect-[4/3.8] relative overflow-hidden bg-gradient-to-br ${book.themeColor || 'from-slate-200 to-slate-300'} shadow-inner`}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{
                                                backgroundImage: (book.chipImage?.includes('/') || book.coverImage?.includes('/'))
                                                    ? `url(${book.chipImage?.includes('/') ? book.chipImage : book.coverImage})`
                                                    : 'none'
                                            }}
                                        >
                                            {/* Si es texto placeholder */}
                                            {book.chipImage && !book.chipImage.includes('/') && (
                                                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                                                    <span className="text-white/40 font-black uppercase tracking-tighter text-xl rotate-12">
                                                        {book.chipImage}
                                                    </span>
                                                </div>
                                            )}
                                            {/* Inner Shadow Overlay */}
                                            <div className="absolute inset-0 shadow-[inset_0_-20px_60px_-10px_rgba(0,0,0,0.3)]" />
                                        </div>



                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-900 flex items-center gap-1.5 shadow-xl border border-white/20 z-10">
                                            <BookmarkSimple weight="fill" className="text-orange-500" />
                                            {(() => {
                                                const genres: Record<string, Record<string, string>> = {
                                                    'Fábula': { en: 'Fable', fr: 'Fable', de: 'Fabel' },
                                                    'Cuento de Hadas': { en: 'Fairytale', fr: 'Conte de fées', de: 'Märchen' },
                                                    'Aventura': { en: 'Adventure', fr: 'Aventure', de: 'Abenteuer' },
                                                    'Humor': { en: 'Humor', fr: 'Humour', de: 'Humor' },
                                                    'Leyenda': { en: 'Legend', fr: 'Légende', de: 'Legende' },
                                                    'Realista': { en: 'Realistic', fr: 'Réaliste', de: 'Realistisch' },
                                                    'Aventura/Fábula': { en: 'Adventure/Fable', fr: 'Aventure/Fable', de: 'Abenteuer/Fabel' },
                                                    'Fábula/Drama': { en: 'Fable/Drama', fr: 'Fable/Drame', de: 'Fabel/Drama' }
                                                };
                                                const localizedGenre = genres[book.genre]?.[language as string] || book.genre;
                                                return localizedGenre.toUpperCase();
                                            })()}
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-5 flex flex-col flex-grow relative">
                                        <div className="flex gap-2 mb-2 items-start">
                                            <span className="px-2.5 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black tracking-wider uppercase border border-emerald-200/50 shadow-sm">
                                                {(() => {
                                                    const levels: Record<string, Record<string, string>> = {
                                                        'Fácil': { en: 'Easy', fr: 'Facile', de: 'Einfach' },
                                                        'Medio': { en: 'Medium', fr: 'Moyen', de: 'Mittel' },
                                                        'Difícil': { en: 'Hard', fr: 'Difficile', de: 'Schwer' }
                                                    };
                                                    return levels[book.level]?.[language as string] || book.level;
                                                })()}
                                            </span>
                                            <span className="px-2.5 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black tracking-wider uppercase border border-slate-200/50 shadow-sm">
                                                {book.age}
                                            </span>

                                            <div className="flex flex-col items-end ml-auto gap-2">
                                                <div className="flex gap-1">
                                                    <div className="w-6 h-4 relative rounded shadow-sm overflow-hidden" title="Español">
                                                        <img src="/images/flags/es.svg" alt="Español" className="w-full h-full object-cover" />
                                                    </div>
                                                    {book.contentEn && (
                                                        <div className="w-6 h-4 relative rounded shadow-sm overflow-hidden" title="English">
                                                            <img src="/images/flags/gb.svg" alt="English" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                    {book.contentFr && (
                                                        <div className="w-6 h-4 relative rounded shadow-sm overflow-hidden" title="Français">
                                                            <img src="/images/flags/fr.svg" alt="Français" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                    {book.contentDe && (
                                                        <div className="w-6 h-4 relative rounded shadow-sm overflow-hidden" title="Deutsch">
                                                            <img src="/images/flags/de.svg" alt="Deutsch" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Valoración Estrellas */}
                                                {(() => {
                                                    const dynamicRating = bookRatings[book.id];
                                                    const ratingToShow = dynamicRating ? dynamicRating.avg : book.rating;

                                                    if (!ratingToShow) return null;

                                                    return (
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(`/actividades/valoraciones/story-${book.id}`);
                                                            }}
                                                            className="flex items-center gap-0.5 group/stars cursor-pointer hover:bg-amber-50 px-2 py-1 rounded-lg transition-all"
                                                            title={`Puntuación: ${ratingToShow} / 5 ${dynamicRating ? `(${dynamicRating.count} opiniones)` : '(Sin valoraciones aún)'}. Haz clic para ver comentarios.`}
                                                        >
                                                            {[1, 2, 3, 4, 5].map((star) => {
                                                                const isFull = ratingToShow >= star;
                                                                const isHalf = ratingToShow >= star - 0.5 && ratingToShow < star;
                                                                return (
                                                                    <div key={star}>
                                                                        {isFull ? (
                                                                            <Star weight="fill" className="text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.2)]" size={13} />
                                                                        ) : isHalf ? (
                                                                            <StarHalf weight="fill" className="text-amber-400" size={13} />
                                                                        ) : (
                                                                            <Star weight="fill" className="text-slate-200" size={13} />
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                            <span className="text-[10px] font-bold text-slate-400 ml-1 group-hover/stars:text-amber-600 transition-colors">{ratingToShow}</span>
                                                            {dynamicRating && (
                                                                <span className="text-[9px] font-black text-slate-300 ml-1 group-hover/stars:text-amber-400 transition-colors">({dynamicRating.count})</span>
                                                            )}
                                                        </motion.button>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-800 mb-1 transition-colors group-hover:text-slate-900 leading-tight">
                                            {(book as any)[`title${language.charAt(0).toUpperCase() + language.slice(1)}`] || book.title}
                                        </h3>
                                        <p className="text-slate-500 text-base font-medium line-clamp-2 mb-3 flex-grow leading-snug">
                                            {(book as any)[`description${language.charAt(0).toUpperCase() + language.slice(1)}`] || book.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                            <span className="text-base font-bold text-slate-600 flex items-center gap-2 italic">
                                                {t.storyteller.by} {book.author}
                                            </span>
                                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                <Play weight="fill" size={16} className="ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Coming Soon */}
                        <div className="bg-white/20 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center group transition-colors hover:bg-white/30">
                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <BookOpen size={32} className="text-slate-300" weight="duotone" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-400 mb-2">{t.storyteller.moreTitles}</h3>
                            <p className="text-xs text-slate-400 font-medium">{t.storyteller.moreTitlesDesc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
