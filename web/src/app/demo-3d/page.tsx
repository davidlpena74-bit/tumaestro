'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Cargar Spline solo en cliente (sin SSR) para evitar errores de hidratación y buffer
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-full text-white/50 animate-pulse">
            <div className="w-10 h-10 border-4 border-t-pink-500 border-white/10 rounded-full animate-spin mb-4" />
            <p>Cargando experiencia 3D...</p>
        </div>
    ),
});

export default function Demo3DPage() {
    return (
        <div className="w-full min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center relative">

            {/* Texto superpuesto */}
            <div className="absolute top-10 md:top-20 z-10 text-center pointer-events-none px-4">
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-violet-500 mb-6 drop-shadow-2xl">
                    Spline 3D Integration
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
                    Renderizado interactivo en tiempo real.
                    <br />
                    <span className="text-white font-medium">Carga diferida activada.</span>
                </p>
            </div>

            {/* Escena Spline */}
            <div className="w-full h-[600px] md:h-screen flex items-center justify-center">
                <Suspense fallback={<div className="text-white">Iniciando motor 3D...</div>}>
                    {/* Escena alternativa: Abstract Shapes (Oficial Spline) */}
                    <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
                </Suspense>
            </div>

            {/* Botón Volver */}
            <div className="absolute bottom-10 z-10 pointer-events-auto">
                <a href="/" className="group flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)] transition-all duration-300">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span>Volver a TuMaestro</span>
                </a>
            </div>

        </div>
    );
}
