import { MetadataRoute } from 'next'
import { BOOKS } from '@/components/resources/storyteller/books-data'

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
        'capitales-europa',
        'capitales-ue',
        'celula-animal',
        'divisiones',
        'esqueleto',
        'mapa-comunidades',
        'mapa-europa',
        'mapa-provincias',
        'multiplicaciones',
        'musculos',
        'verbos-irregulares'
    ].map(slug => ({
        url: `${baseUrl}/actividades/${slug}`,
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
        ...activities
    ]
}
