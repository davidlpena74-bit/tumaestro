import { Metadata } from 'next';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';

export const metadata: Metadata = {
    title: 'Cuentos Clásicos | Cuentos Infantiles Narrados en 4 Idiomas',
    description: 'Disfruta de cuentos infantiles clásicos narrados en cuatro idiomas (Español, Inglés, Francés y Alemán) totalmente gratis. Audiolibros inmersivos para aprender idiomas y mejorar la lectura.',
    keywords: ['cuentos clásicos', 'cuentos infantiles idiomas', 'cuentacuentos gratis', 'aprender idiomas niños', 'audiolibros infantiles', 'cuentos narrados español ingles frances aleman', 'mejores cuentos para niños gratis'],
    alternates: {
        canonical: '/material/cuentos-clasicos',
    }
};

export default function StorytellerPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            {/* Main Content */}
            <div className="relative z-20 pt-20 pb-12">
                <StorytellerTool />
            </div>
        </div>
    );
}
