'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Video, Download } from 'lucide-react';

export default function MatematicasPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/recursos" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Volver a Biblioteca
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                        Matemáticas
                    </h1>
                    <p className="text-xl text-gray-400">Recursos de álgebra, cálculo y geometría para todos los niveles.</p>
                </header>

                <div className="grid gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                    {i % 2 === 0 ? <Video className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-blue-300 transition-colors">
                                        {i % 2 === 0 ? 'Video Explicativo: Derivadas' : 'Ejercicios Resueltos: Ecuaciones'}
                                    </h3>
                                    <p className="text-sm text-gray-500">2º Bachillerato • Tema {i}</p>
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
