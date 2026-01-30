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
    Translate
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
    const [fontSize, setFontSize] = useState(20);
    const [charIndex, setCharIndex] = useState(0);

    const synthRef = useRef<SpeechSynthesis | null>(null);
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;
        }
        return () => {
            if (synthRef.current) synthRef.current.cancel();
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    useEffect(() => {
        if (isPlaying && selectedBook) {
            // Un pequeño retraso para que la animación de cambio de página se vea mejor
            const timer = setTimeout(() => {
                speakPage();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [currentPage]);

    const requestProgressLoop = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        lastTimeRef.current = performance.now();

        const loop = (time: number) => {
            if (!isPlayingRef.current) return;

            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            const text = selectedBook?.content[currentPage].text || "";
            if (progressRef.current < text.length) {
                progressRef.current += deltaTime * currentSpeedRef.current;
                setCharIndex(Math.min(text.length, Math.floor(progressRef.current)));
            }

            animationFrameRef.current = requestAnimationFrame(loop);
        };
        animationFrameRef.current = requestAnimationFrame(loop);
    };

    const speakPage = () => {
        if (!selectedBook || !synthRef.current) return;

        synthRef.current.cancel();
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        const page = selectedBook.content[currentPage];
        const text = page.text;
        const utterance = new SpeechSynthesisUtterance(text);

        // Reset progress states
        setCharIndex(0);
        progressRef.current = 0;
        currentSpeedRef.current = (speechRate || 1) * 0.012; // Base speed for es-ES

        // Configuración para voz de "Cuentacuentos Natural" (Mujer)
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
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

            if (currentPage < selectedBook.content.length - 1) {
                // Avanzar página automáticamente
                setCurrentPage(prev => prev + 1);
                // No cambiamos isPlaying a false para que el useEffect dispare la siguiente página
            } else {
                setIsPlaying(false);
                isPlayingRef.current = false;
                setCharIndex(text.length);
            }
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
    };

    const togglePlay = () => {
        if (isPlaying) {
            if (synthRef.current) synthRef.current.pause();
            setIsPlaying(false);
            isPlayingRef.current = false;
        } else {
            if (synthRef.current?.paused) {
                synthRef.current.resume();
                setIsPlaying(true);
                isPlayingRef.current = true;
                requestProgressLoop();
            } else {
                speakPage();
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

                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white/40 rounded-2xl border border-slate-200 p-1">
                            <button onClick={() => setFontSize(prev => Math.max(16, prev - 2))} className="p-2 hover:bg-white/60 rounded-xl transition-colors"><TextT size={16} /></button>
                            <span className="px-2 text-xs font-bold text-slate-500">{fontSize}px</span>
                            <button onClick={() => setFontSize(prev => Math.min(32, prev + 2))} className="p-2 hover:bg-white/60 rounded-xl transition-colors"><TextT size={24} /></button>
                        </div>
                    </div>
                </div>

                {/* Área de Lectura */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Lateral: Info & Controles */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-slate-200/50 space-y-4 shadow-lg">
                            <button onClick={prevPage} disabled={currentPage === 0} className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all text-slate-700">
                                <SkipBack weight="fill" size={24} />
                            </button>
                            <button
                                onClick={togglePlay}
                                className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/20"
                            >
                                {isPlaying ? <Pause weight="fill" size={32} /> : <Play weight="fill" size={32} className="ml-1" />}
                            </button>
                            <button onClick={nextPage} disabled={currentPage === selectedBook.content.length - 1} className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 transition-all text-slate-700">
                                <SkipForward weight="fill" size={24} />
                            </button>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-200/50">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                                <span>Velocidad de Lectura</span>
                                <span>{Math.round(speechRate * 100)}%</span>
                            </div>
                            <input
                                type="range" min="0.5" max="1.5" step="0.1"
                                value={speechRate}
                                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                            />
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 justify-center">
                            <Clock className="w-4 h-4" /> Página {currentPage + 1} de {selectedBook.content.length}
                        </div>
                    </div>
                </div>

                {/* Principal: Texto */}
                <div className="lg:col-span-8 min-h-[600px] flex flex-col gap-6">
                    {/* Imagen de la Página (si existe) */}
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
                    </AnimatePresence>

                    <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white flex-grow shadow-2xl relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="relative z-10 font-serif leading-relaxed text-slate-800"
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                <div className="mb-8 opacity-20">
                                    <BookOpen className="w-12 h-12" weight="duotone" />
                                </div>
                                <div className="relative">
                                    <span className="text-slate-900 font-medium transition-all duration-75">
                                        {selectedBook.content[currentPage].text.slice(0, charIndex)}
                                    </span>
                                    <span className="text-slate-400 font-medium">
                                        {selectedBook.content[currentPage].text.slice(charIndex)}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Decoración sutil */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <SpeakerHigh size={120} weight="thin" />
                        </div>
                    </div>

                    {/* Progress Bar Inferior */}
                    <div className="mt-6 flex gap-2">
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
            </div>
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
                            <div className="aspect-[4/3] relative overflow-hidden">
                                <img src={book.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={book.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-900 flex items-center gap-1.5 shadow-xl border border-white/20">
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
