'use client';

import { Timer as TimerIconGame, Trophy as TrophyIconGame, RefreshCw as RefreshCwIconGame } from 'lucide-react';


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Trophy, Timer } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { speak } from '@/lib/speech-utils';
import { QUESTIONS, type Question } from './data/quiz-questions';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameHUD from './GameHUD';
import RatingSystem from './RatingSystem';
import ActivityRanking from './ActivityRanking';

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const QUESTIONS_PER_GAME = 10;

interface QuizGameProps {
    taskId?: string | null;
    customQuestions?: Question[];
    title?: string;
    gameTypeLabel?: string;
    activityId?: string;
}

export default function QuizGame({
    taskId = null,
    customQuestions,
    title = "Desafío de Cultura",
    gameTypeLabel,
    activityId
}: QuizGameProps) {
    const { language, t } = useLanguage();
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [gameQuestions, setGameQuestions] = useState<Question[]>([]);

    const sourceQuestions = customQuestions || QUESTIONS;
    const finalGameTypeLabel = gameTypeLabel || t.gamesPage.gameTypes.quiz;

    const effectiveActivityId = activityId || "culture-quiz";

    const {
        gameState, setGameState,
        score, addScore,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame,
        handleFinish
    } = useGameLogic({ initialTime: 0, penaltyTime: 0, gameMode: 'practice', taskId, activityId: effectiveActivityId });

    useEffect(() => {
        if (gameState === 'playing') {
            // Shuffle and pick 10 questions
            const shuffled = [...sourceQuestions].sort(() => 0.5 - Math.random());
            setGameQuestions(shuffled.slice(0, Math.min(shuffled.length, QUESTIONS_PER_GAME)));
        }
    }, [gameState, sourceQuestions]);

    const currentQuestion = gameQuestions[currentQuestionIdx];

    useEffect(() => {
        if (gameState === 'playing' && currentQuestion) {
            speak(currentQuestion.question, language === 'es' ? 'es-ES' : 'en-US');
        }
    }, [currentQuestionIdx, gameState, currentQuestion, language]);

    const handleStart = () => {
        hookStartGame();
        setCurrentQuestionIdx(0);
        resetQuestionState();
    };

    const resetQuestionState = () => {
        setSelectedOption(null);
        setIsAnswered(false);
    };

    const handleOptionClick = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === currentQuestion.correct) {
            addScore(100);
        }
    };

    const handleNext = () => {
        if (currentQuestionIdx < gameQuestions.length - 1) {
            setCurrentQuestionIdx((prev) => prev + 1);
            resetQuestionState();
        } else {
            handleFinish();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto min-h-[500px] flex flex-col items-center justify-center p-4">
            {/* HUD */}
            <GameHUD
                title={title}
                score={score}
                errors={0}
                timeLeft={timeLeft}
                elapsedTime={elapsedTime}
                gameMode="practice"
                totalTargets={gameQuestions.length}
                remainingTargets={gameQuestions.length - currentQuestionIdx}
                targetName=""
                message={message}
                onReset={hookResetGame}
                colorTheme="purple"
                icon={<TrophyIconGame className="w-8 h-8 text-purple-400" />}
                activityId={effectiveActivityId || 'game'}
            />

            <div className="relative w-full bg-transparent border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">

                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />

                <AnimatePresence mode="wait">

                    {/* START OVERLAY - Unified with Map style */}
                    {gameState === 'start' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl"
                        >
                            <div className="bg-violet-500/10 p-4 rounded-full mb-6 ring-1 ring-violet-500/30">
                                <TrophyIconGame className="w-12 h-12 text-violet-400" />
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight uppercase">{title}</h2>
                            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                                Pon a prueba tu mente con {gameQuestions.length || QUESTIONS_PER_GAME} retos diseñados para entrenar tu cerebro.
                            </p>
                            <button
                                onClick={handleStart}
                                className="group relative px-8 py-6 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-2xl rounded-3xl transition-all shadow-[0_0_50px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_70px_-10px_rgba(16,185,129,0.7)] hover:-translate-y-1 flex items-center justify-center gap-4 uppercase tracking-tighter"
                            >
                                EMPEZAR RETO <TimerIconGame className="w-8 h-8 opacity-70" />
                            </button>
                        </motion.div>
                    )}

                    {/* GAME SCREEN */}
                    {gameState === 'playing' && currentQuestion && (
                        <motion.div
                            key={`q-${currentQuestion.id}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            {/* Category Badge */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 border border-teal-500/30 px-2 py-1 rounded-lg bg-teal-500/10">
                                    {currentQuestion.category}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-white/10 rounded-full mb-8 overflow-hidden">
                                <motion.div
                                    className="h-full bg-teal-500"
                                    initial={{ width: `${((currentQuestionIdx) / gameQuestions.length) * 100}%` }}
                                    animate={{ width: `${((currentQuestionIdx + 1) / gameQuestions.length) * 100}%` }}
                                />
                            </div>

                            {/* Question */}
                            <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
                                {currentQuestion.question}
                            </h3>

                            {/* Options */}
                            <div className="grid gap-3">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = selectedOption === idx;
                                    const isCorrect = idx === currentQuestion.correct;

                                    // Styles based on state
                                    let buttonStyle = "bg-white/5 border-white/10 hover:bg-white/10";
                                    if (isAnswered) {
                                        if (isCorrect) buttonStyle = "bg-green-500/20 border-green-500 text-green-200";
                                        else if (isSelected && !isCorrect) buttonStyle = "bg-red-500/20 border-red-500 text-red-200";
                                        else buttonStyle = "bg-white/5 border-white/5 opacity-50"; // Dim others
                                    }

                                    return (
                                        <motion.button
                                            key={idx}
                                            whileHover={!isAnswered ? { scale: 1.02 } : {}}
                                            whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                            onClick={() => handleOptionClick(idx)}
                                            disabled={isAnswered}
                                            className={cn(
                                                "w-full p-4 rounded-xl border text-left transition-all duration-200 flex justify-between items-center group",
                                                buttonStyle,
                                                isSelected && "ring-2 ring-offset-2 ring-offset-slate-900 border-transparent"
                                            )}
                                        >
                                            <span className="font-medium text-lg">{option}</span>
                                            {isAnswered && isCorrect && <CheckCircle2 className="text-green-400 w-6 h-6" />}
                                            {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-400 w-6 h-6" />}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Next Button */}
                            <div className="mt-8 h-12 flex justify-end">
                                {isAnswered && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={handleNext}
                                        className="px-6 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
                                    >
                                        {currentQuestionIdx === gameQuestions.length - 1 ? "Ver Resultados" : "Siguiente"} <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* FINISHED SCREEN - Unified with Map style */}
                    {/* FINISHED SCREEN - Unified with Map style */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-start p-6 text-center animate-in fade-in duration-500 rounded-[2rem] overflow-y-auto custom-scrollbar">

                            {/* Top Section: Score & Trophy (Pushing up) */}
                            <div className="flex flex-col items-center mb-8 shrink-0">
                                <div className="bg-emerald-500/10 p-3 rounded-full mb-3 ring-1 ring-emerald-500/30">
                                    {true && timeLeft === 0 ? (
                                        <TimerIconGame className="w-10 h-10 text-red-500 animate-pulse" />
                                    ) : (
                                        <TrophyIconGame className="w-10 h-10 text-yellow-400 animate-bounce" />
                                    )}
                                </div>
                                <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">
                                    {true && timeLeft === 0 ? '¡Tiempo Agotado!' : (t?.common?.completed || 'Completado')}
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
                                            <ActivityRanking activityId={effectiveActivityId || 'game'} limit={3} sortBy="score" />
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
                                            <ActivityRanking activityId={effectiveActivityId || 'game'} limit={3} sortBy="time" />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Row - Reduced Height */}
                                <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-5xl mx-auto w-full mt-2">
                                    <div className="w-full md:w-[calc(50%-8px+8px)] flex-none bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-0 shadow-xl overflow-hidden h-[120px] flex items-center justify-center">
                                        <div className="scale-[0.6] origin-center w-[166%] h-[166%] flex items-center justify-center -mt-8">
                                            <RatingSystem activityId={effectiveActivityId || 'game'} />
                                        </div>
                                    </div>

                                    <button
                                        onClick={hookResetGame}
                                        className="w-full md:w-[calc(50%-8px-8px)] flex-none h-[120px] flex items-center justify-center gap-4 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20 uppercase tracking-wider"
                                    >
                                        <RefreshCwIconGame className="w-8 h-8" /> {t?.common?.playAgain || 'Jugar de nuevo'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
