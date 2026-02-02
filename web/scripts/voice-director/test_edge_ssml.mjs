import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';

async function test() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("es-ES-ElviraNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const text = "En una ciudad de Persia vivían dos hermanos: Cassim y Alí Babá. Cassim se había casado con una mujer rica y vivía en la opulencia, mientras que Alí Babá era un pobre leñador que apenas ganaba lo suficiente para alimentar a su esposa e hijos. Un día, mientras Alí Babá cortaba leña en un bosque espeso, vio una enorme nube de polvo que se acercaba. Temiendo que fueran bandidos, se ocultó entre las ramas de un árbol frondoso.";

    const ssmlText = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-ES">
            <voice name="es-ES-ElviraNeural">
                <prosody rate="-10%" pitch="+0Hz">
                    ${text.replace(/\. /g, '. <break time="600ms"/>')
            .replace(/, /g, ', <break time="300ms"/>')
            .replace(/\? /g, '? <break time="600ms"/>')
            .replace(/! /g, '! <break time="600ms"/>')}
                </prosody>
            </voice>
        </speak>
    `.trim();

    console.log("SSML:", ssmlText);

    try {
        const { audioStream } = await tts.toStream(ssmlText);
        const writable = fs.createWriteStream('test-voice-ssml.mp3');
        audioStream.pipe(writable);

        writable.on('finish', () => {
            const stats = fs.statSync('test-voice-ssml.mp3');
            console.log(`Saved test-voice-ssml.mp3. Size: ${stats.size} bytes`);
        });
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
