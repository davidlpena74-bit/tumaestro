import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BOOKS_FILE_PATH = path.resolve(__dirname, '../../src/components/resources/storyteller/books-data.ts');

function countChars(text) {
    if (!text) return 0;
    return text.trim().length;
}

try {
    const content = fs.readFileSync(BOOKS_FILE_PATH, 'utf-8');

    // Simple but effective parser for the specific structure of books-data.ts
    // We'll look for content blocks
    const bookBlocks = content.split(/id:\s*['"]/);
    bookBlocks.shift(); // Remove the part before the first book

    let totalES = 0;
    let totalEN = 0;
    let totalFR = 0;
    let totalDE = 0;
    let bookCount = 0;

    bookBlocks.forEach(block => {
        bookCount++;
        const idMatch = block.match(/^([^'"]+)/);
        const id = idMatch ? idMatch[1] : 'unknown';

        // Extract content arrays
        const extractContent = (key) => {
            const regex = new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`);
            const match = block.match(regex);
            if (!match) return 0;

            const pageTextRegex = /text:\s*(['"`])([\s\S]*?)\1/g;
            let sum = 0;
            let pageMatch;
            while ((pageMatch = pageTextRegex.exec(match[1])) !== null) {
                sum += countChars(pageMatch[2]);
            }
            return sum;
        };

        const es = extractContent('content');
        const en = extractContent('contentEn');
        const fr = extractContent('contentFr');
        const de = extractContent('contentDe');

        totalES += es;
        totalEN += en;
        totalFR += fr;
        totalDE += de;

        console.log(`Book: ${id.padEnd(20)} | ES: ${es.toString().padStart(5)} | EN: ${en.toString().padStart(5)} | FR: ${fr.toString().padStart(5)} | DE: ${de.toString().padStart(5)}`);
    });

    const totalAll = totalES + totalEN + totalFR + totalDE;

    console.log('\n--- TOTALES ---');
    console.log(`Cuentos analizados: ${bookCount}`);
    console.log(`Total Español:   ${totalES.toLocaleString()} chars`);
    console.log(`Total Inglés:    ${totalEN.toLocaleString()} chars`);
    console.log(`Total Francés:   ${totalFR.toLocaleString()} chars`);
    console.log(`Total Alemán:    ${totalDE.toLocaleString()} chars`);
    console.log('---------------------------');
    console.log(`TOTAL GLOBAL:    ${totalAll.toLocaleString()} tokens/chars`);

} catch (err) {
    console.error('Error:', err);
}
