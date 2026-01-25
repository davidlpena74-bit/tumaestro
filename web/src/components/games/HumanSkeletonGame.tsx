'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import {
    Trophy,
    CheckCircle,
    ArrowsLeftRight,
    CaretLeft,
    CaretRight,
    HandGrabbing,
    ArrowCounterClockwise,
    Skull
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import GameHUD from './GameHUD';

type BonePart = {
    id: string;
    nameKey: string;
    view: 'front' | 'back';
    x: number;
    y: number;
};

// Calibrated coordinates based on the new combined anatomy image (similar to muscles game)
const BONE_PARTS: BonePart[] = [
    // Front View
    { id: 'skull', nameKey: 'skull', view: 'front', x: 400, y: 140 },
    { id: 'ribs', nameKey: 'ribs', view: 'front', x: 400, y: 310 },
    { id: 'humerus', nameKey: 'humerus', view: 'front', x: 320, y: 320 },
    { id: 'pelvis', nameKey: 'pelvis', view: 'front', x: 400, y: 460 },
    { id: 'femur', nameKey: 'femur', view: 'front', x: 370, y: 580 },

    // Back View
    { id: 'spine', nameKey: 'spine', view: 'back', x: 400, y: 300 },
    { id: 'ulna', nameKey: 'ulna', view: 'back', x: 270, y: 380 },
    { id: 'radius', nameKey: 'radius', view: 'back', x: 290, y: 380 },
    { id: 'tibia', nameKey: 'tibia', view: 'back', x: 360, y: 740 },
    { id: 'fibula', nameKey: 'fibula', view: 'back', x: 380, y: 740 },
];

export default function HumanSkeletonGame() {
    const { t } = useLanguage();
    const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [matches, setMatches] = useState<Record<string, string>>({}); // labelId -> partId
    const [dragState, setDragState] = useState<{
        active: boolean;
        startId: string | null;
        startType: 'label' | 'point' | null;
        startX: number;
        startY: number;
        currX: number;
        currY: number;
    }>({
        active: false,
        startId: null,
        startType: null,
        startX: 0,
        startY: 0,
        currX: 0,
        currY: 0
    });
    const [time, setTime] = useState(0);
    const [errors, setErrors] = useState(0);
    const diagramRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // Calculate label positions dynamically based on current view parts
    const currentParts = BONE_PARTS.filter(p => p.view === currentView);
    const labelPositions = React.useMemo(() => {
        return currentParts.map((part, index) => ({
            ...part,
            labelX: index % 2 === 0 ? 30 : 570, // Alternating Left/Right columns
            labelY: 150 + (index * 130) // Vertical spacing
        }));
    }, [currentView, currentParts]);


    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStarted && !gameOver) {
            interval = setInterval(() => setTime(prev => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameOver]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setMatches({});
        setErrors(0);
        setTime(0);
        setDragState({
            active: false,
            startId: null,
            startType: null,
            startX: 0,
            startY: 0,
            currX: 0,
            currY: 0
        });
    };

    const checkCompletion = (newMatches: Record<string, string>) => {
        const partsCount = currentParts.length;
        if (Object.keys(newMatches).length === partsCount) {
            // Check if all are correct (implied by the logic that prevents incorrect matches)
            finishGame();
        }
    };

    const finishGame = () => {
        setGameOver(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fb923c', '#ef4444', '#ffffff']
        });
    };

    const getSVGCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const CTM = svgRef.current.getScreenCTM();
        if (!CTM) return { x: 0, y: 0 };

        let clientX, clientY;
        if ('touches' in event) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = (event as React.MouseEvent).clientX;
            clientY = (event as React.MouseEvent).clientY;
        }

        return {
            x: (clientX - CTM.e) / CTM.a,
            y: (clientY - CTM.f) / CTM.d
        };
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string, type: 'label' | 'point', x: number, y: number) => {
        if (!gameStarted || gameOver) return;
        // Check if already matched
        if (type === 'label' && matches[id]) return;
        if (type === 'point' && Object.values(matches).includes(id)) return;

        e.stopPropagation(); // Prevent scrolling on touch
        const { x: svgX, y: svgY } = getSVGCoordinates(e);

        setDragState({
            active: true,
            startId: id,
            startType: type,
            startX: type === 'point' ? x : (x + 100), // Center of label roughly
            startY: type === 'point' ? y : (y + 30),
            currX: svgX,
            currY: svgY
        });
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!dragState.active) return;
        const { x, y } = getSVGCoordinates(e);
        setDragState(prev => ({ ...prev, currX: x, currY: y }));
    };

    const handleDragEnd = (e: React.MouseEvent | React.TouchEvent, droppedId?: string, droppedType?: 'label' | 'point') => {
        if (!dragState.active) return;

        // Validation logic
        if (droppedId && droppedType && droppedType !== dragState.startType) {
            const labelId = dragState.startType === 'label' ? dragState.startId : droppedId;
            const partId = dragState.startType === 'point' ? dragState.startId : droppedId;

            // Check match correctness
            if (labelId === partId) { // Since we use same ID in this simplified data structure (id matches)
                const newMatches = { ...matches, [labelId!]: partId! };
                setMatches(newMatches);
                confetti({
                    particleCount: 30,
                    spread: 40,
                    origin: { y: 0.6 },
                    colors: ['#34d399', '#ffffff']
                });
                checkCompletion(newMatches);
            } else {
                setErrors(prev => prev + 1);
            }
        }

        setDragState(prev => ({ ...prev, active: false, startId: null, startType: null }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-4 md:pb-8 pt-0 min-h-screen select-none">


            {/* Header / HUD */}
            <GameHUD
                title={t.gamesPage.gameTitles.skeleton}
                score={Object.keys(matches).length * 100}
                errors={errors}
                timeLeft={time}
                totalTargets={currentParts.length}
                remainingTargets={currentParts.length - Object.keys(matches).length}
                targetName=""
                onReset={startGame}
                colorTheme="blue"
                message={gameOver ? t.common.victoryMessage : undefined}
                icon={<Skull className="w-8 h-8 text-blue-400" weight="duotone" />}
            />

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left Sidebar: Controls & Instructions */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-xl h-full flex flex-col justify-center">
                        <div className="animate-in slide-in-from-left duration-500">
                            {/* <img src="/images/logo_tumaestro_v2.svg" alt="Tu Maestro" className="w-24 opacity-20 mb-6 mx-auto" /> */}
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-bold text-center">Instrucciones</p>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-4">
                                <div className="flex items-center gap-4 mb-3">
                                    <HandGrabbing className="w-8 h-8 text-blue-400" />
                                    <span className="text-white font-bold">Arrastra para conectar</span>
                                </div>
                                <p className="text-white/60 text-sm">Une cada etiqueta con su hueso correspondiente. Si te equivocas, la línea no se fijará.</p>
                            </div>

                            <button
                                onClick={() => setCurrentView(prev => {
                                    setMatches({});
                                    return prev === 'front' ? 'back' : 'front';
                                })}
                                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all group"
                            >
                                <ArrowsLeftRight className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                CAMBIAR VISTA
                            </button>
                        </div>
                    </div>
                </div>

                {/* Diagram Area */}
                {/* Diagram Area */}
                <div
                    ref={diagramRef}
                    className="lg:col-span-9 bg-transparent border border-white/10 p-6 rounded-[2.5rem] relative flex items-center justify-center z-10 min-h-[850px] overflow-hidden cursor-crosshair select-none shadow-2xl"
                >
                    {/* START OVERLAY - Unified with Map style */}
                    {!gameStarted && !gameOver && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                            <div className="bg-blue-500/10 p-6 rounded-full mb-6 ring-1 ring-blue-500/30">
                                <HandGrabbing className="w-16 h-16 text-blue-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">El Esqueleto</h2>
                            <p className="text-gray-300 mb-8 max-w-xl text-lg leading-relaxed font-medium">
                                ¿Conoces tus huesos? Conecta cada nombre con su ubicación correcta en el esqueleto.
                            </p>
                            <button
                                onClick={startGame}
                                className="group relative px-10 py-5 bg-blue-500 hover:bg-blue-400 text-slate-900 font-black text-xl rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    EMPEZAR RETO <ArrowCounterClockwise className="w-6 h-6 opacity-50" />
                                </span>
                            </button>
                        </div>
                    )}

                    {/* WON OVERLAY - Unified with Map style */}
                    <AnimatePresence>
                        {gameOver && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]"
                            >
                                <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                                    <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">¡Reto Completado!</h2>

                                <div className="flex gap-12 mb-8 mt-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold font-medium italic">Tiempo</span>
                                        <span className="text-4xl font-black text-white">{time}s</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold font-medium italic">Errores</span>
                                        <span className="text-4xl font-black text-red-500">{errors}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105"
                                >
                                    <ArrowCounterClockwise className="w-5 h-5" /> Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* View Switch Overlay Buttons */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10">
                        <button
                            onClick={() => { setCurrentView('front'); setMatches({}); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${currentView === 'front' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/40 hover:text-white'}`}
                        >
                            VISTA FRONTAL
                        </button>
                        <button
                            onClick={() => { setCurrentView('back'); setMatches({}); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${currentView === 'back' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/40 hover:text-white'}`}
                        >
                            VISTA TRASERA
                        </button>
                    </div>

                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <div className="relative w-[300px] h-full overflow-hidden">
                            <motion.div
                                animate={{ x: currentView === 'front' ? '0%' : '-50%' }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="absolute top-0 left-0 h-full w-[200%]"
                            >
                                <Image
                                    src="/images/games/skeleton-combined-hq.png"
                                    alt="Human Skeleton Anatomy"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Interaction Layer (SVG) */}
                    <svg
                        ref={svgRef}
                        viewBox="0 0 800 1000"
                        className="absolute inset-0 w-full h-full z-20"
                        onMouseMove={handleDragMove}
                        onTouchMove={handleDragMove}
                        onMouseUp={(e) => handleDragEnd(e)}
                        onTouchEnd={(e) => handleDragEnd(e)}
                        onMouseLeave={(e) => handleDragEnd(e)}
                    >
                        {/* 1. Draw Connection Lines (Active Matches) */}
                        {Object.entries(matches).map(([labelId, partId]) => {
                            const part = currentParts.find(p => p.id === partId);
                            const label = labelPositions.find(p => p.id === labelId);
                            if (!part || !label) return null;

                            return (
                                <motion.line
                                    key={`line-${labelId}-${partId}`}
                                    x1={label.labelX + 100} // Center of label (width 200)
                                    y1={label.labelY + 30}  // Center of label (height 60)
                                    x2={part.x}
                                    y2={part.y}
                                    stroke="#10b981"
                                    strokeWidth="4"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            );
                        })}

                        {/* 2. Draw Active Dragging Line */}
                        {dragState.active && (
                            <line
                                x1={dragState.startX}
                                y1={dragState.startY}
                                x2={dragState.currX}
                                y2={dragState.currY}
                                stroke="#3b82f6"
                                strokeWidth="4"
                                strokeDasharray="8 4"
                                className="animate-pulse"
                            />
                        )}

                        {/* 3. Render Labels (Left and Right) using foreignObject */}
                        {labelPositions.map((item) => (
                            <foreignObject
                                key={`label-${item.id}`}
                                x={item.labelX}
                                y={item.labelY}
                                width="200"
                                height="60"
                                className="overflow-visible"
                            >
                                <div
                                    onMouseDown={(e) => handleDragStart(e, item.id, 'label', item.labelX, item.labelY)}
                                    onTouchStart={(e) => handleDragStart(e, item.id, 'label', item.labelX, item.labelY)}
                                    onMouseUp={(e) => handleDragEnd(e, item.id, 'label')}
                                    onTouchEnd={(e) => handleDragEnd(e, item.id, 'label')}
                                    className={`
                                        w-full h-full rounded-xl flex items-center justify-center px-4 text-center cursor-grab active:cursor-grabbing transition-all duration-300 shadow-xl border
                                        ${matches[item.id]
                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 pointer-events-none'
                                            : 'bg-slate-800/90 border-white/20 hover:border-teal-500/50 hover:bg-slate-800 text-white'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        {matches[item.id] && <CheckCircle className="w-4 h-4 text-emerald-400" weight="fill" />}
                                        <span className="text-xs font-bold uppercase tracking-wide">
                                            {(t.gamesPage.bones as any)[item.nameKey]}
                                        </span>
                                    </div>
                                </div>
                                {/* Connector Dot for Label */}
                                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/20 bg-slate-900 ${item.labelX < 400 ? '-right-1.5' : '-left-1.5'} ${matches[item.id] ? 'bg-emerald-500 border-emerald-500' : ''}`} />
                            </foreignObject>
                        ))}

                        {/* 4. Render Body Points */}
                        {currentParts.map((part) => (
                            <g
                                key={`point-${part.id}`}
                                onMouseDown={(e) => handleDragStart(e, part.id, 'point', part.x, part.y)}
                                onTouchStart={(e) => handleDragStart(e, part.id, 'point', part.x, part.y)}
                                onMouseUp={(e) => handleDragEnd(e, part.id, 'point')}
                                onTouchEnd={(e) => handleDragEnd(e, part.id, 'point')}
                                className="cursor-pointer"
                            >
                                <circle
                                    cx={part.x}
                                    cy={part.y}
                                    r="16"
                                    className={`
                                         transition-all duration-300
                                         ${Object.values(matches).includes(part.id)
                                            ? 'fill-emerald-500 stroke-emerald-400'
                                            : 'fill-white/10 stroke-white/30 hover:fill-teal-500/30 hover:stroke-teal-400 hover:r-20'
                                        }
                                     `}
                                    strokeWidth="3"
                                />
                                <circle
                                    cx={part.x}
                                    cy={part.y}
                                    r="6"
                                    fill={Object.values(matches).includes(part.id) ? '#ffffff' : '#3b82f6'}
                                />
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}
