import { Metadata } from 'next';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';
import PageBackground from '@/components/PageBackground';

export const metadata: Metadata = {
    title: 'El Cuenta Cuentos | Libros Infantiles Narrados Online',
    description: 'Disfruta de una experiencia de lectura inmersiva con nuestra herramienta El Cuenta Cuentos. Libros clásicos narrados con voz mágica para niños de todas las edades.',
    keywords: ['cuentacuentos online', 'libros infantiles narrados', 'lectura inmersiva niños', 'cuentos gratis para niños', 'audiolibros infantiles']
};

export default function StorytellerPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            <PageBackground />

            {/* Main Content */}
            <div className="relative z-20 pt-32 pb-12">
                <StorytellerTool />
            </div>
        </div>
    );
}
