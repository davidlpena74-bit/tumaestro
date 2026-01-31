'use client';

import { useState, useRef, useEffect } from 'react';
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
    ArrowsIn
} from '@phosphor-icons/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BOOKS, Book } from './books-data';
import { getBestVoice } from '@/lib/speech-utils';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function StorytellerTool() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechRate, setSpeechRate] = useState(0.9);
    const [fontSize, setFontSize] = useState(24);

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
    }, [selectedBook]);

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

            const text = selectedBook?.content[currentPage].text || "";
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

        if (selectedBook && currentPage < selectedBook.content.length - 1) {
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

    const speakPage = async () => { // Made async
        if (!selectedBook || !synthRef.current) return;

        // Cancel any ongoing speech synthesis or audio playback
        synthRef.current.cancel();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        const page = selectedBook.content[currentPage];
        const text = page.text;

        // Reset progress states
        setCharIndex(0);
        progressRef.current = 0;
        currentSpeedRef.current = (speechRate || 1) * 0.012; // Base speed for es-ES

        // Try to play pre-recorded audio first
        const audioPath = `/audio/storyteller/${selectedBook.id}/page_${currentPage}.mp3`;

        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const playRecordedAudio = () => {
            return new Promise<boolean>((resolve) => {
                if (!audioRef.current) return resolve(false);

                audioRef.current.src = audioPath;
                audioRef.current.load();

                // Safety timeout for audio loading
                const loadTimeout = setTimeout(() => {
                    cleanupLoadingListeners();
                    resolve(false);
                }, 2000);

                const onCanPlayThrough = () => {
                    clearTimeout(loadTimeout);
                    if (!audioRef.current) return resolve(false);

                    audioRef.current.play().catch(() => {
                        cleanupLoadingListeners();
                        resolve(false);
                    });

                    setIsPlaying(true);
                    isPlayingRef.current = true;

                    const duration = audioRef.current.duration || 10;
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
                    if (audioRef.current) {
                        audioRef.current.removeEventListener('canplaythrough', onCanPlayThrough);
                        audioRef.current.removeEventListener('error', onError);
                    }
                };

                // Remove previous ended listener to avoid duplicates
                audioRef.current.removeEventListener('ended', onEnded);
                audioRef.current.addEventListener('canplaythrough', onCanPlayThrough, { once: true });
                audioRef.current.addEventListener('error', onError, { once: true });
                audioRef.current.addEventListener('ended', onEnded);

                if (audioRef.current.readyState >= 3) {
                    onCanPlayThrough();
                }
            });
        };

        const hasMP3 = await playRecordedAudio();
        if (hasMP3) return;

        // Fallback to Synthesis
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        const bestVoice = getBestVoice('es-ES');
        if (bestVoice) {
            utterance.voice = bestVoice;
        }

        // Parámetros refinados para narración fantástica e inmersiva
        utterance.rate = speechRate * 0.88;
        utterance.pitch = 1.08; // Un toque más de calidez y magia
        utterance.volume = 1.0;

        utterance.onstart = () => {
            setIsPlaying(true);
            isPlayingRef.current = true; // Activar inmediatamente para el loop
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

                // Jump visual progress to match exact word boundary
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
        if (selectedBook && currentPage < selectedBook.content.length - 1) {
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
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors bg-white/40 px-4 py-2 rounded-2xl border border-slate-200"
                    >
                        <ArrowLeft weight="bold" /> Volver a la Biblioteca
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
                                        src={selectedBook.content[currentPage].image || selectedBook.chipImage || selectedBook.coverImage}
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
                            {selectedBook.content[currentPage].image && (
                                <motion.div
                                    key={`img-${currentPage}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white mb-2"
                                >
                                    <img
                                        src={selectedBook.content[currentPage].image}
                                        className="w-full h-full object-cover"
                                        alt={`Ilustración página ${currentPage + 1}`}
                                    />
                                </motion.div>
                            )}
                            {!selectedBook.content[currentPage].image && selectedBook.chipImage && (
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
                                    "p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg",
                                    isMaximized
                                        ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20"
                                        : "bg-white/50 hover:bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200/50"
                                )}
                                title={isMaximized ? "Salir de pantalla completa" : "Maximizar lectura"}
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
                                        {selectedBook.content[currentPage].text.slice(0, charIndex)}
                                    </span>
                                    <span className={cn("font-medium", isMaximized ? "text-white/50" : "text-slate-400")}>
                                        {selectedBook.content[currentPage].text.slice(charIndex)}
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
                            Página {currentPage + 1} de {selectedBook.content.length}
                        </div>
                    </div>

                    {/* Progress Bar & Indicators (Normal Mode Only - Hidden in Immersive) */}
                    {!isMaximized && (
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2 px-4">
                                {selectedBook.content.map((_, i) => (
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
                        <div className={cn("flex items-center gap-2 w-32", isMaximized ? "bg-black/20 backdrop-blur-md rounded-xl p-2 border border-white/10" : "")}>
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
                                className={cn("p-3 rounded-xl transition-all",
                                    isMaximized ? "bg-white/10 hover:bg-white/20 text-white disabled:opacity-30" : "bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                                )}>
                                <SkipBack weight="fill" size={20} />
                            </button>
                            <button
                                onClick={togglePlay}
                                className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl",
                                    isMaximized ? "bg-white text-slate-900 shadow-white/20" : "bg-slate-900 text-white shadow-slate-900/20"
                                )}
                            >
                                {isPlaying ? <Pause weight="fill" size={24} /> : <Play weight="fill" size={24} className="ml-1" />}
                            </button>
                            <button onClick={nextPage} disabled={currentPage === selectedBook.content.length - 1}
                                className={cn("p-3 rounded-xl transition-all",
                                    isMaximized ? "bg-white/10 hover:bg-white/20 text-white disabled:opacity-30" : "bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30"
                                )}>
                                <SkipForward weight="fill" size={20} />
                            </button>
                        </div>

                        {/* Placeholder para equilibrio visual o futura funcion */}
                        {/* Placeholder para equilibrio visual o futura funcion */}
                        <div className="w-32 flex justify-end">
                            <div className={cn("flex items-center rounded-xl p-1", isMaximized ? "bg-black/20 backdrop-blur-md border border-white/10" : "bg-white/40 border border-slate-200")}>
                                <button onClick={() => setFontSize(prev => Math.max(16, prev - 2))} className={cn("p-1.5 rounded-lg transition-colors", isMaximized ? "hover:bg-white/10 text-white" : "hover:bg-white/60 text-slate-700")}><TextT size={14} /></button>
                                <button onClick={() => setFontSize(prev => Math.min(32, prev + 2))} className={cn("p-1.5 rounded-lg transition-colors", isMaximized ? "hover:bg-white/10 text-white" : "hover:bg-white/60 text-slate-700")}><TextT size={20} /></button>
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
                    <ArrowLeft weight="bold" /> Volver a Recursos
                </Link>
            </div>

            <header className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">El Cuenta Cuentos</h2>
                <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                    Sumérgete en grandes historias narradas con voz mágica. Lectura inmersiva para pequeños y grandes soñadores.
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

                        <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-slate-200/50 overflow-hidden relative shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                            {/* Portada */}
                            {/* Portada */}
                            <div
                                className={`aspect-[4/3] relative overflow-hidden bg-gradient-to-br ${book.themeColor || 'from-slate-200 to-slate-300'} group`}
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${book.chipImage || book.coverImage})` }}
                                />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-900 flex items-center gap-1.5 shadow-xl border border-white/20 z-10">
                                    <BookmarkSimple weight="fill" className="text-orange-500" /> {book.genre.toUpperCase()}
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex gap-2 mb-4">
                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black tracking-wider uppercase border border-emerald-200/50">
                                        {book.level}
                                    </span>
                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black tracking-wider uppercase border border-slate-200/50">
                                        {book.age}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2 transition-colors group-hover:text-slate-900">
                                    {book.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {book.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-2 italic">
                                        Por {book.author}
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
                    <h3 className="text-xl font-bold text-slate-400 mb-2">Más Títulos</h3>
                    <p className="text-xs text-slate-400 font-medium">Estamos preparando clásicos como Harry Potter y El Hobbit.</p>
                </div>
            </div>
        </div>
    );
}
