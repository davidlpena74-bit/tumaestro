import { MetadataRoute } from 'next'
import { BOOKS } from '@/components/resources/storyteller/books-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tumaestro.es'

    // Libros clásicos
    const classicBooks = BOOKS.filter(b => b.category !== 'juvenile').flatMap(book => [
        {
            url: `${baseUrl}/material/cuentos-clasicos/${book.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        ...['en', 'fr', 'de'].map(lang => ({
            url: `${baseUrl}/material/cuentos-clasicos/${book.id}/${lang}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    ])

    // Libros juveniles
    const juvenileBooks = BOOKS.filter(b => b.category === 'juvenile').map(book => ({
        url: `${baseUrl}/material/lectura-juvenil/${book.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Actividades principales
    const activities = [
        'capitales-africa', 'capitales-asia', 'capitales-centroamerica', 'capitales-europa',
        'capitales-europa-match', 'capitales-norteamerica', 'capitales-sudamerica', 'capitales-ue',
        'capitales-usa', 'celula-animal', 'celula-vegetal', 'divisiones', 'esqueleto',
        'mapa-africa', 'mapa-america', 'mapa-asia', 'mapa-centroamerica', 'mapa-comunidades',
        'mapa-continentes', 'mapa-europa', 'mapa-norteamerica', 'mapa-oceania', 'mapa-provincias',
        'mapa-rios', 'mapa-sudamerica', 'mapa-usa', 'mares-africa', 'mares-america', 'mares-asia',
        'mares-europa', 'mares-oceania', 'montanas-africa', 'montanas-america', 'montanas-asia',
        'montanas-espana', 'montanas-europa', 'montanas-oceania', 'multiplicaciones', 'musculos',
        'paises-ue', 'rankings', 'rios-africa', 'rios-europa', 'sistema-reproductor-femenino',
        'sistema-reproductor-masculino', 'verbos-irregulares', 'verbos-irregulares-basico',
        'verbos-irregulares-basico-pronunciacion', 'verbos-irregulares-master',
        'verbos-irregulares-master-pronunciacion', 'verbos-irregulares-pro',
        'verbos-irregulares-pro-pronunciacion', 'verbos-irregulares-pronunciacion'
    ].map(slug => ({
        url: `${baseUrl}/actividades/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Juegos
    const juegos = [
        'logic', 'quiz-cultura', 'riddles'
    ].map(slug => ({
        url: `${baseUrl}/juegos/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Materiales adicionales
    const materialPaths = [
        'cuentos-clasicos', 'dictados', 'geografia', 'idiomas', 'inteligencia',
        'lectura-juvenil', 'matematicas', 'profesor-lectura'
    ].map(slug => ({
        url: `${baseUrl}/material/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/material`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/actividades`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/juegos`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/material/cuentos-clasicos`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/material/lectura-juvenil`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        ...classicBooks,
        ...juvenileBooks,
        ...activities,
        ...juegos,
        ...materialPaths
    ]
}
