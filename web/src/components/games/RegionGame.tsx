'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, MapPin, RefreshCw, XCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SPANISH_COMMUNITIES_PATHS } from './spanish-communities-paths';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Nombres bonitos para mostrar
const REGION_DISPLAY_NAMES: Record<string, string> = {
    andalucia: 'Andalucía',
    aragon: 'Aragón',
    asturias: 'Principado de Asturias',
    baleares: 'Islas Baleares',
    canarias: 'Canarias',
    cantabria: 'Cantabria',
    castillalamancha: 'Castilla-La Mancha',
    castillaleon: 'Castilla y León',
    cataluna: 'Cataluña',
    extremadura: 'Extremadura',
    galicia: 'Galicia',
    madrid: 'Comunidad de Madrid',
    murcia: 'Región de Murcia',
    navarra: 'Navarra',
    paisvasco: 'País Vasco',
    larioja: 'La Rioja',
    valencia: 'Comunidad Valenciana',
    ceuta: 'Ceuta',
    melilla: 'Melilla'
};

export default function RegionGame() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won'>('start');
    const [targetId, setTargetId] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 60s is enough for regions
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'neutral' }>({ text: '', type: 'neutral' });
    const [clickedId, setClickedId] = useState<string | null>(null);

    // Game Loop
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setGameState('won');
        }
    }, [gameState, timeLeft]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(60);
        pickNewTarget();
        setMessage({ text: '', type: 'neutral' });
    };

    const pickNewTarget = () => {
        const keys = Object.keys(SPANISH_COMMUNITIES_PATHS);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        setTargetId(randomKey);
        setClickedId(null);
    };

    const handleRegionClick = (id: string) => {
        if (gameState !== 'playing' || !targetId) return;

        setClickedId(id);

        if (id === targetId) {
            // Correct
            setScore((prev) => prev + 100);
            setMessage({ text: `¡Correcto! Es ${REGION_DISPLAY_NAMES[id] || id}`, type: 'success' });
            setTimeout(pickNewTarget, 600);
        } else {
            // Incorrect
            setScore((prev) => Math.max(0, prev - 20));
            setMessage({ text: '¡Esa no es! Intenta de nuevo.', type: 'error' });
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center">

            {/* GAME HUD */}
            <div className="w-full grid grid-cols-3 gap-4 mb-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl items-center">

                {/* Score */}
                <div className="flex items-center gap-3 text-yellow-400">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-yellow-500/70 font-bold uppercase tracking-wider">Puntos</div>
                        <span className="text-2xl font-bold font-mono leading-none">{score}</span>
                    </div>
                </div>

                {/* Target Display (Center) */}
                <div className="flex justify-center">
                    <AnimatePresence mode="wait">
                        {targetId && gameState === 'playing' ? (
                            <motion.div
                                key={targetId}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="text-center"
                            >
                                <span className="text-gray-400 text-[10px] uppercase tracking-widest block mb-1">LOCALIZA</span>
                                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-400 drop-shadow-sm truncate max-w-[300px] block">
                                    {REGION_DISPLAY_NAMES[targetId] || targetId}
                                </span>
                            </motion.div>
                        ) : (
                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                                <HelpCircle className="w-5 h-5" /> <span>Esperando...</span>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Timer (Right) */}
                <div className="flex justify-end">
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-mono font-bold text-xl border",
                        timeLeft < 10 ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" : "bg-slate-800 border-white/5 text-teal-400"
                    )}>
                        <Timer className="w-5 h-5" />
                        {timeLeft}s
                    </div>
                </div>
            </div>

            {/* FEEDBACK BAR */}
            <div className="h-10 mb-2 w-full flex justify-center">
                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            key={message.text + gameState}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-1.5 rounded-full text-sm font-bold shadow-lg border border-white/10",
                                message.type === 'success' ? "bg-green-500/90 text-white" :
                                    message.type === 'error' ? "bg-red-500/90 text-white" : "bg-slate-800 text-gray-300"
                            )}
                        >
                            {message.type === 'success' && <CheckCircle className="w-4 h-4" />}
                            {message.type === 'error' && <XCircle className="w-4 h-4" />}
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* MAP CONTAINER */}
            <div className="relative w-full aspect-square md:aspect-[1.4] bg-slate-800/20 rounded-[2rem] p-2 md:p-6 overflow-hidden border border-white/5 shadow-2xl">

                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                        <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                            <MapPin className="w-12 h-12 text-teal-400" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Comunidades Autónomas</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                            ¿Te sabes las 17 Comunidades y 2 Ciudades Autónomas de España?
                        </p>
                        <button
                            onClick={startGame}
                            className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-1"
                        >
                            <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Timer className="w-5 h-5 opacity-50" /></span>
                        </button>
                    </div>
                )}

                {/* GAME OVER OVERLAY */}
                {gameState === 'won' && (
                    <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]">
                        <Trophy className="w-24 h-24 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>
                        <div className="flex flex-col items-center gap-1 mb-8">
                            <span className="text-gray-400 text-sm uppercase tracking-widest">Puntuación Final</span>
                            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">
                                {score}
                            </span>
                        </div>
                        <button onClick={startGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                            <RefreshCw className="w-5 h-5" /> Jugar de nuevo
                        </button>
                    </div>
                )}

                {/* SVG MAP */}
                <svg viewBox="0 0 700 700" className="w-full h-full drop-shadow-2xl">
                    <defs>
                        <filter id="glow-hover-region" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* CANARY ISLANDS INSET FRAME (Custom Projection) */}
                    <rect
                        x="30" y="470" width="280" height="200"
                        className="fill-none stroke-white/20 stroke-1 pointer-events-none"
                        rx="8"
                        strokeDasharray="4 4"
                    />

                    {/* Render Regions from New Map Source */}
                    {Object.entries(SPANISH_COMMUNITIES_PATHS).map(([id, paths]) => {
                        const isTarget = targetId === id;
                        const isClicked = clickedId === id;

                        // Dynamic class logic
                        let fillClass = "fill-slate-700/80";
                        // Note: Using thicker stroke for regions vs provinces
                        let strokeClass = "stroke-slate-800 stroke-[1.5]";

                        if (gameState === 'playing') {
                            fillClass = "fill-slate-700 hover:fill-teal-500/50 cursor-pointer transition-colors duration-150";

                            if (isClicked) {
                                strokeClass = "stroke-white stroke-[2]";
                                if (isTarget) fillClass = "fill-green-500 animate-pulse";
                                else fillClass = "fill-red-500";
                            }
                        }

                        return (
                            <g
                                key={id}
                                onClick={() => handleRegionClick(id)}
                                style={{ pointerEvents: gameState === 'playing' ? 'all' : 'none' }}
                                className="group"
                            >
                                {paths.map((d, i) => (
                                    <motion.path
                                        key={i}
                                        d={d}
                                        className={cn(strokeClass, fillClass)}
                                        initial={false}
                                        animate={
                                            (isClicked && isTarget) ? { scale: 1.02 } : {}
                                        }
                                        style={{ transformOrigin: 'center' }}
                                    />
                                ))}
                            </g>
                        );
                    })}
                </svg>

            </div>
        </div>
    );
}
