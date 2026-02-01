import { Metadata } from 'next';
import DictationTool from '@/components/resources/DictationTool';
import PageBackground from '@/components/PageBackground';

export const metadata: Metadata = {
    title: 'Dictados Interactivos Online | Mejora tu Ortografía',
    description: 'Domina la ortografía escribiendo. Dictados interactivos con autocorrección para todos los niveles. La forma más eficaz de mejorar tu escritura.',
    keywords: ['dictados online', 'ejercicios ortografia', 'aprender a escribir', 'recursos lengua', 'practica dictado']
};

export default function DictadosPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            {/* Background is handled by PageBackground globally or passed down */}
            <div className="relative z-20 pt-32 pb-12">
                <DictationTool />
            </div>
        </div>
    );
}
