import { Metadata } from 'next';
import { BOOKS } from '@/components/resources/storyteller/books-data';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return BOOKS.map((book) => ({
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
            images: [book.coverImage],
        },
        keywords: [
            book.title,
            'cuentos infantiles gratis',
            'cuentos narrados con voz',
            'aprender idiomas niños',
            'cuento infantil inglés francés alemán',
            'mejores cuentos para niños'
        ]
    };
}

export default async function BookStoryPage({ params }: Props) {
    const { slug } = await params;
    const book = BOOKS.find((b) => b.id === slug);

    if (!book) {
        notFound();
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            {/* Main Content */}
            <div className="relative z-20 pt-32 pb-12">
                <StorytellerTool initialBookId={slug} />
            </div>
        </div>
    );
}
