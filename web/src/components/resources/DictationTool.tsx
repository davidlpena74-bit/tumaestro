'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ArrowLeft, Check, ArrowsClockwise, Gauge, Keyboard, BookOpen, GraduationCap, ArrowCounterClockwise } from '@phosphor-icons/react';
import { DICTATIONS, Dictation } from './data/dictations';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DictationTool() {
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;
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
        if (synthRef.current) {
            synthRef.current.cancel();
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
        }
    };

    const getBestVoice = (lang: string) => {
        if (!synthRef.current) return null;

        const voices = synthRef.current.getVoices();

        // Priority list specifically for female/soft voices
        const femaleStoryVoices = [
            'Google español',
            'Microsoft Elena',
            'Microsoft Laura',
            'Microsoft Helena',
            'Mónica',
            'Paulina',
            'Sabina', // Mexico
            'Zira',
            'Samantha'
        ];

        // 1. First pass: Search GLOBAL list for specific female names (ignoring exact locale connection if needed, but preferring it)
        for (const name of femaleStoryVoices) {
            // Try exact lang match first
            let best = voices.find(v => v.name.includes(name) && v.lang === lang);
            if (!best) {
                // Try loose lang match (es-ES vs es-MX)
                best = voices.find(v => v.name.includes(name) && v.lang.startsWith(lang.split('-')[0]));
            }
            if (best) return best;
        }

        // 2. Second pass: 'Natural' voices (Microsoft/Edge usually)
        const natural = voices.find(v => v.name.includes('Natural') && v.lang.startsWith(lang.split('-')[0]));
        if (natural) return natural;

        // 3. Fallback: Any voice of the requested language
        const exactLang = voices.filter(v => v.lang === lang);
        if (exactLang.length > 0) return exactLang[0];

        return voices.find(v => v.lang.startsWith(lang.split('-')[0])) || null;
    };

    const togglePlayback = () => {
        if (!selectedDictation || !synthRef.current) return;

        // PAUSE FLOW
        if (isPlaying && !isPaused) {
            synthRef.current.pause(); // Pause TTS if active
            setIsPlaying(false);
            setIsPaused(true);

            // If in gap, clear timeout but keep 'isInGap' true so we know to resume next chunk
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
                pauseTimeoutRef.current = null;
            }

            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            return;
        }

        // RESUME FLOW
        if (!isPlaying && isPaused) {
            setIsPlaying(true);
            setIsPaused(false);

            // Force Ref Update for immediate loop access
            isPlayingRef.current = true;
            isPausedRef.current = false;

            if (isInPauseGapRef.current) {
                // If we were paused inside a gap, we just accelerate to the next chunk
                playNextChunk();
            } else {
                // Determine if browser TTS was mid-sentence
                if (synthRef.current.paused) {
                    synthRef.current.resume();
                } else {
                    // Weird state, safeguard restart? No, might lose place.
                }

                lastTimeRef.current = performance.now();
                requestProgressLoop();
            }
            return;
        }

        startNewSpeech();
    };

    // --- MAIN ENGINE ---

    const startNewSpeech = () => {
        if (!selectedDictation || !synthRef.current) return;

        cancelSpeech();

        // SPLIT TEXT INTO SENTENCE CHUNKS
        const text = selectedDictation.text;
        // Logic: Split by punctuation, but keep punctuation attached to preceding segment
        // Regex finds: Any chars until a delimiter [.!?] then optionally spaces or end of line
        const rawChunks = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];
        chunksRef.current = rawChunks;

        // Init State
        currentChunkIndexRef.current = 0;
        baseCharIndexRef.current = 0;
        progressRef.current = 0;
        currentSpeedRef.current = isSlow ? 0.010 : 0.014; // Base guess

        setIsPlaying(true);
        setIsPaused(false);
        isPlayingRef.current = true;
        isPausedRef.current = false;

        playNextChunk();
    };

    const playNextChunk = () => {
        if (currentChunkIndexRef.current >= chunksRef.current.length) {
            // FINISHED ALL
            setIsPlaying(false);
            setIsPaused(false);
            setCharIndex(selectedDictation?.text.length || 0);
            return;
        }

        const chunkText = chunksRef.current[currentChunkIndexRef.current];
        isInPauseGapRef.current = false;
        progressRef.current = 0;

        // Create Utterance
        const u = new SpeechSynthesisUtterance(chunkText);
        u.lang = selectedDictation!.lang;

        // Slightly slower for stories to be more dramatic/clear
        const isStory = selectedDictation!.category === 'Cuentos';
        const categoryRate = isStory ? 0.85 : 0.95;
        u.rate = categoryRate * (isSlow ? 0.75 : 1);

        if (isStory) {
            u.pitch = 1.1; // More engaging tone for kids
        }

        const voice = getBestVoice(selectedDictation!.lang);
        if (voice) u.voice = voice;

        // Start Visual Loop for this chunk
        lastTimeRef.current = performance.now();
        lastBoundaryTimeRef.current = performance.now();
        lastBoundaryCharIndexRef.current = 0;
        requestProgressLoop();

        u.onboundary = (event) => {
            if (event.name === 'word' || event.name === 'sentence' || !event.name) {
                const currentIndex = event.charIndex;
                let currentLength = event.charLength;

                // LEARNING SPEED
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

                // SNAP to confirmed position
                progressRef.current = currentIndex + currentLength;

                // Update Global (Base + Local)
                setCharIndex(baseCharIndexRef.current + progressRef.current);
            }
        };

        u.onend = () => {
            // Stop loop for this chunk
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

            // Mark this chunk solidly done
            baseCharIndexRef.current += chunkText.length;
            setCharIndex(baseCharIndexRef.current); // Force visual completion

            // Prepare Pause
            isInPauseGapRef.current = true;
            currentChunkIndexRef.current++;

            // VARIABLE PAUSE DURATION
            // Stories get longer dramatic pauses
            const isStory = selectedDictation!.category === 'Cuentos';
            const pauseDuration = isStory ? 1200 : 600;

            pauseTimeoutRef.current = setTimeout(() => {
                // Only verify state (if user paused during gap)
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

    const requestProgressLoop = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        lastTimeRef.current = performance.now();

        const loop = (time: number) => {
            if (!isPlayingRef.current && !isPausedRef.current) return;
            if (isPausedRef.current || isInPauseGapRef.current) {
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
                // Clamp
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
                <span className="text-emerald-400 font-medium transition-all duration-75 border-b-2 border-emerald-500/50">{readPart}</span>
                <span className="text-white/30">{unreadPart}</span>
            </p>
        );
    };

    if (!selectedDictation) {
        return (
            <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Dictados Interactivos</h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Mejora tu ortografía y comprensión auditiva. Escucha, escribe y corrige al instante.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DICTATIONS.map((dictation) => (
                        <motion.button
                            key={dictation.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDictation(dictation)}
                            className="bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-3xl text-left transition-all group relative overflow-hidden backdrop-blur-md"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Keyboard className="w-24 h-24 text-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex gap-2 mb-4">
                                    <span className={cn(
                                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border border-white/10",
                                        dictation.level === 'Fácil' ? "bg-emerald-500/20 text-emerald-300" :
                                            dictation.level === 'Medio' ? "bg-amber-500/20 text-amber-300" :
                                                "bg-rose-500/20 text-rose-300"
                                    )}>
                                        {dictation.level}
                                    </span>
                                    <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-bold uppercase tracking-wide border border-white/10">
                                        {dictation.category}
                                    </span>
                                    {dictation.lang === 'en-US' && (
                                        <span className="px-2.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-[10px] font-bold uppercase tracking-wide border border-white/10">
                                            English
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{dictation.title}</h3>
                                <p className="text-white/60 text-sm line-clamp-2">{dictation.text}</p>
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
                <button
                    onClick={backToMenu}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver
                </button>
                <div className="text-right">
                    <h2 className="text-white font-bold text-xl">{selectedDictation.title}</h2>
                    <p className="text-white/40 text-sm">{selectedDictation.category} • {selectedDictation.level}</p>
                </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col items-center justify-center mb-8 gap-4">
                    <div className="bg-slate-800/50 p-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-inner">
                        <button
                            onClick={reloadSpeech}
                            className="p-3 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
                            title="Reiniciar reproducción"
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
                            title="Modo Lento"
                        >
                            <Gauge className="w-5 h-5" weight={isSlow ? "fill" : "regular"} />
                            <span className="hidden md:inline">Lento</span>
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
                                <><Pause className="w-5 h-5" weight="fill" /> PAUSAR</>
                            ) : isPaused ? (
                                <><Play className="w-5 h-5" weight="fill" /> RESUMIR</>
                            ) : (
                                <><Play className="w-5 h-5" weight="fill" /> EMPEZAR</>
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
                                        Escucha atentamente el cuento...
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="w-full mb-0 p-8 bg-black/20 rounded-2xl border border-white/5 shadow-inner min-h-[140px] flex items-center justify-center text-center backdrop-blur-sm">
                            {(isPlaying || isPaused || charIndex > 0) ? (
                                renderKaraokeText()
                            ) : (
                                <p className="text-white/20 italic font-serif text-lg">Pulsa empezar para escuchar el dictado...</p>
                            )}
                        </div>
                    </div>
                )}

                {!showResult && (
                    <div className="mt-8 relative group">
                        <textarea
                            value={userText}
                            onChange={(e) => setUserText(e.target.value)}
                            placeholder="Escribe aquí lo que escuches..."
                            className="w-full h-48 bg-black/20 text-white border border-white/10 rounded-2xl p-6 text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-white/20 font-serif"
                            spellCheck={false}
                        />
                        <div className="absolute bottom-4 right-4">
                            <button
                                onClick={checkResult}
                                disabled={userText.length === 0}
                                className="px-6 py-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                <Check className="w-5 h-5" weight="bold" /> COMPROBAR
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
                            <h3 className="text-white text-lg font-medium">Precisión</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                                <h4 className="text-emerald-400 font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> Texto Original
                                </h4>
                                <p className="text-white/90 leading-relaxed font-serif text-lg">
                                    {selectedDictation.text}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <h4 className="text-white/60 font-bold mb-3 text-xs uppercase tracking-wider flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4" /> Tu Respuesta
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
                                <ArrowsClockwise className="w-5 h-5" /> Repetir Dictado
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
