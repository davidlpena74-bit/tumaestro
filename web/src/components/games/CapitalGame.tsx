'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PATH_TO_SPANISH_NAME, EUROPE_CAPITALS } from './data/capitals-data';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CapitalGameProps {
    paths: Record<string, string>; // Map paths (English Key -> SVG Path)
    targetList?: string[]; // Optional list of Spanish country names to include in the game (e.g. only EU members)
    title: string;
}

export default function CapitalGame({ paths, targetList, title }: CapitalGameProps) {
    const { t } = useLanguage();
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 120, penaltyTime: 10 });

    const [loading, setLoading] = useState(true);
    const [targetCapital, setTargetCapital] = useState('');
    const [currentCountryName, setCurrentCountryName] = useState(''); // The country associated with the target capital

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

    const startGame = () => {
        hookStartGame();
        setAttempts(0);
        setFailedCountries([]);
        setTargetCapital('');
        setCurrentCountryName('');

        // Re-calculate playable list to be safe
        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        playable = playable.filter(c => EUROPE_CAPITALS[c]);
        setRemainingCountries(playable);

        nextTurn(playable);
    };

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
            addScore(10);
            setMessage(`¡Correcto! ${targetCapital} es la capital de ${clickedCountry}. 🎉`);

            const newRemaining = remainingCountries.filter(c => c !== currentCountryName);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            addError();
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

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
        hookResetGame();
        setAttempts(0);
        setFailedCountries([]);
        setTargetCapital('');
        setCurrentCountryName('');

        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        playable = playable.filter(c => EUROPE_CAPITALS[c]);

        setRemainingCountries(playable);
        setGameState('playing');
        nextTurn(playable);
    };

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

    const totalTargets = useMemo(() => {
        const pathCountries = Object.keys(paths).map(eng => PATH_TO_SPANISH_NAME[eng]).filter(Boolean);
        let playable = pathCountries;
        if (targetList) {
            playable = pathCountries.filter(c => targetList.includes(c));
        }
        return playable.filter(c => EUROPE_CAPITALS[c]).length;
    }, [paths, targetList]);

    return (
        <div
            ref={gameContainerRef}
            className={cn(
                "w-full flex flex-col items-center select-none transition-all duration-300",
                isFullscreen ? "h-screen bg-[#0f172a] p-0 overflow-y-auto scrollbar-hide" : ""
            )}
        >
            <div className={cn(
                "w-full flex flex-col items-center",
                isFullscreen ? "max-w-6xl mx-auto p-6 min-h-screen justify-center" : "max-w-6xl mx-auto p-4"
            )}>
                <GameHUD
                    title={title}
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    totalTargets={totalTargets}
                    remainingTargets={remainingCountries.length}
                    targetName={targetCapital}
                    region={t.gamesPage.regions.europe}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme="teal"
                    icon={<Globe className="w-8 h-8 text-teal-400" />}
                />

                <div
                    className={cn(
                        "relative w-full bg-[#1a2333] rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-video flex items-center justify-center group cursor-move",
                        isFullscreen && "flex-1 min-h-[500px]"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* START OVERLAY */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <Globe className="w-12 h-12 text-teal-400" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{title}</h2>
                            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                                Busca la capital mostrada en el mapa.
                            </p>
                            <button
                                onClick={startGame}
                                className="group relative px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.6)] hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Globe className="w-5 h-5 opacity-50" /></span>
                            </button>
                        </div>
                    )}

                    {/* FINISHED OVERLAY */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                                <Globe className="w-16 h-16 text-yellow-400 animate-bounce" />
                            </div>
                            <h3 className="text-5xl font-black text-white mb-6">
                                {timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Juego Completado!'}
                            </h3>
                            <p className="text-2xl text-teal-200 mb-10 font-light">Puntuación Final: <strong className="text-white">{score}</strong></p>
                            <button
                                onClick={resetGame}
                                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-teal-500/20 transition-transform active:scale-95"
                            >
                                Jugar Otra Vez
                            </button>
                        </div>
                    )}

                    {/* Controls */}
                    <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                        <button onClick={() => setZoom(z => Math.min(z * 1.2, 4))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomIn className="w-5 h-5" /></button>
                        <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomOut className="w-5 h-5" /></button>
                        <div className="h-2" />
                        <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10">
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* MAP */}
                    {(gameState === 'playing' || gameState === 'start') && (
                        <svg viewBox="0 0 800 600" className="w-full h-full pointer-events-none" style={{ background: '#1e293b' }}>
                            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                                {Object.entries(paths).map(([engName, pathD]) => {
                                    const spanishName = PATH_TO_SPANISH_NAME[engName];
                                    const isTarget = spanishName === currentCountryName;
                                    const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                    const isFailed = failedCountries.includes(spanishName || '');

                                    const isInTargetList = targetList ? (spanishName && targetList.includes(spanishName)) : true;

                                    return (
                                        <motion.path
                                            key={engName}
                                            d={pathD}
                                            className={`stroke-[0.5px] pointer-events-auto transition-colors duration-150 ${isInTargetList ? `cursor-pointer stroke-slate-900/30 hover:stroke-slate-900 hover:stroke-[1px] ${!isCompleted ? 'hover:fill-teal-100' : ''}` : 'fill-slate-800/30 stroke-slate-800/50'}`}
                                            initial={false}
                                            animate={{
                                                fill: isCompleted
                                                    ? (isFailed ? '#ef4444' : '#10b981')
                                                    : (isInTargetList ? '#ffffff' : '#1e293b'),
                                                opacity: isInTargetList ? 1 : 0.4
                                            }}
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
                </div>
            </div>
        </div>
    );
}

// Helper to calculate initial target count outside if needed, or just memo inside.
import { useMemo } from 'react';
