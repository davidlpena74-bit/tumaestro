import { Metadata } from 'next';
import DictationTool from '@/components/resources/DictationTool';
import PageBackground from '@/components/PageBackground';

export const metadata: Metadata = {
    title: 'Dictados Interactivos Online | Mejora tu Ortografía',
    description: 'Practica ortografía y comprensión auditiva con nuestros dictados interactivos gratuitos. Varios niveles de dificultad para primaria y secundaria.',
    keywords: ['dictados online', 'ejercicios ortografia', 'aprender a escribir', 'recursos lengua', 'practica dictado']
};

export default function DictadosPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0f172a]">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-900 to-transparent z-10" />

            <PageBackground />

            <div className="relative z-20 pt-32 pb-12">
                <DictationTool />
            </div>
        </div>
    );
}
