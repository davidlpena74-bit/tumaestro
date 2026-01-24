'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Trophy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QUESTIONS, type Question } from './data/quiz-questions';

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const QUESTIONS_PER_GAME = 10;

export default function QuizGame() {
    const { t } = useLanguage();
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
    const [gameQuestions, setGameQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (gameState === 'playing') {
            // Shuffle and pick 10 questions
            const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
            setGameQuestions(shuffled.slice(0, QUESTIONS_PER_GAME));
        }
    }, [gameState]);

    const currentQuestion = gameQuestions[currentQuestionIdx];

    const handleStart = () => {
        setGameState('playing');
        setCurrentQuestionIdx(0);
        setScore(0);
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
            setScore((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIdx < gameQuestions.length - 1) {
            setCurrentQuestionIdx((prev) => prev + 1);
            resetQuestionState();
        } else {
            setGameState('finished');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto min-h-[500px] flex flex-col items-center justify-center p-4">
            {/* HUD */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="p-3 rounded-xl bg-violet-500/20">
                        <Trophy className="text-violet-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white leading-none">
                            {score} <span className="text-sm font-normal text-violet-300">pts</span>
                        </h2>
                        <div className="flex gap-3 text-xs font-bold mt-1 text-violet-300 uppercase tracking-wider">
                            <span>{currentQuestionIdx + 1} / {QUESTIONS_PER_GAME}</span>
                            <span>•</span>
                            <span>{t.gamesPage.gameTypes.quiz}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">

                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />

                <AnimatePresence mode="wait">

                    {/* INTRO SCREEN */}
                    {gameState === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center space-y-6"
                        >
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                Desafío de Conocimiento
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Pon a prueba tu mente con {QUESTIONS_PER_GAME} preguntas aleatorias de Historia, Geografía y Ciencia.
                            </p>
                            <button
                                onClick={handleStart}
                                className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                            >
                                Comenzar Quiz <ArrowRight className="w-5 h-5" />
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
                                    initial={{ width: `${((currentQuestionIdx) / QUESTIONS_PER_GAME) * 100}%` }}
                                    animate={{ width: `${((currentQuestionIdx + 1) / QUESTIONS_PER_GAME) * 100}%` }}
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
                                        {currentQuestionIdx === QUESTIONS_PER_GAME - 1 ? "Ver Resultados" : "Siguiente"} <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* FINISHED SCREEN */}
                    {gameState === 'finished' && (
                        <motion.div
                            key="finished"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold text-white mb-2">¡Completado!</h2>
                            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-500 my-6">
                                {score} / {QUESTIONS_PER_GAME}
                            </div>
                            <p className="text-gray-300 mb-8">
                                {score === QUESTIONS_PER_GAME ? "¡Perfecto! Eres un genio." :
                                    score > QUESTIONS_PER_GAME / 2 ? "¡Muy bien! Casi perfecto." :
                                        "Buen intento, sigue practicando."}
                            </p>

                            <button
                                onClick={handleStart}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition flex items-center gap-2 mx-auto"
                            >
                                <RefreshCcw className="w-5 h-5" /> Jugar de nuevo
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
