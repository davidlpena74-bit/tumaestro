import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Juegos Educativos Interactivos | TuMaestro.es',
    description: 'Aprende geografía, matemáticas e idiomas jugando. Mapas interactivos de España y Europa, cálculo mental y más.',
};

export default function JuegosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mt-10">
                <Breadcrumbs />
            </div>
            {children}
        </div>
    );
}

