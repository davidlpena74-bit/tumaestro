'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, RotateCcw, Loader2, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

// Mapping from GeoJSON English names to Game Spanish IDs/Names
const COUNTRY_MAPPING: Record<string, string> = {
    'Spain': 'España',
    'Portugal': 'Portugal',
    'France': 'Francia',
    'Italy': 'Italia',
    'Germany': 'Alemania',
    'United Kingdom': 'Reino Unido',
    'Ireland': 'Irlanda',
    'Poland': 'Polonia',
    'Ukraine': 'Ucrania',
    'Romania': 'Rumanía',
    'Greece': 'Grecia',
    'Sweden': 'Suecia',
    'Norway': 'Noruega',
    'Finland': 'Finlandia',
    'Switzerland': 'Suiza',
    'Austria': 'Austria',
    'Netherlands': 'Países Bajos',
    'Belgium': 'Bélgica',
    'Denmark': 'Dinamarca',
    'Czech Rep.': 'República Checa',
    'Hungary': 'Hungría'
};

const REVERSE_MAPPING = Object.entries(COUNTRY_MAPPING).reduce((acc, [eng, esp]) => {
    acc[esp] = eng;
    return acc;
}, {} as Record<string, string>);

export default function EuropeGame() {
    const [geography, setGeography] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [targetCountry, setTargetCountry] = useState('');
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [gameState, setGameState] = useState<'playing' | 'won' | 'finished'>('playing');
    const [message, setMessage] = useState('');

    const [remainingCountries, setRemainingCountries] = useState<string[]>([]);
    const [zoom, setZoom] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Initial Map Scale based on container width would be ideal, but fixed is fine for now
    // D3 Projection
    const projection = useMemo(() => {
        // Adjust center/scale to fit Europe nicely
        return d3.geoMercator()
            .center([10, 50]) // Adjusted center slightly
            .scale(550 * zoom)
            .translate([400, 300]); // SVG dimensions / 2
    }, [zoom]);

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
        fetch('/maps/world-countries-50m.json')
            .then(res => res.json())
            .then(data => {
                // Parse TopoJSON to GeoJSON features
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const allFeatures = (topojson.feature(data, data.objects.countries) as any).features;

                // Filter only European countries present in our mapping
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const features = allFeatures.filter((f: any) => COUNTRY_MAPPING[f.properties.name]);

                setGeography(features);

                // Initialize game with available mapped countries
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const available = features
                    .map((f: any) => f.properties.name)
                    .filter((name: string) => COUNTRY_MAPPING[name])
                    .map((name: string) => COUNTRY_MAPPING[name]);

                setRemainingCountries(available);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading map:", err);
                setMessage("Error al cargar el mapa. Revisa tu conexión.");
            });
    }, []);

    // Set first target when data is ready
    useEffect(() => {
        if (!loading && remainingCountries.length > 0 && !targetCountry) {
            nextTurn(remainingCountries);
        }
    }, [loading, remainingCountries]);



    const pathGenerator = useMemo(() => {
        return d3.geoPath().projection(projection);
    }, [projection]);

    const nextTurn = (currentRemaining: string[]) => {
        if (currentRemaining.length === 0) {
            setGameState('finished');
            confetti({ particleCount: 200, spread: 100 });
            return;
        }
        const randomIndex = Math.floor(Math.random() * currentRemaining.length);
        const next = currentRemaining[randomIndex];
        setTargetCountry(next);
        setMessage(`Encuentra: ${next}`);
    };

    const handleCountryClick = (geoName: string) => {
        if (gameState !== 'playing') return;

        const spanishName = COUNTRY_MAPPING[geoName];
        if (!spanishName) return; // Ignore non-game countries like "Luxembourg" if not in list

        if (spanishName === targetCountry) {
            // Correct
            setScore(s => s + 10);
            setMessage('¡Correcto! 🎉');

            const newRemaining = remainingCountries.filter(c => c !== targetCountry);
            setRemainingCountries(newRemaining);
            nextTurn(newRemaining);
        } else {
            // Incorrect
            setErrors(e => e + 1);
            setScore(s => Math.max(0, s - 5));
            setMessage(`¡No! Eso es ${spanishName} ❌`);
        }
    };

    const resetGame = () => {
        if (geography.length === 0) return;
        setScore(0);
        setErrors(0);

        const available = geography
            .map((f: any) => f.properties.name)
            .filter((name: string) => COUNTRY_MAPPING[name])
            .map((name: string) => COUNTRY_MAPPING[name]);

        setRemainingCountries(available);
        setGameState('playing');
        setTargetCountry(''); // Will trigger useEffect to pick new
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">

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
                className="relative bg-[#1a2333] rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-video flex items-center justify-center group"
            >

                {/* Controls: Zoom & Fullscreen */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button onClick={() => setZoom(z => Math.min(z * 1.2, 3))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors"><ZoomOut className="w-5 h-5" /></button>
                    <div className="h-2" />
                    <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center gap-4 text-blue-300">
                        <Loader2 className="w-12 h-12 animate-spin" />
                        <p className="font-bold">Cargando cartografía...</p>
                    </div>
                ) : gameState === 'finished' ? (
                    <div className="text-center p-8 z-10">
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
                    <svg viewBox="0 0 800 600" className="w-full h-full">
                        {/* Ocean background */}
                        <motion.rect width="800" height="600" fill="#1e293b" />

                        <g>
                            {geography.map((geo, i) => {
                                const geoName = geo.properties.name;
                                const spanishName = COUNTRY_MAPPING[geoName];
                                const isTarget = spanishName === targetCountry;
                                const isCompleted = spanishName && !remainingCountries.includes(spanishName);
                                const isPlayable = !!spanishName;

                                return (
                                    <motion.path
                                        key={i}
                                        d={pathGenerator(geo) || undefined}
                                        className={`
                                            transition-all duration-200 stroke-[0.5px]
                                            ${isPlayable
                                                ? 'cursor-pointer stroke-slate-600 hover:stroke-white hover:stroke-[1.5px]'
                                                : 'fill-slate-800/50 stroke-slate-800 pointer-events-none'
                                            }
                                        `}
                                        initial={false}
                                        animate={{
                                            fill: isCompleted
                                                ? '#10b981' // Green (Done)
                                                : isPlayable
                                                    ? '#334155' // Slate (Pending)
                                                    : '#1e293b', // Dark (Not playable)
                                            opacity: 1
                                        }}
                                        whileHover={isPlayable && !isCompleted ? {
                                            fill: '#3b82f6', // Blue Hover
                                            scale: 1.01,
                                            transition: { duration: 0.1 }
                                        } : {}}
                                        onClick={() => handleCountryClick(geoName)}
                                    >
                                        <title>{spanishName || geoName}</title>
                                    </motion.path>
                                );
                            })}
                        </g>
                    </svg>
                )}

                {/* Feedback Toast - Moved to Top Center to avoid overlap */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
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
                Datos cartográficos reales provistos por Natural Earth.
            </p>
        </div>
    );
}
