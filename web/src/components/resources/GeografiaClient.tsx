'use client';

import Link from 'next/link';
import { ArrowLeft, Map, FileText, Download, Globe2, Landmark } from 'lucide-react';

interface Resource {
    title: string;
    type: string;
    link?: string;
    category: string;
    isDownload?: boolean;
}

interface Section {
    id: string;
    title: string;
    icon: React.ReactNode;
    resources: Resource[];
}

interface GeografiaClientProps {
    sections: Section[];
}

export default function GeografiaClient({ sections }: GeografiaClientProps) {
    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 md:px-8 pb-4 md:pb-8 pt-0">
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
                    {sections.map((section) => (
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
