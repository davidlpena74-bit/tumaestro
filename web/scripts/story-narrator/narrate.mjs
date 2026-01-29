import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Cargar variables de entorno desde el archivo .env en la raíz del proyecto web
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env.local');

dotenv.config({ path: envPath });

// Verificar API Key
if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: No se encontró la variable OPENAI_API_KEY.');
    console.error('Por favor, asegúrate de tener un archivo .env.local en la carpeta "web" con tu clave de API.');
    console.error('Ejemplo: OPENAI_API_KEY=sk-...');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function narrateStory(inputPath, outputName, voice = 'nova', speed = 1.0) {
    try {
        console.log(`📖 Leyendo historia desde: ${inputPath}`);
        const text = fs.readFileSync(inputPath, 'utf8');

        if (!text) {
            throw new Error('El archivo de entrada está vacío.');
        }

        console.log(`🎙️  Generando audio con voz "${voice}" (Modelo TTS-1-HD)...`);
        console.log(`ℹ️  Esto puede tardar unos segundos dependiendo de la longitud del texto...`);

        // OpenAI permite máximo 4096 caracteres por request.
        // Para cuentos largos, habría que dividir. Este script asume cuentos cortos o maneja el error simple por ahora.
        // Mejora futura: Splitting inteligente.

        if (text.length > 4096) {
            console.warn('⚠️  Advertencia: El texto es muy largo (>4096 caracteres). Se truncará o dividirá (implementación básica).');
        }

        const mp3 = await openai.audio.speech.create({
            model: "tts-1-hd",
            voice: voice,
            input: text,
            speed: speed,
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());

        // Crear carpeta de salida si no existe
        const outputDir = path.resolve(__dirname, '../../public/audios/stories');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const finalOutputName = outputName || `story_${timestamp}.mp3`;
        const outputPath = path.join(outputDir, finalOutputName);

        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ Audio guardado exitosamente en:`);
        console.log(`   ${outputPath}`);

        return outputPath;

    } catch (error) {
        console.error('❌ Error generando el audio:', error);
        process.exit(1);
    }
}

// Procesar argumentos de línea de comandos
// Uso: node narrate.js <archivo_input> [nombre_output] [voz]
const args = process.argv.slice(2);

if (args.length < 1) {
    console.log(`
🤖 Story Narrator Agent (OpenAI)
================================

Uso:
  node scripts/story-narrator/narrate.js <archivo_texto> [nombre_salida.mp3] [voz] [velocidad]

Ejemplo:
  node scripts/story-narrator/narrate.js scripts/story-narrator/ejemplo.txt cuento_magico.mp3 nova 0.9

Voces disponibles (Mujer):
  - nova (Recomendada: Enérgica, dinámica)
  - shimmer (Recomendada: Clara, resonante)
  - alloy (Neutra/Flexible)
  
Voces disponibles (Hombre):
  - onyx
  - echo
  - fable
    `);
    process.exit(0);
}

const inputPath = args[0];
const outputName = args[1] || null;
const voice = args[2] || 'nova';
const speed = parseFloat(args[3]) || 0.9; // Default un poco más lento para cuentos

narrateStory(inputPath, outputName, voice, speed);
