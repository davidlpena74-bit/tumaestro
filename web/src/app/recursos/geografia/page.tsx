'use client';

import Link from 'next/link';
import { ArrowLeft, Map, FileText, Download } from 'lucide-react';

export default function GeografiaPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/recursos" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Volver a Biblioteca
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
                        Historia y Geografía
                    </h1>
                    <p className="text-xl text-gray-400">Mapas, cronologías y documentos históricos.</p>
                </header>

                {/* Highlight Game */}
                <div className="mb-8 p-6 bg-gradient-to-r from-teal-900/50 to-emerald-900/50 rounded-2xl border border-teal-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-500/20 rounded-xl text-teal-400">
                            <Map className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-white">¡Practica con el Mapa Interactivo!</h3>
                            <p className="text-teal-200/70">Aprende las provincias jugando antes del examen.</p>
                        </div>
                    </div>
                    <Link href="/juegos/mapa-provincias" className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-lg transition shadow-lg shadow-teal-500/20">
                        Jugar Ahora
                    </Link>
                </div>

                <div className="grid gap-4">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-emerald-300 transition-colors">
                                    Resumen: La Revolución Industrial
                                </h3>
                                <p className="text-sm text-gray-500">4º ESO • Historia</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-emerald-300 transition-colors">
                                    Climas de España: Esquema
                                </h3>
                                <p className="text-sm text-gray-500">1º Bachillerato • Geografía</p>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
