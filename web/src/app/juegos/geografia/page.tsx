'use client';

import Link from 'next/link';
import { ArrowLeft, Map, FileText, Download, Globe2, Landmark } from 'lucide-react';

const SECTIONS = [
    {
        id: 'espana',
        title: 'Geografía de España',
        icon: <Map className="w-8 h-8 text-emerald-400" />,
        resources: [
            { title: 'Mapa Interactivo: Provincias', type: 'Game', link: '/juegos/mapa-provincias', category: 'Geografía' },
            { title: 'Mapa Interactivo: Comunidades Autónomas', type: 'Game', link: '/juegos/mapa-comunidades', category: 'Geografía' },
            { title: 'Mapa Interactivo: Ríos de España', type: 'Game', link: '/juegos/mapa-rios', category: 'Hidrografía' },
            { title: 'Climas de España: Esquema Completo', type: 'PDF', category: 'PAU / Bachillerato', isDownload: true },
        ]
    },
    {
        id: 'europa',
        title: 'Geografía de Europa',
        icon: <Globe2 className="w-8 h-8 text-blue-400" />,
        resources: [
            { title: 'Mapa Interactivo: Países de Europa', type: 'Game', link: '/juegos/mapa-europa', category: 'Geografía Política' },
            { title: 'Ríos de Europa: Reto Interactivo', type: 'Game', link: '/juegos/rios-europa', category: 'Hidrografía' },
            { title: 'Capitales de Europa: Quiz', type: 'Game', link: '/juegos/capitales-europa', category: 'Cultura General' },
            { title: 'La Unión Europea: Instituciones y Países', type: 'PDF', category: 'Geografía Política', isDownload: true },
        ]
    },
    {
        id: 'america',
        title: 'Geografía de América',
        icon: <Landmark className="w-8 h-8 text-amber-400" />,
        resources: [
            { title: 'Mapa Interactivo: Países de América', type: 'Game', link: '/juegos/mapa-america', category: 'Geografía Política' },
            { title: 'Relieve de América: Cordilleras y Llanuras', type: 'PDF', category: 'Geografía Física', isDownload: true },
            { title: 'Capitales de América Latina', type: 'Quiz', category: 'Geografía Política' },
            { title: 'Hidrografía: El Amazonas y grandes ríos', type: 'Doc', category: 'Hidrografía', isDownload: true },
        ]
    },
    {
        id: 'africa',
        title: 'Geografía de África',
        icon: <Globe2 className="w-8 h-8 text-orange-400" />,
        resources: [
            { title: 'Mapa Interactivo: Países de África', type: 'Game', link: '/juegos/mapa-africa', category: 'Geografía Política' },
            { title: 'Relieve Africano y Grandes Lagos', type: 'PDF', category: 'Geografía Física', isDownload: true },
        ]
    },
    {
        id: 'asia-oceania',
        title: 'Asia y Oceanía',
        icon: <Globe2 className="w-8 h-8 text-violet-400" />,
        resources: [
            { title: 'Mapa Interactivo: Asia y Oceanía', type: 'Game', link: '/juegos/mapa-asia-oceania', category: 'Geografía Política' },
            { title: 'Economía: Los tigres asiáticos', type: 'PDF', category: 'Geografía Humana', isDownload: true },
        ]
    }
];

export default function GeografiaPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/material" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" /> Volver a Biblioteca
                </Link>

                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
                        Recursos de Geografía
                    </h1>
                    <p className="text-xl text-gray-400">Mapas interactivos, esquemas y material de estudio organizado por regiones.</p>
                </header>

                <div className="space-y-16">
                    {SECTIONS.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-20">
                            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    {section.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                {section.resources.map((resource, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition group flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className={`p-2 rounded-lg ${resource.type === 'Game' ? 'bg-teal-500/20 text-teal-400' : 'bg-white/10 text-gray-400'}`}>
                                                {resource.type === 'Game' ? <Map className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                            </div>
                                            <div className="overflow-hidden">
                                                <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                                                    {resource.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                    {resource.category} • {resource.type}
                                                </p>
                                            </div>
                                        </div>

                                        {resource.link ? (
                                            <Link
                                                href={resource.link}
                                                className="ml-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-black rounded-lg transition shrink-0"
                                            >
                                                ENTRAR
                                            </Link>
                                        ) : resource.isDownload ? (
                                            <button className="ml-4 p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white shrink-0">
                                                <Download className="w-5 h-5" />
                                            </button>
                                        ) : (
                                            <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-500 font-bold shrink-0">PRÓXIMAMENTE</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <footer className="mt-20 pt-10 border-t border-white/5 text-center text-gray-500 text-sm italic">
                    Actualizamos nuestra biblioteca de recursos semanalmente. Si buscas algo específico, contacta con tu profesor.
                </footer>
            </div>
        </main>
    );
}
