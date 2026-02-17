'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react';
import { Book } from './books-data';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface StorySearchProps {
    books: Book[];
}

export default function StorySearch({ books }: StorySearchProps) {
    const { language, t } = useLanguage();
    const router = useRouter();


    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Translations for search
    const searchPlaceholder = {
        es: "Buscar un cuento por título o autor...",
        en: "Search story by title or author...",
        fr: "Rechercher une histoire par titre ou auteur...",
        de: "Geschichte nach Titel oder Autor suchen..."
    };

    const noResultsText = {
        es: "No encontramos cuentos que coincidan con",
        en: "We found no stories matching",
        fr: "Nous n'avons trouvé aucune histoire correspondant à",
        de: "Wir haben keine Geschichten gefunden, die übereinstimmen mit"
    };

    useEffect(() => {
        if (!query.trim()) {
            setFilteredBooks([]);
            setIsOpen(false);
            return;
        }

        const lowerQuery = query.toLowerCase();

        const results = books.filter(book => {
            // Determine localized fields based on current language
            const currentLang = language as string;
            let targetTitle = book.title;
            let targetDesc = book.description;

            if (currentLang === 'en') {
                targetTitle = book.titleEn || book.title;
                targetDesc = book.descriptionEn || book.description;
            } else if (currentLang === 'fr') {
                targetTitle = book.titleFr || book.title;
                targetDesc = book.descriptionFr || book.description;
            } else if (currentLang === 'de') {
                targetTitle = book.titleDe || book.title;
                targetDesc = book.descriptionDe || book.description;
            }

            return (
                targetTitle.toLowerCase().includes(lowerQuery) ||
                targetDesc.toLowerCase().includes(lowerQuery) ||
                book.author.toLowerCase().includes(lowerQuery)
            );
        });

        setFilteredBooks(results);
        setIsOpen(true);
    }, [query, books, language]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelectBook = (bookId: string) => {
        setQuery('');
        setIsOpen(false);
        // Navigate to the book in the CURRENT language
        if (language === 'es') {
            router.push(`/material/cuentacuentos/${bookId}`);
        } else {
            router.push(`/material/cuentacuentos/${bookId}/${language}`);
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto mb-12 z-40">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MagnifyingGlass weight="bold" className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim().length > 0) setIsOpen(true);
                    }}
                    className="w-full pl-12 pr-12 py-4 bg-white/60 backdrop-blur-xl border-2 border-slate-200/60 rounded-full shadow-lg text-slate-700 font-bold placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-lg"
                    placeholder={searchPlaceholder[language as keyof typeof searchPlaceholder] || searchPlaceholder.es}
                />
                {query.length > 0 && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-400 hover:text-slate-600"
                    >
                        <X weight="bold" size={18} />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && filteredBooks.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[400px] overflow-y-auto">
                    <div className="p-2">
                        {filteredBooks.map((book) => {
                            let displayTitle = book.title;
                            const currentLang = language as string;
                            if (currentLang === 'en') displayTitle = book.titleEn || book.title;
                            else if (currentLang === 'fr') displayTitle = book.titleFr || book.title;
                            else if (currentLang === 'de') displayTitle = book.titleDe || book.title;

                            return (
                                <div
                                    key={book.id}
                                    onClick={() => handleSelectBook(book.id)}
                                    className="flex items-center gap-4 p-3 hover:bg-indigo-50/50 rounded-2xl cursor-pointer transition-colors group"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-slate-100 relative">
                                        {book.chipImage && book.chipImage.includes('/') ? (
                                            <img src={book.chipImage} alt={displayTitle} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-[8px] font-black text-slate-400 uppercase">
                                                {book.id.substring(0, 2)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow text-left">
                                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">{displayTitle}</h4>
                                        <p className="text-xs text-slate-500 font-medium italic">{book.author}</p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="w-8 h-8 rounded-full bg-white text-slate-300 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                                        <CaretDown weight="bold" className="-rotate-90" size={12} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* No results */}
            {isOpen && query.length > 0 && filteredBooks.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-6 text-center animate-in fade-in slide-in-from-top-2">
                    <p className="text-slate-500 font-medium">
                        {noResultsText[language as keyof typeof noResultsText] || noResultsText.es} "<span className="font-bold text-slate-700">{query}</span>"
                    </p>
                </div>
            )}
        </div>
    );
}
