'use client';

import Link from 'next/link';
import { ArrowLeft, Gamepad2, ScrollText, Download } from 'lucide-react';

export default function IdiomasPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/material" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Volver a Biblioteca
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-600 mb-4">
                        Inglés
                    </h1>
                    <p className="text-xl text-gray-400">Recursos de gramática, vocabulario y verbos irregulares.</p>
                </header>

                <div className="grid gap-4">
                    {/* Game Card */}
                    <Link href="/juegos/verbos-irregulares" className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-pink-500/20 rounded-xl text-pink-400">
                                <Gamepad2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg group-hover:text-pink-300 transition-colors">
                                    Juego: Verbos Irregulares
                                </h3>
                                <p className="text-sm text-gray-500">Practica los tiempos verbales (Past Simple & Participle)</p>
                            </div>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </div>
                    </Link>

                    {/* Placeholder Resources */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                    <ScrollText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-blue-300 transition-colors">
                                        Lista de Vocabulario: Unit {i}
                                    </h3>
                                    <p className="text-sm text-gray-500">B1 Preliminary • Tema {i}</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
