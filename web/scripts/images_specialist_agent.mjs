
import imglyRemoveBackground from '@imgly/background-removal-node';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration map
const IMAGES_TO_PROCESS = [
    // {
    //     src: "C:/Users/david/.gemini/antigravity/brain/43b0b6f3-0cbc-4d44-9dbb-cf84173a2849/human_skeleton_3d_premium_render_1769519057770.png",
    //     dest: "skeleton-3d-0.png"
    // },
    // {
    //     src: "C:/Users/david/.gemini/antigravity/brain/43b0b6f3-0cbc-4d44-9dbb-cf84173a2849/human_skeleton_3d_45deg_premium_render_1769519509885.png",
    //     dest: "skeleton-3d-45.png"
    // },
    // {
    //     src: "C:/Users/david/.gemini/antigravity/brain/43b0b6f3-0cbc-4d44-9dbb-cf84173a2849/human_skeleton_3d_side_premium_render_1769519323228.png",
    //     dest: "skeleton-3d-90.png"
    // },
    // {
    //     src: "C:/Users/david/.gemini/antigravity/brain/43b0b6f3-0cbc-4d44-9dbb-cf84173a2849/human_skeleton_3d_135deg_premium_render_1769519616700.png",
    //     dest: "skeleton-3d-135.png"
    // },
    // {
    //     src: "C:/Users/david/.gemini/antigravity/brain/43b0b6f3-0cbc-4d44-9dbb-cf84173a2849/human_skeleton_3d_back_premium_render_1769519124843.png",
    //     dest: "skeleton-3d-180.png"
    // },
    {
        src: "C:/Users/david/.gemini/antigravity/brain/43b0b6f3-0cbc-4d44-9dbb-cf84173a2849/plant_cell_3d_clean_no_labels_1769528374078.png",
        dest: "plant-cell-3d.png"
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
