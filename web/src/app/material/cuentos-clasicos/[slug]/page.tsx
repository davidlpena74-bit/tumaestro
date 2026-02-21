import { Metadata } from 'next';
import { BOOKS } from '@/components/resources/storyteller/books-data';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BOOKS.filter(b => b.category !== 'juvenile').map((book) => ({
        slug: book.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const book = BOOKS.find((b) => b.id === slug);

    if (!book) return { title: 'Cuento no encontrado' };

    const title = `${book.title} | El mejor cuento infantil gratis - Tu Maestro`;
    const description = `Disfruta de "${book.title}", el mejor cuento infantil con texto y voz sincronizados. Disponible gratis en cuatro idiomas: inglés, francés, alemán y español. ¡Vive una experiencia inmersiva única!`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            // Ensure absolute URL for social sharing images
            images: [`https://tumaestro.es${book.coverImage}`],
            locale: 'es_ES',
            type: 'book',
        },
        keywords: [
            book.title,
            'cuentos infantiles gratis',
            'cuentos narrados con voz',
            'aprender idiomas niños',
            'cuento infantil inglés francés alemán',
            'mejores cuentos para niños'
        ],
        alternates: {
            canonical: `/material/cuentos-clasicos/${slug}`,
            languages: {
                'es': `/material/cuentos-clasicos/${slug}`,
                'en': `/material/cuentos-clasicos/${slug}/en`,
                'fr': `/material/cuentos-clasicos/${slug}/fr`,
                'de': `/material/cuentos-clasicos/${slug}/de`,
                'x-default': `/material/cuentos-clasicos/${slug}`,
            }
        }
    };
}

export default async function BookStoryPage({ params }: Props) {
    const { slug } = await params;
    const book = BOOKS.find((b) => b.id === slug);

    if (!book || book.category === 'juvenile') {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        'name': book.title,
        'description': `Lee "${book.title}", un cuento infantil clásico disponible en varios idiomas con audio sincronizado.`,
        'author': {
            '@type': 'Person',
            'name': book.author || 'Tradicional'
        },
        'image': `https://tumaestro.es${book.coverImage}`,
        'inLanguage': ['es', 'en', 'fr', 'de'],
        'genre': 'Children\'s Literature',
        'isAccessibleForFree': true
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Main Content */}
            <div className="relative z-20 pt-20 pb-12">
                <StorytellerTool initialBookId={slug} />
            </div>
        </div>
    );
}
