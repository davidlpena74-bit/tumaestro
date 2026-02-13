import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://tumaestro.es';

// Base routes
const staticRoutes = [
    '',
    '/profesores',
    '/recursos',
    '/juegos',
    '/login',
    '/registro',
    '/privacidad',
    '/terminos',
];

// Resources
const resourceRoutes = [
    '/recursos/cuentacuentos',
    '/recursos/dictados',
    '/recursos/geografia',
    '/recursos/idiomas',
    '/recursos/matematicas',
];

// Get games dynamically from directory
const gamesDir = path.join(process.cwd(), 'src', 'app', 'juegos');
let gameRoutes = [];

try {
    const games = fs.readdirSync(gamesDir).filter(file => {
        return fs.statSync(path.join(gamesDir, file)).isDirectory();
    });

    gameRoutes = games.map(game => `/juegos/${game}`);
    console.log(`Found ${games.length} games.`);
} catch (error) {
    console.error('Error reading games directory:', error);
}

// Get stories dynamically from books-data.ts
const booksFile = path.join(process.cwd(), 'src', 'components', 'resources', 'storyteller', 'books-data.ts');
let storyRoutes = [];

try {
    const booksContent = fs.readFileSync(booksFile, 'utf8');
    // Regex to capture IDs: id: 'some-id'
    const idRegex = /id:\s*'([a-zA-Z0-9-]+)'/g;
    let match;

    while ((match = idRegex.exec(booksContent)) !== null) {
        if (match[1]) {
            storyRoutes.push(`/recursos/cuentacuentos/${match[1]}`);
        }
    }
    console.log(`Found ${storyRoutes.length} stories.`);
} catch (error) {
    console.error('Error reading books-data.ts:', error);
}

const allRoutes = [...staticRoutes, ...resourceRoutes, ...gameRoutes, ...storyRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
        .map((route) => {
            return `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : route.includes('/juegos/') ? '0.9' : '0.8'}</priority>
  </url>`;
        })
        .join('')}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('✅ public/sitemap.xml generated successfully!');
