import imglyRemoveBackground from '@imgly/background-removal-node';
import fs from 'fs/promises';

async function processImage(src, dest) {
    try {
        console.log(`Processing ${src}...`);
        const buffer = await fs.readFile(src);
        const blob = new Blob([buffer], { type: 'image/png' });
        const resultBlob = await imglyRemoveBackground(blob);
        const arrayBuffer = await resultBlob.arrayBuffer();
        await fs.writeFile(dest, Buffer.from(arrayBuffer));
        console.log(`Saved to ${dest}`);
    } catch (e) {
        console.error(`Failed on ${src}`, e);
    }
}

async function run() {
    await processImage(
        "C:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/images/storyteller/character-casi-genio-1-color.png",
        "C:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/images/storyteller/character-casi-genio-1-color.png"
    );
    await processImage(
        "C:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/images/storyteller/character-casi-genio-2-color.png",
        "C:/Users/david/Desktop/Projects-Antigravity/Tu Maestro/web/public/images/storyteller/character-casi-genio-2-color.png"
    );
}

run();
