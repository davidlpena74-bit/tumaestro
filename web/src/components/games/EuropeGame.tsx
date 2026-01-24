'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ZoomIn, ZoomOut, Maximize, Minimize, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EUROPE_PATHS } from './data/europe-paths';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useLanguage } from '@/context/LanguageContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Expanded Mapping for all 50 generated countries
const COUNTRY_MAPPING: Record<string, string> = {
    'Albania': 'Albania',
    'Andorra': 'Andorra',
    'Armenia': 'Armenia',
    'Austria': 'Austria',
    'Azerbaijan': 'Azerbaiyán',
    'Belarus': 'Bielorrusia',
    'Belgium': 'Bélgica',
    'Bosnia and Herz.': 'Bosnia y Herzegovina',
    'Bulgaria': 'Bulgaria',
    'Croatia': 'Croacia',
    'Cyprus': 'Chipre',
    'Czechia': 'República Checa',
    'Denmark': 'Dinamarca',
    'Estonia': 'Estonia',
    'Finland': 'Finlandia',
    'France': 'Francia',
    'Georgia': 'Georgia',
    'Germany': 'Alemania',
    'Greece': 'Grecia',
    'Hungary': 'Hungría',
    'Iceland': 'Islandia',
    'Ireland': 'Irlanda',
    'Italy': 'Italia',
    'Kazakhstan': 'Kazajistán',
    'Kosovo': 'Kosovo',
    'Latvia': 'Letonia',
    'Liechtenstein': 'Liechtenstein',
    'Lithuania': 'Lituania',
    'Luxembourg': 'Luxemburgo',
    'Malta': 'Malta',
    'Moldova': 'Moldavia',
    'Monaco': 'Mónaco',
    'Montenegro': 'Montenegro',
    'Netherlands': 'Países Bajos',
    'North Macedonia': 'Macedonia del Norte',
    'Norway': 'Noruega',
    'Poland': 'Polonia',
    'Portugal': 'Portugal',
    'Romania': 'Rumanía',
    'Russia': 'Rusia',
    'San Marino': 'San Marino',
    'Serbia': 'Serbia',
    'Slovakia': 'Eslovaquia',
    'Slovenia': 'Eslovenia',
    'Spain': 'España',
    'Sweden': 'Suecia',
    'Switzerland': 'Suiza',
    'Turkey': 'Turquía',
    'Ukraine': 'Ucrania',
    'United Kingdom': 'Reino Unido',
    'Vatican': 'Vaticano'
};

export default function EuropeGame() {
    const { t } = useLanguage();
    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 180, penaltyTime: 5 }); // 3 minutes for whole Europe

    const [loading, setLoading] = useState(true);
    const [targetCountry, setTargetCountry] = useState('');

    // Stats locally tracked for "Next Turn" logic mostly, but could rely on logic hook if it had "remaining"
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

    // Initialize Game Data
    useEffect(() => {
        const available = Object.keys(EUROPE_PATHS)
            .map(engName => COUNTRY_MAPPING[engName])
            .filter(Boolean);

        setRemainingCountries(available);
        setLoading(false);

        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);

    }, []);

    const startGame = () => {
        hookStartGame();
        setAttempts(0);
        setFailedCountries([]);
        setTargetCountry('');

        const available = Object.keys(EUROPE_PATHS)
            .map(engName => COUNTRY_MAPPING[engName])
            .filter(Boolean);
        setRemainingCountries(available);

        nextTurn(available);
    };

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetCountry(next);
        setAttempts(0);
    };

    const handleCountryClick = (engName: string) => {
        if (gameState !== 'playing') return;
        if (Math.abs(pan.x - dragStart.current.x) > 5 || Math.abs(pan.y - dragStart.current.y) > 5) return;

        const spanishName = COUNTRY_MAPPING[engName];
        if (!spanishName) return;

        if (spanishName === targetCountry) {
            // Correct
            addScore(10);
            setMessage('¡Correcto! 🎉');

            const newRemaining = remainingCountries.filter(c => c !== targetCountry);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            addError();
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setMessage(`¡Fallaste 3/3! ${targetCountry} marcada en rojo. ❌`);
                setFailedCountries(prev => [...prev, targetCountry]);

                const newRemaining = remainingCountries.filter(c => c !== targetCountry);
                setRemainingCountries(newRemaining);
                setTimeout(() => nextTurn(newRemaining), 1500);
            } else {
                setMessage(`¡No! Eso es ${spanishName} (${newAttempts}/3) ❌`);
            }
        }
    };

    const resetGame = () => {
        hookResetGame();
        setAttempts(0);
        setFailedCountries([]);

        const available = Object.keys(EUROPE_PATHS)
            .map(engName => COUNTRY_MAPPING[engName])
            .filter(Boolean);
        setRemainingCountries(available);

        setGameState('playing');
        nextTurn(available);
    };

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y,
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

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
                    title="Mapa de Europa"
                    score={score}
                    errors={errors}
                    timeLeft={timeLeft}
                    totalTargets={Object.keys(COUNTRY_MAPPING).length} // Roughly correct, though some small states might be missing in map?
                    remainingTargets={remainingCountries.length}
                    targetName={targetCountry}
                    region={t.gamesPage.regions.europe}
                    gameType={t.gamesPage.gameTypes.map}
                    message={message}
                    onReset={resetGame}
                    colorTheme="teal"
                    icon={<Globe className="w-8 h-8 text-teal-400" />}
                />

                {/* Map Interaction Layer */}
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
                            <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                                <Globe className="w-12 h-12 text-blue-400" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Mapa de Europa</h2>
                            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                                Pon a prueba tu geografía. ¿Puedes ubicar todos los países del continente?
                            </p>
                            <button
                                onClick={startGame}
                                className="group relative px-8 py-4 bg-blue-500 hover:bg-blue-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center gap-2">EMPEZAR RETO <Timer className="w-5 h-5 opacity-50" /></span>
                            </button>
                        </div>
                    )}

                    {/* FINISHED OVERLAY */}
                    {gameState === 'finished' && (
                        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-3xl" onMouseDown={e => e.stopPropagation()}>
                            <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                                <Globe className="w-16 h-16 text-yellow-400 animate-bounce" />
                            </div>
                            <h3 className="text-5xl font-black text-white mb-6">
                                {timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Mapa Completado!'}
                            </h3>
                            <p className="text-2xl text-blue-200 mb-10 font-light">Puntuación Final: <strong className="text-white">{score}</strong></p>
                            <button
                                onClick={resetGame}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-blue-500/20 transition-transform active:scale-95"
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
                        <svg
                            viewBox="0 0 800 600"
                            className="w-full h-full pointer-events-none"
                            style={{ background: '#1e293b' }}
                        >
                            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}>
                                {Object.entries(EUROPE_PATHS).map(([engName, pathD]) => {
                                    const spanishName = COUNTRY_MAPPING[engName];
                                    const isTarget = spanishName === targetCountry;
                                    const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                    const isPlayable = !!spanishName;

                                    return (
                                        <motion.path
                                            key={engName}
                                            d={pathD}
                                            className={`
                                            stroke-[0.5px] pointer-events-auto transition-colors duration-150
                                            ${isPlayable
                                                    ? `cursor-pointer stroke-slate-900/30 hover:stroke-slate-900 hover:stroke-[1px] ${!isCompleted ? 'hover:fill-teal-100' : ''}`
                                                    : 'fill-slate-800/30 stroke-slate-800/50'
                                                }
                                        `}
                                            initial={false}
                                            animate={{
                                                fill: isCompleted
                                                    ? failedCountries.includes(spanishName)
                                                        ? '#ef4444' // Red (Failed)
                                                        : '#10b981' // Green (Correct)
                                                    : isPlayable
                                                        ? '#ffffff' // White (Pending)
                                                        : '#1e293b', // Dark background-like
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            onClick={(e: any) => {
                                                e.stopPropagation();
                                                handleCountryClick(engName)
                                            }}
                                            style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                                        />
                                    );
                                })}
                            </g>
                        </svg>
                    )}
                </div>

                <p className="text-center text-slate-500 mt-6 text-sm">
                    Datos cartográficos optimizados por Map Agent. Fuente: Natural Earth.
                </p>
            </div>
        </div>
    );
}
