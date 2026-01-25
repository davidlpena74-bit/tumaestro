import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tumaestro.es'

    // List of main static routes
    const routes = [
        '',
        '/profesores',
        '/recursos',
        '/juegos',
        '/juegos/mapa-comunidades',
        '/juegos/mapa-provincias',
        '/juegos/mapa-rios',
        '/juegos/mapa-europa',
        '/juegos/rios-europa',
        '/juegos/capitales-ue',
        '/juegos/capitales-europa',
        '/juegos/celula-animal',
        '/juegos/divisiones',
        '/juegos/quiz-cultura',
        '/recursos/matematicas',
        '/recursos/lengua',
        '/recursos/ingles',
        '/recursos/geografia',
        '/privacidad',
        '/terminos',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    })) as MetadataRoute.Sitemap
}
