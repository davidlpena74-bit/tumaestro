// scripts/reset-domain.mjs
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.RESEND_API_KEY;
const oldDomainId = '5228c9a2-1edc-4fe8-a4fa-486fd3777f88'; // El ID que recuperamos antes
const domainName = 'tumaestro.es';

if (!apiKey) {
    console.error('❌ Error: RESEND_API_KEY not found in .env.local');
    process.exit(1);
}

const resend = new Resend(apiKey);

async function resetDomain() {
    try {
        console.log(`🗑️ Deleting domain ${domainName} (ID: ${oldDomainId})...`);
        const delResponse = await resend.domains.remove(oldDomainId);

        if (delResponse.error) {
            // Si falla al borrar (Quizas ya no existe), seguimos intentando crear
            console.warn('⚠️ Warning while deleting (maybe it was already gone):', delResponse.error);
        } else {
            console.log('✅ Domain deleted successfully.');
        }

        console.log(`\n⏳ Creating domain ${domainName} again...`);
        // Importante: Al crear sin especificar region, usa por defecto us-east-1.
        // El anterior estaba en eu-west-1. ¿Lo quieres en eu-west-1 (Irlanda)?
        // Resend docs no especifica region en create por defecto, pero suele ser mejor dejarlo automatico o especificarlo si es critico.
        // Vamos a crearlo simple primero.

        const createResponse = await resend.domains.create({ name: domainName, region: 'eu-west-1' });

        if (createResponse.error) {
            console.error('❌ Error creating domain:', createResponse.error);
        } else {
            console.log('✅ Domain created successfully!');
            console.log('--------------------------------------------------');
            console.log('🆔 New Domain ID:', createResponse.data.id);
            console.log('🌍 Name:', createResponse.data.name);
            console.log('📍 Region:', createResponse.data.region);
            console.log('status:', createResponse.data.status);

            console.log('\n📝 DNS Records you need to verify (Comparing with yours):');
            if (createResponse.data.records) {
                createResponse.data.records.forEach(record => {
                    console.log(`   Type: ${record.record}\t Name: ${record.name}\t Value: ${record.value}`);
                });
            }

            console.log('--------------------------------------------------');
            console.log('\n⚡ Triggering instant verification...');
            await resend.domains.verify(createResponse.data.id);
            console.log('✅ Verification triggered.');
        }

    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

resetDomain();
