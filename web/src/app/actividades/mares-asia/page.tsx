
import { Metadata } from 'next';
import MaresAsiaClient from './MaresAsiaClient';

export const metadata: Metadata = {
    title: 'Mares y Océanos de Asia - Juego | TuMaestro.es',
    description: 'Ubica los mares y océanos más importantes del continente asiático.',
};

export default function MaresAsiaPage() {
    return <MaresAsiaClient />;
}
