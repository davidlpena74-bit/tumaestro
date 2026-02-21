import { Metadata } from 'next';
import RecursosClient from '@/components/RecursosClient';

export const metadata: Metadata = {
    title: 'Material Didáctico y Recursos Educativos Gratis',
    description: 'Descarga apuntes y ejercicios, y accede a herramientas de lectura como cuentos clásicos infantiles narrados en cuatro idiomas (Español, Inglés, Francés y Alemán) gratis y dictados interactivos para mejorar la escritura.',
    keywords: ['apuntes gratis', 'material didactico', 'cuentos infantiles multiidioma', 'ejercicios resueltos', 'recursos educativos', 'primaria', 'secundaria', 'cuentos narrados gratis'],
    alternates: {
        canonical: 'https://tumaestro.es/material',
    },
};

export default function RecursosPage() {
    return <RecursosClient />;
}
