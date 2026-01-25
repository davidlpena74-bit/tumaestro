
import imglyRemoveBackground from '@imgly/background-removal-node';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration map
const IMAGES_TO_PROCESS = [
    {
        src: "C:/Users/david/.gemini/antigravity/brain/7aac6950-7008-406e-985e-c71a94795150/skeleton_front_transparent_1769334196674.png",
        dest: "muscles-front-hq.png"
    },
    {
        src: "C:/Users/david/.gemini/antigravity/brain/7aac6950-7008-406e-985e-c71a94795150/skeleton_back_transparent_1769334221572.png",
        dest: "muscles-back-hq.png"
    },
    // Adding the one the user just uploaded explicitly
    {
        src: "C:/Users/david/.gemini/antigravity/brain/7aac6950-7008-406e-985e-c71a94795150/animal_cell_3d_cutaway_1769352671932.png",
        dest: "animal-cell-hq.png"
    }
];

const OUTPUT_DIR = path.resolve(__dirname, '../public/images/games');

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
