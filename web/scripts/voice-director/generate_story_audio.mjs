import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

// --- CONFIGURATION ---
const ELEVENLABS_VOICE_ID = 'XB0fDUnXU5powFXDhCwa'; // "Charlotte" - Elegant narration
const ELEVENLABS_MODEL_ID = 'eleven_multilingual_v2';
const EDGE_VOICE_ID = 'es-ES-ElviraNeural'; // Warm storytelling voice

// Paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BOOKS_FILE_PATH = path.resolve(__dirname, '../../src/components/resources/storyteller/books-data.ts');
const AUDIO_BASE_DIR = path.resolve(__dirname, '../../public/audio/storyteller');
const ENV_PATH = path.resolve(__dirname, '../../.env');

// --- HELPERS ---

function getElevenLabsKey() {
    let key = process.env.ELEVENLABS_API_KEY;
    if (!key && fs.existsSync(ENV_PATH)) {
        try {
            const envContent = fs.readFileSync(ENV_PATH, 'latin1'); // latin1 helps with some encoding issues
            const cleanContent = envContent.replace(/\u0000/g, '');
            const match = cleanContent.match(/ELEVENLABS_API_KEY=(sk_[a-zA-Z0-9]+)/) || cleanContent.match(/(sk_[a-zA-Z0-9]+)/);
            if (match) key = match[1];
        } catch (e) {
            console.warn("⚠️ Could not read .env file manually:", e.message);
        }
    }
    return key;
}

async function generateWithElevenLabs(text, outputPath, apiKey) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;
    const headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey
    };

    const body = {
        "text": text,
        "model_id": ELEVENLABS_MODEL_ID,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "style": 0.0,
            "use_speaker_boost": true
        }
    };

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
    return true;
}

async function generateWithEdgeTTS(text, outputPath) {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(EDGE_VOICE_ID, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    // Minor SSML enhancement for Edge TTS to sound better
    const ssmlText = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-ES">
            <voice name="${EDGE_VOICE_ID}">
                <prosody rate="-10%" pitch="+0Hz">
                    ${text.replace(/\. /g, '. <break time="600ms"/>')
            .replace(/, /g, ', <break time="300ms"/>')
            .replace(/\? /g, '? <break time="600ms"/>')
            .replace(/! /g, '! <break time="600ms"/>')}
                </prosody>
            </voice>
        </speak>
    `.trim();

    const { audioStream } = await tts.toStream(ssmlText);

    return new Promise((resolve, reject) => {
        const writable = fs.createWriteStream(outputPath);
        audioStream.pipe(writable);
        writable.on('finish', () => resolve(true));
        writable.on('error', reject);
    });
}

// --- MAIN ---

async function main() {
    console.log('🎙️ Hybrid Voice Director started...');

    const elevenLabsKey = getElevenLabsKey();
    if (elevenLabsKey) {
        console.log('✅ ElevenLabs API Key detected. Will prioritize premium voice.');
    } else {
        console.log('⚠️ No ElevenLabs API Key found. Fallback to Microsoft Edge TTS only.');
    }

    // 1. Read books data
    let booksDataRaw;
    try {
        booksDataRaw = fs.readFileSync(BOOKS_FILE_PATH, 'utf-8');
    } catch (error) {
        console.error(`❌ Error reading books data: ${error.message}`);
        process.exit(1);
    }

    // 2. Parse books
    // Regex matches: id: "book-id", ... content: [ ... ]
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

            // Skip if exists (remove this check if you want to force regenerate)
            if (fs.existsSync(filePath)) {
                // console.log(`  Skipping Page ${pageIndex} (already exists)`);
                pageIndex++;
                continue;
            }

            console.log(`  🎙️ Generating Audio for Page ${pageIndex}...`);

            let success = false;

            // STRATEGY: 1. ElevenLabs
            if (elevenLabsKey) {
                try {
                    // process.stdout.write('     Attempting ElevenLabs... ');
                    await generateWithElevenLabs(cleanText, filePath, elevenLabsKey);
                    console.log(`     ✨ Saved (ElevenLabs): ${fileName}`);
                    success = true;
                } catch (e) {
                    console.error(`\n     ⚠️ ElevenLabs failed: ${e.message}`);
                    console.log('     ↪️ Falling back to Edge TTS...');
                }
            }

            // STRATEGY: 2. Edge Connect (Fallback)
            if (!success) {
                try {
                    await generateWithEdgeTTS(cleanText, filePath);
                    console.log(`     ✨ Saved (Edge TTS): ${fileName}`);
                    success = true;
                } catch (e) {
                    console.error(`     ❌ Edge TTS failed: ${e.message}`);
                }
            }

            pageIndex++;
        }
    }
    console.log('\n✅ Voice generation finished!');
}

main();
