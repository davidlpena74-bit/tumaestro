import { Metadata } from 'next';
import DictationTool from '@/components/resources/DictationTool';
import PageBackground from '@/components/PageBackground';

export const metadata: Metadata = {
    title: 'Dictados Interactivos Online | Mejora tu Escritura Gratis',
    description: 'Domina la ortografía con dictados interactivos gratis. Cuentos clásicos narrados en cuatro idiomas (Español, Inglés, Francés y Alemán) con autocorrección instantánea.',
    keywords: ['dictados online gratis', 'practicar ortografia', 'ejercicios escritura', 'dictados en ingles', 'dictados en frances', 'dictados en aleman']
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
