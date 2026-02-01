import { Metadata } from 'next';
import RecursosClient from '@/components/RecursosClient';

export const metadata: Metadata = {
    title: 'Material Didáctico y Recursos Educativos Gratis',
    description: 'Descarga apuntes y ejercicios, y accede a herramientas de lectura como cuentacuentos y dictados para mejorar la comprensión lectora y escritura. Material educativo completo y gratuito.',
    keywords: ['apuntes gratis', 'material didactico', 'ejercicios resueltos', 'recursos educativos', 'primaria', 'secundaria', 'bachillerato', 'estudiar online'],
    alternates: {
        canonical: 'https://tumaestro.es/recursos',
    },
};

export default function RecursosPage() {
    return <RecursosClient />;
}
