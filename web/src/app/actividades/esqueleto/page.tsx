import { Metadata } from 'next';
import EsqueletoClient from './EsqueletoClient';

export const metadata: Metadata = {
    title: 'El Esqueleto Humano | Juego de Anatomía Interactiva 3D',
    description: 'Aprende los huesos del cuerpo humano con nuestro juego interactivo. Identifica el cráneo, fémur, costillas y más en un modelo 3D detallado.',
    keywords: ['esqueleto humano', 'huesos del cuerpo', 'juego anatomia', 'ciencias naturales primaria', 'aprender huesos 3d', 'biologia interactiva'],
    alternates: {
        canonical: '/actividades/esqueleto',
    }
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <EsqueletoClient />
        </Suspense>
    );
}
