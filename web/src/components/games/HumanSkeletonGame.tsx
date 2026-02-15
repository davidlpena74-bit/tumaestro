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
import { useGameLogic } from '@/hooks/useGameLogic';

type BonePart = {
    id: string;
    nameKey: string;
    view: 'front' | 'back';
    x: number;
    y: number;
    lx: number; // Label X when matched
    ly: number; // Label Y when matched
};

// Calibrated coordinates based on the new combined anatomy image (similar to muscles game)
const BONE_PARTS: BonePart[] = [
    // Front View
    { id: 'skull', nameKey: 'skull', view: 'front', x: 399, y: 170, lx: 700, ly: 190 },
    { id: 'ribs', nameKey: 'ribs', view: 'front', x: 371, y: 346, lx: 700, ly: 334 },
    { id: 'humerus', nameKey: 'humerus', view: 'front', x: 489, y: 373, lx: 700, ly: 345 },
    { id: 'pelvis', nameKey: 'pelvis', view: 'front', x: 363, y: 482, lx: 700, ly: 445 },
    { id: 'femur', nameKey: 'femur', view: 'front', x: 352, y: 617, lx: 700, ly: 574 },
    { id: 'tibia', nameKey: 'tibia', view: 'front', x: 434, y: 796, lx: 700, ly: 728 },
    { id: 'fibula', nameKey: 'fibula', view: 'front', x: 450, y: 836, lx: 700, ly: 679 },
    { id: 'radius', nameKey: 'radius', view: 'front', x: 527, y: 498, lx: 700, ly: 446 },
    { id: 'ulna', nameKey: 'ulna', view: 'front', x: 504, y: 488, lx: 700, ly: 463 },

    // Back View
    { id: 'spine', nameKey: 'spine', view: 'back', x: 401, y: 374, lx: 700, ly: 293 },
    { id: 'scapula', nameKey: 'scapula', view: 'back', x: 450, y: 320, lx: 700, ly: 315 },
];

export default function HumanSkeletonGame() {
    const { t, language } = useLanguage();
    const [rotation, setRotation] = useState(0); // 0 to 180 degrees
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
    const diagramRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // Get current view based on rotation state
    const currentView = rotation === 0 ? 'front' : 'back';

    const currentParts = BONE_PARTS.filter(p => p.view === currentView);

    const labelPositions = React.useMemo(() => {
        // 1. Sort all parts by Y coordinate to define fixed slots on the right
        const sortedByY = [...currentParts].sort((a, b) => a.y - b.y);

        // 2. Sort only unmatched parts alphabetically for the compact left stack
        const unmatchedSorted = currentParts
            .filter(p => !matches[p.id])
            .sort((a, b) => {
                const nameA = (t.gamesPage.bones as any)[a.nameKey] || '';
                const nameB = (t.gamesPage.bones as any)[b.nameKey] || '';
                return nameA.localeCompare(nameB, language);
            });

        return currentParts.map((part) => {
            const isMatched = !!matches[part.id];

            // Fixed slot index for the right side (based on body height)
            const yOrderIndex = sortedByY.findIndex(p => p.id === part.id);
            // Dynamic compact index for the left side
            const unmatchedIndex = unmatchedSorted.findIndex(p => p.id === part.id);

            return {
                ...part,
                labelX: isMatched ? 650 : -50, // Moved further out (-70 units shift)
                labelY: 200 + ((isMatched ? yOrderIndex : unmatchedIndex) * 80)
            };
        });
    }, [currentView, currentParts, matches, t, language]);


    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame
    } = useGameLogic({ initialTime: 120, penaltyTime: 10, gameMode });

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setMatches({});
        setRotation(0);
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
            finishGame();
        }
    };

    const finishGame = () => {
        setGameState('finished');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fb923c', '#ef4444', '#ffffff']
        });
    };

    const getSVGCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();

        if ('touches' in event && (event as React.TouchEvent).touches?.length > 0) {
            pt.x = (event as React.TouchEvent).touches[0].clientX;
            pt.y = (event as React.TouchEvent).touches[0].clientY;
        } else {
            pt.x = (event as React.MouseEvent).clientX;
            pt.y = (event as React.MouseEvent).clientY;
        }

        const cursorPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        return {
            x: cursorPoint?.x || 0,
            y: cursorPoint?.y || 0
        };
    };



    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string, type: 'label' | 'point', x: number, y: number) => {
        if (gameState !== 'playing') return;
        // Check if already matched
        if (type === 'label' && matches[id]) return;
        if (type === 'point' && Object.values(matches).includes(id)) return;

        e.stopPropagation(); // Prevent scrolling on touch
        const { x: svgX, y: svgY } = getSVGCoordinates(e);

        setDragState({
            active: true,
            startId: id,
            startType: type,
            startX: type === 'point' ? x : (x < 400 ? x + 200 : x), // Right edge if on left, left edge if on right
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
                addScore(100);
                checkCompletion(newMatches);
            } else {
                addError();
                addScore(gameMode === 'challenge' ? -20 : -5);
            }
        }

        setDragState(prev => ({ ...prev, active: false, startId: null, startType: null }));
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-4 md:pb-8 pt-0 min-h-screen select-none">


            {/* Header / HUD */}
            <GameHUD
                title={t.gamesPage.gameTitles.skeleton}
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                elapsedTime={elapsedTime}
                gameMode={gameMode}
                totalTargets={currentParts.length}
                remainingTargets={currentParts.length - Object.keys(matches).length}
                targetName=""
                onReset={() => setGameState('start')} // Go back to start screen
                colorTheme="blue"
                message={message}
                icon={<Skull className="w-8 h-8 text-blue-400" weight="duotone" />}
            />

            <div className="w-full">

                {/* Diagram Area */}
                <div
                    ref={diagramRef}
                    className="w-full bg-transparent border border-white/10 p-6 rounded-[2.5rem] relative flex items-center justify-center z-10 min-h-[850px] overflow-hidden cursor-crosshair select-none shadow-2xl"
                >
                    {/* START OVERLAY - Unified with Map style */}
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                            <div className="bg-blue-500/10 p-6 rounded-full mb-6 ring-1 ring-blue-500/30">
                                <HandGrabbing className="w-16 h-16 text-blue-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">El Esqueleto</h2>
                            <p className="text-gray-300 mb-8 max-w-xl text-lg leading-relaxed font-medium">
                                ¿Conoces tus huesos? Conecta cada nombre con su ubicación correcta en el esqueleto.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <button
                                    onClick={() => startGame('challenge')}
                                    className="group relative px-8 py-4 bg-blue-500 hover:bg-blue-400 text-slate-900 font-black text-lg rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1 flex-1 max-w-xs"
                                >
                                    <span className="relative z-10 flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-2">
                                            EMPEZAR RETO
                                            <Trophy className="w-5 h-5 opacity-50" />
                                        </div>
                                        <span className="text-xs opacity-70 font-bold tracking-wider">MODO RETO</span>
                                    </span>
                                </button>

                                <button
                                    onClick={() => startGame('practice')}
                                    className="group relative px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-black text-lg rounded-2xl transition-all border border-white/10 hover:border-white/20 hover:-translate-y-1 flex-1 max-w-xs"
                                >
                                    <span className="relative z-10 flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-2">
                                            PRÁCTICA
                                            <ArrowCounterClockwise className="w-5 h-5 opacity-50" />
                                        </div>
                                        <span className="text-xs opacity-50 font-bold tracking-wider">SIN LÍMITE</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* WON OVERLAY - Unified with Map style */}
                    <AnimatePresence>
                        {gameState === 'finished' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]"
                            >
                                <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                                    {gameMode === 'challenge' && timeLeft === 0 ? (
                                        <Skull className="w-16 h-16 text-red-400 animate-pulse" />
                                    ) : (
                                        <Trophy className="w-16 h-16 text-yellow-400 animate-bounce" />
                                    )}
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    {gameMode === 'challenge' && timeLeft === 0 ? '¡Tiempo Agotado!' : '¡Reto Completado!'}
                                </h2>

                                <div className="flex gap-12 mb-8 mt-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Tiempo</span>
                                        <span className="text-4xl font-black text-white">{elapsedTime}s</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Errores</span>
                                        <span className="text-4xl font-black text-red-500">{errors}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setGameState('start')} // Back to start screen
                                    className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105"
                                >
                                    <ArrowCounterClockwise className="w-5 h-5" /> Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* View Switch Overlay Buttons */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-slate-900/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl">
                        <button
                            onClick={() => { setRotation(0); setMatches({}); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${rotation === 0 ? 'bg-white text-slate-900 shadow-lg' : 'text-white/40 hover:text-white'}`}
                        >
                            VISTA FRONTAL
                        </button>
                        <button
                            onClick={() => { setRotation(180); setMatches({}); }}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${rotation === 180 ? 'bg-white text-slate-900 shadow-lg' : 'text-white/40 hover:text-white'}`}
                        >
                            VISTA TRASERA
                        </button>
                    </div>

                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none translate-y-[5%]">
                        <div className="relative w-full h-full max-w-[720px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={rotation}
                                    initial={{ opacity: 0, rotateY: rotation === 0 ? -15 : 15 }}
                                    animate={{ opacity: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, rotateY: rotation === 0 ? 15 : -15 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-full h-[800px]"
                                >
                                    <Image
                                        src={`/images/games/skeleton-3d-${rotation}.png`}
                                        alt={`Human Skeleton Rotation ${rotation}`}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <svg
                        ref={svgRef}
                        viewBox="-100 0 1000 1000"
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
                                    x1={label.labelX < 400 ? label.labelX + 200 : label.labelX} // Right edge if on left, left edge if on right
                                    y1={label.labelY + 30}  // Center of label height
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
                                            ? 'bg-transparent border-emerald-500/50 text-slate-900 pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                            : 'bg-slate-800/90 border-white/20 hover:border-blue-500/50 hover:bg-slate-800 text-white'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold uppercase tracking-wide ${matches[item.id] ? 'text-slate-900' : 'text-white'}`}>
                                            {(t.gamesPage.bones as any)[item.nameKey]}
                                        </span>
                                    </div>
                                </div>
                                {/* Connector Dot for Label */}
                                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white/20 ${item.labelX < 400 ? '-right-1.5' : '-left-1.5'} ${matches[item.id] ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900'}`} />
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
                                            : 'fill-white/10 stroke-white/30 hover:fill-blue-500/30 hover:stroke-blue-400 hover:r-20'
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
