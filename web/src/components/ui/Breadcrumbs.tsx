'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, House } from 'lucide-react';

interface BreadcrumbsProps {
    items?: { name: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const pathname = usePathname();
    
    // Auto-generate items if not provided
    const defaultItems = items || pathname
        .split('/')
        .filter(Boolean)
        .map((segment, index, array) => {
            const href = `/${array.slice(0, index + 1).join('/')}`;
            const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            return { name, href };
        });

    const allItems = [{ name: 'Inicio', href: '/' }, ...defaultItems];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': allItems.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.name,
            'item': `https://tumaestro.es${item.href}`
        }))
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-3">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ol className="flex items-center gap-2 text-xs md:text-sm text-slate-600 font-medium overflow-x-auto whitespace-nowrap no-scrollbar -ml-10">
                {allItems.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2 shrink-0">
                        {index > 0 && <ChevronRight className="w-3 h-3 text-gray-600" />}
                        <Link
                            href={item.href}
                            className={`hover:text-slate-900 transition-colors flex items-center gap-1.5 ${
                                index === allItems.length - 1 ? 'font-medium pointer-events-none' : 'text-slate-500 font-normal'
                            }`}
                            style={index === allItems.length - 1 ? { color: '#008073' } : {}}
                        >
                            {index === 0 && <House className="w-3.5 h-3.5" />}
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
