import { Suspense } from 'react';
import { Metadata } from 'next';
import ValoracionesClient from './ValoracionesClient';

export const metadata: Metadata = {
    title: 'Valoraciones y Comentarios | TuMaestro.es',
    description: 'Consulta las valoraciones y comentarios de otros usuarios sobre nuestras actividades educativas.',
};

export function generateStaticParams() {
    return [
        { slug: 'mapa-comunidades' },
        { slug: 'mapa-provincias' },
        { slug: 'mapa-rios' },
        { slug: 'montanas-espana' },
        { slug: 'mapa-europa' },
        { slug: 'capitales-ue' },
        { slug: 'capitales-europa' },
        { slug: 'rios-europa' },
        { slug: 'capitales-europa-match' },
        { slug: 'montanas-europa' },
        { slug: 'mares-europa' },
        { slug: 'mapa-norteamerica' },
        { slug: 'mapa-sudamerica' },
        { slug: 'mapa-usa' },
        { slug: 'mapa-america' },
        { slug: 'montanas-america' },
        { slug: 'mares-america' },
        { slug: 'mapa-africa' },
        { slug: 'mapa-asia' },
        { slug: 'montanas-asia' },
        { slug: 'mares-asia' },
        { slug: 'mapa-oceania' },
        { slug: 'montanas-oceania' },
        { slug: 'mares-oceania' },
        { slug: 'celula-animal' },
        { slug: 'celula-vegetal' },
        { slug: 'sistema-reproductor-masculino' },
        { slug: 'sistema-reproductor-femenino' },
        { slug: 'musculos' },
        { slug: 'esqueleto' },
        { slug: 'verbos-irregulares-basico' },
        { slug: 'verbos-irregulares' },
        { slug: 'verbos-irregulares-pro' },
        { slug: 'verbos-irregulares-master' },
        { slug: 'verbos-irregulares-basico-pronunciacion' },
        { slug: 'verbos-irregulares-pronunciacion' },
        { slug: 'verbos-irregulares-pro-pronunciacion' },
        { slug: 'verbos-irregulares-master-pronunciacion' },
        { slug: 'divisiones' },
        { slug: 'multiplicaciones' },
        { slug: 'riddles' },
        { slug: 'logic' },
        { slug: 'quiz-cultura' }
    ];
}

export default async function ValoracionesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return (
        <Suspense fallback={null}>
            <ValoracionesClient slug={slug} />
        </Suspense>
    );
}
