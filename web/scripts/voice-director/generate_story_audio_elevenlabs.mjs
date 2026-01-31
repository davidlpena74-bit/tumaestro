import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const TARGET_BOOK_ID = 'caperucita-roja'; // Only processing this one for now
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // "Bella" - Soft, Narration, suited for stories
const MODEL_ID = 'eleven_multilingual_v2'; // Best for Spanish
// Manual .env reader fallback
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, '../../.env');
let API_KEY = process.env.ELEVENLABS_API_KEY;

const BOOKS_FILE_PATH = path.resolve(__dirname, '../../src/components/resources/storyteller/books-data.ts');
const AUDIO_BASE_DIR = path.resolve(__dirname, '../../public/audio/storyteller');

if (!API_KEY) {
    console.error("❌ No ELEVENLABS_API_KEY found in process.env or .env file");
    process.exit(1);
}

async function generateAudio(text, outputPath) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
    const headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": API_KEY
    };

    const body = {
        "text": text,
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.0,
            "use_speaker_boost": true
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(outputPath, buffer);
        console.log(`     ✨ Saved: ${path.basename(outputPath)}`);
        return true;
    } catch (error) {
        console.error(`     ❌ Error generating audio: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('🎙️ ElevenLabs Voice Director started...');
    console.log(`   Target Book: ${TARGET_BOOK_ID}`);
    console.log(`   Voice ID: ${VOICE_ID} (Bella)`);

    // 1. Read books data
    let booksDataRaw;
    try {
        booksDataRaw = fs.readFileSync(BOOKS_FILE_PATH, 'utf-8');
    } catch (error) {
        console.error(`❌ Error reading books data: ${error.message}`);
        process.exit(1);
    }

    // 2. Parse specific book
    const bookRegex = /id:\s*['"]([^'"]+)['"][\s\S]*?content:\s*\[([\s\S]*?)\]/g;
    let match;
    let found = false;

    while ((match = bookRegex.exec(booksDataRaw)) !== null) {
        const bookId = match[1];
        if (bookId !== TARGET_BOOK_ID) continue;

        found = true;
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

            console.log(`  🎙️ Generating Audio for Page ${pageIndex}...`); // [${cleanText.substring(0, 30)}...]`);

            // Generate
            const fileName = `page_${pageIndex}.mp3`;
            const filePath = path.join(bookAudioDir, fileName);
            await generateAudio(cleanText, filePath);

            pageIndex++;
        }
    }

    if (!found) {
        console.error(`❌ Book '${TARGET_BOOK_ID}' not found in data.`);
    } else {
        console.log('\n✅ ElevenLabs generation finished!');
    }
}

main();
