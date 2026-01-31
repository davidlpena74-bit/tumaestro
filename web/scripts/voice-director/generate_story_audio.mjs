import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const BOOKS_FILE_PATH = '../../src/components/resources/storyteller/books-data.ts';
const AUDIO_BASE_DIR = '../../public/audio/storyteller';

async function main() {
    console.log('🎙️ Premium Voice Director (SSML + Enhancements) started...');

    const tts = new MsEdgeTTS();
    // es-ES-ElviraNeural: warm and storytelling voice
    await tts.setMetadata('es-ES-ElviraNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    // 1. Read books data
    let booksDataRaw;
    try {
        booksDataRaw = fs.readFileSync(path.resolve(BOOKS_FILE_PATH), 'utf-8');
    } catch (error) {
        console.error(`❌ Error reading books data: ${error.message}`);
        process.exit(1);
    }

    // 2. Parse books
    const bookRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?content:\s*\[([\s\S]*?)\]/g;

    let match;
    while ((match = bookRegex.exec(booksDataRaw)) !== null) {
        const bookId = match[1];
        const contentBlock = match[2];

        console.log(`\n📘 Processing Book: ${bookId}`);

        const bookAudioDir = path.join(AUDIO_BASE_DIR, bookId);
        if (!fs.existsSync(bookAudioDir)) {
            fs.mkdirSync(bookAudioDir, { recursive: true });
        }

        const pageRegex = /text:\s*(['"`])([\s\S]*?)\1\s*[},]/g;
        let pageMatch;
        let pageIndex = 0;

        while ((pageMatch = pageRegex.exec(contentBlock)) !== null) {
            const text = pageMatch[2];
            const cleanText = text.replace(/\\"/g, '"').replace(/\n/g, ' ').trim();

            if (!cleanText) {
                pageIndex++;
                continue;
            }

            const fileName = `page_${pageIndex}.mp3`;
            const filePath = path.join(bookAudioDir, fileName);

            // Re-generate if force flag is present or if we want premium quality
            console.log(`  🎙️ Generating Enhanced Audio for Page ${pageIndex}...`);

            // SSML Enhancement
            const ssmlText = `
                <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-ES">
                    <voice name="es-ES-ElviraNeural">
                        <prosody rate="-15%" pitch="+0Hz">
                            ${cleanText.replace(/\. /g, '. <break time="800ms"/>')
                    .replace(/, /g, ', <break time="300ms"/>')
                    .replace(/\? /g, '? <break time="800ms"/>')
                    .replace(/! /g, '! <break time="800ms"/>')}
                        </prosody>
                    </voice>
                </speak>
            `.trim();

            try {
                const { audioStream } = await tts.toStream(ssmlText);
                await new Promise((resolve, reject) => {
                    const writable = fs.createWriteStream(filePath);
                    audioStream.pipe(writable);
                    writable.on('finish', resolve);
                    writable.on('error', reject);
                });
                console.log(`     ✨ Saved: ${fileName}`);
            } catch (error) {
                console.error(`     ❌ Failed to generate audio for page ${pageIndex}: ${error.message}`);
            }
            pageIndex++;
        }
    }
    console.log('\n✅ Premium Voice generation finished!');
}

main();
