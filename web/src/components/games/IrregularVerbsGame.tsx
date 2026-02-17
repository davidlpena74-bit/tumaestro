'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle2, XCircle, HelpCircle, Trophy, ArrowRight, BookOpen, Volume2, Timer } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { IRREGULAR_VERBS, type IrregularVerb } from './data/irregular-verbs';

import { useGameLogic } from '@/hooks/useGameLogic';

export default function IrregularVerbsGame({ taskId = null }: { taskId?: string | null }) {
    const { t } = useLanguage();
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
    } = useGameLogic({ initialTime: 120, penaltyTime: 0, gameMode, taskId });


    const startNewGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        const shuffled = [...IRREGULAR_VERBS].sort(() => Math.random() - 0.5);
        setVerbs(mode === 'challenge' ? shuffled : shuffled.slice(0, 10));
        setCurrentIndex(0);
        setStreak(0);
        hookStartGame();
        setInputs({ pastSimple: '', pastParticiple: '' });
        setShowResult(null);
    };


    const currentVerb = verbs[currentIndex];

    const playAudio = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            // Try to play natural audio from trusted dictionary source (US English)
            const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${text}&type=2`);

            audio.onended = () => resolve();
            audio.onerror = () => {
                // Fallback to browser TTS if offline or error
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';

                // Try to find a better voice if available
                const voices = window.speechSynthesis.getVoices();
                const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                    voices.find(v => v.lang === 'en-US');

                if (preferredVoice) {
                    utterance.voice = preferredVoice;
                }

                utterance.onend = () => resolve();
                utterance.onerror = () => resolve(); // Resolve on error to continue sequence

                window.speechSynthesis.speak(utterance);
            };

            audio.play().catch(() => {
                // Handle play error (e.g. user interaction policy) by triggering fallback
                audio.onerror && audio.onerror(new Event('error'));
            });
        });
    };

    const playSequence = async (texts: string[]) => {
        for (const text of texts) {
            await playAudio(text);
            // Small pause between words
            await new Promise(r => setTimeout(r, 300));
        }
    };

    const checkAnswer = () => {
        if (!currentVerb) return;

        // Play the full sequence: Infinitive -> Past Simple -> Past Participle
        playSequence([currentVerb.infinitive, currentVerb.pastSimple, currentVerb.pastParticiple]);

        const isPastSimpleCorrect = inputs.pastSimple.toLowerCase().trim() === currentVerb.pastSimple.toLowerCase();
        // Allow simple match or match with alternatives if any (but here data is simple string)
        // Check for 'was/were' case specially if needed, but simple string comparison works if user types exactly
        // For 'was/were', let's be lenient if they type either 'was' or 'were' or 'was/were'
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
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setShowResult('incorrect');
            setStreak(0);
            addError();
        }
    };

    const nextVerb = () => {
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

    if (!currentVerb) return null;

    if (gameState === 'finished') {
        return (
            <div className="w-full max-w-2xl mx-auto p-6">
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl animate-in fade-in duration-500">
                    <div className="bg-rose-500/10 p-4 rounded-full mb-6 ring-1 ring-rose-500/30">
                        {gameMode === 'challenge' && timeLeft === 0 ? (
                            <Trophy className="w-16 h-16 text-red-400 animate-pulse" />
                        ) : (
                            <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                        )}
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                        {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Reto Completado!'}
                    </h2>

                    <div className="flex flex-col items-center gap-2 mb-10 bg-white/5 p-8 rounded-3xl border border-white/10">
                        <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">Puntuación Final</span>
                        <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm">
                            {score}
                        </span>
                    </div>

                    <button
                        onClick={hookResetGame}
                        className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105"
                    >
                        <RefreshCw className="w-5 h-5" /> Jugar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            {/* Header Stats / HUD */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-slate-900/50 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="p-3 rounded-xl bg-rose-500/20">
                        <Trophy className="text-rose-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white leading-none">
                            {score} <span className="text-sm font-normal text-blue-300">pts</span>
                        </h2>
                        <div className="flex gap-3 text-xs font-bold mt-1 text-rose-300 uppercase tracking-wider">
                            <span>{currentIndex + 1} / {verbs.length}</span>
                            <span>•</span>
                            <span>{t.gamesPage.gameTypes.verbs}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                    <div className="flex flex-col items-end">
                        <span className="text-orange-400 font-black text-xl leading-none">x{streak}</span>
                        <span className="text-orange-400/60 text-[10px] uppercase font-bold tracking-widest">Racha</span>
                    </div>

                    {/* Timer Display */}
                    <div className={`p-3 rounded-xl ${gameMode === 'challenge' && timeLeft < 10 ? 'bg-red-500/20 animate-pulse' : 'bg-rose-500/20'}`}>
                        <div className="flex items-center gap-2 text-white font-mono font-bold text-xl">
                            <Timer className={`w-5 h-5 ${gameMode === 'challenge' && timeLeft < 10 ? 'text-red-400' : 'text-rose-400'}`} />
                            <span>
                                {gameMode === 'challenge'
                                    ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
                                    : `${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative">
                {/* START OVERLAY - Unified with Map style */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                        <div className="bg-rose-500/10 p-6 rounded-full mb-6 ring-1 ring-rose-500/30">
                            <BookOpen className="w-16 h-16 text-rose-400" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">Verbos Irregulares</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed font-medium">
                            Domina el inglés practicando los verbos más importantes. ¿Te los sabes todos?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={() => startNewGame('challenge')}
                                className="group relative px-8 py-4 bg-rose-500 hover:bg-rose-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(244,63,94,0.5)] hover:shadow-[0_0_60px_-10px_rgba(244,63,94,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        EMPEZAR RETO
                                        <Trophy className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-70 font-bold tracking-wider">MODO RETO</span>
                                </span>
                            </button>

                            <button
                                onClick={() => startNewGame('practice')}
                                className="group relative px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                            >
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-2">
                                        PRÁCTICA
                                        <RefreshCw className="w-5 h-5 opacity-50" />
                                    </div>
                                    <span className="text-xs opacity-50 font-bold tracking-wider">10 VERBOS</span>
                                </span>
                            </button>
                        </div>
                    </div>
                )}
                <motion.div
                    key={currentVerb.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-xl"
                >
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-black text-white capitalize">{currentVerb.infinitive}</h2>
                        <button
                            onClick={() => playAudio(currentVerb.infinitive)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white hover:scale-105 active:scale-95"
                            title="Escuchar pronunciación"
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>
                    </div>
                    <p className="text-blue-100 text-lg">({currentVerb.translation})</p>
                </motion.div>

                {/* Input Area */}
                <div className="space-y-6">
                    <div className="bg-transparent p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Past Simple</label>
                            <input
                                type="text"
                                value={inputs.pastSimple}
                                onChange={(e) => setInputs(prev => ({ ...prev, pastSimple: e.target.value }))}
                                disabled={showResult !== null}
                                placeholder="e.g. broke"
                                className={`w-full bg-slate-950 border-2 rounded-xl px-4 py-3 text-white outline-none transition-all
                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                        showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                            'border-white/10 focus:border-blue-500'}`}
                            />
                            {showResult === 'incorrect' && (
                                <p className="text-red-400 text-sm mt-1 ml-1">Correcto: {currentVerb.pastSimple}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-400 mb-2 ml-1">Past Participle</label>
                            <input
                                type="text"
                                value={inputs.pastParticiple}
                                onChange={(e) => setInputs(prev => ({ ...prev, pastParticiple: e.target.value }))}
                                disabled={showResult !== null}
                                placeholder="e.g. broken"
                                className={`w-full bg-slate-950 border-2 rounded-xl px-4 py-3 text-white outline-none transition-all
                                    ${showResult === 'correct' ? 'border-green-500/50 bg-green-500/10' :
                                        showResult === 'incorrect' ? 'border-red-500/50 bg-red-500/10' :
                                            'border-white/10 focus:border-blue-500'}`}
                            />
                            {showResult === 'incorrect' && (
                                <p className="text-red-400 text-sm mt-1 ml-1">Correcto: {currentVerb.pastParticiple}</p>
                            )}
                        </div>
                    </div>

                    {showResult === null ? (
                        <button
                            onClick={checkAnswer}
                            disabled={!inputs.pastSimple || !inputs.pastParticiple}
                            className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                        >
                            Comprobar
                        </button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl flex items-center justify-between ${showResult === 'correct' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}
                        >
                            <div className="flex items-center gap-3">
                                {showResult === 'correct' ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-400" />
                                )}
                                <span className={showResult === 'correct' ? 'text-green-100' : 'text-red-100'}>
                                    {showResult === 'correct' ? '¡Correcto! Sigue así.' : '¡Vaya! Intenta recordar para la próxima.'}
                                </span>
                            </div>
                            <button
                                onClick={nextVerb}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                            >
                                Siguiente <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
