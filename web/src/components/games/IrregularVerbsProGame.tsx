'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, Trophy, ArrowRight, BookOpen, Volume2, Timer, Star, Mic } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { IRREGULAR_VERBS_PRO, type IrregularVerb } from './data/irregular-verbs-pro';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameHUD from './GameHUD';

export default function IrregularVerbsProGame({ taskId = null, type = 'writing' }: { taskId?: string | null, type?: 'writing' | 'pronunciation' }) {
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
    } = useGameLogic({ initialTime: 180, penaltyTime: 0, gameMode, taskId }); // More time for more verbs
    const recognitionRef = useRef<any>(null);

    const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');




    const startNewGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        const shuffled = [...IRREGULAR_VERBS_PRO].sort(() => Math.random() - 0.5);
        setVerbs(mode === 'challenge' ? shuffled : shuffled.slice(0, 15)); // 15 for practice in pro
        setCurrentIndex(0);
        setStreak(0);
        hookStartGame();
        setInputs({ pastSimple: '', pastParticiple: '' });
        setShowResult(null);
        setMessage('');
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
            addScore(15 + (streak * 3)); // More points for Pro
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' ✅');
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#8b5cf6', '#d946ef', '#ffffff']
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
        } else {
            setTranscript('');
            try {
                recognitionRef.current?.start();
                setIsListening(true);
            } catch (e) {
                setIsListening(false);
            }
        }
    };

    const checkVoiceAnswer = (voiceInput: string) => {
        if (!currentVerb) return;
        const words = voiceInput.toLowerCase().split(/\s+/);
        const pastSimpleTarget = currentVerb.pastSimple.toLowerCase();
        const pastParticipleTarget = currentVerb.pastParticiple.toLowerCase();

        const foundSimple = words.some(w => w === pastSimpleTarget);
        const foundParticiple = words.some(w => w === pastParticipleTarget);

        if (foundSimple && foundParticiple) {
            setShowResult('correct');
            addScore(20 + (streak * 3));
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' 🎙️');
            recognitionRef.current?.stop();
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        const result = event.results[i][0].transcript.toLowerCase().trim();
                        setTranscript(result);
                        checkVoiceAnswer(result);
                    }
                }
            };
            recognition.onend = () => setIsListening(false);
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
            setShowResult(null);
        } else {
            if (currentIndex < verbs.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setInputs({ pastSimple: '', pastParticiple: '' });
                setShowResult(null);
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
    };

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
                targetName={currentVerb ? currentVerb.translation : ''}
                message={message}
                onReset={resetGame}
                colorTheme="purple"
                icon={<Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />}
                title={type === 'pronunciation' ? t.gamesPage.gameTitles.verbsPronunciation : "Verbos Irregulares PRO"}
            />

            <div className="relative w-full min-h-[500px] bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden mt-4">
                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                        <div className="relative">
                            <div className="bg-violet-500/10 p-6 rounded-full mb-6 ring-1 ring-violet-500/30">
                                <BookOpen className="w-16 h-16 text-violet-500" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-black font-black text-xs px-2 py-1 rounded-lg rotate-12 shadow-lg">
                                PRO
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase flex items-center gap-4">
                            Verbos Irregulares <span className="text-yellow-500">PRO</span>
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed font-medium">
                            Nivel experto: 100 verbos irregulares para dominar el inglés por completo.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={() => startNewGame('challenge')}
                                className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        MODO LEYENDA <Trophy className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <span className="text-xs opacity-70 font-bold tracking-wider">100 VERBOS • 3 MIN</span>
                                </span>
                            </button>

                            <button
                                onClick={() => startNewGame('practice')}
                                className="group relative px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        PRÁCTICA <RefreshCw className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-50 font-bold tracking-wider">15 VERBOS</span>
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
                            {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Nivel Completado!'}
                        </h2>

                        <div className="flex flex-col items-center gap-2 mb-10 bg-white/5 p-8 rounded-3xl border border-white/10">
                            <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">Puntuación Pro</span>
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
                    <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl items-center">
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

                        <div className="space-y-6">
                            <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-white/10 space-y-6 shadow-xl backdrop-blur-sm">
                                {type === 'writing' ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-violet-600 uppercase tracking-widest ml-1">Past Simple</label>
                                            <input
                                                type="text"
                                                value={inputs.pastSimple}
                                                onChange={(e) => setInputs(prev => ({ ...prev, pastSimple: e.target.value }))}
                                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                                disabled={showResult !== null}
                                                placeholder="Escribe aquí..."
                                                className={`w-full bg-slate-950/50 border-2 rounded-2xl px-5 py-4 text-white text-lg outline-none transition-all
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
                                            <label className="block text-xs font-black text-violet-600 uppercase tracking-widest ml-1">Past Participle</label>
                                            <input
                                                type="text"
                                                value={inputs.pastParticiple}
                                                onChange={(e) => setInputs(prev => ({ ...prev, pastParticiple: e.target.value }))}
                                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                                disabled={showResult !== null}
                                                placeholder="Escribe aquí..."
                                                className={`w-full bg-slate-950/50 border-2 rounded-2xl px-5 py-4 text-white text-lg outline-none transition-all
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
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-6 space-y-6">
                                        {currentVerb && (
                                            <p className="text-slate-400 text-sm font-medium text-center">
                                                Di las formas en pasado:<br />
                                                <span className="text-violet-400 font-bold">"{currentVerb.pastSimple}"</span> y <span className="text-violet-400 font-bold">"{currentVerb.pastParticiple}"</span>
                                            </p>
                                        )}

                                        <button
                                            onClick={toggleListening}
                                            className={cn(
                                                "w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl relative",
                                                isListening
                                                    ? "bg-red-500 animate-pulse shadow-red-500/40"
                                                    : "bg-violet-600 hover:bg-violet-500 shadow-violet-500/40"
                                            )}
                                        >
                                            <Mic className="w-10 h-10 text-white" />
                                            {isListening && (
                                                <motion.div
                                                    layoutId="ripple-pro"
                                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                                    animate={{ scale: 1.5, opacity: 0 }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                    className="absolute inset-0 bg-red-500 rounded-full"
                                                />
                                            )}
                                        </button>

                                        <div className="min-h-[1.5rem] text-center">
                                            <p className="text-white/60 italic text-sm">
                                                {transcript || (isListening ? 'Escuchando Pro...' : '')}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {showResult === null ? (
                                <button
                                    onClick={checkAnswer}
                                    disabled={!inputs.pastSimple || !inputs.pastParticiple}
                                    className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-violet-50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-violet-500/10"
                                >
                                    COMPROBAR
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full flex flex-col gap-4"
                                >
                                    <button
                                        onClick={nextVerb}
                                        className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black text-lg hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-violet-500/20 flex items-center justify-center gap-3"
                                    >
                                        SIGUIENTE VERBO <ArrowRight className="w-6 h-6" />
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
