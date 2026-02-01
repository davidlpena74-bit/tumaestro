import { Metadata } from 'next';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';

export const metadata: Metadata = {
    title: 'El Cuenta Cuentos | Libros Infantiles Narrados Online',
    description: 'Descubre la magia de la lectura. Cuentos clásicos narrados y audiolibros inmersivos que despiertan la imaginación y mejoran la comprensión lectora.',
    keywords: ['cuentacuentos online', 'libros infantiles narrados', 'lectura inmersiva niños', 'cuentos gratis para niños', 'audiolibros infantiles']
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
