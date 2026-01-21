'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, MapPin, RefreshCw, XCircle, CheckCircle, HelpCircle, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SPANISH_PROVINCES_PATHS, PROVINCE_NAMES } from './spanish-provinces';
import confetti from 'canvas-confetti';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function MapGame() {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won'>('start');
    const [targetId, setTargetId] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for provinces
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'neutral' }>({ text: '', type: 'neutral' });
    const [clickedId, setClickedId] = useState<string | null>(null);

    const [attempts, setAttempts] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);

    // Zoom & Pan State
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    // Fullscreen
    const [isFullscreen, setIsFullscreen] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Game Loop
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setGameState('won');
        }
    }, [gameState, timeLeft]);

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // Auto-clear message after 1s
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ text: '', type: 'neutral' }), 1000);
            return () => clearTimeout(timer);
        }
    }, [message.text]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            gameContainerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setAttempts(0);
        setCorrectCount(0);
        setTimeLeft(90);
        pickNewTarget();
        setMessage({ text: '', type: 'neutral' });
        // Reset view on start? optional.
        // setZoom(1); setPan({x:0, y:0}); 
    };

    const pickNewTarget = () => {
        const keys = Object.keys(PROVINCE_NAMES);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        setTargetId(randomKey);
        setClickedId(null);
    };

    const handleRegionClick = (id: string) => {
        if (gameState !== 'playing' || !targetId) return;

        // Prevent click if we were dragging
        // We handle this check in the mouseUp/onClick wrapper usually, 
        // but here let's rely on the fact that if dragging, we probably moved significantly.
        // Simple check: if isDragging was true recently? 
        // Better: check distance in MouseUp, but here we are in onClick.
        // We'll rely on the parent wrapper to stop propagation if it was a drag, 
        // or just add a small check if we had `onClick` on parent too. 
        // Since we put onClick on the `<g>`, it fires.

        // The dragging logic is on the container. The paths capture clicks.
        // We can check if `pan` changed significantly since `mouseDown`? 
        // But `pan` updates on `mouseMove`. 
        // Let's us a ref 'wasDragging' set on mouseMove.

        setClickedId(id);
        setAttempts(prev => prev + 1);

        if (id === targetId) {
            // Correct
            setScore(s => s + 10);
            setCorrectCount(prev => prev + 1);
            setMessage({ text: `¡Bien! Es ${PROVINCE_NAMES[id]}`, type: 'success' });
            setTimeout(pickNewTarget, 600);

            // Celebration if score is high?
            if (score > 1000 && score % 1000 < 150) confetti({ particleCount: 50 });
        } else {
            // Incorrect
            setScore((prev) => Math.max(0, prev - 30));
            setMessage({ text: '¡Ups! Esa no es.', type: 'error' });
        }
    };

    // Pan Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        setPan({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Helper to check if it was a click or drag
    const isClick = useRef(true);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col items-center select-none">

            {/* GAME HUD */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl items-center">

                {/* Score */}
                <div className="flex items-center justify-center md:justify-start gap-3 text-yellow-400 order-2 md:order-1">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-yellow-500/70 font-bold uppercase tracking-wider">Puntos</div>
                        <span className="text-2xl font-bold font-mono leading-none">{score}</span>
                        <div className="text-[10px] text-yellow-600/60 mt-1 font-bold">
                            {attempts > 0 ? Math.round((correctCount / attempts) * 100) : 100}% Acierto
                        </div>
                    </div>
                </div>

                {/* Target Display (Center) */}
                <div className="flex justify-center order-1 md:order-2">
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
                                <span className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-400 drop-shadow-sm truncate max-w-[300px] block">
                                    {PROVINCE_NAMES[targetId]}
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
                <div className="flex justify-center md:justify-end order-3">
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-mono font-bold text-xl border",
                        timeLeft < 15 ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" : "bg-slate-800 border-white/5 text-teal-400"
                    )}>
                        <Timer className="w-5 h-5" />
                        {timeLeft}s
                    </div>
                </div>
            </div>

            {/* FEEDBACK BAR */}
            <div className={`h-10 mb-2 w-full flex justify-center z-20 pointer-events-none transition-all duration-300 ${isFullscreen ? 'absolute top-36 md:top-32' : ''}`}>
                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            key={message.text + gameState}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-1.5 rounded-full text-sm font-bold shadow-lg border border-white/10 backdrop-blur-md pointer-events-auto",
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
            <div
                ref={gameContainerRef}
                className="relative w-full aspect-square md:aspect-[1.4] bg-[#1a2333] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group cursor-move"
                onMouseDown={(e) => {
                    isClick.current = true;
                    handleMouseDown(e);
                }}
                onMouseMove={(e) => {
                    if (isDragging) isClick.current = false;
                    handleMouseMove(e);
                }}
                onMouseUp={() => {
                    handleMouseUp();
                    // Reset isClick shortly after if needed, but the click event handler fires immediately after mouseup
                    setTimeout(() => isClick.current = true, 50);
                }}
                onMouseLeave={handleMouseUp}
            >

                {/* Fullscreen HUD Overlay */}
                {isFullscreen && (
                    <div className="absolute top-6 left-0 right-0 mx-auto w-[95%] max-w-6xl z-20 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col md:flex-row justify-between items-center shadow-2xl gap-4 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-teal-500/20 p-2 rounded-lg">
                                <Trophy className="text-teal-400 w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xs text-teal-300 font-bold uppercase block">Puntos</span>
                                <span className="text-2xl font-black text-white">{score}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center flex-1">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Encuentra</span>
                            <span className="text-3xl font-black text-yellow-400 drop-shadow-sm animate-pulse truncate max-w-[400px]">
                                {PROVINCE_NAMES[targetId!] || '...'}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-right">
                            <div className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-mono font-bold text-xl border",
                                timeLeft < 15 ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse" : "bg-slate-800 border-white/5 text-teal-400"
                            )}>
                                <Timer className="w-5 h-5" />
                                {timeLeft}s
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTROLS (Zoom/Full) */}
                <div className={`absolute right-4 flex flex-col gap-2 z-20 transition-all duration-300 ${isFullscreen ? 'top-32 md:top-28' : 'top-4'}`} onMouseDown={e => e.stopPropagation()}>
                    <button onClick={() => setZoom(z => Math.min(z * 1.2, 5))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => setZoom(z => Math.max(z / 1.2, 0.8))} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10"><ZoomOut className="w-5 h-5" /></button>
                    <div className="h-2" />
                    <button onClick={toggleFullscreen} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10">
                        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                    <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="p-2 bg-slate-800/80 text-white rounded-lg hover:bg-slate-700 backdrop-blur-sm transition-colors border border-white/10" title="Reset View">
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                {/* START OVERLAY */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                        <div className="bg-teal-500/10 p-4 rounded-full mb-6 ring-1 ring-teal-500/30">
                            <MapPin className="w-12 h-12 text-teal-400" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Desafío Provincial</h2>
                        <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                            Demuestra que conoces cada rincón del país. Tienes 90 segundos para ubicar todas las provincias posibles.
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
                        <h2 className="text-4xl font-bold text-white mb-2">¡Tiempo Agotado!</h2>
                        <div className="flex flex-col items-center gap-1 mb-8">
                            <span className="text-gray-400 text-sm uppercase tracking-widest">Puntuación Final</span>
                            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">
                                {score}
                            </span>
                        </div>
                        <button onClick={startGame} className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105">
                            <RefreshCw className="w-5 h-5" /> Intentar de nuevo
                        </button>
                    </div>
                )}

                {/* SVG MAP */}
                <svg
                    viewBox="0 0 700 700"
                    className="w-full h-full drop-shadow-2xl"
                    style={{ background: '#1e293b' }}
                >
                    <defs>
                        <filter id="glow-hover" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Transform Group */}
                    <g
                        transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                        style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.2s ease-out' }}
                    >

                        {/* AFRICA COASTLINE (DECORATIVE CONTEXT) */}
                        <path
                            d="M0,580 L80,565 L140,550 L165,542 L180,540 L195,545 L220,555 L280,565 L315,575 L325,582 L340,585 L400,580 L700,550 V700 H0 Z"
                            className="fill-white/5 stroke-white/10 stroke-1 pointer-events-none"
                        />

                        {/* CANARY ISLANDS INSET FRAME */}
                        <rect
                            x="465" y="440" width="205" height="75"
                            className="fill-none stroke-white/10 stroke-1 pointer-events-none stroke-dasharray-2 2"
                            rx="4"
                        />

                        {/* Render Provinces */}
                        {Object.entries(SPANISH_PROVINCES_PATHS).map(([id, paths]) => {
                            const isTarget = targetId === id;
                            const isClicked = clickedId === id;

                            let fillClass = "fill-white/90";
                            let strokeClass = "stroke-slate-900/50 stroke-[0.5]";

                            if (gameState === 'playing') {
                                fillClass = "fill-white hover:fill-teal-200 cursor-pointer transition-all duration-150 hover:drop-shadow-[4px_6px_6px_rgba(0,0,0,0.5)] hover:scale-[1.02] vector-effect-non-scaling-stroke"; // 3D diagonal effect

                                if (isClicked) {
                                    strokeClass = "stroke-slate-900 stroke-1";
                                    if (isTarget) fillClass = "fill-green-500 animate-pulse";
                                    else fillClass = "fill-red-500";
                                }
                            }

                            return (
                                <g
                                    key={id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Only trigger if we weren't just dragging
                                        if (isClick.current) handleRegionClick(id);
                                    }}
                                    className="pointer-events-auto"
                                >
                                    {paths.map((d, i) => (
                                        <path
                                            key={i}
                                            d={d}
                                            className={cn(strokeClass, fillClass)}
                                            style={{ transformOrigin: 'center' }}
                                        />
                                    ))}
                                </g>
                            );
                        })}
                    </g>
                </svg>

            </div>

            <p className="text-gray-500 text-xs mt-4 flex items-center gap-2">
                <HelpCircle className="w-3 h-3" />
                <span>Usa los controles o rueda del ratón para hacer zoom. Arrastra para mover el mapa.</span>
            </p>
        </div>
    );
}
