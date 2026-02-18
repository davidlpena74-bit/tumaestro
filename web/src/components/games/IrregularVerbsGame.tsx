'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, Trophy, ArrowRight, BookOpen, Volume2, Timer, Mic, MicOff, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { IRREGULAR_VERBS, type IrregularVerb } from './data/irregular-verbs';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameHUD from './GameHUD';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function IrregularVerbsGame({ taskId = null, type = 'writing' }: { taskId?: string | null, type?: 'writing' | 'pronunciation' }) {
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
    } = useGameLogic({ initialTime: 120, penaltyTime: 0, gameMode, taskId });
    const recognitionRef = useRef<any>(null);




    const startNewGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        const shuffled = [...IRREGULAR_VERBS].sort(() => Math.random() - 0.5);
        setVerbs(mode === 'challenge' ? shuffled : shuffled.slice(0, 10));
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
            addScore(10 + (streak * 2));
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' ✅');
            confetti({
                particleCount: 100,
                spread: 70,
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
            // On manual stop, we mark the current step as checked (likely incorrect if not auto-detected)
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
                // The timer will handle transitions
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

    const handleIncorrectVoice = () => {
        setShowResult('incorrect');
        setStreak(0);
        addError();
        setMessage(language === 'es' ? '¡Vaya! Escucha y repite. ❌' : 'Oops! Listen and repeat. ❌');
        // Play correct pronunciation for feedback
        if (currentVerb) {
            playSequence([currentVerb.infinitive, currentVerb.pastSimple, currentVerb.pastParticiple]);
        }
    };

    const checkVoiceAnswer = (voiceInput: string, isManualStop = false) => {
        if (!currentVerb || showResult === 'correct') return;

        const words = voiceInput.toLowerCase().split(/\s+/);
        const targets = [
            currentVerb.infinitive.toLowerCase(),
            currentVerb.pastSimple.toLowerCase(),
            currentVerb.pastParticiple.toLowerCase()
        ];
        const target = targets[currentStep];

        // Handle variations with '/'
        const targetOptions = target.includes('/') ? target.split('/') : [target];
        const found = words.some(w => targetOptions.includes(w));

        if (found) {
            const newResults = [...stepResults];
            newResults[currentStep] = true;
            setStepResults(newResults);

            // Success audio feedback for this step
            playAudio(targetOptions[0]);
            // NO AUTO-ADVANCE HERE. Timer handles it.
        } else if (isManualStop) {
            // Mark as failed - timer handles progression
            const newResults = [...stepResults];
            newResults[currentStep] = false;
            setStepResults(newResults);
        }
    };

    const handlePronunciationSequenceEnd = async (results: boolean[]) => {
        setIsListening(false);
        recognitionRef.current?.stop();

        // Safe check for results
        const finalResults = results.slice(0, 3);
        const allCorrect = finalResults.every(r => r === true);

        if (allCorrect) {
            setShowResult('correct');
            addScore(15 + (streak * 2));
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' 🎙️');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setShowResult('incorrect');
            setStreak(0);
            addError();
            setMessage(language === 'es' ? '¡Repasemos! 🎙️' : 'Let\'s review! 🎙️');

            // Sequence audio feedback for failed or entire set
            if (currentVerb) {
                await playSequence([currentVerb.infinitive, currentVerb.pastSimple, currentVerb.pastParticiple]);
            }
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
                    if (event.results[i].isFinal) {
                        const result = event.results[i][0].transcript.toLowerCase().trim();
                        setTranscript(result);
                        checkVoiceAnswer(result);
                    } else {
                        interimTranscript += event.results[i][0].transcript;
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
                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                        <div className="bg-violet-500/10 p-6 rounded-full mb-6 ring-1 ring-violet-500/30">
                            <BookOpen className="w-16 h-16 text-violet-500" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">{t.gamesPage.verbsLevels.medium.title}</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed font-medium">
                            {type === 'pronunciation' ? t.gamesPage.verbsLevels.medium.descP : t.gamesPage.verbsLevels.medium.desc}
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
                                        {t.gamesPage.verbsGame.verbsCount.replace('{count}', '50')} • {Math.floor(180 / 60)} {t.gamesPage.verbsGame.minCount.replace('{count}', '')}
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
                                    <span className="text-xs opacity-50 font-bold tracking-wider">{t.gamesPage.verbsGame.verbsCount.replace('{count}', '10')}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {/* FINISHED OVERLAY */}
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

                {/* GAMEPLAY CONTENT */}
                <div className="p-8 md:p-12 h-full flex flex-col items-center justify-center">
                    <div className={cn(
                        "w-full max-w-4xl items-center",
                        type === 'writing' ? "grid md:grid-cols-2 gap-12" : "flex flex-col"
                    )}>
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
                                            <BookOpen className="w-10 h-10 text-white" />
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
                                        <label className="block text-[10px] font-black text-purple-500/60 uppercase tracking-[0.3em] ml-2">Past Simple</label>
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
                                                        'border-white/10 focus:border-violet-600/50'}`}
                                        />
                                        {showResult === 'incorrect' && currentVerb && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-bold mt-1 ml-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-4 h-4" /> Correcto: {currentVerb.pastSimple}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-purple-500/60 uppercase tracking-[0.3em] ml-2">Past Participle</label>
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
                                                        'border-white/10 focus:border-violet-600/50'}`}
                                        />
                                        {showResult === 'incorrect' && currentVerb && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-bold mt-1 ml-1 flex items-center gap-1">
                                                <CheckCircle2 className="w-4 h-4" /> Correcto: {currentVerb.pastParticiple}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-4 space-y-12 w-full">
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
                                                    {/* Number Indicator Top Right */}
                                                    <div className="absolute top-4 right-4 z-10 text-white/80 text-2xl font-black w-8 h-8 rounded-xl flex items-center justify-center">
                                                        {idx + 1}
                                                    </div>
                                                    {/* Step Result Icons */}
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

                                                    {/* Countdown Overlay with Vanish Effect */}
                                                    <AnimatePresence>
                                                        {isActive && (
                                                            <motion.div
                                                                key={stepCountdown}
                                                                initial={{ scale: 0.5, opacity: 0 }}
                                                                animate={{ scale: 2.5, opacity: 0 }}
                                                                transition={{ duration: 1, ease: "easeOut" }}
                                                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                                            >
                                                                <span className="text-8xl font-black text-white/20 select-none">
                                                                    {stepCountdown}
                                                                </span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    <div className="flex flex-col items-center gap-4">
                                        <button
                                            onClick={toggleListening}
                                            disabled={showResult === 'correct'}
                                            className={cn(
                                                "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl relative",
                                                isListening
                                                    ? "bg-red-500 animate-pulse shadow-red-500/40"
                                                    : "bg-violet-600 hover:bg-violet-500 shadow-violet-500/40"
                                            )}
                                        >
                                            <Mic className="w-8 h-8 text-white" />
                                            {isListening && (
                                                <motion.div
                                                    layoutId="ripple-verbs"
                                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                                    animate={{ scale: 1.5, opacity: 0 }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                    className="absolute inset-0 bg-red-500 rounded-full -z-10"
                                                />
                                            )}
                                        </button>

                                        <div className="min-h-[4rem] flex flex-col items-center justify-center text-center">
                                            <AnimatePresence mode="wait">
                                                {isListening ? (
                                                    <motion.div
                                                        key={stepCountdown}
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                                                        transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                                                        className="flex flex-col items-center"
                                                    >
                                                        <span className="text-6xl font-black text-violet-400 drop-shadow-[0_0_20px_rgba(167,139,250,0.5)]">
                                                            {stepCountdown}
                                                        </span>
                                                    </motion.div>
                                                ) : !showResult ? (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-violet-400 font-black uppercase tracking-[0.2em] animate-pulse text-[16px]"
                                                    >
                                                        {t.gamesPage.verbsGame.pressToStart || "Pulsa para empezar"}
                                                    </motion.p>
                                                ) : null}
                                            </AnimatePresence>
                                            {transcript && !isListening && (
                                                <p className="text-white/40 text-sm font-medium italic mt-2">
                                                    "{transcript}"
                                                </p>
                                            )}
                                        </div>

                                        {showResult === 'incorrect' && (
                                            <div className="text-center space-y-1">
                                                <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Inténtalo de nuevo</p>
                                                <p className="text-white/40 text-[10px]">Asegúrate de pronunciar claramente el verbo destacado</p>
                                            </div>
                                        )}
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
                                    {showResult === 'incorrect' && type === 'pronunciation' && (
                                        <button
                                            onClick={() => {
                                                setShowResult(null);
                                                setTranscript('');
                                                setMessage('');
                                            }}
                                            className="w-full py-5 bg-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/10 flex items-center justify-center gap-3"
                                        >
                                            <RefreshCw className="w-6 h-6" /> {t.gamesPage.verbsGame.repeat}
                                        </button>
                                    )}
                                    <button
                                        onClick={nextVerb}
                                        className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black text-lg hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-violet-500/20 flex items-center justify-center gap-3"
                                    >
                                        {t.gamesPage.verbsGame.next} <ArrowRight className="w-6 h-6" />
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
