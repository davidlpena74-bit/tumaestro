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

const allRoutes = [...staticRoutes, ...resourceRoutes, ...gameRoutes];

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
