import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const TARGET_BOOK_ID = 'caperucita-roja';
const LANGUAGE_CODE = 'en'; // Target English
const VOICE_ID = 'XB0fDUnXU5powFXDhCwa'; // "Charlotte" - Great for English too!
const MODEL_ID = 'eleven_multilingual_v2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, '../../.env');
let API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY && fs.existsSync(ENV_PATH)) {
    const envContent = fs.readFileSync(ENV_PATH, 'latin1');
    const cleanContent = envContent.replace(/\u0000/g, '');
    const match = cleanContent.match(/(sk_[a-zA-Z0-9]+)/);
    if (match) API_KEY = match[1];
}

const BOOKS_FILE_PATH = path.resolve(__dirname, '../../src/components/resources/storyteller/books-data.ts');
const AUDIO_BASE_DIR = path.resolve(__dirname, '../../public/audio/storyteller');

if (!API_KEY) {
    console.error("❌ No ELEVENLABS_API_KEY found");
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
            "stability": 0.55,    // Slightly more stable for long English text
            "similarity_boost": 0.8,
            "style": 0.15,        // Added some style for narration
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
        console.error(`     ❌ Error: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log(`🎙️ Generating Little Red Riding Hood in English...`);

    const booksDataRaw = fs.readFileSync(BOOKS_FILE_PATH, 'utf-8');

    // Updated regex to find contentEn specifically
    const bookRegex = new RegExp(`id:\\s*['"]${TARGET_BOOK_ID}['"][\\s\\S]*?contentEn:\\s*\\[([\\s\\S]*?)\\]`, 'g');
    const match = bookRegex.exec(booksDataRaw);

    if (!match) {
        console.error(`❌ English content for ${TARGET_BOOK_ID} not found.`);
        return;
    }

    const contentBlock = match[1];
    const bookAudioDir = path.join(AUDIO_BASE_DIR, TARGET_BOOK_ID, LANGUAGE_CODE);

    if (!fs.existsSync(bookAudioDir)) {
        fs.mkdirSync(bookAudioDir, { recursive: true });
    }

    const pageRegex = /text:\s*(['"`])([\s\S]*?)\1\s*[},]/g;
    let pageMatch;
    let pageIndex = 0;

    while ((pageMatch = pageRegex.exec(contentBlock)) !== null) {
        let text = pageMatch[2];
        const cleanText = text.replace(/\\"/g, '"').replace(/\n/g, ' ').trim();

        if (!cleanText) {
            pageIndex++;
            continue;
        }

        console.log(`  🎙️ Generating Page ${pageIndex} (EN)...`);
        const fileName = `page_${pageIndex}.mp3`;
        const filePath = path.join(bookAudioDir, fileName);

        await generateAudio(cleanText, filePath);
        pageIndex++;
    }

    console.log('\n✅ English Voice generation finished!');
}

main();
