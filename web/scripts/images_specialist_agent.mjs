
import imglyRemoveBackground from '@imgly/background-removal-node';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration map
const IMAGES_TO_PROCESS = [
    {
        src: "C:/Users/david/.gemini/antigravity/brain/75b5e161-fd6f-4ee0-820d-e67d3eda8a6f/hansel_gretel_chip_1769848596229.png",
        dest: "character-hansel-gretel.png"
    }
];

const OUTPUT_DIR = path.resolve(__dirname, '../public/images/storyteller');

async function processImages() {
    console.log("🚀 Starting Images Specialist Agent...");

    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
    } catch { }

    for (const img of IMAGES_TO_PROCESS) {
        console.log(`\n🔮 Processing: ${path.basename(img.src)}`);

        try {
            const buffer = await fs.readFile(img.src);

            // WRAP IN BLOB WITH MIME TYPE to help the library
            const blob = new Blob([buffer], { type: 'image/png' });

            const resultBlob = await imglyRemoveBackground(blob);

            const arrayBuffer = await resultBlob.arrayBuffer();
            const destPath = path.join(OUTPUT_DIR, img.dest);
            await fs.writeFile(destPath, Buffer.from(arrayBuffer));

            console.log(`✅ Success! Saved to: ${destPath}`);

        } catch (error) {
            console.error(`❌ Error with AI removal for ${path.basename(img.src)}:`, error.message);
            console.log("⚠️  Fallback: Copying original file directly as backup...");

            // Fallback: Just copy the file if AI fails, assuming it might already be good enough
            // or to at least provide the file to the app
            try {
                await fs.copyFile(img.src, path.join(OUTPUT_DIR, img.dest));
                console.log(`   -> Original file copied to ${img.dest} (Fallback)`);
            } catch (copyError) {
                console.error("   -> Copy failed too:", copyError.message);
            }
        }
    }
}

processImages();
