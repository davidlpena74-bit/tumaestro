'use client';

import React, { useState, useEffect } from 'react';
import PhysicalMapGame from '@/components/games/PhysicalMapGame';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Waves, Mountain, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DrillDownProps {
    countryName: string;
    continentName: string;
    regionsPaths: Record<string, string>;
    riversPaths?: Record<string, string>;
    mountainsPaths?: Record<string, string>;
    viewBox?: string;
}

type TabType = 'regions' | 'rivers' | 'mountains';

export default function WorldDrillDownGame({
    countryName,
    continentName,
    regionsPaths,
    riversPaths,
    mountainsPaths,
    viewBox = "0 0 800 600"
}: DrillDownProps) {
    const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabType>('regions');

    // Prepare data for PhysicalMapGame
    const isMountains = activeTab === 'mountains';
    const isRivers = activeTab === 'rivers';

    // Heuristic: If it's a mountains game, we use peaks. If rivers, lines.
    const gameType = activeTab === 'regions' ? 'region' : (activeTab === 'rivers' ? 'line' : 'peak');

    const handleBack = () => {
        const continentSlug = continentName.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/actividades/mapa-${continentSlug}`;
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group"
                        title="Volver"
                    >
                        <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                            {countryName}
                        </h1>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">
                            {continentName} • EXPLORACIÓN DETALLADA
                        </p>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex bg-slate-950/50 p-1.5 rounded-2xl border border-white/5">
                    <TabButton
                        active={activeTab === 'regions'}
                        onClick={() => setActiveTab('regions')}
                        icon={<Map className="w-4 h-4" />}
                        label={language === 'es' ? 'Regiones' : 'Regions'}
                    />
                    {riversPaths && Object.keys(riversPaths).length > 0 && (
                        <TabButton
                            active={activeTab === 'rivers'}
                            onClick={() => setActiveTab('rivers')}
                            icon={<Waves className="w-4 h-4" />}
                            label={language === 'es' ? 'Ríos' : 'Rivers'}
                        />
                    )}
                    {mountainsPaths && Object.keys(mountainsPaths).length > 0 && (
                        <TabButton
                            active={activeTab === 'mountains'}
                            onClick={() => setActiveTab('mountains')}
                            icon={<Mountain className="w-4 h-4" />}
                            label={language === 'es' ? 'Montañas' : 'Mountains'}
                        />
                    )}
                </div>
            </div>

            {/* THE GAME AREA */}
            <div className="relative min-h-[600px] bg-slate-900/20 rounded-[3rem] overflow-hidden border border-white/5 shadow-inner">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        <PhysicalMapGame
                            taskId={activeTab === 'regions' ? `regions-${countryName}` : `phys-${countryName}-${activeTab}`}
                            title={countryName}
                            regionName={countryName}
                            viewBox={viewBox}
                            interactivePaths={
                                activeTab === 'regions' ? regionsPaths :
                                    (activeTab === 'rivers' ? riversPaths || {} : mountainsPaths || {})
                            }
                            backgroundPaths={{}} // Could add neighbors here
                            gameType={gameType as any}
                            colorTheme={activeTab === 'regions' ? 'emerald' : (activeTab === 'rivers' ? 'blue' : 'orange')}
                            initialZoom={1}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all
                ${active
                    ? 'bg-emerald-500 text-slate-900 shadow-lg'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'}
            `}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}
