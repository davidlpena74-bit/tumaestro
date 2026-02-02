import { Metadata } from 'next';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';

export const metadata: Metadata = {
    title: 'El Cuenta Cuentos | Cuentos Infantiles Narrados en 4 Idiomas',
    description: 'Disfruta de cuentos infantiles clásicos narrados en cuatro idiomas (Español, Inglés, Francés y Alemán) totalmente gratis. Audiolibros inmersivos para aprender idiomas y mejorar la lectura.',
    keywords: ['cuentos infantiles idiomas', 'cuentacuentos gratis', 'aprender idiomas niños', 'audiolibros infantiles', 'cuentos narrados español ingles frances aleman']
};

export default function StorytellerPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            {/* Main Content */}
            <div className="relative z-20 pt-32 pb-12">
                <StorytellerTool />
            </div>
        </div>
    );
}
