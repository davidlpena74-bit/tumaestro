'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Play,
    Pause,
    ArrowLeft,
    ArrowCounterClockwise,
    Gauge,
    BookOpen,
    Eye,
    EyeSlash,
    SpeakerHigh,
    GraduationCap,
    Clock,
    Sparkle,
    Microphone,
    MicrophoneSlash,
    Waveform
} from '@phosphor-icons/react';
import { READING_TEXTS, ReadingText } from './data/reading-texts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getBestVoice } from '@/lib/speech-utils';
import { useLanguage } from '@/context/LanguageContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function ReadingTeacherTool() {
    const { t, language } = useLanguage();
    const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSlow, setIsSlow] = useState(false);
    const [focusMode, setFocusMode] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(-1);
    const [wordStatuses, setWordStatuses] = useState<('unread' | 'correct' | 'incorrect')[]>([]);
    const [audioLevel, setAudioLevel] = useState(0);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscripts, setFinalTranscripts] = useState<string[]>([]);

    // Internal refs for matching logic
    const currentWordIndexRef = useRef(0);
    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const lastSentenceCheckRef = useRef(0);

    // Audio visualization refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const micStreamRef = useRef<MediaStream | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Refs to avoid stale closures in listeners
    const isListeningRef = useRef(isListening);
    const handleRecognitionResultRef = useRef<((event: any) => void) | null>(null);

    // Sync refs with current state
    useEffect(() => {
        isListeningRef.current = isListening;
        handleRecognitionResultRef.current = handleRecognitionResult;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;

            // Initialize Speech Recognition
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                console.log('✅ Speech Recognition API available');
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'de-DE';
                recognition.maxAlternatives = 1;

                console.log('🌍 Recognition language set to:', recognition.lang);

                recognition.onstart = () => {
                    console.log('🎙️ Speech recognition started');
                };

                recognition.onresult = (event: any) => {
                    console.log('📥 Recognition result received', event);
                    if (handleRecognitionResultRef.current) {
                        handleRecognitionResultRef.current(event);
                    }
                };

                recognition.onerror = (event: any) => {
                    console.error('❌ Speech Recognition Error:', event.error, event);
                    if (event.error === 'no-speech') {
                        console.warn('⚠️ No speech detected');
                        return;
                    }
                    if (event.error === 'aborted') {
                        console.warn('⚠️ Recognition aborted');
                        return;
                    }
                    // Do not update state if we are going to restart or if it's transient
                    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                        setIsListening(false);
                    }
                };

                recognition.onend = () => {
                    console.log('🛑 Recognition ended, isListening:', isListeningRef.current);
                    if (isListeningRef.current) {
                        console.log('🔄 Restarting recognition...');
                        try {
                            recognition.start();
                        } catch (e) {
                            console.error('Failed to restart recognition:', e);
                        }
                    }
                };

                recognitionRef.current = recognition;
            } else {
                console.error('❌ Speech Recognition API not available');
            }
        }
        return () => {
            cancelSpeech();
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    console.log('Recognition already stopped');
                }
            }
            stopAudioVisualization();
        };
    }, [language]); // Only recreate if language changes

    useEffect(() => {
        if (selectedText) {
            const words = getWordsOnly(selectedText.content);
            setWordStatuses(new Array(words.length).fill('unread'));
            currentWordIndexRef.current = 0;
            lastSentenceCheckRef.current = 0;
        }
    }, [selectedText]);

    const getWordsOnly = (text: string) => {
        return text.trim().split(/\s+/).map(w => w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").toLowerCase());
    };

    const cancelSpeech = () => {
        if (synthRef.current) {
            synthRef.current.cancel();
        }
        setIsPlaying(false);
        setIsPaused(false);
        setCharIndex(0);
        setWordIndex(-1);
    };

    const startAudioVisualization = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micStreamRef.current = stream;

            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = audioContext;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;

            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            drawWaveform();
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopAudioVisualization = () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }
        if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach(track => track.stop());
            micStreamRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        setAudioLevel(0);
    };

    const drawWaveform = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return;

        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationFrameIdRef.current = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);

            // Calculate average audio level
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                const normalized = (dataArray[i] - 128) / 128;
                sum += Math.abs(normalized);
            }
            const avgLevel = sum / bufferLength;
            setAudioLevel(avgLevel);

            // Clear canvas
            canvasCtx.fillStyle = 'rgb(248, 250, 252)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw waveform
            canvasCtx.lineWidth = 3;
            canvasCtx.strokeStyle = 'rgb(16, 185, 129)';
            canvasCtx.beginPath();

            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };

        draw();
    };

    const togglePlayback = () => {
        if (!selectedText) return;

        if (isPlaying && !isPaused) {
            if (synthRef.current) synthRef.current.pause();
            setIsPlaying(false);
            setIsPaused(true);
            return;
        }

        if (!isPlaying && isPaused) {
            if (synthRef.current) synthRef.current.resume();
            setIsPlaying(true);
            setIsPaused(false);
            return;
        }

        startReading();
    };

    const handleRecognitionResult = (event: any) => {
        // Log raw event to see if we get ANYTHING
        console.log('🎤 Raw recognition event:', event);

        if (!selectedText) {
            console.warn('❌ No text selected, ignoring recognition');
            return;
        }

        const results = event.results;
        if (!results || results.length === 0) return;

        // Process interim results
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < results.length; i++) {
            const transcript = results[i][0].transcript;
            if (results[i].isFinal) {
                final += transcript + ' ';
                console.log('✅ FINAL: ', transcript);
                processFinalTranscript(transcript); // Separate processing logic
            } else {
                interim += transcript;
                console.log('⚪ INTERIM: ', transcript);
            }
        }

        if (interim) setInterimTranscript(interim);
        if (final) {
            setFinalTranscripts(prev => [...prev, final.trim()]);
            setInterimTranscript('');
        }
    };

    const processFinalTranscript = (transcript: string) => {
        const spokenWords = transcript.trim().toLowerCase().split(/\s+/);
        console.log('📝 Processing spoken words:', spokenWords);

        const originalWords = getWordsOnly(selectedText!.content);
        const wordsWithSpaces = selectedText!.content.split(/(\s+)/);

        setWordStatuses(prev => {
            const newStatuses = [...prev];
            let currentIdx = currentWordIndexRef.current;
            let charCount = 0;

            // Recalculate charCount based on currentIdx to be safe
            for (let i = 0; i < currentIdx; i++) {
                charCount += wordsWithSpaces[i * 2]?.length || 0;
                charCount += wordsWithSpaces[i * 2 + 1]?.length || 0;
            }

            spokenWords.forEach((spoken: string) => {
                if (currentIdx >= originalWords.length) return;

                const target = originalWords[currentIdx];
                const nextTarget = originalWords[currentIdx + 1];
                const match = isMatch(spoken, target);

                // Allow checking next word if current one was skipped
                const nextMatch = nextTarget && isMatch(spoken, nextTarget);

                console.log(`  Matching: "${spoken}" vs "${target}" (${match}) or "${nextTarget}" (${nextMatch})`);

                if (match) {
                    newStatuses[currentIdx] = 'correct';
                    // Advance char counter for word + space
                    charCount += wordsWithSpaces[currentIdx * 2]?.length || 0;
                    charCount += wordsWithSpaces[currentIdx * 2 + 1]?.length || 0;
                    currentIdx++;
                } else if (nextMatch) {
                    // Mark skipped word as incorrect
                    newStatuses[currentIdx] = 'incorrect';
                    charCount += wordsWithSpaces[currentIdx * 2]?.length || 0;
                    charCount += wordsWithSpaces[currentIdx * 2 + 1]?.length || 0;

                    // Mark current (next) word as correct
                    newStatuses[currentIdx + 1] = 'correct';
                    charCount += wordsWithSpaces[(currentIdx + 1) * 2]?.length || 0;
                    charCount += wordsWithSpaces[(currentIdx + 1) * 2 + 1]?.length || 0;

                    currentIdx += 2;
                } else {
                    // Just mark as incorrect but don't advance blindly unless we are sure?
                    // Strategy: Mark as incorrect and move on effectively treating it as a mispronunciation of the current word
                    newStatuses[currentIdx] = 'incorrect';
                    charCount += wordsWithSpaces[currentIdx * 2]?.length || 0;
                    charCount += wordsWithSpaces[currentIdx * 2 + 1]?.length || 0;
                    currentIdx++;
                }
            });

            currentWordIndexRef.current = currentIdx;
            setCharIndex(charCount);
            setWordIndex(currentIdx);
            checkSentenceFeedback(newStatuses, currentIdx);
            return newStatuses;
        });
    };

    const isMatch = (spoken: string, target: string) => {
        if (!target) return false;
        const s = spoken.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
        const t = target.toLowerCase().trim();
        if (s === t) return true;

        // Simple fuzzy: check if one contains the other or diff is small
        if (s.length > 2 && t.length > 2) {
            const distance = levenshteinDistance(s, t);
            return distance <= 1; // Allow 1 character difference for better accuracy
        }
        return false;
    };

    const levenshteinDistance = (a: string, b: string): number => {
        const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
        for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        return matrix[a.length][b.length];
    };

    const checkSentenceFeedback = (statuses: ('unread' | 'correct' | 'incorrect')[], currentIdx: number) => {
        if (!selectedText) return;

        const wordsJoined = selectedText.content.split(/\s+/);
        const lastWordWithPunctuation = wordsJoined[currentIdx - 1] || "";
        const isEndOfSentence = /[.!?]/.test(lastWordWithPunctuation);

        if (isEndOfSentence && currentIdx > lastSentenceCheckRef.current) {
            const sentenceWordIndices = Array.from(
                { length: currentIdx - lastSentenceCheckRef.current },
                (_, i) => lastSentenceCheckRef.current + i
            );

            const hasErrors = sentenceWordIndices.some(idx => statuses[idx] === 'incorrect');

            if (hasErrors) {
                // Construct the actual sentence from words
                const sentenceToRead = wordsJoined.slice(lastSentenceCheckRef.current, currentIdx).join(" ");

                // Play feedback after a short delay so it doesn't overlap with user's last word
                setTimeout(() => {
                    if (!isPlaying) speakFeedback(sentenceToRead);
                }, 800);
            }
            lastSentenceCheckRef.current = currentIdx;
        }
    };

    const speakFeedback = (text: string) => {
        if (!synthRef.current) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'de-DE';
        u.rate = 0.8;
        const voice = getBestVoice(u.lang);
        if (voice) u.voice = voice;
        synthRef.current.speak(u);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            console.error('❌ Recognition not initialized');
            alert("Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.");
            return;
        }

        if (isListening) {
            console.log('🛑 Stopping recognition...');
            try {
                recognitionRef.current.stop();
                setIsListening(false);
                stopAudioVisualization();
            } catch (e) {
                console.error('Error stopping recognition:', e);
            }
        } else {
            console.log('▶️ Starting recognition...');
            cancelSpeech();
            // Reset progress for fresh start
            currentWordIndexRef.current = 0;
            lastSentenceCheckRef.current = 0;
            setCharIndex(0);
            setWordIndex(-1);
            setInterimTranscript('');
            setFinalTranscripts([]);
            if (selectedText) {
                const words = getWordsOnly(selectedText.content);
                setWordStatuses(new Array(words.length).fill('unread'));
            }

            try {
                recognitionRef.current.start();
                setIsListening(true);
                startAudioVisualization();
                console.log('✅ Recognition started successfully');
            } catch (e: any) {
                console.error('❌ Error starting recognition:', e);
                if (e.message && e.message.includes('already started')) {
                    console.log('Recognition already running, just updating state');
                    setIsListening(true);
                    startAudioVisualization();
                } else {
                    alert('Error al iniciar el reconocimiento de voz: ' + e.message);
                }
            }
        }
    };

    const startReading = () => {
        if (!selectedText || !synthRef.current) return;
        cancelSpeech();
        if (isListening) toggleListening();

        const utterance = new SpeechSynthesisUtterance(selectedText.content);
        utterance.lang = language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'de-DE';
        utterance.rate = isSlow ? 0.6 : 0.9;

        const voice = getBestVoice(utterance.lang);
        if (voice) utterance.voice = voice;

        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                setCharIndex(event.charIndex);
                // Find which word index it is
                const precedingText = selectedText.content.slice(0, event.charIndex);
                const wordsBefore = precedingText.trim().split(/\s+/).filter(w => w.length > 0);
                setWordIndex(wordsBefore.length);
            }
        };

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
            setCharIndex(selectedText.content.length);
            setWordIndex(selectedText.content.split(/\s+/).length);
        };

        utteranceRef.current = utterance;
        setIsPlaying(true);
        setIsPaused(false);
        synthRef.current.speak(utterance);
    };

    const renderText = () => {
        if (!selectedText) return null;
        const wordsWithSpaces = selectedText.content.split(/(\s+)/);
        let cumulativeCharCount = 0;
        let visibleWordCounter = 0;

        return (
            <div className={cn(
                "prose prose-slate max-w-none transition-all duration-500 font-serif",
                focusMode ? "text-2xl md:text-4xl leading-relaxed md:leading-[1.8]" : "text-xl md:text-2xl leading-relaxed"
            )}>
                {wordsWithSpaces.map((part, idx) => {
                    const isSpace = /^\s+$/.test(part);
                    const startPos = cumulativeCharCount;
                    cumulativeCharCount += part.length;

                    if (isSpace) return <span key={idx}>{part}</span>;

                    const status = wordStatuses[visibleWordCounter];
                    const isHighlight = charIndex >= startPos && charIndex < cumulativeCharCount;
                    const wordIdx = visibleWordCounter;
                    visibleWordCounter++;

                    return (
                        <motion.span
                            key={idx}
                            layout
                            animate={{
                                color: status === 'correct' ? '#10b981' :
                                    status === 'incorrect' ? '#f43f5e' :
                                        isHighlight ? '#0ea5e9' : '#94a3b8',
                                scale: isHighlight ? 1.1 : 1,
                                backgroundColor: isHighlight ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                            }}
                            className={cn(
                                "inline-block rounded-lg px-0.5 transition-all duration-300",
                                isHighlight && "font-bold shadow-sm ring-1 ring-sky-500/20",
                                status === 'correct' && "font-bold",
                                status === 'incorrect' && "font-bold underline decoration-rose-400 decoration-wavy"
                            )}
                        >
                            {part}
                        </motion.span>
                    );
                })}
            </div>
        );
    };

    if (!selectedText) {
        return (
            <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-8">
                    <Link
                        href="/recursos"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-all bg-white/40 hover:bg-white/80 px-6 py-3 rounded-2xl border border-slate-200 hover:shadow-lg active:scale-95"
                    >
                        <ArrowLeft weight="bold" /> {t.readingTeacher.backToResources}
                    </Link>
                </div>

                <header className="text-center mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-sky-500/10 rounded-full blur-3xl"
                    />
                    <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight flex items-center justify-center gap-4">
                        <GraduationCap className="text-sky-500 w-12 h-12 md:w-16 md:h-16" weight="duotone" />
                        {t.readingTeacher.title}
                    </h2>
                    <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                        {t.readingTeacher.subtitle}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                    {READING_TEXTS.map((text) => (
                        <motion.button
                            key={text.id}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedText(text)}
                            className="group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all h-[320px] text-left"
                        >
                            {text.image && (
                                <div className="absolute inset-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10" />
                                    <img
                                        src={text.image}
                                        alt={text.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            )}
                            <div className="relative z-20 h-full p-8 flex flex-col justify-end">
                                <div className="flex gap-2 mb-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md transition-colors",
                                        text.level === 'Fácil' ? "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white" :
                                            text.level === 'Medio' ? "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-white" :
                                                "bg-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-white"
                                    )}>
                                        {text.level}
                                    </span>
                                    <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">
                                        {text.category}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2 leading-tight group-hover:text-sky-400 transition-colors">{text.title}</h3>
                                <p className="text-white/70 font-medium text-sm line-clamp-2 pr-12 group-hover:text-white transition-colors">{text.content}</p>

                                <div className="absolute top-8 right-8 bg-sky-500 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all shadow-xl">
                                    <Play weight="fill" className="w-6 h-6" />
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="reader"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                    "w-full mx-auto transition-all duration-500",
                    focusMode ? "fixed inset-0 z-[100] bg-slate-50 p-8 md:p-24 overflow-y-auto" : "max-w-4xl p-4 md:pt-12"
                )}
            >
                <div className={cn(
                    "flex flex-col gap-8",
                    !focusMode && "animate-in fade-in zoom-in-95 duration-500"
                )}>
                    {/* Header with Back Button and Title */}
                    <div className={cn(
                        "flex items-center gap-4 transition-all",
                        focusMode ? "mb-4" : "mb-0"
                    )}>
                        <button
                            onClick={() => {
                                cancelSpeech();
                                setSelectedText(null);
                                if (focusMode) setFocusMode(false);
                            }}
                            className="p-4 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all shadow-sm active:scale-95"
                            title={t.common.back}
                        >
                            <ArrowLeft weight="bold" className="w-6 h-6" />
                        </button>
                        <div className="flex-1">
                            <h3 className="text-slate-800 font-black text-2xl md:text-3xl">{selectedText.title}</h3>
                            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider">
                                <Clock weight="bold" />
                                <span>{Math.ceil(selectedText.content.split(' ').length / 150)} min • {selectedText.level}</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Indicators - Outside Container */}
                    {isListening && (
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shadow-sm">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest">{t.readingTeacher.keepReading}</span>
                            </div>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-slate-400 text-sm italic font-medium"
                            >
                                {t.readingTeacher.pronounceClear}
                            </motion.div>

                            {/* Stats */}
                            <div className="flex gap-4">
                                <div className="bg-emerald-500/10 text-emerald-600 px-4 py-1.5 rounded-xl text-xs font-black border border-emerald-500/20">
                                    {wordStatuses.filter(s => s === 'correct').length} CORRECTAS
                                </div>
                                <div className="bg-rose-500/10 text-rose-600 px-4 py-1.5 rounded-xl text-xs font-black border border-rose-500/20">
                                    {wordStatuses.filter(s => s === 'incorrect').length} ERRORES
                                </div>
                            </div>

                            {/* Waveform Visualization */}
                            <div className="w-full max-w-2xl">
                                <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-lg overflow-hidden">
                                    <canvas
                                        ref={canvasRef}
                                        width={600}
                                        height={120}
                                        className="w-full h-[120px]"
                                    />
                                </div>

                                {/* Audio Level Indicator */}
                                <div className="mt-4 flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nivel de Audio</span>
                                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                                            animate={{ width: `${Math.min(audioLevel * 200, 100)}%` }}
                                            transition={{ duration: 0.1 }}
                                        />
                                    </div>
                                    <span className="text-xs font-black text-emerald-600 min-w-[3ch]">
                                        {Math.round(Math.min(audioLevel * 200, 100))}%
                                    </span>
                                </div>

                                {/* Real-time Transcript Display */}
                                <div className="w-full max-w-2xl mt-4">
                                    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
                                        <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={cn("w-2 h-2 rounded-full", interimTranscript ? "bg-emerald-400 animate-ping" : "bg-emerald-600 animate-pulse")}></div>
                                                <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">
                                                    Escuchando ({language === 'es' ? 'Español' : language === 'en' ? 'English' : language})
                                                </span>
                                            </div>
                                            {audioLevel > 0.1 && (
                                                <span className="text-xs text-slate-500 font-mono">
                                                    Vol: {Math.round(audioLevel * 100)}%
                                                </span>
                                            )}
                                        </div>

                                        <div className="h-[120px] overflow-y-auto custom-scrollbar flex flex-col font-mono text-sm leading-relaxed p-2 bg-black/20 rounded-lg">
                                            {finalTranscripts.map((text, idx) => (
                                                <div key={idx} className="text-emerald-300 mb-1 border-b border-emerald-900/30 pb-1">
                                                    <span className="text-emerald-600 mr-2 text-xs">[{idx + 1}]</span>
                                                    {text}
                                                </div>
                                            ))}

                                            {interimTranscript && (
                                                <div className="text-white bg-slate-800/50 p-1 rounded animate-pulse border-l-2 border-emerald-500 pl-2">
                                                    <span className="text-slate-400 text-xs mr-2">...</span>
                                                    {interimTranscript}
                                                </div>
                                            )}

                                            {!interimTranscript && finalTranscripts.length === 0 && (
                                                <div className="h-full flex flex-col items-center justify-center text-slate-600 italic gap-2 opacity-50">
                                                    <Microphone className="w-8 h-8 opacity-20" />
                                                    <span className="text-center">
                                                        {audioLevel > 0.05
                                                            ? "Detectando sonido... Habla..."
                                                            : "Esperando voz..."}
                                                    </span>
                                                </div>
                                            )}
                                            <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPlaying && (
                        <div className="flex items-center justify-center gap-1 mb-8">
                            {[1, 2, 3, 4, 5].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [8, 24, 8] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                    className="w-1 bg-sky-500 rounded-full"
                                />
                            ))}
                            <span className="ml-2 text-sky-500 font-black text-xs uppercase tracking-widest">{t.readingTeacher.readingNow}</span>
                        </div>
                    )}

                    {/* Content Area */}
                    <div className={cn(
                        "relative bg-white rounded-[3rem] border border-slate-200/50 shadow-2xl transition-all duration-700 overflow-hidden",
                        focusMode ? "p-12 md:p-24 shadow-none border-none bg-transparent" : "p-8 md:p-16"
                    )}>
                        {!focusMode && (
                            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
                        )}

                        <div className="flex flex-col gap-12 max-w-4xl mx-auto items-center">
                            {/* Visual Feedback Banner */}
                            {!focusMode && selectedText.image && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full h-48 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white"
                                >
                                    <img src={selectedText.image} className="w-full h-full object-cover" alt="" />
                                </motion.div>
                            )}

                            {renderText()}

                            {charIndex >= selectedText.content.length && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-4 mt-8 bg-sky-50 p-8 rounded-[2.5rem] border border-sky-100"
                                >
                                    <div className="p-4 bg-sky-500 text-white rounded-full shadow-lg shadow-sky-500/30">
                                        <Sparkle className="w-10 h-10" weight="fill" />
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-800">{t.readingTeacher.completed}</h4>
                                    <button
                                        onClick={() => {
                                            cancelSpeech();
                                            startReading();
                                        }}
                                        className="flex items-center gap-2 px-8 py-3 bg-white text-sky-600 font-bold rounded-2xl border border-sky-200 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all shadow-md active:scale-95"
                                    >
                                        <ArrowCounterClockwise weight="bold" /> {t.readingTeacher.repeat}
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Control Bar - Below Content */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl flex items-center justify-center gap-2 bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100">
                            <button
                                onClick={() => synthRef.current?.cancel()}
                                className="p-3 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                                title={t.readingTeacher.repeat}
                            >
                                <ArrowCounterClockwise className="w-5 h-5" weight="bold" />
                            </button>

                            <div className="w-px h-6 bg-slate-100 mx-1" />

                            <button
                                onClick={() => setIsSlow(!isSlow)}
                                className={cn(
                                    "px-4 py-2 rounded-full transition-all flex items-center gap-2 text-sm font-black uppercase tracking-widest",
                                    isSlow ? "bg-amber-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                                )}
                            >
                                <Gauge className="w-5 h-5" weight={isSlow ? "fill" : "bold"} />
                                <span className="hidden md:inline">{t.readingTeacher.speed}</span>
                            </button>

                            <div className="w-px h-6 bg-slate-100 mx-1" />

                            <button
                                onClick={() => setFocusMode(!focusMode)}
                                className={cn(
                                    "px-4 py-2 rounded-full transition-all flex items-center gap-2 text-sm font-black uppercase tracking-widest",
                                    focusMode ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                                )}
                            >
                                {focusMode ? <EyeSlash className="w-5 h-5" weight="fill" /> : <Eye className="w-5 h-5" weight="bold" />}
                                <span className="hidden md:inline">{focusMode ? t.readingTeacher.exitFocus : t.readingTeacher.focusMode}</span>
                            </button>

                            <div className="w-px h-6 bg-slate-100 mx-1" />

                            <button
                                onClick={toggleListening}
                                className={cn(
                                    "px-6 py-2 md:py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl active:scale-95",
                                    isListening
                                        ? "bg-emerald-500 text-white animate-pulse"
                                        : "bg-white text-slate-400 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                                )}
                                title={isListening ? t.readingTeacher.stopListening : t.readingTeacher.readAloud}
                            >
                                {isListening ? (
                                    <><Waveform className="w-6 h-6" weight="fill" /> {t.readingTeacher.listening}</>
                                ) : (
                                    <><Microphone className="w-6 h-6" /> {t.readingTeacher.readAloud}</>
                                )}
                            </button>

                            <div className="w-px h-6 bg-slate-100 mx-1" />

                            <button
                                onClick={togglePlayback}
                                className={cn(
                                    "px-8 py-2 md:px-10 md:py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl active:scale-95",
                                    isPlaying
                                        ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
                                        : "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20"
                                )}
                            >
                                {isPlaying ? (
                                    <><Pause className="w-5 h-5" weight="fill" /> {language === 'es' ? 'PAUSAR' : 'PAUSE'}</>
                                ) : isPaused ? (
                                    <><Play className="w-5 h-5" weight="fill" /> {language === 'es' ? 'REANUDAR' : 'RESUME'}</>
                                ) : (
                                    <><SpeakerHigh className="w-5 h-5" weight="fill" /> {t.readingTeacher.startReading}</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
