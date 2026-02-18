'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, Trophy, ArrowRight, BookOpen, Volume2, Timer, Star, Mic, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { IRREGULAR_VERBS, type IrregularVerb } from './data/irregular-verbs';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameHUD from './GameHUD';
import { useVoiceVolume } from '@/hooks/useVoiceVolume';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function IrregularVerbsBasicGame({ taskId = null, type = 'writing' }: { taskId?: string | null, type?: 'writing' | 'pronunciation' }) {
    const { t, language } = useLanguage();
    const [verbs, setVerbs] = useState<IrregularVerb[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputs, setInputs] = useState({
        pastSimple: '',
        pastParticiple: ''
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
    } = useGameLogic({ initialTime: 60, penaltyTime: 0, gameMode, taskId });
    const recognitionRef = useRef<any>(null);
    const volume = useVoiceVolume(isListening);

    const startNewGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        const shuffled = [...IRREGULAR_VERBS].sort(() => Math.random() - 0.5);
        setVerbs(mode === 'challenge' ? shuffled : shuffled.slice(0, 5));
        setCurrentIndex(0);
        setStreak(0);
        hookStartGame();
        setInputs({ pastSimple: '', pastParticiple: '' });
        setShowResult(null);
        setMessage('');
        setCurrentStep(0);
        setStepResults([false, false, false]);
        setStepCountdown(3);
    };

    const currentVerb = verbs[currentIndex];

    const playAudio = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${text}&type=2`);
            audio.onended = () => resolve();
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
            await playAudio(text);
            await new Promise(r => setTimeout(r, 300));
        }
    };

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

        if (correctSimple && correctParticiple) {
            setShowResult('correct');
            addScore(5 + (streak * 1));
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' ✅');
            confetti({
                particleCount: 80,
                spread: 50,
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
            addScore(10 + (streak * 1));
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' 🎙️');
            confetti({
                particleCount: 80,
                spread: 50,
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
                const reshuffled = [...IRREGULAR_VERBS].sort(() => Math.random() - 0.5);
                setVerbs(reshuffled);
                setCurrentIndex(0);
            } else {
                setCurrentIndex(prev => prev + 1);
            }
            setInputs({ pastSimple: '', pastParticiple: '' });
            setShowResult(null);
            setCurrentStep(0);
            setStepResults([false, false, false]);
        } else {
            if (currentIndex < verbs.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setInputs({ pastSimple: '', pastParticiple: '' });
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
                totalTargets={verbs.length || IRREGULAR_VERBS.length}
                remainingTargets={(verbs.length || IRREGULAR_VERBS.length) - currentIndex}
                targetName={currentVerb ? `${currentVerb.infinitive.toUpperCase()} (${currentVerb.translation})` : ''}
                message={message}
                onReset={resetGame}
                colorTheme="purple"
                icon={<BookOpen className="w-8 h-8 text-violet-600" />}
                title={type === 'pronunciation' ? t.gamesPage.gameTitles.verbsPronunciation : t.gamesPage.gameTitles.verbs}
                gameType={type}
            />

            <div className="relative w-full min-h-[500px] bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden mt-4">
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                        <div className="bg-violet-500/10 p-6 rounded-full mb-6 ring-1 ring-violet-500/30">
                            <BookOpen className="w-16 h-16 text-violet-500" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{t.gamesPage.verbsLevels.basic.title}</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed font-medium">
                            {type === 'pronunciation' ? t.gamesPage.verbsLevels.basic.descP : t.gamesPage.verbsLevels.basic.desc}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={() => startNewGame('challenge')}
                                className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        {t.gamesPage.verbsGame.challengeMode} <Trophy className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-70 font-bold tracking-wider">
                                        {t.gamesPage.verbsGame.verbsCount.replace('{count}', '25')} • 1 Min
                                    </span>
                                </span>
                            </button>

                            <button
                                onClick={() => startNewGame('practice')}
                                className="group relative px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        {t.gamesPage.verbsGame.practiceMode} <RefreshCw className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-50 font-bold tracking-wider">{t.gamesPage.verbsGame.verbsCount.replace('{count}', '5')}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                        <div className="bg-violet-500/10 p-4 rounded-full mb-6 ring-1 ring-violet-500/30">
                            {gameMode === 'challenge' && timeLeft === 0 ? (
                                <Timer className="w-16 h-16 text-red-500 animate-pulse" />
                            ) : (
                                <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                            )}
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2">
                            {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : t.common.completed}
                        </h2>

                        <div className="flex flex-col items-center gap-2 mb-10 bg-white/5 p-8 rounded-3xl border border-white/10">
                            <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">{language === 'es' ? 'Puntuación Final' : 'Final Score'}</span>
                            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm">
                                {score}
                            </span>
                        </div>

                        <button onClick={resetGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                            <RefreshCw className="w-5 h-5" /> {t.common.playAgain}
                        </button>
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
                                        <div className="absolute top-4 right-4 text-white/20 font-black text-6xl select-none group-hover:text-white/30 transition-colors">
                                            {currentIndex + 1}
                                        </div>
                                        <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                                            <Star className="w-10 h-10 text-white" />
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
                                        <p className="text-sky-100 text-xl font-medium px-4 py-2 bg-black/10 rounded-full">
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
                                            value={inputs.pastSimple}
                                            onChange={(e) => setInputs(prev => ({ ...prev, pastSimple: e.target.value }))}
                                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                            disabled={showResult !== null}
                                            placeholder={language === 'es' ? "Escribe aquí..." : "Type here..."}
                                            className={`w-full bg-slate-950/60 border-2 rounded-2xl px-6 py-5 text-white text-xl outline-none transition-all font-bold placeholder:opacity-20
                                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                                    showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                                        'border-white/10 focus:border-sky-600/50'}`}
                                        />
                                        {showResult === 'incorrect' && currentVerb && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-bold mt-1 ml-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-4 h-4" /> Correcto: {currentVerb.pastSimple}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[11px] font-black text-violet-100/90 uppercase tracking-[0.3em] ml-2">Past Participle</label>
                                        <input
                                            type="text"
                                            value={inputs.pastParticiple}
                                            onChange={(e) => setInputs(prev => ({ ...prev, pastParticiple: e.target.value }))}
                                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                            disabled={showResult !== null}
                                            placeholder={language === 'es' ? "Escribe aquí..." : "Type here..."}
                                            className={`w-full bg-slate-950/60 border-2 rounded-2xl px-6 py-5 text-white text-xl outline-none transition-all font-bold placeholder:opacity-20
                                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                                    showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                                        'border-white/10 focus:border-sky-600/50'}`}
                                        />
                                        {showResult === 'incorrect' && currentVerb && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-bold mt-1 ml-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-4 h-4" /> Correcto: {currentVerb.pastParticiple}
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
                                                            ? "bg-sky-500/20 border-sky-500 shadow-[0_0_50px_rgba(14,165,233,0.4)] scale-110 z-10"
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
                                                        layoutId="ripple-basic"
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
                                                        <RefreshCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
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
                                                            <span className="text-5xl font-black text-sky-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">
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
                                        className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-sky-50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-sky-500/10"
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
                                    {showResult === 'correct' && type === 'writing' && (
                                        <button
                                            onClick={nextVerb}
                                            className="w-full py-5 bg-sky-600 text-white rounded-2xl font-black text-lg hover:bg-sky-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3"
                                        >
                                            {t.gamesPage.verbsGame.next} <ArrowRight className="w-6 h-6" />
                                        </button>
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
