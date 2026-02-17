'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, Trophy, ArrowRight, BookOpen, Volume2, Timer, Crown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { IRREGULAR_VERBS_MASTER, type IrregularVerb } from './data/irregular-verbs-master';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameHUD from './GameHUD';

export default function IrregularVerbsMasterGame({ taskId = null }: { taskId?: string | null }) {
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
    } = useGameLogic({ initialTime: 300, penaltyTime: 0, gameMode, taskId }); // 5 minutes for 150 verbs


    const startNewGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        const shuffled = [...IRREGULAR_VERBS_MASTER].sort(() => Math.random() - 0.5);
        setVerbs(mode === 'challenge' ? shuffled : shuffled.slice(0, 20)); // 20 for practice in Master
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
            addScore(20 + (streak * 5)); // More points for Master
            setStreak(prev => prev + 1);
            setMessage(t.common.correct + ' ✅');

            // Grand finale confetti
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

        } else {
            setShowResult('incorrect');
            setStreak(0);
            addError();
            setMessage(language === 'es' ? '¡Vaya! Intenta de nuevo. ❌' : 'Oops! Try again. ❌');
        }
    };

    const nextVerb = () => {
        setMessage('');
        if (gameMode === 'challenge') {
            if (currentIndex >= verbs.length - 1) {
                const reshuffled = [...IRREGULAR_VERBS_MASTER].sort(() => Math.random() - 0.5);
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
                totalTargets={verbs.length || IRREGULAR_VERBS_MASTER.length}
                remainingTargets={(verbs.length || IRREGULAR_VERBS_MASTER.length) - currentIndex}
                targetName={currentVerb ? currentVerb.translation : ''}
                message={message}
                onReset={resetGame}
                colorTheme="purple"
                icon={<Crown className="w-8 h-8 text-purple-400 fill-purple-400/20" />}
            />

            <div className="relative w-full min-h-[500px] bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden mt-4">
                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                        <div className="relative">
                            <div className="bg-purple-500/10 p-6 rounded-full mb-6 ring-2 ring-purple-500/30">
                                <Crown className="w-16 h-16 text-purple-500 animate-pulse" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-slate-950 text-purple-400 font-black text-xs px-3 py-1.5 rounded-lg rotate-12 shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-purple-500/50">
                                MASTER
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic">
                            The <span className="text-purple-400">Master</span> Challenge
                        </h2>
                        <p className="text-purple-100/70 mb-8 max-w-md text-lg leading-relaxed font-medium">
                            El desafío definitivo: 150 verbos irregulares. Solo para auténticos maestros del inglés.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={() => startNewGame('challenge')}
                                className="group relative px-10 py-5 bg-purple-600 hover:bg-purple-500 text-white font-black text-xl rounded-2xl transition-all shadow-[0_0_50px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_70px_-10px_rgba(139,92,246,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        NIVEL MASTER <Trophy className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs opacity-70 font-bold tracking-widest">150 VERBOS • 5 MIN</span>
                                </span>
                            </button>

                            <button
                                onClick={() => startNewGame('practice')}
                                className="group relative px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white font-black text-xl rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        PRÁCTICA <RefreshCw className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-50 font-bold tracking-widest">20 VERBOS</span>
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {/* FINISHED OVERLAY */}
                {gameState === 'finished' && (
                    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
                        <div className="bg-purple-500/10 p-6 rounded-full mb-6 ring-2 ring-purple-500/50 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                            <Crown className="w-20 h-20 text-purple-400 animate-bounce" />
                        </div>
                        <h2 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase italic">
                            ¡Nivel Master <span className="text-purple-400">Alcanzado</span>!
                        </h2>

                        <div className="flex flex-col items-center gap-2 mb-10 bg-white/5 p-10 rounded-[3rem] border border-purple-500/20 shadow-[inset_0_0_40px_rgba(139,92,246,0.05)]">
                            <span className="text-purple-400/60 text-xs uppercase tracking-[0.4em] font-black">Score Final Master</span>
                            <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-200 via-purple-500 to-purple-800 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                {score}
                            </span>
                        </div>

                        <button onClick={resetGame} className="flex items-center gap-3 px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-full transition-all hover:scale-105 shadow-xl shadow-purple-500/20 active:scale-95">
                            <RefreshCw className="w-6 h-6" /> {t.common.playAgain}
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
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-[2.5rem] p-12 flex flex-col justify-center items-center text-center shadow-2xl relative group border border-white/5"
                                >
                                    <div className="absolute top-6 right-8 text-white/5 font-black text-8xl select-none pointer-events-none italic">
                                        {currentIndex + 1}
                                    </div>
                                    <div className="w-24 h-24 bg-purple-500/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm border border-purple-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <Crown className="w-12 h-12 text-purple-400" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-6 relative">
                                        <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase">{currentVerb.infinitive}</h2>
                                        <button
                                            onClick={() => playAudio(currentVerb.infinitive)}
                                            className="p-3 bg-white/5 hover:bg-purple-500/20 rounded-full transition-all text-white hover:text-purple-400 border border-white/10 hover:border-purple-500/30 hover:scale-110 active:scale-90 shadow-lg"
                                            title="Escuchar"
                                        >
                                            <Volume2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <p className="text-purple-400/80 text-xl font-black px-6 py-2.5 bg-purple-500/5 rounded-2xl border border-purple-500/10 tracking-wide">
                                        {currentVerb.translation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-6">
                            <div className="bg-slate-950/40 p-8 rounded-[2.5rem] border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-purple-500/60 uppercase tracking-[0.3em] ml-2">Past Simple</label>
                                    <input
                                        type="text"
                                        value={inputs.pastSimple}
                                        onChange={(e) => setInputs(prev => ({ ...prev, pastSimple: e.target.value }))}
                                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                        disabled={showResult !== null}
                                        placeholder="Type here..."
                                        className={`w-full bg-slate-950/60 border-2 rounded-2xl px-6 py-5 text-white text-xl outline-none transition-all font-bold placeholder:opacity-20
                                            ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                                showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                                    'border-white/10 focus:border-purple-500/30'}`}
                                    />
                                    {showResult === 'incorrect' && currentVerb && (
                                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm font-bold mt-2 ml-2 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-red-500" /> Correcto: <span className="text-white">{currentVerb.pastSimple}</span>
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
                                        placeholder="Type here..."
                                        className={`w-full bg-slate-950/60 border-2 rounded-2xl px-6 py-5 text-white text-xl outline-none transition-all font-bold placeholder:opacity-20
                                            ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                                showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                                    'border-white/10 focus:border-purple-500/30'}`}
                                    />
                                    {showResult === 'incorrect' && currentVerb && (
                                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm font-bold mt-2 ml-2 flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-red-500" /> Correcto: <span className="text-white">{currentVerb.pastParticiple}</span>
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            {showResult === null ? (
                                <button
                                    onClick={checkAnswer}
                                    disabled={!inputs.pastSimple || !inputs.pastParticiple}
                                    className="w-full py-6 bg-purple-600 text-white rounded-2xl font-black text-xl hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] uppercase tracking-widest italic"
                                >
                                    VERIFICAR
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full"
                                >
                                    <button
                                        onClick={nextVerb}
                                        className="w-full py-6 bg-slate-100 text-slate-900 rounded-2xl font-black text-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest italic"
                                    >
                                        SIGUIENTE NIVEL <ArrowRight className="w-6 h-6" />
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
