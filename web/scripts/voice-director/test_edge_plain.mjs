import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';

async function test() {
    const tts = new MsEdgeTTS();
    await tts.setMetadata("es-ES-ElviraNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const text = "En una ciudad de Persia vivían dos hermanos: Cassim y Alí Babá. Cassim se había casado con una mujer rica y vivía en la opulencia, mientras que Alí Babá era un pobre leñador que apenas ganaba lo suficiente para alimentar a su esposa e hijos. Un día, mientras Alí Babá cortaba leña en un bosque espeso, vio una enorme nube de polvo que se acercaba. Temiendo que fueran bandidos, se ocultó entre las ramas de un árbol frondoso.";

    try {
        const { audioStream } = await tts.toStream(text);
        const writable = fs.createWriteStream('test-voice-plain.mp3');
        audioStream.pipe(writable);

        writable.on('finish', () => {
            const stats = fs.statSync('test-voice-plain.mp3');
            console.log(`Saved test-voice-plain.mp3. Size: ${stats.size} bytes`);
        });
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
