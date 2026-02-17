import { Metadata } from 'next';
import IntelligenceClient from './IntelligenceClient';

export const metadata: Metadata = {
    title: 'Retos de Inteligencia | TuMaestro.es',
    description: 'Entrena tu mente con nuestros retos de inteligencia, acertijos y juegos de lógica diseñados para todas las edades.',
    keywords: ['retos de inteligencia', 'juegos de logica', 'acertijos', 'razonamiento lateral', 'entrenamiento mental']
};

export default function IntelligencePage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            <div className="relative z-20 pt-32 pb-12">
                <IntelligenceClient />
            </div>
        </div>
    );
}
