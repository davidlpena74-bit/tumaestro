'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BOOKS } from '@/components/resources/storyteller/books-data';

export default function BookCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Filter out hidden books (Cenicienta)
    const carouselBooks = BOOKS.filter(b => b.id !== 'cenicienta');

    // Triplicate for infinite loop
    const displayBooks = [...carouselBooks, ...carouselBooks, ...carouselBooks];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        // Initialize scroll position to the middle set to allow scrolling left
        // We need to wait for layout? Use a small timeout or just set it.
        // Better: Wait 1 frame.
        const initScroll = () => {
            // We want to scroll LEFT (decrease scrollLeft).
            // Start at the end of the first set (or beginning of second set).
            // Total width / 3 is one set.
            // Let's start at scrollWidth / 3.
            container.scrollLeft = container.scrollWidth / 3;
        };

        // Slight delay to ensure content is rendered
        setTimeout(initScroll, 100);

        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused && container) {
                // Move items to the RIGHT => View moves LEFT => descrease scrollLeft.
                container.scrollLeft -= 0.5; // Slower speed for elegance

                // Loop logic
                // If we reach the start (0), jump to the start of middle set (scrollWidth/3)
                // Actually, if scrollLeft <= 0, we can jump to scrollWidth/3 * 2?
                // No.
                // [Set 1] [Set 2] [Set 3]
                // 0 ..... W/3 ..... 2W/3 ..... W
                // We start at W/3. We scroll towards 0.
                // vary range: [0, W/3].
                // When we hit 0, we are at start of Set 1.
                // Start of Set 1 is visually identical to Start of Set 2 (W/3) and Start of Set 3 (2W/3).
                // So if scrollLeft <= 0, jump to W/3.
                // Wait, if I am at 0 (start of Set 1), and I jump to W/3 (start of Set 2), it should be seamless.

                if (container.scrollLeft <= 0) {
                    container.scrollLeft = container.scrollWidth / 3;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    if (carouselBooks.length === 0) return null;

    return (
        <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden py-4 mt-8 whitespace-nowrap mask-linear-fade"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
        >
            {displayBooks.map((book, index) => (
                <Link
                    key={`${book.id}-${index}`}
                    href={`/recursos/cuentacuentos/${book.id}`}
                    className="min-w-[140px] w-[140px] md:min-w-[160px] md:w-[160px] inline-block group relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <img
                        src={book.chipImage || book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20 whitespace-normal text-left">
                        <h3 className="text-white font-bold text-xs leading-tight mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-blue-200 text-[10px] font-medium truncate">{book.author}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
