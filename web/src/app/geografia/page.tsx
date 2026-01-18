'use client';

import { useState } from 'react';

const REGIONS = [
    { id: 'galicia', name: 'Galicia', capital: 'Santiago de Compostela', top: '15%', left: '20%' },
    { id: 'asturias', name: 'Principado de Asturias', capital: 'Oviedo', top: '13%', left: '32%' },
    { id: 'cantabria', name: 'Cantabria', capital: 'Santander', top: '14%', left: '43%' },
    { id: 'paisvasco', name: 'País Vasco', capital: 'Vitoria-Gasteiz', top: '15%', left: '52%' },
    { id: 'navarra', name: 'Comunidad Foral de Navarra', capital: 'Pamplona', top: '18%', left: '60%' },
    { id: 'aragon', name: 'Aragón', capital: 'Zaragoza', top: '25%', left: '65%' },
    { id: 'cataluna', name: 'Cataluña', capital: 'Barcelona', top: '25%', left: '82%' },
    { id: 'castillaleon', name: 'Castilla y León', capital: 'Valladolid', top: '30%', left: '35%' },
    { id: 'rioja', name: 'La Rioja', capital: 'Logroño', top: '20%', left: '55%' },
    { id: 'madrid', name: 'Comunidad de Madrid', capital: 'Madrid', top: '42%', left: '46%' },
    { id: 'extremadura', name: 'Extremadura', capital: 'Mérida', top: '55%', left: '25%' },
    { id: 'castillalamancha', name: 'Castilla-La Mancha', capital: 'Toledo', top: '55%', left: '50%' },
    { id: 'valencia', name: 'Comunidad Valenciana', capital: 'Valencia', top: '50%', left: '70%' },
    { id: 'murcia', name: 'Región de Murcia', capital: 'Murcia', top: '70%', left: '65%' },
    { id: 'andalucia', name: 'Andalucía', capital: 'Sevilla', top: '75%', left: '35%' },
    { id: 'baleares', name: 'Islas Baleares', capital: 'Palma', top: '55%', left: '90%' },
    { id: 'canarias', name: 'Islas Canarias', capital: 'Las Palmas / Santa Cruz', top: '85%', left: '15%' }, // Inset box typically
];

export default function GeographyPage() {
    const [activeRegion, setActiveRegion] = useState<typeof REGIONS[0] | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 text-white p-4 md:p-8 flex flex-col items-center">

            {/* HEADER */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-teal-300 drop-shadow-lg">
                🗺️ Mapa Interactivo de España
            </h1>
            <p className="text-gray-300 mb-8 text-center max-w-2xl">
                Aprende las Comunidades Autónomas y sus capitales. Haz clic en los puntos interactivos para descubrir información.
            </p>

            {/* MAP CONTAINER */}
            <div className="relative w-full max-w-4xl aspect-[4/3] bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden group">

                {/* MAP BACKGROUND IMAGE */}
                {/* Usamos un mapa mudo de España de Wikimedia */}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mapa_CCAA_España.svg/1200px-Mapa_CCAA_España.svg.png"
                    alt="Mapa de España"
                    className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* INTERACTIVE POINTS */}
                {REGIONS.map((region) => (
                    <button
                        key={region.id}
                        onClick={() => setActiveRegion(region)}
                        className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10
              ${activeRegion?.id === region.id ? 'bg-teal-500 scale-125' : 'bg-orange-500 hover:bg-orange-400 hover:scale-110'}
            `}
                        style={{ top: region.top, left: region.left }}
                        aria-label={region.name}
                    >
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-20"></span>
                    </button>
                ))}

                {/* INFO CARD OVERLAY */}
                {activeRegion && (
                    <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-teal-500/50 shadow-2xl animate-fade-in-up z-20">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-2xl font-bold text-teal-300">{activeRegion.name}</h2>
                            <button onClick={() => setActiveRegion(null)} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">Capital</p>
                        <p className="text-white text-xl font-medium">{activeRegion.capital}</p>

                        <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                            <span className="px-3 py-1 bg-teal-500/20 text-teal-200 text-xs rounded-full">Comunidad Autónoma</span>
                        </div>
                    </div>
                )}

            </div>

            {/* FOOTER NAV */}
            <div className="mt-12">
                <a href="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-bold transition text-white border border-white/20">
                    ← Volver al Inicio
                </a>
            </div>

        </div>
    );
}
