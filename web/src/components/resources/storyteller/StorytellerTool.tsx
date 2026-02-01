'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
    CaretDown
} from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BOOKS, Book } from './books-data';
import { getBestVoice } from '@/lib/speech-utils';
import { useLanguage } from '@/context/LanguageContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StorytellerTool() {
    const { t } = useLanguage();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechRate, setSpeechRate] = useState(0.9);
    const [fontSize, setFontSize] = useState(24);
    const [audioLanguage, setAudioLanguage] = useState<'es' | 'en'>('es');
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const [charIndex, setCharIndex] = useState(0);
    const [isMaximized, setIsMaximized] = useState(false);

    const synthRef = useRef<SpeechSynthesis | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const progressRef = useRef<number>(0);
    const currentSpeedRef = useRef<number>(0.012);
    const lastBoundaryTimeRef = useRef<number>(0);
    const lastBoundaryCharIndexRef = useRef<number>(0);
    const isPlayingRef = useRef(false);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const currentBookContent = useMemo(() => {
        if (!selectedBook) return [];
        if (audioLanguage === 'en' && selectedBook.contentEn) {
            return selectedBook.contentEn;
        }
        return selectedBook.content;
    }, [selectedBook, audioLanguage]);

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
        };
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

    useEffect(() => {
        if (isPlaying && selectedBook) {
            // Un pequeño retraso para que la animación de cambio de página se vea mejor
            const timer = setTimeout(() => {
                speakPage();
            }, 300); // Reduced delay for smoother feel
            return () => clearTimeout(timer);
        }
    }, [currentPage, isPlaying]); // Added isPlaying as dependency to handle start-from-scratch correctly

    const requestProgressLoop = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        lastTimeRef.current = performance.now();

        const loop = (time: number) => {
            if (!isPlayingRef.current) return;

            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            const text = currentBookContent[currentPage]?.text || "";
            if (progressRef.current < text.length) {
                const char = text[Math.floor(progressRef.current)];
                let speedMultiplier = 1;

                // Si estamos en un signo de puntuación, reducimos la velocidad drásticamente
                // para simular la pausa del SSML (800ms para puntos, 300ms para comas)
                if (char === '.' || char === '?' || char === '!' || char === ':') {
                    speedMultiplier = 0.15; // Ralentizar mucho más para representar la pausa de 800ms
                } else if (char === ',') {
                    speedMultiplier = 0.4; // Ralentizar para la pausa de 300ms
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

        // Cancel any ongoing speech synthesis or audio playback
        synthRef.current.cancel();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        const page = currentBookContent[currentPage];
        const text = page?.text || "";

        // Reset progress states
        setCharIndex(0);
        progressRef.current = 0;
        currentSpeedRef.current = (speechRate || 1) * 0.012;

        // Try to play pre-recorded audio first (Only for ES currently)
        const audioPath = `/audio/storyteller/${selectedBook.id}/page_${currentPage}.mp3`;

        let hasMP3 = false;

        // Disable MP3s for English for now, as we probably don't have them
        if (audioLanguage === 'es') {
            const playRecordedAudio = () => {
                return new Promise<boolean>((resolve) => {
                    if (!audioRef.current) audioRef.current = new Audio();
                    const audio = audioRef.current;

                    audio.src = audioPath;
                    audio.load();

                    const loadTimeout = setTimeout(() => {
                        cleanupLoadingListeners();
                        resolve(false);
                    }, 2000);

                    const onCanPlayThrough = () => {
                        clearTimeout(loadTimeout);
                        audio.play().catch(() => {
                            cleanupLoadingListeners();
                            resolve(false);
                        });

                        setIsPlaying(true);
                        isPlayingRef.current = true;

                        const duration = audio.duration || 10;
                        currentSpeedRef.current = text.length / (duration * 1000);
                        requestProgressLoop();

                        cleanupLoadingListeners();
                        resolve(true);
                    };

                    const onError = () => {
                        clearTimeout(loadTimeout);
                        cleanupLoadingListeners();
                        resolve(false);
                    };

                    const onEnded = () => {
                        handlePageFinished();
                    };

                    const cleanupLoadingListeners = () => {
                        if (audio) {
                            audio.removeEventListener('canplaythrough', onCanPlayThrough);
                            audio.removeEventListener('error', onError);
                        }
                    };

                    audio.removeEventListener('ended', onEnded);
                    audio.addEventListener('canplaythrough', onCanPlayThrough, { once: true });
                    audio.addEventListener('error', onError, { once: true });
                    audio.addEventListener('ended', onEnded);

                    if (audio.readyState >= 3) {
                        onCanPlayThrough();
                    }
                });
            };

            hasMP3 = await playRecordedAudio();
        }

        if (hasMP3) return;

        // Fallback to Synthesis
        const utterance = new SpeechSynthesisUtterance(text);

        if (audioLanguage === 'en') {
            utterance.lang = 'en-US';
            const voices = synthRef.current.getVoices();
            const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Zira") || v.lang.startsWith('en'));
            if (preferredVoice) utterance.voice = preferredVoice;
        } else {
            utterance.lang = 'es-ES';
            const bestVoice = getBestVoice('es-ES');
            if (bestVoice) {
                utterance.voice = bestVoice;
            }
        }

        // Parámetros refinados
        utterance.rate = speechRate * (audioLanguage === 'en' ? 0.9 : 0.88); // Slight adjustment for EN
        utterance.pitch = 1.08;
        utterance.volume = 1.0;

        utterance.onstart = () => {
            setIsPlaying(true);
            isPlayingRef.current = true;
            lastTimeRef.current = performance.now();
            lastBoundaryTimeRef.current = performance.now();
            lastBoundaryCharIndexRef.current = 0;
            requestProgressLoop();
        };

        utterance.onboundary = (event) => {
            if (event.name === 'word') {
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
            handlePageFinished();
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
    };

    const togglePlay = () => {
        if (isPlaying) {
            if (synthRef.current) synthRef.current.pause();
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
            isPlayingRef.current = false;
        } else {
            if (audioRef.current && audioRef.current.src && !audioRef.current.ended) {
                audioRef.current.play();
                setIsPlaying(true);
                isPlayingRef.current = true;
                requestProgressLoop();
            } else if (synthRef.current?.paused) {
                synthRef.current.resume();
                setIsPlaying(true);
                isPlayingRef.current = true;
                requestProgressLoop();
            } else {
                setIsPlaying(true);
                // The useEffect at line 83 now handles calling speakPage() 
                // because it has [isPlaying, currentPage] as dependencies.
            }
        }
    };

    const nextPage = () => {
        if (selectedBook && currentPage < currentBookContent.length - 1) {
            setCurrentPage(prev => prev + 1);
            setIsPlaying(false);
            isPlayingRef.current = false;
            setCharIndex(0);
            if (synthRef.current) synthRef.current.cancel();
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
            setIsPlaying(false);
            isPlayingRef.current = false;
            setCharIndex(0);
            if (synthRef.current) synthRef.current.cancel();
        }
    };

    if (selectedBook) {
        return (
            <div className="w-full max-w-5xl mx-auto p-4 animate-in fade-in duration-500">
                {/* Header Acciones */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => setSelectedBook(null)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white/40 px-4 py-2 rounded-2xl border border-slate-200 cursor-pointer"
                    >
                        <ArrowLeft weight="bold" /> {t.storyteller.backToLibrary}
                    </button>



                </div>

                {/* Área de Lectura */}
                <div className={cn(
                    "w-full mx-auto flex flex-col transition-all duration-500",
                    isMaximized
                        ? "fixed inset-0 z-50 bg-slate-900 items-center justify-center p-8 lg:p-16 gap-0"
                        : "max-w-4xl gap-8 relative"
                )}>
                    {/* Fondo Inmersivo */}
                    {isMaximized && (
                        <div className="absolute inset-0 z-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={currentBookContent[currentPage]?.image || selectedBook.chipImage || selectedBook.coverImage}
                                        className="w-full h-full object-cover blur-sm brightness-50 scale-105"
                                        alt="Background"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/30" />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Imagen de la Página (Normal Mode Only) */}
                    {!isMaximized && (
                        <AnimatePresence mode="wait">
                            {currentBookContent[currentPage]?.image && (
                                <motion.div
                                    key={`img-${currentPage}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white mb-2"
                                >
                                    <img
                                        src={currentBookContent[currentPage].image}
                                        className="w-full h-full object-cover"
                                        alt={`Ilustración página ${currentPage + 1}`}
                                    />
                                </motion.div>
                            )}
                            {!currentBookContent[currentPage]?.image && selectedBook.chipImage && (
                                <motion.div
                                    key={`chip-${selectedBook.id}`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-center mb-[-2rem] relative z-20"
                                >
                                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                        <img src={selectedBook.chipImage} className="w-full h-full object-cover" alt="Character" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}



                    {/* Texto Principal */}
                    <div className={cn(
                        "transition-all duration-500 relative overflow-hidden flex flex-col justify-center",
                        isMaximized
                            ? "w-full max-w-5xl h-[90%] z-10 p-12 md:p-24 text-white"
                            : "bg-white/60 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white flex-grow shadow-2xl min-h-[400px]"
                    )}>
                        {/* Glass Overlay for Immersive Mode */}
                        {isMaximized && <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/20 shadow-2xl" />}

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


                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="relative z-10 font-serif leading-relaxed text-center flex flex-col items-center justify-center h-full"
                                style={{ fontSize: `${isMaximized ? fontSize + 4 : fontSize}px`, color: isMaximized ? 'white' : undefined }}
                            >

                                <div className="relative max-w-3xl">
                                    <span className={cn("font-medium transition-all duration-75", isMaximized ? "text-white" : "text-slate-900")}>
                                        {currentBookContent[currentPage]?.text.slice(0, charIndex)}
                                    </span>
                                    <span className={cn("font-medium", isMaximized ? "text-white/50" : "text-slate-400")}>
                                        {currentBookContent[currentPage]?.text.slice(charIndex)}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Decoración sutil */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <SpeakerHigh size={120} weight="thin" />
                        </div>

                        <div className={cn(
                            "absolute bottom-6 left-0 right-0 text-center text-xs font-bold pointer-events-none z-20",
                            isMaximized ? "text-white/60" : "text-slate-300"
                        )}>
                            {t.storyteller.pageOf.replace('{current}', (currentPage + 1).toString()).replace('{total}', currentBookContent.length.toString())}
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

                    {/* Controls Footer */}
                    <div className={cn(
                        "flex items-center justify-between gap-4 transition-all duration-500 z-50",
                        isMaximized
                            ? "fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-3xl px-8"
                            : "bg-white/40 backdrop-blur-md rounded-2xl py-3 px-6 border border-slate-200/50 shadow-lg mb-6"
                    )}>
                        {/* Speed Control (Minimizado) */}
                        <div className={cn("flex items-center gap-2 w-56", isMaximized ? "bg-black/20 backdrop-blur-md rounded-xl p-2 border border-white/10" : "")}>
                            <Clock size={16} className={isMaximized ? "text-white/70" : "text-slate-500"} />
                            <input
                                type="range" min="0.5" max="1.5" step="0.1"
                                value={speechRate}
                                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                className={cn("w-full h-1.5 rounded-lg appearance-none cursor-pointer", isMaximized ? "bg-white/20 accent-white" : "bg-slate-200 accent-slate-900")}
                            />
                        </div>

                        {/* Main Controls */}
                        <div className="flex items-center gap-4">
                            <button onClick={prevPage} disabled={currentPage === 0}
                                className={cn("p-3 rounded-xl transition-all cursor-pointer",
                                    isMaximized ? "bg-white/10 hover:bg-white/20 text-white disabled:opacity-30" : "bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                                )}>
                                <SkipBack weight="fill" size={20} />
                            </button>
                            <button
                                onClick={togglePlay}
                                className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer",
                                    isMaximized ? "bg-white text-slate-900 shadow-white/20" : "bg-slate-900 text-white shadow-slate-900/20"
                                )}
                            >
                                {isPlaying ? <Pause weight="fill" size={24} /> : <Play weight="fill" size={24} className="ml-1" />}
                            </button>
                            <button onClick={nextPage} disabled={currentPage === currentBookContent.length - 1}
                                className={cn("p-3 rounded-xl transition-all cursor-pointer",
                                    isMaximized ? "bg-white/10 hover:bg-white/20 text-white disabled:opacity-30" : "bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                                )}>
                                <SkipForward weight="fill" size={20} />
                            </button>
                        </div>

                        {/* Right Group: Language & Font */}
                        <div className="w-56 flex items-center justify-end gap-3">
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
                                            ? "bg-black/20 hover:bg-black/30 border-white/10 text-white"
                                            : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                                    )}
                                >
                                    <img
                                        src={audioLanguage === 'es' ? "/images/flags/es.svg" : "/images/flags/gb.svg"}
                                        alt={audioLanguage === 'es' ? "Español" : "English"}
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
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAudioLanguage('es');
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={cn("w-full flex items-center gap-3 px-3 py-2 transition-colors cursor-pointer relative z-50",
                                                    isMaximized
                                                        ? (audioLanguage === 'es' ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300")
                                                        : (audioLanguage === 'es' ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50 text-slate-700")
                                                )}
                                            >
                                                <img src="/images/flags/es.svg" alt="Español" className="w-5 h-auto rounded-[2px]" />
                                                <span className="text-sm font-medium">Español</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAudioLanguage('en');
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={cn("w-full flex items-center gap-3 px-3 py-2 transition-colors cursor-pointer relative z-50",
                                                    isMaximized
                                                        ? (audioLanguage === 'en' ? "bg-slate-700 text-white" : "hover:bg-slate-700 text-slate-300")
                                                        : (audioLanguage === 'en' ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50 text-slate-700")
                                                )}
                                            >
                                                <img src="/images/flags/gb.svg" alt="English" className="w-5 h-auto rounded-[2px]" />
                                                <span className="text-sm font-medium">English</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Font Size */}
                            <div className={cn("flex items-center rounded-xl p-1", isMaximized ? "bg-black/20 backdrop-blur-md border border-white/10" : "bg-white/40 border border-slate-200")}>
                                <button onClick={() => setFontSize(prev => Math.max(16, prev - 2))} className={cn("p-1.5 rounded-lg transition-colors cursor-pointer", isMaximized ? "hover:bg-white/10 text-white" : "hover:bg-white/60 text-slate-700")}><TextT size={14} /></button>
                                <button onClick={() => setFontSize(prev => Math.min(32, prev + 2))} className={cn("p-1.5 rounded-lg transition-colors cursor-pointer", isMaximized ? "hover:bg-white/10 text-white" : "hover:bg-white/60 text-slate-700")}><TextT size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="mb-8">
                <Link
                    href="/recursos"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white/40 px-4 py-2 rounded-2xl border border-slate-200"
                >
                    <ArrowLeft weight="bold" /> {t.storyteller.backToResources}
                </Link>
            </div>

            <header className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">{t.storyteller.title}</h2>
                <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                    {t.storyteller.subtitle}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BOOKS.map((book) => (
                    <motion.div
                        key={book.id}
                        whileHover={{ y: -10 }}
                        className="group relative cursor-pointer"
                        onClick={() => setSelectedBook(book)}
                    >
                        {/* Sombra Dinámica */}
                        <div className="absolute inset-x-8 -bottom-4 h-12 bg-slate-900/10 blur-2xl group-hover:bg-slate-900/20 transition-all rounded-full" />

                        <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-slate-200/50 overflow-hidden relative shadow-xl hover:shadow-2xl hover:shadow-slate-400/20 transition-all h-full flex flex-col">
                            {/* Portada */}
                            {/* Portada */}
                            <div
                                className={`aspect-[4/3.8] relative overflow-hidden bg-gradient-to-br ${book.themeColor || 'from-slate-200 to-slate-300'} group shadow-inner`}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${book.chipImage || book.coverImage})` }}
                                >
                                    {/* Inner Shadow Overlay */}
                                    <div className="absolute inset-0 shadow-[inset_0_-20px_60px_-10px_rgba(0,0,0,0.3)]" />
                                </div>



                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-900 flex items-center gap-1.5 shadow-xl border border-white/20 z-10">
                                    <BookmarkSimple weight="fill" className="text-orange-500" /> {book.genre.toUpperCase()}
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-5 flex flex-col flex-grow relative">
                                <div className="flex gap-2 mb-2">
                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black tracking-wider uppercase border border-emerald-200/50 shadow-sm">
                                        {book.level}
                                    </span>
                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black tracking-wider uppercase border border-slate-200/50 shadow-sm">
                                        {book.age}
                                    </span>

                                    <div className="flex gap-1 ml-auto">
                                        <div className="w-6 h-4 relative rounded shadow-sm overflow-hidden" title="Español">
                                            <img src="/images/flags/es.svg" alt="Español" className="w-full h-full object-cover" />
                                        </div>
                                        {book.contentEn && (
                                            <div className="w-6 h-4 relative rounded shadow-sm overflow-hidden" title="English">
                                                <img src="/images/flags/gb.svg" alt="English" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-1 transition-colors group-hover:text-slate-900 leading-tight">
                                    {book.title}
                                </h3>
                                <p className="text-slate-500 text-base font-medium line-clamp-2 mb-3 flex-grow leading-snug">
                                    {book.description}
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
    );
}
