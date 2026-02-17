import { Metadata } from 'next';
import DivisionPageClient from '@/components/DivisionPageClient';

export const metadata: Metadata = {
    title: 'Juego de Divisiones: Reparto de Pizzas | TuMaestro.es',
    description: 'Aprende a dividir de forma divertida con nuestro juego interactivo de reparto de pizzas. Ideal para niños en educación primaria que buscan practicar matemáticas.',
    keywords: ['juego de divisiones', 'matemáticas para niños', 'aprender a dividir', 'primaria', 'juegos educativos gratis', 'división con pizzas'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades/divisiones',
    },
};

export default function DivisionPage() {
    return <DivisionPageClient />;
}
