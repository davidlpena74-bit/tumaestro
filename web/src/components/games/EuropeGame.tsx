'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, RotateCcw, ZoomIn, ZoomOut, Maximize, Minimize, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EUROPE_PATHS } from './data/europe-paths';

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
    const [loading, setLoading] = useState(true);
    const [targetCountry, setTargetCountry] = useState('');
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'finished'>('start');
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

    // Initialize Game Data
    useEffect(() => {
        // Prepare list of playable countries
        const available = Object.keys(EUROPE_PATHS)
            .map(engName => COUNTRY_MAPPING[engName])
            .filter(Boolean); // Remove specific countries if mapping triggers undefined (e.g. invalid keys)

        setRemainingCountries(available);
        setLoading(false);
    }, []);

    // Start Selection - ONLY if playing
    useEffect(() => {
        if (gameState === 'playing' && !loading && remainingCountries.length > 0 && !targetCountry) {
            nextTurn(remainingCountries);
        }
    }, [loading, remainingCountries, targetCountry, gameState]);

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setErrors(0);
        setAttempts(0);
        setFailedCountries([]);
        setTargetCountry('');
        // Ensure countries are reset if needed, usually they are set in mount
        // logic above will catch gameState change and trigger nextTurn
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

    // Auto-clear message after 1 second
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 1000);
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
        const next = currentRemaining[randomIndex];
        setTargetCountry(next);
        setAttempts(0);
        // setMessage(`Encuentra: ${next}`); // Removed initial message box
    };

    const handleCountryClick = (engName: string) => {
        if (gameState !== 'playing') return;
        // If dragging, ignore click
        if (Math.abs(pan.x - dragStart.current.x) > 5 || Math.abs(pan.y - dragStart.current.y) > 5) return;

        const spanishName = COUNTRY_MAPPING[engName];
        if (!spanishName) return;

        if (spanishName === targetCountry) {
            // Correct
            setScore(s => s + 10);
            setMessage('¡Correcto! 🎉');

            const newRemaining = remainingCountries.filter(c => c !== targetCountry);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            setErrors(e => e + 1);
            setScore(s => Math.max(0, s - 5));

            if (newAttempts >= 3) {
                setMessage(`¡Fallaste 3/3! ${targetCountry} marcada en rojo. ❌`);
                setFailedCountries(prev => [...prev, targetCountry]);

                // Move to next
                const newRemaining = remainingCountries.filter(c => c !== targetCountry);
                setRemainingCountries(newRemaining);

                // Small delay to read message before switching target? 
                // Using existing flow:
                setTimeout(() => nextTurn(newRemaining), 1500); // Give a bit more time to see the failure
            } else {
                setMessage(`¡No! Eso es ${spanishName} (${newAttempts}/3) ❌`);
            }
        }
    };

    const resetGame = () => {
        setScore(0);
        setErrors(0);
        setAttempts(0);
        setFailedCountries([]);
        const available = Object.keys(EUROPE_PATHS)
            .map(engName => COUNTRY_MAPPING[engName])
            .filter(Boolean);
        setRemainingCountries(available);
        setGameState('playing');
        setTargetCountry('');
    };

    // Mouse event handlers for panning
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        // Store initial click + current pan
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 select-none">

            {/* HUD */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="bg-blue-500/20 p-3 rounded-xl">
                        <Globe className="text-blue-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white">{score} <span className="text-sm font-normal text-blue-200">pts</span></h2>
                        <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
                            <span>Restantes: {remainingCountries.length}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 text-center bg-slate-900/50 p-4 rounded-xl border border-white/10 w-full md:w-auto">
                    <div className="text-gray-400 text-xs mb-1 uppercase tracking-widest font-bold">Objetivo Actual</div>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={targetCountry}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-2xl md:text-3xl font-black text-yellow-400 drop-shadow-sm truncate"
                        >
                            {gameState === 'finished' ? '¡COMPLETADO!' : targetCountry || 'Cargando...'}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-red-400 font-bold text-lg">{errors}</span>
                        <span className="text-red-400/60 text-xs uppercase">Fallos</span>
                    </div>
                    <button
                        onClick={resetGame}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-white border border-white/5 hover:border-white/20"
                        title="Reiniciar"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Map Interaction Layer */}
            <div
                ref={gameContainerRef}
                className="relative bg-[#1a2333] rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-video flex items-center justify-center group cursor-move"
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

                {/* Fullscreen HUD Overlay */}
                {isFullscreen && (
                    <div className="absolute top-6 left-0 right-0 mx-auto w-[95%] max-w-6xl z-20 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col md:flex-row justify-between items-center shadow-2xl gap-4 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                <Globe className="text-blue-400 w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xs text-blue-300 font-bold uppercase block">Puntos</span>
                                <span className="text-2xl font-black text-white">{score}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center flex-1">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Encuentra</span>
                            <span className="text-3xl font-black text-yellow-400 drop-shadow-sm animate-pulse">
                                {targetCountry}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-right">
                            <div>
                                <span className="text-xs text-red-300 font-bold uppercase block">Fallos</span>
                                <span className="text-2xl font-black text-red-400">{errors}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls: Zoom & Fullscreen */}
                {/* Push controls down further to clear the floating HUD */}
                <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                    <button onClick={() => setZoom(z => Math.min(z * 1.2, 4))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomOut className="w-5 h-5" /></button>
                    <div className="h-2" />
                    <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                </div>

                {gameState === 'finished' ? (
                    <div className="text-center p-8 z-10" onMouseDown={e => e.stopPropagation()}>
                        <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-6 animate-bounce drop-shadow-[0_0_50px_rgba(250,204,21,0.5)]" />
                        <h3 className="text-5xl font-black text-white mb-6">¡Mapa Completado!</h3>
                        <p className="text-2xl text-blue-200 mb-10 font-light">Puntuación Final: <strong className="text-white">{score}</strong></p>
                        <button
                            onClick={resetGame}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-green-500/20 transition-transform active:scale-95"
                        >
                            Jugar Otra Vez
                        </button>
                    </div>
                ) : (
                    <svg
                        viewBox="0 0 800 600"
                        className="w-full h-full pointer-events-none" // Events handled by paths
                        style={{ background: '#1e293b' }}
                    >
                        {/* 
                            Zoom/Pan Group 
                            Transform origin center is tricky with pan, so we just use plain transform 
                        */}
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
                                            stroke-[0.5px] pointer-events-auto
                                            ${isPlayable
                                                ? 'cursor-pointer stroke-slate-900/30 hover:stroke-slate-900 hover:stroke-[1px]'
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
                                            // Animate to transparent shadow instead of 'none' to allow smooth transition/clearing
                                            filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
                                        }}
                                        whileHover={isPlayable && !isCompleted ? {
                                            fill: '#bae6fd', // Light Blue Hover (sky-200)
                                            scale: 1.02,
                                            filter: "drop-shadow(3px 5px 4px rgba(0,0,0,0.5))",
                                            transition: { duration: 0.2 }
                                        } : {}}
                                        onMouseDown={(e: any) => e.stopPropagation()} // Stop pan drag starting on country? No, allow picking
                                        // We handle click in parent context or here?
                                        // Actually better to handle click here but verify "not dragging"
                                        onClick={(e: any) => {
                                            e.stopPropagation(); // prevent map pan click triggers if any
                                            handleCountryClick(engName)
                                        }}
                                        style={{ transformOrigin: 'center', transformBox: 'fill-box' }} // Essential for correct scaling center
                                    >
                                    </motion.path>
                                );
                            })}
                        </g>
                    </svg>
                )}

                {/* Feedback Toast */}
                <div className={`absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-all duration-300 ${isFullscreen ? 'top-36 md:top-32' : 'top-6'}`}>
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                className={`px-8 py-3 rounded-2xl border shadow-2xl font-bold text-lg backdrop-blur-md flex items-center gap-3 ${message.includes('Correcto')
                                    ? 'bg-green-500/90 border-green-400 text-white'
                                    : message.includes('No')
                                        ? 'bg-red-500/90 border-red-400 text-white'
                                        : 'bg-slate-800/80 border-slate-600 text-blue-100'
                                    }`}
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <p className="text-center text-slate-500 mt-6 text-sm">
                Datos cartográficos optimizados por Map Agent. Fuente: Natural Earth.
            </p>
        </div >
    );
}
