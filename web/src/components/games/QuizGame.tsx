'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const QUESTIONS = [
    {
        id: 1,
        question: "¿Cuál es la capital de Francia?",
        options: ["Londres", "Berlín", "París", "Madrid"],
        correct: 2 // Index of "París"
    },
    {
        id: 2,
        question: "¿Cuánto es 7 x 8?",
        options: ["48", "54", "56", "64"],
        correct: 2 // Index of "56"
    },
    {
        id: 3,
        question: "¿Qué elemento químico es 'O'?",
        options: ["Oro", "Oxígeno", "Osmio", "Oganesón"],
        correct: 1 // Index of "Oxígeno"
    },
    {
        id: 4,
        question: "¿Quién escribió 'Don Quijote'?",
        options: ["Cervantes", "García Márquez", "Machado", "Lorca"],
        correct: 0 // Index of "Cervantes"
    },
    {
        id: 5,
        question: "¿En qué año llegó el hombre a la luna?",
        options: ["1959", "1969", "1975", "1982"],
        correct: 1 // 1969
    }
];

export default function QuizGame() {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');

    const currentQuestion = QUESTIONS[currentQuestionIdx];

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
        if (currentQuestionIdx < QUESTIONS.length - 1) {
            setCurrentQuestionIdx((prev) => prev + 1);
            resetQuestionState();
        } else {
            setGameState('finished');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto min-h-[500px] flex items-center justify-center p-4">
            <div className="relative w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">

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
                                Pon a prueba tu mente con estas 5 preguntas rápidas.
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
                    {gameState === 'playing' && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            {/* Progress Bar */}
                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>Pregunta {currentQuestionIdx + 1} de {QUESTIONS.length}</span>
                                <span>Puntos: {score}</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full mb-8 overflow-hidden">
                                <motion.div
                                    className="h-full bg-teal-500"
                                    initial={{ width: `${((currentQuestionIdx) / QUESTIONS.length) * 100}%` }}
                                    animate={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }}
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
                                        {currentQuestionIdx === QUESTIONS.length - 1 ? "Ver Resultados" : "Siguiente"} <ArrowRight className="w-4 h-4" />
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
                                {score} / {QUESTIONS.length}
                            </div>
                            <p className="text-gray-300 mb-8">
                                {score === QUESTIONS.length ? "¡Perfecto! Eres un genio." :
                                    score > QUESTIONS.length / 2 ? "¡Muy bien! Casi perfecto." :
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
