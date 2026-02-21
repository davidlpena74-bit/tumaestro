import { Metadata } from 'next';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';

export const metadata: Metadata = {
    title: 'Lectura Juvenil | Historias para Jóvenes de 10-12 Años',
    description: 'Explora nuestra colección de lectura juvenil diseñada para chicos de 10 a 12 años. Historias vibrantes, aventuras y misterios que fomentan el hábito de la lectura.',
    keywords: ['lectura juvenil', 'libros para 10-12 años', 'diario juvenil', 'historias para jóvenes', 'comprensión lectora avanzada'],
    alternates: {
        canonical: '/material/lectura-juvenil',
    }
};

export default function LecturaJuvenilPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            {/* Main Content */}
            <div className="relative z-20 pt-32 pb-12">
                <StorytellerTool category="juvenile" />
            </div>
        </div>
    );
}
