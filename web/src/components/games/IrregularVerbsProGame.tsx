'use client';

import { Timer as TimerIconGame, Trophy as TrophyIconGame, RefreshCw as RefreshCwIconGame } from 'lucide-react';
import RatingSystem from './RatingSystem';
import ActivityRanking from './ActivityRanking';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, Trophy, ArrowRight, BookOpen, Volume2, Timer, Star, Mic, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { IRREGULAR_VERBS_PRO, type IrregularVerb } from './data/irregular-verbs-pro';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameHUD from './GameHUD';
import { useVoiceVolume } from '@/hooks/useVoiceVolume';
import { cn } from '@/lib/utils';

export default function IrregularVerbsProGame({ taskId = null, type = 'writing', activityId }: { taskId?: string | null, type?: 'writing' | 'pronunciation', activityId?: string }) {
    const { t, language } = useLanguage();
    const [verbs, setVerbs] = useState<IrregularVerb[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputs, setInputs] = useState({
        pastSimple: '',
        pastParticiple: ''
    });
    const [fieldResults, setFieldResults] = useState({
        pastSimple: false,
        pastParticiple: false
    });
    const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
    const [streak, setStreak] = useState(0);
    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0); // 0: infinitive, 1: pastSimple, 2: pastParticiple
    const [stepResults, setStepResults] = useState<boolean[]>([false, false, false]);
    const [stepCountdown, setStepCountdown] = useState(3);
    const pastParticipleRef = useRef<HTMLInputElement>(null);
    const pastSimpleRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame,
        handleFinish
    } = useGameLogic({ initialTime: 180, penaltyTime: 0, gameMode, taskId, activityId });
    const recognitionRef = useRef<any>(null);
    const volume = useVoiceVolume(isListening);

    const startNewGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        const shuffled = [...IRREGULAR_VERBS_PRO].sort(() => Math.random() - 0.5);
        setVerbs(mode === 'challenge' ? shuffled : shuffled.slice(0, 15));
        setCurrentIndex(0);
        setStreak(0);
        hookStartGame();
        setInputs({ pastSimple: '', pastParticiple: '' });
        setShowResult(null);
        setFieldResults({ pastSimple: false, pastParticiple: false });
        setMessage('');
        setCurrentStep(0);
        setStepResults([false, false, false]);
        setStepCountdown(3);
    };

    const currentVerb = verbs[currentIndex];

    const playAudio = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${text}&type=2`);
            audioRef.current = audio;
            audio.onended = () => {
                audioRef.current = null;
                resolve();
            };
            audio.onerror = () => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                const voices = window.speechSynthesis.getVoices();
                const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                    voices.find(v => v.lang === 'en-US');

                if (preferredVoice) utterance.voice = preferredVoice;
                utterance.onend = () => resolve();
                utterance.onerror = () => resolve();
                window.speechSynthesis.speak(utterance);
            };
            audio.play().catch(() => {
                audio.onerror && audio.onerror(new Event('error'));
            });
        });
    };

    const playSequence = async (texts: string[]) => {
        for (const text of texts) {
            if (gameState !== 'playing') break;
            await playAudio(text);
            await new Promise(r => setTimeout(r, 300));
        }
    };

    // Auto-play infinitive when current verb changes
    useEffect(() => {
        if (gameState === 'playing' && currentVerb && isMounted) {
            playAudio(currentVerb.infinitive);
        }
    }, [currentIndex, gameState, isMounted]);

    const checkAnswer = () => {
        if (!currentVerb) return;

        playSequence([currentVerb.infinitive, currentVerb.pastSimple, currentVerb.pastParticiple]);

        const checkPastSimple = (input: string, target: string) => {
            if (target.includes('/')) {
                const options = target.split('/');
                return options.includes(input.toLowerCase().trim()) || input.toLowerCase().trim() === target;
            }
            return input.toLowerCase().trim() === target;
        }

        const correctSimple = checkPastSimple(inputs.pastSimple, currentVerb.pastSimple);
        const correctParticiple = inputs.pastParticiple.toLowerCase().trim() === currentVerb.pastParticiple.toLowerCase();

        setFieldResults({
            pastSimple: correctSimple,
            pastParticiple: correctParticiple
        });

        if (correctSimple && correctParticiple) {
            setShowResult('correct');
            addScore(15 + (streak * 3));
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' ✅');
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });
        } else {
            setShowResult('incorrect');
            setStreak(0);
            addError();
            setMessage(language === 'es' ? '¡Vaya! Intenta de nuevo. ❌' : 'Oops! Try again. ❌');
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            checkVoiceAnswer(transcript, true);
        } else {
            setTranscript('');
            setShowResult(null);
            setCurrentStep(0);
            setStepResults([false, false, false]);
            setStepCountdown(3);

            try {
                recognitionRef.current?.start();
                setIsListening(true);
            } catch (e) {
                console.error("Speech recognition error:", e);
                setIsListening(false);
            }
        }
    };

    const stepResultsRef = useRef(stepResults);
    useEffect(() => {
        stepResultsRef.current = stepResults;
    }, [stepResults]);

    // Timer Effect for auto-advancing
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isListening && type === 'pronunciation') {
            let elapsed = 0;
            interval = setInterval(() => {
                elapsed += 1;
                const remainingInStep = 3 - (elapsed % 3);
                setStepCountdown(remainingInStep === 0 ? 3 : remainingInStep);

                if (elapsed === 3) {
                    setCurrentStep(1);
                    setTranscript('');
                } else if (elapsed === 6) {
                    setCurrentStep(2);
                    setTranscript('');
                } else if (elapsed === 9) {
                    clearInterval(interval);
                    setTimeout(() => {
                        handlePronunciationSequenceEnd(stepResultsRef.current);
                    }, 500);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isListening, type]);

    const checkVoiceAnswer = (voiceInput: string, isManualStop = false) => {
        if (!currentVerb || showResult === 'correct') return;

        // Basic Clean: Lowercase and strip punctuation EXCEPT slashes for now
        const clean = (str: string) => str.toLowerCase().replace(/[.,#!$%^&*;:{}=\-_`~()]/g, "").trim();

        // God-Mode Phonetic Collapse: Group sounds that are often confused by noise/accents
        const collapsePhonetics = (str: string) => str.toLowerCase()
            .replace(/[aeiouy]/g, "v") // All vowels to 'v'
            .replace(/[bpv]/g, "b")    // Labials
            .replace(/[dt]/g, "d")     // Dentals
            .replace(/[gkq]/g, "g")    // Gutturals
            .replace(/[szc]/g, "s")    // Sibilants
            .replace(/(.)\1+/g, "$1")  // Collapse double letters
            .replace(/[^a-z]/g, "")    // Keep only letters
            .trim();

        const fullTranscriptClean = clean(voiceInput);
        const fullTranscriptCollapsed = collapsePhonetics(voiceInput);
        const words = voiceInput.split(/\s+/).map(clean).filter(w => w.length > 0);

        const rawTarget = [
            currentVerb.infinitive,
            currentVerb.pastSimple,
            currentVerb.pastParticiple
        ][currentStep];

        // SPLIT FIRST to handle variants like was/were
        const targetOptions = rawTarget.split('/').map(clean);
        const targetOptionsCollapsed = rawTarget.split('/').map(collapsePhonetics);

        // Levenshtein helper
        const dist = (a: string, b: string) => {
            if (a.length === 0) return b.length;
            if (b.length === 0) return a.length;
            const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]) as number[][];
            for (let j = 1; j <= b.length; j++) matrix[0][j] = j;
            for (let i = 1; i <= a.length; i++) {
                for (let j = 1; j <= b.length; j++) {
                    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                    matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
                }
            }
            return matrix[a.length][b.length];
        };

        const isGodMatch = (t: string, inputWord: string) => {
            if (t === inputWord) return true;
            if (t.length <= 1 || inputWord.length <= 1) return t === inputWord;

            // Substring check (very tolerant)
            if (t.includes(inputWord) || inputWord.includes(t)) return true;

            const d = dist(t, inputWord);
            // Extreme tolerance: ~40-50% error margin
            if (t.length >= 6) return d <= 3;
            if (t.length >= 3) return d <= 2;
            return d <= 1;
        };

        // 1. Literal Word Check (on cleaned words)
        let found = words.some(w => targetOptions.some(opt => isGodMatch(opt, w)));

        // 2. Collapsed Substring Check (Resilience to concatenations)
        if (!found) {
            found = targetOptionsCollapsed.some(opt => fullTranscriptCollapsed.includes(opt));
        }

        // 3. Sliding window fuzzy check on collapsed transcript (Deep noise search)
        if (!found) {
            for (const optCollapsed of targetOptionsCollapsed) {
                if (fullTranscriptCollapsed.length >= optCollapsed.length) {
                    for (let i = 0; i <= fullTranscriptCollapsed.length - optCollapsed.length; i++) {
                        const window = fullTranscriptCollapsed.substring(i, i + optCollapsed.length);
                        if (dist(optCollapsed, window) <= Math.max(1, Math.floor(optCollapsed.length * 0.45))) {
                            found = true;
                            break;
                        }
                    }
                }
                if (found) break;
            }
        }

        if (found && !stepResults[currentStep]) {
            const newResults = [...stepResults];
            newResults[currentStep] = true;
            setStepResults(newResults);
        } else if (isManualStop && !stepResults[currentStep]) {
            const newResults = [...stepResults];
            newResults[currentStep] = false;
            setStepResults(newResults);
        }
    };

    const handlePronunciationSequenceEnd = async (results: boolean[]) => {
        setIsListening(false);
        recognitionRef.current?.stop();

        const finalResults = results.slice(0, 3);
        const allCorrect = finalResults.every(r => r === true);

        if (allCorrect) {
            setShowResult('correct');
            addScore(20 + (streak * 3));
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' 🎙️');
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });
        } else {
            setShowResult('incorrect');
            setStreak(0);
            addError();
            setMessage(language === 'es' ? '¡Repasemos! 🎙️' : 'Let\'s review! 🎙️');
        }

        // Always play the full sequence at the end for reinforcement
        if (currentVerb) {
            await playSequence([currentVerb.infinitive, currentVerb.pastSimple, currentVerb.pastParticiple]);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const result = event.results[i][0].transcript.toLowerCase().trim();
                    if (event.results[i].isFinal) {
                        setTranscript(result);
                        checkVoiceAnswer(result);
                    } else {
                        interimTranscript += result;
                        checkVoiceAnswer(result);
                    }
                }
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => {
                if (isListening && !showResult) {
                    recognition.start();
                } else {
                    setIsListening(false);
                }
            };
            recognitionRef.current = recognition;
        }
    }, [currentIndex]);

    const nextVerb = () => {
        setMessage('');
        if (gameMode === 'challenge') {
            if (currentIndex >= verbs.length - 1) {
                const reshuffled = [...IRREGULAR_VERBS_PRO].sort(() => Math.random() - 0.5);
                setVerbs(reshuffled);
                setCurrentIndex(0);
            } else {
                setCurrentIndex(prev => prev + 1);
            }
            setInputs({ pastSimple: '', pastParticiple: '' });
            setFieldResults({ pastSimple: false, pastParticiple: false });
            setShowResult(null);
            setCurrentStep(0);
            setStepResults([false, false, false]);
        } else {
            if (currentIndex < verbs.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setInputs({ pastSimple: '', pastParticiple: '' });
                setFieldResults({ pastSimple: false, pastParticiple: false });
                setShowResult(null);
                setCurrentStep(0);
                setStepResults([false, false, false]);
            } else {
                handleFinish();
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setVerbs([]);
        setCurrentIndex(0);
        setStreak(0);
        setMessage('');
        setCurrentStep(0);
        setStepResults([false, false, false]);
        setFieldResults({ pastSimple: false, pastParticiple: false });
    };

    if (!isMounted) return null;

    return (
        <div className="w-full flex flex-col items-center select-none max-w-6xl mx-auto p-4">
            <GameHUD
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                elapsedTime={elapsedTime}
                gameMode={gameMode}
                totalTargets={verbs.length || IRREGULAR_VERBS_PRO.length}
                remainingTargets={(verbs.length || IRREGULAR_VERBS_PRO.length) - currentIndex}
                targetName={currentVerb ? `${currentVerb.infinitive.toUpperCase()} (${currentVerb.translation})` : ''}
                message={message}
                onReset={resetGame}
                colorTheme="purple"
                icon={<Star className="w-8 h-8 text-violet-500 fill-violet-500" />}
                title={type === 'pronunciation' ? t.gamesPage.gameTitles.verbsPronunciation : "Verbos Irregulares PRO"}
                gameType={type}
                activityId={activityId || 'game'}
            />

            <div className={cn(
                "relative w-full bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden mt-4 transition-all duration-500",
                gameState === 'playing' ? "min-h-[400px]" : "min-h-[780px]"
            )}>
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                        <div className="bg-violet-500/10 p-6 rounded-full mb-4 ring-1 ring-violet-500/30">
                            <BookOpen className="w-12 h-12 text-violet-500" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight uppercase">{t.gamesPage.verbsLevels.pro.title}</h2>
                        <p className="text-gray-300 mb-6 max-w-md text-base leading-relaxed font-medium">
                            {type === 'pronunciation' ? t.gamesPage.verbsLevels.pro.descP : t.gamesPage.verbsLevels.pro.desc}
                        </p>

                        <div className="w-full max-w-4xl mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 p-4 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                    <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-2">{t?.common?.ranking || 'Ranking'} - Puntos</span>
                                    <div className="w-full text-left">
                                        <ActivityRanking activityId={activityId || 'game'} limit={3} sortBy="score" />
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 p-4 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                    <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-2">{t?.common?.ranking || 'Ranking'} - Tiempo</span>
                                    <div className="w-full text-left">
                                        <ActivityRanking activityId={activityId || 'game'} limit={3} sortBy="time" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={() => startNewGame('challenge')}
                                className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        {t.gamesPage.verbsGame.challengeMode} <TrophyIconGame className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-70 font-bold tracking-wider">
                                        {t.gamesPage.verbsGame.verbsCount.replace('{count}', '100')} • 3 Min
                                    </span>
                                </span>
                            </button>

                            <button
                                onClick={() => startNewGame('practice')}
                                className="group relative px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        {t.gamesPage.verbsGame.practiceMode} <RefreshCwIconGame className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-50 font-bold tracking-wider">{t.gamesPage.verbsGame.verbsCount.replace('{count}', '15')}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 rounded-[2rem]">

                        {/* Top Section: Score & Trophy (Pushing up) */}
                        <div className="flex flex-col items-center mb-8 shrink-0">
                            <div className="bg-emerald-500/10 p-3 rounded-full mb-3 ring-1 ring-emerald-500/30">
                                {gameMode === 'challenge' && timeLeft === 0 ? (
                                    <TimerIconGame className="w-10 h-10 text-red-500 animate-pulse" />
                                ) : (
                                    <TrophyIconGame className="w-10 h-10 text-yellow-400 animate-bounce" />
                                )}
                            </div>
                            <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">
                                {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : (t?.common?.completed || 'Completado')}
                            </h2>
                        </div>

                        {/* Main Content Area: Rankings & Actions */}
                        <div className="w-full max-w-5xl flex flex-col gap-6 mb-10">
                            {/* Rankings Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: Score Box */}
                                <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                    <div className="flex flex-col items-center gap-1 mb-4">
                                        <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{true ? 'Tu Puntuación:' : 'Your Score:'}</span>
                                        <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                                            {score}
                                        </span>
                                    </div>
                                    <div className="w-full text-left">
                                        <ActivityRanking activityId={activityId || 'game'} limit={3} sortBy="score" />
                                    </div>
                                </div>

                                {/* Right: Time Box */}
                                <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-6 overflow-hidden text-center shadow-2xl flex flex-col items-center">
                                    <div className="flex flex-col items-center gap-1 mb-4">
                                        <span className="text-gray-400 text-[10px] uppercase tracking-widest font-black">{true ? 'Tu Tiempo:' : 'Your Time:'}</span>
                                        <span className="text-4xl font-black text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                            {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="w-full text-left">
                                        <ActivityRanking activityId={activityId || 'game'} limit={3} sortBy="time" />
                                    </div>
                                </div>
                            </div>

                            {/* Actions Row - Reduced Height */}
                            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-5xl mx-auto w-full mt-2">
                                <div className="w-full md:w-[calc(50%-8px+8px)] flex-none bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-0 shadow-xl overflow-hidden h-[120px] flex items-center justify-center">
                                    <div className="scale-[0.6] origin-center w-[166%] h-[166%] flex items-center justify-center -mt-8">
                                        <RatingSystem activityId={activityId || 'game'} />
                                    </div>
                                </div>

                                <button
                                    onClick={resetGame}
                                    className="w-full md:w-[calc(50%-8px-8px)] flex-none h-[120px] flex items-center justify-center gap-4 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20 uppercase tracking-wider"
                                >
                                    <RefreshCwIconGame className="w-8 h-8" /> {t?.common?.playAgain || 'Jugar de nuevo'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-8 pb-6 md:pt-12 md:pb-8 h-full flex flex-col items-center justify-center">
                    <div className={cn(
                        "w-full max-w-4xl items-center relative",
                        type === 'writing' ? "grid md:grid-cols-2 gap-12" : "flex flex-col"
                    )}>
                        {/* Voice Visualizer Integration */}
                        {type === 'pronunciation' && isListening && (
                            <div className="absolute -top-16 right-0 z-20">
                            </div>
                        )}
                        {type === 'writing' && (
                            <AnimatePresence mode="wait">
                                {currentVerb && (
                                    <motion.div
                                        key={currentVerb.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-[2rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl relative group"
                                    >
                                        <div className="absolute top-4 right-4 text-white/20 font-black select-none group-hover:text-white/30 transition-colors flex items-baseline leading-none">
                                            <span className="text-6xl">{currentIndex + 1}</span>
                                            <span className="text-2xl ml-1">/{verbs.length}</span>
                                        </div>
                                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                                            <Star className="w-10 h-10 text-yellow-400" />
                                        </div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <h2 className="text-5xl font-black text-white capitalize tracking-tight">{currentVerb.infinitive}</h2>
                                            <button
                                                onClick={() => playAudio(currentVerb.infinitive)}
                                                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all text-white hover:scale-110 active:scale-90 shadow-lg"
                                                title="Escuchar"
                                            >
                                                <Volume2 className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <p className="text-violet-100 text-xl font-medium px-4 py-2 bg-black/10 rounded-full">
                                            {currentVerb.translation}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}

                        <div className={cn("space-y-6", type === 'pronunciation' && "w-full")}>
                            {type === 'writing' ? (
                                <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 space-y-6 shadow-xl backdrop-blur-sm">
                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-black text-violet-100/90 uppercase tracking-[0.3em] ml-2">Past Simple</label>
                                        <input
                                            type="text"
                                            ref={pastSimpleRef}
                                            value={inputs.pastSimple}
                                            onChange={(e) => setInputs(prev => ({ ...prev, pastSimple: e.target.value }))}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    if (inputs.pastSimple && !inputs.pastParticiple) {
                                                        pastParticipleRef.current?.focus();
                                                    } else if (inputs.pastSimple && inputs.pastParticiple) {
                                                        checkAnswer();
                                                    }
                                                }
                                            }}
                                            disabled={showResult !== null}
                                            placeholder={true ? "Escribe aquí..." : "Type here..."}
                                            className={`w-full bg-slate-950/60 border-2 rounded-2xl px-6 py-5 text-white text-xl outline-none transition-all font-bold placeholder:opacity-20
                                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                                    showResult === 'incorrect' ? (fieldResults.pastSimple ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10') :
                                                        'border-white/10 focus:border-violet-600/50'}`}
                                        />
                                        {showResult === 'incorrect' && currentVerb && !fieldResults.pastSimple && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold mt-1 ml-1 flex items-center gap-1">
                                                <XCircle className="w-4 h-4 text-red-500" />
                                                <span className="text-red-500/90">{language === 'es' ? 'Correcto' : 'Correct'}:</span>
                                                <span className="text-white">{currentVerb.pastSimple}</span>
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-black text-violet-100/90 uppercase tracking-[0.3em] ml-2">Past Participle</label>
                                        <input
                                            type="text"
                                            ref={pastParticipleRef}
                                            value={inputs.pastParticiple}
                                            onChange={(e) => setInputs(prev => ({ ...prev, pastParticiple: e.target.value }))}
                                            onKeyDown={(e) => e.key === 'Enter' && inputs.pastSimple && inputs.pastParticiple && checkAnswer()}
                                            disabled={showResult !== null}
                                            placeholder={true ? "Escribe aquí..." : "Type here..."}
                                            className={`w-full bg-slate-950/60 border-2 rounded-2xl px-6 py-5 text-white text-xl outline-none transition-all font-bold placeholder:opacity-20
                                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                                    showResult === 'incorrect' ? (fieldResults.pastParticiple ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10') :
                                                        'border-white/10 focus:border-violet-600/50'}`}
                                        />
                                        {showResult === 'incorrect' && currentVerb && !fieldResults.pastParticiple && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold mt-1 ml-1 flex items-center gap-1">
                                                <XCircle className="w-4 h-4 text-red-500" />
                                                <span className="text-red-500/90">{language === 'es' ? 'Correcto' : 'Correct'}:</span>
                                                <span className="text-white">{currentVerb.pastParticiple}</span>
                                            </motion.p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-4 pb-0 space-y-12 w-full">
                                    <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
                                        {[
                                            { label: 'Infinitive', value: currentVerb?.infinitive, show: true },
                                            { label: 'Past Simple', value: currentVerb?.pastSimple, show: stepResults[1] || showResult === 'incorrect' },
                                            { label: 'Past Participle', value: currentVerb?.pastParticiple, show: stepResults[2] || showResult === 'incorrect' }
                                        ].map((form, idx) => {
                                            const isActive = idx === currentStep && isListening;
                                            const isDone = stepResults[idx];
                                            const isFailed = showResult === 'incorrect' && !stepResults[idx];

                                            return (
                                                <motion.div
                                                    key={idx}
                                                    layout
                                                    className={cn(
                                                        "relative aspect-square flex flex-col items-center justify-center transition-all duration-500 rounded-[2.5rem] border-4",
                                                        isActive
                                                            ? "bg-violet-500/20 border-violet-500 shadow-[0_0_50px_rgba(139,92,246,0.4)] scale-110 z-10"
                                                            : isDone
                                                                ? "bg-emerald-500/10 border-emerald-500/50 scale-90"
                                                                : isFailed
                                                                    ? "bg-red-500/10 border-red-500/50 scale-90"
                                                                    : "bg-slate-900/50 border-white/5 opacity-40 scale-90"
                                                    )}
                                                >
                                                    <div className="absolute top-4 right-4 z-10 text-white/50 text-4xl font-black w-8 h-8 rounded-xl flex items-center justify-center">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 transition-all">
                                                        {isDone && <CheckCircle2 className="w-10 h-10 text-emerald-500 fill-emerald-500/20" />}
                                                        {isFailed && <XCircle className="w-10 h-10 text-red-500 fill-red-500/20" />}
                                                    </div>

                                                    <div className="flex flex-col items-center justify-center text-center p-4">
                                                        <p className="text-[16px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">{form.label}</p>
                                                        <p className={cn(
                                                            "font-black transition-all leading-none",
                                                            isActive ? "text-6xl text-white" : isDone ? "text-4xl text-emerald-400" : isFailed ? "text-4xl text-red-400" : "text-2xl text-white/60"
                                                        )}>
                                                            {(form.show && (isActive || isDone || isFailed || idx === 0)) ? form.value : '?'}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex items-center gap-8">
                                            <button
                                                onClick={toggleListening}
                                                disabled={showResult === 'correct'}
                                                className={cn(
                                                    "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl relative",
                                                    isListening
                                                        ? "bg-violet-600 shadow-violet-500/40"
                                                        : showResult === 'correct'
                                                            ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                                                            : "bg-violet-600 hover:bg-violet-500 shadow-violet-500/40"
                                                )}
                                            >
                                                <Mic className="w-8 h-8 text-white" />
                                                {isListening && (
                                                    <motion.div
                                                        layoutId="ripple-pro"
                                                        initial={{ scale: 1, opacity: 0.3 }}
                                                        animate={{
                                                            scale: 1 + volume * 1.5,
                                                            opacity: 0.2 + volume * 0.8
                                                        }}
                                                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                                        className="absolute inset-0 bg-violet-500 rounded-full -z-10"
                                                    />
                                                )}
                                            </button>

                                            {(showResult === 'correct' || showResult === 'incorrect') && (
                                                <div className="flex items-center gap-4 animate-in slide-in-from-left duration-500">
                                                    <button
                                                        onClick={() => {
                                                            setShowResult(null);
                                                            setTranscript('');
                                                            setMessage('');
                                                            setCurrentStep(0);
                                                            setStepResults([false, false, false]);
                                                        }}
                                                        className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-xl shadow-red-500/20 border-2 border-white/20 hover:scale-110 active:scale-95 group"
                                                        title="Repetir"
                                                    >
                                                        <RefreshCwIconGame className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                                                    </button>
                                                    {showResult !== null && (
                                                        <button
                                                            onClick={nextVerb}
                                                            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-xl shadow-emerald-500/20 border-2 border-white/20 hover:scale-110 active:scale-95 group"
                                                            title="Siguiente"
                                                        >
                                                            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2 min-w-[200px]">
                                            <div className="min-h-[3rem] flex items-center justify-center">
                                                <AnimatePresence mode="wait">
                                                    {isListening ? (
                                                        <motion.div
                                                            key={stepCountdown}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <span className="text-5xl font-black text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.3)]">
                                                                {stepCountdown}
                                                            </span>
                                                        </motion.div>
                                                    ) : !showResult ? (
                                                        <motion.p
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-violet-400/80 font-black uppercase tracking-[0.2em] animate-pulse text-[14px]"
                                                        >
                                                            {t.gamesPage.verbsGame.pressToStart || "Pulsa para empezar"}
                                                        </motion.p>
                                                    ) : null}
                                                </AnimatePresence>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            )}

                            {showResult === null ? (
                                type === 'writing' ? (
                                    <button
                                        onClick={checkAnswer}
                                        disabled={!inputs.pastSimple || !inputs.pastParticiple}
                                        className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-violet-50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-violet-500/10"
                                    >
                                        {t.gamesPage.verbsGame.verify}
                                    </button>
                                ) : null
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full flex flex-col gap-4"
                                >
                                    {showResult !== null && type === 'writing' && (
                                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                                            {showResult === 'incorrect' && (
                                                <button
                                                    onClick={() => {
                                                        setShowResult(null);
                                                        setInputs({ pastSimple: '', pastParticiple: '' });
                                                        setMessage('');
                                                        setTimeout(() => pastSimpleRef.current?.focus(), 10);
                                                    }}
                                                    className="flex-1 py-5 bg-slate-700 text-white rounded-2xl font-black text-lg hover:bg-slate-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-500/10 flex items-center justify-center gap-3"
                                                >
                                                    <RefreshCw className="w-6 h-6" /> {t.gamesPage.verbsGame.repeat}
                                                </button>
                                            )}
                                            <button
                                                onClick={nextVerb}
                                                className={cn(
                                                    "py-5 text-white rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3",
                                                    showResult === 'correct' ? "w-full bg-violet-600 hover:bg-violet-700 shadow-violet-500/20" : "flex-1 bg-violet-600/80 hover:bg-violet-600 shadow-violet-500/20"
                                                )}
                                            >
                                                {t.gamesPage.verbsGame.next} <ArrowRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
