import { Metadata } from 'next';
import { BOOKS } from '@/components/resources/storyteller/books-data';
import StorytellerTool from '@/components/resources/storyteller/StorytellerTool';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string; lang: string }>;
}

const SEO_CONTENT = {
    en: {
        titleSuffix: "Best Free Audio Story for Kids",
        description: (title: string) => `Read and listen to "${title}", the best children's story with synchronized text and audio. Available for free in English, Spanish, French, and German. The perfect tool for learning languages!`,
        keywords: ["free children stories", "audio stories for kids", "learn languages kids", "synchronized audio ebook", "best stories for kids"]
    },
    fr: {
        titleSuffix: "Meilleur Conte Audio Gratuit",
        description: (title: string) => `Découvrez "${title}", la meilleure histoire pour enfants avec texte et audio synchronisés. Disponible gratuitement en français, anglais, espagnol et allemand. L'outil idéal pour apprendre des langues !`,
        keywords: ["histoires gratuites enfants", "livres audio enfants", "apprendre langues enfants", "ebook audio synchronisé", "meilleurs contes"]
    },
    de: {
        titleSuffix: "Beste Kostenlose Kindergeschichte mit Audio",
        description: (title: string) => `Genießen Sie "${title}", die beste Kindergeschichte mit synchronisiertem Text und Audio. Kostenlos verfügbar in Deutsch, Englisch, Spanisch und Französisch. Das perfekte Werkzeug zum Sprachenlernen!`,
        keywords: ["kostenlose kindergeschichten", "hörbücher für kinder", "sprachen lernen kinder", "synchronisiertes audio ebook", "beste kindergeschichten"]
    }
};

export async function generateStaticParams() {
    const paths = [];
    for (const book of BOOKS) {
        // Generate for supported secondary languages
        for (const lang of ['en', 'fr', 'de']) {
            paths.push({ slug: book.id, lang });
        }
    }
    return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, lang } = await params;
    const book = BOOKS.find((b) => b.id === slug);

    if (!book) return { title: 'Cuento no encontrado | Tu Maestro' };

    // Validate lang to ensure we have SEO content, otherwise fallback to generic or 404 behavior implicitly
    const validLang = (lang === 'en' || lang === 'fr' || lang === 'de') ? lang : 'en';
    const seo = SEO_CONTENT[validLang];

    // Localized Title logic
    let localizedTitle = book.title;

    // Ideally we should have localized titles in book data, but we append the suffix for now to distinguish.
    // For now, let's stick to: "Robin Hood | Best Free Audio Story..." which is mixed but clear.

    // Better: Since we don't have explicit localized titles in the Book interface yet (only contentEn), 
    // we will use the generic title but surrounded by the strong localized SEO keywords.

    // Better: Since we don't have explicit localized titles in the Book interface yet (only contentEn), 
    // we will use the generic title but surrounded by the strong localized SEO keywords.

    const pageTitle = `${localizedTitle} | ${seo.titleSuffix} - Tu Maestro`;
    const pageDescription = seo.description(localizedTitle);

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: seo.keywords,
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            images: [book.coverImage],
            locale: lang === 'en' ? 'en_US' : lang === 'fr' ? 'fr_FR' : 'de_DE',
            type: 'book',
        },
        alternates: {
            canonical: `/recursos/cuentacuentos/${slug}/${lang}`,
            languages: {
                'es': `/recursos/cuentacuentos/${slug}`,
                'en': `/recursos/cuentacuentos/${slug}/en`,
                'fr': `/recursos/cuentacuentos/${slug}/fr`,
                'de': `/recursos/cuentacuentos/${slug}/de`,
            }
        }
    };
}

export default async function BookStoryLanguagePage({ params }: Props) {
    const { slug, lang } = await params;
    const book = BOOKS.find((b) => b.id === slug);

    if (!book) {
        notFound();
    }

    // Validate lang
    if (!['en', 'fr', 'de'].includes(lang)) {
        notFound();
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            {/* Main Content */}
            <div className="relative z-20 pt-20 pb-12">
                <StorytellerTool initialBookId={slug} initialLanguage={lang as any} />
            </div>
        </div>
    );
}
