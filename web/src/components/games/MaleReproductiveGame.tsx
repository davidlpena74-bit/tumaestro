'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    CheckCircle,
    HandGrabbing,
    ArrowCounterClockwise,
    Dna
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import GameHUD from './GameHUD';
import { useGameLogic } from '@/hooks/useGameLogic';

type ReproductivePart = {
    id: string;
    nameKey: string;
    x: number;
    y: number;
    lx: number;
    ly: number;
};

// Calibrated coordinates matching the sagittal diagram (relative to viewBox -200 0 1200 1000)
const REPRODUCTIVE_PARTS: ReproductivePart[] = [
    { id: 'bladder', nameKey: 'bladder', x: 371, y: 321, lx: 700, ly: 310 },
    { id: 'seminalVesicle', nameKey: 'seminalVesicle', x: 310, y: 372, lx: 700, ly: 395 },
    { id: 'vasDeferens', nameKey: 'vasDeferens', x: 468, y: 514, lx: 700, ly: 260 },
    { id: 'prostate', nameKey: 'prostate', x: 359, y: 417, lx: 700, ly: 440 },
    { id: 'urethra', nameKey: 'urethra', x: 592, y: 537, lx: 700, ly: 565 },
    { id: 'penis', nameKey: 'penis', x: 585, y: 445, lx: 700, ly: 600 },
    { id: 'glans', nameKey: 'glans', x: 636, y: 629, lx: 700, ly: 730 },
    { id: 'testicle', nameKey: 'testicle', x: 502, y: 650, lx: 700, ly: 755 },
    { id: 'scrotum', nameKey: 'scrotum', x: 469, y: 718, lx: 700, ly: 840 },
    { id: 'epididymis', nameKey: 'epididymis', x: 460, y: 589, lx: 700, ly: 660 },
];

export default function MaleReproductiveGame({ taskId = null }: { taskId?: string | null }) {
    const { t, language } = useLanguage();
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

    const [gameMode, setGameMode] = useState<'challenge' | 'practice'>('challenge');

    const {
        gameState, setGameState,
        score, addScore,
        errors, addError,
        timeLeft,
        elapsedTime,
        message, setMessage,
        startGame: hookStartGame,
        resetGame: hookResetGame,
        handleFinish
    } = useGameLogic({ initialTime: 120, penaltyTime: 10, gameMode, taskId });

    const startGame = (mode: 'challenge' | 'practice' = 'challenge') => {
        setGameMode(mode);
        hookStartGame();
        setMatches({});
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

    const labelPositions = React.useMemo(() => {
        const sortedByY = [...REPRODUCTIVE_PARTS].sort((a, b) => a.y - b.y);
        const unmatchedSorted = REPRODUCTIVE_PARTS
            .filter(p => !matches[p.id])
            .sort((a, b) => {
                const nameA = (t.gamesPage.reproductive as any)[a.nameKey] || '';
                const nameB = (t.gamesPage.reproductive as any)[b.nameKey] || '';
                return nameA.localeCompare(nameB, language);
            });

        return REPRODUCTIVE_PARTS.map((part) => {
            const isMatched = !!matches[part.id];
            const yOrderIndex = sortedByY.findIndex(p => p.id === part.id);
            const unmatchedIndex = unmatchedSorted.findIndex(p => p.id === part.id);

            return {
                ...part,
                labelX: isMatched ? 750 : -150,
                labelY: 100 + ((isMatched ? yOrderIndex : unmatchedIndex) * 70)
            };
        });
    }, [matches, t, language]);

    const finishGame = () => {
        setGameState('finished');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4ade80', '#3b82f6', '#ffffff']
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
        if (gameState !== 'playing') return;
        if (type === 'label' && matches[id]) return;
        if (type === 'point' && Object.values(matches).includes(id)) return;

        e.stopPropagation();
        const { x: svgX, y: svgY } = getSVGCoordinates(e);

        setDragState({
            active: true,
            startId: id,
            startType: type,
            startX: type === 'point' ? x : (x < 400 ? x + 200 : x),
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

        if (droppedId && droppedType && droppedType !== dragState.startType) {
            const labelId = dragState.startType === 'label' ? dragState.startId : droppedId;
            const partId = dragState.startType === 'point' ? dragState.startId : droppedId;

            if (labelId === partId) {
                const newMatches = { ...matches, [labelId!]: partId! };
                setMatches(newMatches);
                confetti({
                    particleCount: 30,
                    spread: 40,
                    origin: { y: 0.6 },
                    colors: ['#34d399', '#ffffff']
                });
                addScore(100);
                if (Object.keys(newMatches).length === REPRODUCTIVE_PARTS.length) {
                    handleFinish();
                }
            } else {
                addError();
                addScore(gameMode === 'challenge' ? -20 : -5);
            }
        }

        setDragState(prev => ({ ...prev, active: false, startId: null, startType: null }));
    };

    return (
        <div className="w-full px-4 md:px-8 pb-4 md:pb-8 pt-0 select-none">
            <GameHUD
                title={t.gamesPage.gameTitles.maleReproductive}
                score={score}
                errors={errors}
                timeLeft={timeLeft}
                elapsedTime={elapsedTime}
                gameMode={gameMode}
                totalTargets={REPRODUCTIVE_PARTS.length}
                remainingTargets={REPRODUCTIVE_PARTS.length - Object.keys(matches).length}
                targetName=""
                onReset={() => setGameState('start')}
                colorTheme="blue"
                message={message}
                icon={<Dna className="w-8 h-8 text-blue-400" weight="duotone" />}
            />

            <div className="w-full">
                <div
                    ref={diagramRef}
                    className="w-full bg-transparent border border-white/10 p-6 rounded-[2.5rem] relative flex items-center justify-center z-10 min-h-[850px] overflow-hidden cursor-crosshair select-none shadow-2xl"
                >
                    {gameState === 'start' && (
                        <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]">
                            <div className="bg-blue-500/10 p-6 rounded-full mb-6 ring-1 ring-blue-500/30">
                                <HandGrabbing className="w-16 h-16 text-blue-400" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                                {t.gamesPage.gameTitles.maleReproductive}
                            </h2>
                            <p className="text-gray-300 mb-8 max-w-xl text-lg leading-relaxed font-medium">
                                {t.gamesPage.gameTitles.maleReproductiveDesc}. Arrastra cada etiqueta para conectarla con su ubicación correspondiente. Si te equivocas, la línea no se fijará.
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

                    <AnimatePresence>
                        {gameState === 'finished' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 rounded-[2rem]"
                            >
                                <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/30">
                                    {gameMode === 'challenge' && timeLeft === 0 ? (
                                        <Trophy className="w-16 h-16 text-red-400 animate-pulse" />
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
                                    onClick={() => setGameState('start')}
                                    className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all hover:scale-105"
                                >
                                    <ArrowCounterClockwise className="w-5 h-5" /> Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* EXACT CLONE OF IMAGE CONTAINER */}
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <div className="relative w-[700px] h-full overflow-hidden -translate-y-10">
                            <img
                                src="/images/games/male-reproductive-system.png"
                                alt="Male Reproductive Anatomy"
                                className="object-contain w-full h-full p-12"
                            />
                        </div>
                    </div>

                    <svg
                        ref={svgRef}
                        viewBox="-200 0 1200 1000"
                        className="absolute inset-0 w-full h-full z-20"
                        onMouseMove={handleDragMove}
                        onTouchMove={handleDragMove}
                        onMouseUp={(e) => handleDragEnd(e)}
                        onTouchEnd={(e) => handleDragEnd(e)}
                        onMouseLeave={(e) => handleDragEnd(e)}
                    >
                        {/* Dragging Line */}
                        {dragState.active && (
                            <line
                                x1={dragState.startX}
                                y1={dragState.startY}
                                x2={dragState.currX}
                                y2={dragState.currY}
                                stroke="#4ade80"
                                strokeWidth="4"
                                strokeDasharray="8 8"
                            />
                        )}

                        {/* Connection Lines */}
                        {Object.entries(matches).map(([labelId, partId]) => {
                            const part = REPRODUCTIVE_PARTS.find(p => p.id === partId);
                            const label = labelPositions.find(p => p.id === labelId);
                            if (!part || !label) return null;
                            const isRight = label.labelX > 500;
                            return (
                                <line
                                    key={`line-${labelId}`}
                                    x1={isRight ? label.labelX : label.labelX + 200}
                                    y1={label.labelY + 25}
                                    x2={part.x}
                                    y2={part.y}
                                    stroke="#4ade80"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            );
                        })}

                        {/* Connection Points */}
                        {REPRODUCTIVE_PARTS.map((part) => (
                            <g
                                key={`point-${part.id}`}
                                onMouseDown={(e) => handleDragStart(e, part.id, 'point', part.x, part.y)}
                                onMouseUp={(e) => handleDragEnd(e, part.id, 'point')}
                                onTouchStart={(e) => handleDragStart(e, part.id, 'point', part.x, part.y)}
                                onTouchEnd={(e) => handleDragEnd(e, part.id, 'point')}
                                className="cursor-pointer"
                            >
                                <circle
                                    cx={part.x}
                                    cy={part.y}
                                    r="15"
                                    fill={Object.values(matches).includes(part.id) ? "#4ade80" : "rgba(255,255,255,0.1)"}
                                    stroke={Object.values(matches).includes(part.id) ? "#4ade80" : "white"}
                                    strokeWidth="2"
                                    className="transition-all hover:r-[18px]"
                                />
                                {Object.values(matches).includes(part.id) && (
                                    <CheckCircle
                                        cx={part.x - 10} cy={part.y - 10}
                                        className="text-white w-5 h-5 pointer-events-none"
                                        weight="fill"
                                    />
                                )}
                            </g>
                        ))}

                        {/* Labels */}
                        {labelPositions.map((label) => {
                            const isMatched = !!matches[label.id];
                            return (
                                <motion.g
                                    key={`label-${label.id}`}
                                    layout
                                    initial={false}
                                    animate={{ x: label.labelX, y: label.labelY }}
                                    className={isMatched ? "pointer-events-none" : "cursor-grab active:cursor-grabbing"}
                                    onMouseDown={(e) => handleDragStart(e, label.id, 'label', label.labelX, label.labelY)}
                                    onMouseUp={(e) => handleDragEnd(e, label.id, 'label')}
                                    onTouchStart={(e) => handleDragStart(e, label.id, 'label', label.labelX, label.labelY)}
                                    onTouchEnd={(e) => handleDragEnd(e, label.id, 'label')}
                                >
                                    <rect
                                        width="200" height="50"
                                        rx="10"
                                        fill={isMatched ? "rgba(74, 222, 128, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                                        stroke={isMatched ? "#4ade80" : "white"}
                                        strokeWidth="2"
                                        className="backdrop-blur-sm"
                                    />
                                    <text
                                        x="100" y="32"
                                        textAnchor="middle"
                                        className={`text-sm font-bold uppercase tracking-wider select-none ${isMatched ? "fill-slate-900" : "fill-white"}`}
                                    >
                                        {(t.gamesPage.reproductive as any)[label.nameKey]}
                                    </text>
                                    {!isMatched && (
                                        <HandGrabbing x="175" y="15" className="w-5 h-5 text-white/30" />
                                    )}
                                </motion.g>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
}
