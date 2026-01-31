import fs from 'fs';
import path from 'path';

const BOOKS_FILE_PATH = '../../src/components/resources/storyteller/books-data.ts';

function main() {
    const booksDataRaw = fs.readFileSync(BOOKS_FILE_PATH, 'utf-8');
    const bookRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?content:\s*\[([\s\S]*?)\]/g;

    let match;
    while ((match = bookRegex.exec(booksDataRaw)) !== null) {
        const bookId = match[1];
        if (bookId !== 'caperucita-roja') continue;

        const contentBlock = match[2];
        console.log(`📘 Checking Book: ${bookId}`);

        const pageRegex = /text:\s*['"`]([\s\S]*?)['"`]\s*[},]/g;
        let pageMatch;
        let pageIndex = 0;

        while ((pageMatch = pageRegex.exec(contentBlock)) !== null) {
            const text = pageMatch[1];
            console.log(`  📄 Page ${pageIndex} Text: ${text.substring(0, 50)}...`);
            pageIndex++;
        }
    }
}

main();
