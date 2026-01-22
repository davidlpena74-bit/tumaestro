'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Video, Download } from 'lucide-react';
import MathWorksheetGenerator from '@/components/resources/MathWorksheetGenerator';

export default function MatematicasPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 print:bg-white print:p-0">
            <div className="max-w-5xl mx-auto print:max-w-none">
                <div className="print:hidden">
                    <Link href="/recursos" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Volver a Biblioteca
                    </Link>

                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                            Generador de Ejercicios
                        </h1>
                        <p className="text-xl text-gray-400">
                            Crea fichas de ejercicios personalizadas ilimitadas. Selecciona el tipo de operación, dificultad y cantidad, e imprime tu hoja de trabajo.
                        </p>
                    </header>
                </div>

                <MathWorksheetGenerator />
            </div>
        </main>
    );
}
