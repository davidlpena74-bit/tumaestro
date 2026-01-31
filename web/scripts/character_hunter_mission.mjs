import imglyRemoveBackground from '@imgly/background-removal-node';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../public/images/storyteller');

const TASKS = [
    {
        name: 'Little Red Riding Hood',
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Arthur_Rackham_Little_Red_Riding_Hood.jpg',
        dest: 'character-caperucita.png'
    },
    {
        name: 'Ugly Duckling',
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Ugly_Duckling.jpg',
        dest: 'character-patito.png'
    }
];

async function fetchImage(url) {
    console.log(`Downloading: ${url}`);
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    });
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    return await response.blob();
}

async function run() {
    console.log("🏹 Character Hunter Mission Start (With Fallback)...");
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    for (const task of TASKS) {
        console.log(`\n🎯 Target: ${task.name}`);
        try {
            console.log(`   Fetching from Wikimedia...`);
            const blob = await fetchImage(task.url);

            let finalBuffer;
            try {
                console.log(`   Processing with AI (Removing Background)...`);
                const resultBlob = await imglyRemoveBackground(blob);
                finalBuffer = Buffer.from(await resultBlob.arrayBuffer());
            } catch (aiError) {
                console.warn(`   ⚠️ AI Removal failed (${aiError.message}). Saving original image as fallback.`);
                finalBuffer = Buffer.from(await blob.arrayBuffer());
            }

            const destPath = path.join(OUTPUT_DIR, task.dest);
            await fs.writeFile(destPath, finalBuffer);
            console.log(`✅ Capture Success: ${destPath}`);

        } catch (err) {
            console.error(`❌ Mission Failed for ${task.name}:`, err.message);
        }
    }
}

run();
