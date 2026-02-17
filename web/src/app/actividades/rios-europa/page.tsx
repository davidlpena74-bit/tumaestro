import { Metadata } from 'next';
import EuropeRiversClient from './EuropeRiversClient';

export const metadata: Metadata = {
    title: 'Ríos de Europa - Juego de Hidrografía Interactiva | TuMaestro.es',
    description: 'Aprende los ríos más importantes de Europa: el Danubio, el Rin, el Volga y muchos más. ¡Ponte a prueba en nuestro mapa interactivo gratuito!',
    keywords: ['ríos de europa', 'hidrografía europa', 'juego interactivo', 'danubio', 'rin', 'volga', 'geografía continental'],
    alternates: {
        canonical: 'https://tumaestro.es/actividades/rios-europa',
    },
};

export default function EuropeRiversPage() {
    return <EuropeRiversClient />;
}
