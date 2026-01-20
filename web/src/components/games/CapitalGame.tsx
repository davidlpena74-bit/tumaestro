'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, RotateCcw, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PATH_TO_SPANISH_NAME, EUROPE_CAPITALS } from './data/capitals-data';

interface CapitalGameProps {
    paths: Record<string, string>; // Map paths (English Key -> SVG Path)
    targetList?: string[]; // Optional list of Spanish country names to include in the game (e.g. only EU members)
    title: string;
}

export default function CapitalGame({ paths, targetList, title }: CapitalGameProps) {
    const [loading, setLoading] = useState(true);
    const [targetCapital, setTargetCapital] = useState('');
    const [currentCountryName, setCurrentCountryName] = useState(''); // The country associated with the target capital
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [gameState, setGameState] = useState<'playing' | 'won' | 'finished'>('playing');
    const [message, setMessage] = useState('');

    const [remainingCountries, setRemainingCountries] = useState<string[]>([]);
    const [attempts, setAttempts] = useState(0);
    const [failedCountries, setFailedCountries] = useState<string[]>([]);

    // Zoom state
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Initialize
    useEffect(() => {
        // Filter available countries based on targetList if provided, otherwise use all from paths
        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);

        let playable = pathCountries;
        if (targetList) {
            // Intersection of available paths and requested targets
            playable = pathCountries.filter(c => targetList.includes(c));
        }

        // Ensure we only have countries with defined capitals
        playable = playable.filter(c => EUROPE_CAPITALS[c]);

        setRemainingCountries(playable);
        setLoading(false);
    }, [paths, targetList]);

    // Next turn
    useEffect(() => {
        if (!loading && remainingCountries.length > 0 && !targetCapital) {
            nextTurn(remainingCountries);
        }
    }, [loading, remainingCountries, targetCapital]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 1500);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const nextCountry = currentRemaining[randomIndex];
        const nextCap = EUROPE_CAPITALS[nextCountry];

        setCurrentCountryName(nextCountry);
        setTargetCapital(nextCap);
        setAttempts(0);
    };

    const handleCountryClick = (engName: string) => {
        if (gameState !== 'playing') return;
        if (Math.abs(pan.x - dragStart.current.x) > 5 || Math.abs(pan.y - dragStart.current.y) > 5) return;

        const clickedCountry = PATH_TO_SPANISH_NAME[engName];
        if (!clickedCountry) return;

        // Is this the country for the target capital?
        if (clickedCountry === currentCountryName) {
            // Correct
            setScore(s => s + 10);
            setMessage(`¡Correcto! ${targetCapital} es la capital de ${clickedCountry}. 🎉`);

            const newRemaining = remainingCountries.filter(c => c !== currentCountryName);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            setErrors(e => e + 1);
            setScore(s => Math.max(0, s - 5));

            if (newAttempts >= 3) {
                setMessage(`¡Fallaste! Era ${currentCountryName}. ❌`); // Reveal country
                setFailedCountries(prev => [...prev, currentCountryName]);

                // Move to next
                const newRemaining = remainingCountries.filter(c => c !== currentCountryName);
                setRemainingCountries(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 2000);
            } else {
                // Show what they clicked
                const clickedCapital = EUROPE_CAPITALS[clickedCountry] || 'Desconocida';
                setMessage(`¡No! ${clickedCountry} (Capital: ${clickedCapital}) ❌`);
            }
        }
    };

    const resetGame = () => {
        setScore(0);
        setErrors(0);
        setAttempts(0);
        setFailedCountries([]);
        setTargetCapital('');
        setCurrentCountryName('');

        // Re-init with full list
        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        playable = playable.filter(c => EUROPE_CAPITALS[c]);

        setRemainingCountries(playable);
        setGameState('playing');
    };

    // Pan/Zoom Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 select-none">
            {/* HUD */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="bg-purple-500/20 p-3 rounded-xl">
                        <Globe className="text-purple-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white">{score} <span className="text-sm font-normal text-purple-200">pts</span></h2>
                        <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
                            <span>Restantes: {remainingCountries.length}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 text-center bg-slate-900/50 p-4 rounded-xl border border-white/10 w-full md:w-auto">
                    <div className="text-gray-400 text-xs mb-1 uppercase tracking-widest font-bold">Busca la capital</div>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={targetCapital}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-2xl md:text-4xl font-black text-yellow-400 drop-shadow-sm truncate"
                        >
                            {gameState === 'finished' ? '¡COMPLETADO!' : targetCapital || 'Cargando...'}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-red-400 font-bold text-lg">{errors}</span>
                        <span className="text-red-400/60 text-xs uppercase">Fallos</span>
                    </div>
                    <button onClick={resetGame} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-white border border-white/5" title="Reiniciar">
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Map */}
            <div
                ref={gameContainerRef}
                className="relative bg-[#1a2333] rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-video flex items-center justify-center group cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Fullscreen HUD */}
                {isFullscreen && (
                    <div className="absolute top-6 left-0 right-0 mx-auto w-[95%] max-w-6xl z-20 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex justify-between items-center shadow-2xl animate-in slide-in-from-top">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-black text-white">{score} <span className="text-sm font-normal text-purple-200">pts</span></span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Busca</span>
                            <span className="text-3xl font-black text-yellow-400 drop-shadow-sm">{targetCapital}</span>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-red-400">{errors} <span className="text-xs text-red-300">Fallos</span></span>
                        </div>
                    </div>
                )}

                {/* Controls */}
                <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                    <button onClick={() => setZoom(z => Math.min(z * 1.2, 4))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 border border-white/10"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 border border-white/10"><ZoomOut className="w-5 h-5" /></button>
                    <div className="h-2" />
                    <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 border border-white/10">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                </div>

                {gameState === 'finished' ? (
                    <div className="text-center p-8 z-10" onMouseDown={e => e.stopPropagation()}>
                        <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 animate-bounce" />
                        <h3 className="text-5xl font-black text-white mb-6">¡Juego Completado!</h3>
                        <p className="text-2xl text-purple-200 mb-10">Puntuación: <strong className="text-white">{score}</strong></p>
                        <button onClick={resetGame} className="bg-gradient-to-r from-purple-500 to-indigo-600 px-10 py-4 rounded-xl font-bold text-xl text-white shadow-xl hover:scale-105 transition">Jugar Otra Vez</button>
                    </div>
                ) : (
                    <svg viewBox="0 0 800 600" className="w-full h-full pointer-events-none" style={{ background: '#1e293b' }}>
                        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                            {Object.entries(paths).map(([engName, pathD]) => {
                                const spanishName = PATH_TO_SPANISH_NAME[engName];
                                const isTarget = spanishName === currentCountryName;
                                const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                const isFailed = failedCountries.includes(spanishName);

                                // Logic for opacity/visibility
                                // If we have a targetList (EU only), maybe dim non-EU countries?
                                const isInTargetList = targetList ? (spanishName && targetList.includes(spanishName)) : true;

                                return (
                                    <motion.path
                                        key={engName}
                                        d={pathD}
                                        className={`stroke-[0.5px] pointer-events-auto ${isInTargetList ? 'cursor-pointer stroke-slate-900/30 hover:stroke-slate-900 hover:stroke-[1px]' : 'fill-slate-800/20 stroke-slate-800/10'}`}
                                        initial={false}
                                        animate={{
                                            fill: isCompleted
                                                ? (isFailed ? '#ef4444' : '#10b981') // Red or Green
                                                : (isInTargetList ? '#ffffff' : '#1e293b'), // Playable (White) vs Background
                                            opacity: isInTargetList ? 1 : 0.3
                                        }}
                                        whileHover={isInTargetList && !isCompleted ? {
                                            fill: '#8b5cf6', // Purple hover
                                            scale: 1.02,
                                            filter: "drop-shadow(0px 0px 8px rgba(139,92,246,0.5))",
                                            zIndex: 10
                                        } : {}}
                                        onClick={(e: any) => {
                                            e.stopPropagation();
                                            if (isInTargetList) handleCountryClick(engName);
                                        }}
                                        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                                    />
                                );
                            })}
                        </g>
                    </svg>
                )}

                {/* Feedback */}
                <AnimatePresence>
                    {message && (
                        <div className="absolute top-24 left-0 right-0 flex justify-center pointer-events-none z-30">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`px-6 py-3 rounded-xl border shadow-xl backdrop-blur-md font-bold text-lg ${message.includes('Correcto') ? 'bg-green-500/90 border-green-400 text-white' : 'bg-red-500/90 border-red-400 text-white'}`}
                            >
                                {message}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <p className="text-center text-slate-500 mt-6 text-sm">
                Encuentra el país correspondiente a la capital mostrada.
            </p>
        </div>
    );
}
