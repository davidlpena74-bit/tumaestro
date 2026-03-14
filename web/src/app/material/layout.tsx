import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Recursos y Apuntes Gratuitos | TuMaestro.es',
    description: 'Descarga apuntes de matemáticas, lengua, historia y más. Cuentos infantiles narrados en cuatro idiomas gratis y material didáctico verificado por profesores.',
};

export default function RecursosLayout({
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

