import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env.local');

dotenv.config({ path: envPath });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const FALLBACK_STORIES = [
    {
        title: "El Hada y el Hipopótamo",
        text: "Había una vez un hipopótamo llamado Hugo que vivía en un humedal muy hermoso. Un día, Hugo encontró una huella extraña en la hierba. '¡Qué horror!', pensó, '¿habrá un intruso?'. Siguiendo el rastro, llegó hasta una higuera donde descansaba un hada. El hada, llamada Hilda, le ofreció un helado de hielo y hierbabuena. Se hicieron muy amigos y prometieron no hablar nunca de aquel susto, sino de las historias hermosas que vivieron juntos.",
        category: "Ortografía",
        level: "Primaria",
        targetAge: "8-10",
        pedagogicalGoal: "Uso de la H",
        imagePrompt: "Un hipopótamo morado comiendo un helado junto a un hada pequeña en un bosque con una higuera"
    },
    {
        title: "El Barco Velero de Bruno",
        text: "Bruno era un niño muy valiente. Soñaba con viajar en un barco velero y ver ballenas. Un día de viento, visitó al viejo capitán Bernardo. '¡Sube a bordo, grumete!', le gritó con voz grave. El viaje fue breve pero bello. Vieron bajar el sol sobre el mar verde y volvieron al puerto con ganas de beber un vaso de leche bien buena.",
        category: "Ortografía",
        level: "Primaria",
        targetAge: "8-10",
        pedagogicalGoal: "Diferencia B y V",
        imagePrompt: "Un barco velero navegando en un mar verde con una ballena saltando al fondo"
    },
    {
        title: "El Pájaro Ágil",
        text: "Un pájaro de color índigo volaba rápido sobre el jardín. Se posó en un árbol frágil y cantó una canción mágica. El médico del pueblo, que tomaba té con limón, lo miró con atención. '¡Qué fantástico animal!', pensó. El pájaro, ágil y simpático, comió un poco de azúcar que había en la mesa y salió volando hacia el sol.",
        category: "Ortografía",
        level: "Primaria",
        targetAge: "9-11",
        pedagogicalGoal: "Acentos y Tildes",
        imagePrompt: "Un pájaro azul brillante posado en una rama delgada con un sol brillante de fondo"
    }
];

async function generateStories() {
    console.log("🚀 Iniciando el Agente de Cuentos...");

    let stories = [];

    if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('sk-tu-clave')) {
        try {
            console.log("🤖 Intentando generar cuentos con OpenAI (gpt-4o)...");
            const prompt = `Genera 5 cuentos super cortos educativos para niños sobre ortografía (H, B/V, G/J) y valores. Formato JSON: { "stories": [...] } con campos title, text, category, targetAge, pedagogicalGoal, imagePrompt.`;

            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-4o",
                response_format: { type: "json_object" },
            });

            const result = JSON.parse(completion.choices[0].message.content);
            stories = result.stories;
            console.log("✅ Cuentos generados con IA con éxito.");
        } catch (error) {
            console.error("⚠️ Error con la API de OpenAI (posible falta de cuota). Usando base de datos de reserva...");
            stories = FALLBACK_STORIES;
        }
    } else {
        console.log("ℹ️ No se detectó API Key válida. Usando cuentos de reserva.");
        stories = FALLBACK_STORIES;
    }

    const outputPath = path.resolve(__dirname, 'generated_stories.json');
    fs.writeFileSync(outputPath, JSON.stringify(stories, null, 2), 'utf-8');

    const tsContent = `export const GENERATED_STORIES = ${JSON.stringify(stories.map((s, i) => ({
        id: `gen-story-${i + 1}`,
        title: s.title,
        text: s.text,
        category: 'Cuentos',
        level: 'Fácil',
        lang: 'es-ES',
        image: '',
        audioFile: '',
        metadata: { age: s.targetAge, goal: s.pedagogicalGoal, prompt: s.imagePrompt }
    })), null, 4)};`;

    fs.writeFileSync(path.resolve(__dirname, 'generated_stories.ts'), tsContent, 'utf-8');
    console.log("🎉 Proceso finalizado.");
}

generateStories();
