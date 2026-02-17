'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Play, Pause, ArrowLeft, Check, ArrowsClockwise, Gauge, Keyboard, BookOpen, GraduationCap, ArrowCounterClockwise } from '@phosphor-icons/react';
import { DICTATIONS, Dictation } from './data/dictations';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';
import { getBestVoice } from '@/lib/speech-utils';
import { useLanguage } from '@/context/LanguageContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DictationTool() {
    const { t } = useLanguage();
    const [selectedDictation, setSelectedDictation] = useState<Dictation | null>(null);
    const [userText, setUserText] = useState('');

    // Playback state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Refs for synchronous loop access
    const isPlayingRef = useRef(false);
    const isPausedRef = useRef(false);

    const [isSlow, setIsSlow] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [accuracy, setAccuracy] = useState(0);

    // Defines how many characters of the text are currently "read"
    const [charIndex, setCharIndex] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const synthRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const lastTimeRef = useRef<number>(0);

    // Chunking & Pause System
    const chunksRef = useRef<string[]>([]);
    const currentChunkIndexRef = useRef<number>(0);
    const baseCharIndexRef = useRef<number>(0); // Completed usage
    const progressRef = useRef<number>(0);      // Progress within current chunk
    const isInPauseGapRef = useRef<boolean>(false);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Adaptive Speed
    const currentSpeedRef = useRef<number>(0.015);
    const lastBoundaryTimeRef = useRef<number>(0);
    const lastBoundaryCharIndexRef = useRef<number>(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;
            audioRef.current = new Audio();
        }
        return () => {
            cancelSpeech();
        };
    }, []);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
        isPausedRef.current = isPaused;
    }, [isPlaying, isPaused]);

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
        };
    }, []);

    const cancelSpeech = () => {
        // Cancelar TTS
        if (synthRef.current) {
            synthRef.current.cancel();
        }

        // Cancelar Audio MP3
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = "";
        }

        setIsPlaying(false);
        setIsPaused(false);
        setCharIndex(0);

        // Stats Reset
        progressRef.current = 0;
        baseCharIndexRef.current = 0;
        currentChunkIndexRef.current = 0;
        isInPauseGapRef.current = false;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };



    const togglePlayback = () => {
        if (!selectedDictation) return;

        // --- PAUSE LOGIC ---
        if (isPlaying && !isPaused) {
            // Pausar TTS
            if (synthRef.current && synthRef.current.speaking) {
                synthRef.current.pause();
            }
            // Pausar Audio
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
            }

            setIsPlaying(false);
            setIsPaused(true);

            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
                pauseTimeoutRef.current = null;
            }
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            return;
        }

        // --- RESUME LOGIC ---
        if (!isPlaying && isPaused) {
            setIsPlaying(true);
            setIsPaused(false);
            isPlayingRef.current = true;
            isPausedRef.current = false;

            // Resume Audio MP3
            if (selectedDictation.audioFile && audioRef.current && audioRef.current.src) {
                audioRef.current.play();
                lastTimeRef.current = performance.now();
                requestProgressLoop(true); // true = modo audio
                return;
            }

            // Resume TTS (Chunks)
            if (isInPauseGapRef.current) {
                playNextChunk();
            } else {
                if (synthRef.current && synthRef.current.paused) {
                    synthRef.current.resume();
                }
                lastTimeRef.current = performance.now();
                requestProgressLoop(false); // false = modo TTS
            }
            return;
        }

        startNewSpeech();
    };

    // --- MAIN ENGINE ---

    const startNewSpeech = () => {
        if (!selectedDictation) return;

        cancelSpeech();

        setIsPlaying(true);
        setIsPaused(false);
        isPlayingRef.current = true;
        isPausedRef.current = false;

        // 1. MODO AUDIO (Si existe archivo pre-generado)
        if (selectedDictation.audioFile && audioRef.current) {
            const audio = audioRef.current;
            audio.src = selectedDictation.audioFile;

            // Velocidad
            const isStory = selectedDictation.category === 'Cuentos';
            // Los audios ya vienen con velocidad base, pero permitimos ajuste "Lento"
            audio.playbackRate = isSlow ? 0.75 : 1.0;

            audio.play().catch(e => {
                console.error("Error playing audio, falling back to TTS", e);
                // Fallback a TTS si falla la carga
                // startTTSLogic(); // (Implementar si se desea robustez extrema)
            });

            // Loop visual basado en tiempo
            lastTimeRef.current = performance.now();
            requestProgressLoop(true);

            audio.onended = () => {
                setIsPlaying(false);
                setIsPaused(false);
                setCharIndex(selectedDictation.text.length);
                if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            };

            return;
        }

        // 2. MODO TTS (Fallback original)
        startTTSLogic();
    };

    const startTTSLogic = () => {
        if (!selectedDictation || !synthRef.current) return;

        // SPLIT TEXT INTO SENTENCE CHUNKS
        const text = selectedDictation.text;
        const rawChunks = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];
        chunksRef.current = rawChunks;

        // Init State
        currentChunkIndexRef.current = 0;
        baseCharIndexRef.current = 0;
        progressRef.current = 0;
        currentSpeedRef.current = isSlow ? 0.010 : 0.014;

        playNextChunk();
    };

    const playNextChunk = () => {
        if (currentChunkIndexRef.current >= chunksRef.current.length) {
            setIsPlaying(false);
            setIsPaused(false);
            setCharIndex(selectedDictation?.text.length || 0);
            return;
        }

        const chunkText = chunksRef.current[currentChunkIndexRef.current];
        isInPauseGapRef.current = false;
        progressRef.current = 0;

        const u = new SpeechSynthesisUtterance(chunkText);
        u.lang = selectedDictation!.lang;

        const isStory = selectedDictation!.category === 'Cuentos';
        const categoryRate = isStory ? 0.85 : 0.95;
        u.rate = categoryRate * (isSlow ? 0.75 : 1);

        if (isStory) {
            u.pitch = 1.05; // Tono más cálido/humano
        }

        const voice = getBestVoice(selectedDictation!.lang);
        if (voice) u.voice = voice;

        lastTimeRef.current = performance.now();
        lastBoundaryTimeRef.current = performance.now();
        lastBoundaryCharIndexRef.current = 0;
        requestProgressLoop(false);

        u.onboundary = (event) => {
            if (event.name === 'word' || event.name === 'sentence' || !event.name) {
                const currentIndex = event.charIndex;
                let currentLength = event.charLength;

                const now = performance.now();
                const timeDiff = now - lastBoundaryTimeRef.current;
                const charDiff = currentIndex - lastBoundaryCharIndexRef.current;
                if (timeDiff > 200 && charDiff > 0) {
                    const measuredSpeed = charDiff / timeDiff;
                    currentSpeedRef.current = (currentSpeedRef.current * 0.8) + (measuredSpeed * 0.2);
                }
                lastBoundaryTimeRef.current = now;
                lastBoundaryCharIndexRef.current = currentIndex;

                if (!currentLength) {
                    const remaining = chunkText.slice(currentIndex);
                    const match = remaining.match(/^\S+/);
                    currentLength = match ? match[0].length : 0;
                }

                progressRef.current = currentIndex + currentLength;
                setCharIndex(baseCharIndexRef.current + progressRef.current);
            }
        };

        u.onend = () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

            baseCharIndexRef.current += chunkText.length;
            setCharIndex(baseCharIndexRef.current);

            isInPauseGapRef.current = true;
            currentChunkIndexRef.current++;

            const isStory = selectedDictation!.category === 'Cuentos';
            const pauseDuration = isStory ? 1200 : 600;

            pauseTimeoutRef.current = setTimeout(() => {
                if (isPlayingRef.current && !isPausedRef.current) {
                    playNextChunk();
                }
            }, pauseDuration);
        };

        u.onerror = (e) => {
            if (e.error === 'canceled' || e.error === 'interrupted') return;
            console.error("Speech error", e);
            setIsPlaying(false);
        };

        utteranceRef.current = u;
        synthRef.current!.speak(u);
    };

    const requestProgressLoop = (isAudioMode: boolean = false) => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        lastTimeRef.current = performance.now();

        const loop = (time: number) => {
            if (!isPlayingRef.current && !isPausedRef.current) return;
            if (isPausedRef.current) {
                lastTimeRef.current = time;
                animationFrameRef.current = requestAnimationFrame(loop);
                return;
            }

            // --- MODO AUDIO MP3 ---
            if (isAudioMode && audioRef.current) {
                const audio = audioRef.current;
                if (audio.duration > 0 && selectedDictation) {
                    const pct = audio.currentTime / audio.duration;
                    const totalChars = selectedDictation.text.length;
                    setCharIndex(Math.min(totalChars, Math.floor(pct * totalChars)));
                } else {
                    // Fallback visual si duración no disponible aún
                }
                animationFrameRef.current = requestAnimationFrame(loop);
                return;
            }

            // --- MODO TTS TRADICIONAL ---
            if (isInPauseGapRef.current) {
                lastTimeRef.current = time;
                animationFrameRef.current = requestAnimationFrame(loop);
                return;
            }

            const deltaTime = time - lastTimeRef.current;
            lastTimeRef.current = time;

            const estimatedSpeed = currentSpeedRef.current;
            const currentChunkLen = chunksRef.current[currentChunkIndexRef.current]?.length || 0;

            if (progressRef.current < currentChunkLen) {
                progressRef.current += deltaTime * estimatedSpeed;
                if (progressRef.current > currentChunkLen) progressRef.current = currentChunkLen;
                setCharIndex(Math.floor(baseCharIndexRef.current + progressRef.current));
            }

            animationFrameRef.current = requestAnimationFrame(loop);
        };

        animationFrameRef.current = requestAnimationFrame(loop);
    };

    const reloadSpeech = () => {
        startNewSpeech();
    };

    const checkResult = () => {
        if (!selectedDictation) return;
        cancelSpeech();

        const target = selectedDictation.text.trim();
        const input = userText.trim();
        let hits = 0;
        const targetLen = target.length;
        const inputLen = input.length;
        const minLen = Math.min(targetLen, inputLen);

        for (let i = 0; i < minLen; i++) {
            if (target[i] === input[i]) hits++;
        }

        const score = Math.round((hits / Math.max(targetLen, inputLen)) * 100);
        setAccuracy(score);
        if (score === 100) confetti({ particleCount: 150, spread: 70 });
        setShowResult(true);
    };

    const reset = () => {
        cancelSpeech();
        setUserText('');
        setShowResult(false);
        setCharIndex(0);
    };

    const backToMenu = () => {
        cancelSpeech();
        setSelectedDictation(null);
        reset();
    };

    // Render logic
    const renderKaraokeText = () => {
        if (!selectedDictation) return null;
        const text = selectedDictation.text;
        const safeIndex = Math.min(Math.max(0, charIndex), text.length);

        const readPart = text.slice(0, safeIndex);
        const unreadPart = text.slice(safeIndex);

        return (
            <p className="text-xl md:text-2xl font-serif leading-relaxed transition-all">
                <span className="text-slate-900 font-medium transition-all duration-75">{readPart}</span>
                <span className="text-slate-400 font-medium">{unreadPart}</span>
            </p>
        );
    };

    if (!selectedDictation) {
        return (
            <div className="w-full max-w-6xl mx-auto p-0 relative z-10">
                <div className="p-0 md:p-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="relative flex items-center">
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onMouseEnter={() => setTooltipOpen(true)}
                                    onMouseLeave={() => setTooltipOpen(false)}
                                    onClick={() => window.location.href = '/material'}
                                    className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-slate-100 text-slate-400 hover:text-purple-600 hover:border-purple-100 transition-all z-20 cursor-pointer"
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
                                                {t.dictation.backToResources}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </div>

                        <header className="text-center mb-12 -mt-24">
                            <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">{t.dictation.title}</h2>
                            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-8">
                                {t.dictation.subtitle}
                            </p>
                        </header>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
                    {DICTATIONS.map((dictation) => (
                        <motion.button
                            key={dictation.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDictation(dictation)}
                            className="bg-white/40 hover:bg-white/60 backdrop-blur-md border border-slate-200/50 p-6 rounded-3xl text-left transition-all group relative overflow-hidden shadow-lg hover:shadow-xl"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Keyboard className="w-24 h-24 text-slate-900" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex gap-2 mb-4">
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border border-slate-200/50",
                                        dictation.level === 'Fácil' ? "bg-emerald-100/80 text-emerald-700" :
                                            dictation.level === 'Medio' ? "bg-amber-100/80 text-amber-700" :
                                                "bg-rose-100/80 text-rose-700"
                                    )}>
                                        {dictation.level}
                                    </span>
                                    <span className="px-2.5 py-0.5 bg-blue-100/80 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wide border border-slate-200/50">
                                        {dictation.category}
                                    </span>
                                    {dictation.lang === 'en-US' && (
                                        <span className="px-2.5 py-0.5 bg-purple-100/80 text-purple-700 rounded-full text-[10px] font-bold uppercase tracking-wide border border-slate-200/50">
                                            English
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{dictation.title}</h3>
                                <p className="text-slate-600 font-medium text-sm line-clamp-2">{dictation.text}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-8">
                <div className="relative flex items-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setTooltipOpen(true)}
                        onMouseLeave={() => setTooltipOpen(false)}
                        onClick={backToMenu}
                        className="flex items-center justify-center w-11 h-11 bg-white/10 backdrop-blur-md rounded-full shadow-lg border border-white/10 text-white/60 hover:text-white transition-all z-20 cursor-pointer"
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
                                    {t.dictation.back}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
                <div className="text-right">
                    <h2 className="text-white font-bold text-xl">{selectedDictation.title}</h2>
                    <p className="text-white/40 text-sm">{selectedDictation.category} • {selectedDictation.level}</p>
                </div>
            </div>

            <div className="bg-transparent border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col items-center justify-center mb-8 gap-4">
                    <div className="bg-slate-800/50 p-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-inner">
                        <button
                            onClick={reloadSpeech}
                            className="p-3 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
                            title={t.dictation.restart}
                        >
                            <ArrowCounterClockwise className="w-5 h-5" weight="bold" />
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <button
                            onClick={() => setIsSlow(!isSlow)}
                            className={cn(
                                "p-3 rounded-full transition-all flex items-center gap-2 text-sm font-bold",
                                isSlow ? "bg-indigo-500 text-white shadow-lg" : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                            title={t.dictation.slowMode}
                        >
                            <Gauge className="w-5 h-5" weight={isSlow ? "fill" : "regular"} />
                            <span className="hidden md:inline">{t.dictation.slow}</span>
                        </button>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <button
                            onClick={togglePlayback}
                            className={cn(
                                "px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg min-w-[140px] justify-center text-slate-900",
                                isPlaying
                                    ? "bg-amber-400 hover:bg-amber-300"
                                    : "bg-emerald-500 hover:bg-emerald-400"
                            )}
                        >
                            {isPlaying ? (
                                <><Pause className="w-5 h-5" weight="fill" /> {t.dictation.pause}</>
                            ) : isPaused ? (
                                <><Play className="w-5 h-5" weight="fill" /> {t.dictation.resume}</>
                            ) : (
                                <><Play className="w-5 h-5" weight="fill" /> {t.dictation.start}</>
                            )}
                        </button>
                    </div>
                </div>

                {!showResult && (
                    <div className="flex flex-col items-center gap-6">
                        {selectedDictation.image && (
                            <div className="relative w-full max-w-sm aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 ring-1 ring-white/20 rotate-1 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src={selectedDictation.image}
                                    alt={selectedDictation.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-center">
                                    <p className="text-white/90 text-sm font-medium italic drop-shadow-md">
                                        {t.dictation.listenCarefully}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="w-full mb-0 p-8 bg-black/20 rounded-2xl border border-white/5 shadow-inner min-h-[140px] flex items-center justify-center text-center backdrop-blur-sm">
                            {(isPlaying || isPaused || charIndex > 0) ? (
                                renderKaraokeText()
                            ) : (
                                <p className="text-white/20 italic font-serif text-lg">{t.dictation.pressStart}</p>
                            )}
                        </div>
                    </div>
                )}

                {!showResult && (
                    <div className="mt-8 relative group">
                        <textarea
                            value={userText}
                            onChange={(e) => setUserText(e.target.value)}
                            placeholder={t.dictation.placeholder}
                            className="w-full h-48 bg-black/20 text-white border border-white/10 rounded-2xl p-6 text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-white/20 font-serif"
                            spellCheck={false}
                        />
                        <div className="absolute bottom-4 right-4">
                            <button
                                onClick={checkResult}
                                disabled={userText.length === 0}
                                className="px-6 py-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                <Check className="w-5 h-5" weight="bold" /> {t.dictation.check}
                            </button>
                        </div>
                    </div>
                )}

                {showResult && (
                    <div className="mt-8 space-y-6 animate-in slide-in-from-bottom-4">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-4 ring-1 ring-white/10">
                                <span className={cn(
                                    "text-5xl font-black tracking-tighter",
                                    accuracy === 100 ? "text-emerald-400" :
                                        accuracy > 80 ? "text-blue-400" :
                                            accuracy > 50 ? "text-amber-400" : "text-rose-400"
                                )}>
                                    {accuracy}%
                                </span>
                            </div>
                            <h3 className="text-white text-lg font-medium">{t.dictation.accuracy}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                                <h4 className="text-emerald-400 font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> {t.dictation.originalText}
                                </h4>
                                <p className="text-white/90 leading-relaxed font-serif text-lg">
                                    {selectedDictation.text}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <h4 className="text-white/60 font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" /> {t.dictation.yourAnswer}
                                </h4>
                                <p className="text-white/90 leading-relaxed font-serif text-lg whitespace-pre-wrap">
                                    {userText}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center pt-6">
                            <button
                                onClick={reset}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all flex items-center gap-2"
                            >
                                <ArrowsClockwise className="w-5 h-5" /> {t.dictation.repeat}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
