import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MathWorksheetGenerator from '@/components/resources/MathWorksheetGenerator';

export const metadata: Metadata = {
    title: 'Generador de Ejercicios de Matemáticas Gratis | Tu Maestro',
    description: 'Crea e imprime infinitas fichas de ejercicios de matemáticas: sumas, restas, multiplicaciones y divisiones personalizadas por nivel y dificultad.',
    keywords: ['ejercicios de matemáticas', 'generador de fichas', 'matemáticas primaria', 'fichas imprimir gratis', 'sumas y restas para niños'],
    alternates: {
        canonical: 'https://tumaestro.es/material/matematicas',
    },
};

export default function MatematicasPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Generador de Ejercicios de Matemáticas',
        'description': 'Herramienta gratuita para generar fichas de ejercicios de matemáticas personalizadas.',
        'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Inicio',
                    'item': 'https://tumaestro.es'
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Material',
                    'item': 'https://tumaestro.es/material'
                },
                {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': 'Matemáticas',
                    'item': 'https://tumaestro.es/material/matematicas'
                }
            ]
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8 print:bg-white print:p-0">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-5xl mx-auto print:max-w-none">
                <div className="print:hidden">
                    <Link href="/material" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Volver a Biblioteca
                    </Link>

                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 mb-4">
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
