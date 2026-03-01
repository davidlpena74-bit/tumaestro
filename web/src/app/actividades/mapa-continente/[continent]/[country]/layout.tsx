export function generateStaticParams() {
    return [
        { continent: 'europa', country: 'espana' },
        { continent: 'europa', country: 'francia' },
        { continent: 'america', country: 'mexico' },
    ];
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
