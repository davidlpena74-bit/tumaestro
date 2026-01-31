import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const BOOKS_FILE_PATH = '../../src/components/resources/storyteller/books-data.ts';
const AUDIO_BASE_DIR = '../../public/audio/storyteller';

async function main() {
    console.log('🎙️ Enhanced Voice Director (with SSML) started...');

    const tts = new MsEdgeTTS();
    // es-ES-ElviraNeural is great, let's keep it but enhance the delivery
    await tts.setMetadata('es-ES-ElviraNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    // 1. Read books data
    const booksDataRaw = fs.readFileSync(path.resolve(BOOKS_FILE_PATH), 'utf-8');

    // 2. Parse books
    const bookRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?content:\s*\[([\s\S]*?)\]/g;

    let match;
    while ((match = bookRegex.exec(booksDataRaw)) !== null) {
        const bookId = match[1];
        if (bookId !== 'caperucita-roja') continue; // Only testing with Caperucita

        const contentBlock = match[2];
        console.log(`\n📘 Enhancing Book: ${bookId}`);

        const bookAudioDir = path.join(AUDIO_BASE_DIR, bookId);
        if (!fs.existsSync(bookAudioDir)) {
            fs.mkdirSync(bookAudioDir, { recursive: true });
        }

        const pageRegex = /text:\s*(['"`])([\s\S]*?)\1\s*[},]/g;
        let pageMatch;
        let pageIndex = 0;

        while ((pageMatch = pageRegex.exec(contentBlock)) !== null) {
            const text = pageMatch[2];
            let cleanText = text.replace(/\\"/g, '"').replace(/\n/g, ' ').trim();

            if (!cleanText) {
                pageIndex++;
                continue;
            }

            // ENHANCEMENT: Add pauses after periods and commas for a better rhythm
            // Also wrap in a prosody tag to slow down the rate a bit (-10%)
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

            const fileName = `page_${pageIndex}.mp3`;
            const filePath = path.join(bookAudioDir, fileName);

            // Forced regeneration for the test
            console.log(`  🎙️ Generating ENHANCED Audio for Page ${pageIndex}...`);
            try {
                // For msedge-tts, we can pass raw text or SSML if we use the right methods.
                // However, the library typically handles SSML if the string starts with <speak
                const { audioStream } = await tts.toStream(ssmlText);
                await new Promise((resolve, reject) => {
                    const writable = fs.createWriteStream(filePath);
                    audioStream.pipe(writable);
                    writable.on('finish', resolve);
                    writable.on('error', reject);
                });
                console.log(`     ✨ Saved Enhanced: ${fileName}`);
            } catch (error) {
                console.error(`     ❌ Failed: ${error.message}`);
            }
            pageIndex++;
        }
    }
    console.log('\n✅ Enhanced generation finished!');
}

main();
