import { Metadata } from 'next';
import { BOOKS } from '@/components/resources/storyteller/books-data';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BOOKS.filter(b => b.category === 'juvenile').map((book) => ({
        slug: book.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const book = BOOKS.find((b) => b.id === slug);

    if (!book) return { title: 'Libro no encontrado' };

    const title = `${book.title} | Lectura Juvenil - Tu Maestro`;
    const description = `Lee "${book.title}", una historia increíble para chicos de 10 a 12 años. Disfruta de la lectura con audio sincronizado y estilo de diario.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [`https://tumaestro.es${book.coverImage}`],
            locale: 'es_ES',
            type: 'book',
        },
        keywords: [
            book.title,
            'lectura juvenil gratis',
            'libros para adolescentes',
            'diario de dani',
            'historias para niños 10-12 años'
        ],
        alternates: {
            canonical: `/material/lectura-juvenil/${slug}`
        }
    };
}

export default async function JuvenileBookPage({ params }: Props) {
    const { slug } = await params;
    const book = BOOKS.find((b) => b.id === slug);

    if (!book || book.category !== 'juvenile') {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        'name': book.title,
        'description': `Lee "${book.title}", una historia increíble para adolescentes de 10 a 12 años con estilo de diario.`,
        'author': {
            '@type': 'Person',
            'name': book.author || 'Dani'
        },
        'image': `https://tumaestro.es${book.coverImage}`,
        'inLanguage': ['es'],
        'genre': 'Juvenile Fiction',
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
                <StorytellerTool initialBookId={slug} category="juvenile" />
            </div>
        </div>
    );
}
