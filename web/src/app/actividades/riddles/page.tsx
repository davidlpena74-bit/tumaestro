import { Metadata } from 'next';
import RiddlesClient from './RiddlesClient';

export const metadata: Metadata = {
    title: 'Adivinanzas Mágicas | TuMaestro.es',
    description: 'Pon a prueba tu ingenio con nuestra colección de adivinanzas clásicas.',
};

export default function RiddlesPage() {
    return <RiddlesClient />;
}
