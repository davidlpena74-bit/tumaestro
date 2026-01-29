import fs from 'fs';
import path from 'path';
import { getAllAudioUrls } from 'google-tts-api'; // Usamos la librería gratuita
import https from 'https';
import { fileURLToPath } from 'url';

// CONFIGURACIÓN
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DATOS DE LOS CUENTOS (Manual copy from dictations.ts)
const STORIES = [
    {
        id: 'forest-magic',
        title: 'El Bosque Encantado',
        text: "Había una vez un bosque donde los árboles susurraban secretos antiguos. Las hadas bailaban entre las flores luminosas y los duendes cuidaban de los animales heridos. Un día, un niño llamado Leo encontró una puerta mágica oculta entre las raíces de un roble gigante.",
        lang: 'es-ES'
    },
    {
        id: 'space-adventure',
        title: 'Aventura Espacial',
        text: "La capitana Elena miró por la ventana de su nave. Las estrellas brillaban como diamantes en la oscuridad infinita. De repente, una luz azul parpadeó en el radar. ¡Era un planeta desconocido! Elena preparó los motores para el aterrizaje, lista para descubrir nuevos misterios.",
        lang: 'es-ES'
    },
    {
        id: 'cervantes',
        title: 'El Quijote - Inicio',
        text: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.",
        lang: 'es-ES'
    },
    {
        id: 'nature-en',
        title: 'Nature Walk',
        text: "Yesterday I went for a walk in the forest. The trees were tall and green. I saw a small squirrel climbing up an oak tree. It was a beautiful sunny day.",
        lang: 'en-US'
    },
];

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { }); // Delete failed file
            reject(err);
        });
    });
}

// Función auxiliar simple para esperar
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function generateAllStories() {
    const outputDir = path.resolve(__dirname, '../../public/audios/stories');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`📚 Procesando ${STORIES.length} cuentos con Google TTS (Gratis)...`);

    for (const story of STORIES) {
        const fileName = `${story.id}.mp3`;
        const filePath = path.join(outputDir, fileName);

        if (fs.existsSync(filePath)) {
            console.log(`⏭️  Saltando ${story.title} (ya existe)`);
            continue;
        }

        console.log(`🎙️  Generando: ${story.title} (${story.lang})...`);

        try {
            // Google TTS API divide el texto en chunks de 200 chars.
            // getAllAudioUrls nos da una lista de URLs para cada chunk.
            const results = getAllAudioUrls(story.text, {
                lang: story.lang,
                slow: false,
                host: 'https://translate.google.com',
            });

            // NOTA IMPORTANTE:
            // Google TTS devuelve MULTIPLES archivos pequeños si el texto es largo.
            // Unirlos en un solo MP3 sin ffmpeg es complicado en puro JS/Node sin dependencias binarias.
            // PERO, para la web, podemos guardar solo el PRIMERO o intentar concatenar Buffers simples (funciona a veces para mp3).
            // O mejor: Guardarlos como `id_part1.mp3`, `id_part2.mp3` etc?
            // Para simplificar, vamos a intentar concatenar los buffers en memoria y guardar uno solo.
            // Los MP3s simples a veces se pueden concatenar binariamente.

            const buffers = [];
            for (const item of results) {
                // Descargar a memoria
                const buf = await new Promise((resolve, reject) => {
                    https.get(item.url, (res) => {
                        const chunks = [];
                        res.on('data', d => chunks.push(d));
                        res.on('end', () => resolve(Buffer.concat(chunks)));
                        res.on('error', reject);
                    });
                });
                buffers.push(buf);
                await sleep(500); // Politeness delay
            }

            const finalBuffer = Buffer.concat(buffers);
            fs.writeFileSync(filePath, finalBuffer);

            console.log(`   ✅ Guardado: ${fileName}`);

        } catch (e) {
            console.error(`   ❌ Error en ${story.title}:`, e.message);
        }
    }
    console.log('✨ Proceso finalizado.');
}

generateAllStories();
