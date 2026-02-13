import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asumimos que se ejecuta desde web/ o root, intentamos localizar .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const apiKey = process.env.RESEND_API_KEY;

console.log('--- Resend Verification ---');

if (!apiKey) {
    console.error('❌ Missing RESEND_API_KEY in .env.local');
    // Intenta buscar en path relativo si falló
    console.log(`   Checked: ${envPath}`);
    process.exit(1);
} else {
    console.log('✅ RESEND_API_KEY found.');
}

const resend = new Resend(apiKey);

async function verify() {
    try {
        const list = await resend.domains.list();
        if (list.error) {
            console.error('❌ Error listing domains:', list.error);
            return;
        }

        const domains = list.data.data;
        if (!domains || domains.length === 0) {
            console.log('⚠️ No domains found in Resend account.');
            return;
        }

        console.log(`✅ Found ${domains.length} domain(s) in account.`);

        // Buscar send.tumaestro.es específicamente
        const targetDomain = domains.find(d => d.name === 'send.tumaestro.es') || domains[0];

        console.log(`\n🔎 Inspecting domain: ${targetDomain.name}`);
        console.log(`   ID: ${targetDomain.id}`);
        console.log(`   Status: ${targetDomain.status.toUpperCase()}`);

        // Get details (DNS records)
        const details = await resend.domains.get(targetDomain.id);

        if (details.error) {
            console.error('❌ Error fetching domain details:', details.error);
            return;
        }

        const d = details.data;
        console.log(`   Region: ${d.region}`);

        console.log('\n📋 DNS Records Configuration:');
        let allVerified = true;

        if (d.records && d.records.length > 0) {
            d.records.forEach(r => {
                const isVerified = r.status === 'verified';
                if (!isVerified) allVerified = false;

                const icon = isVerified ? '✅' : '❌';
                console.log(`   ${icon} [${r.record || r.type}] ${r.name || ''}`);
                console.log(`       Value: ${r.value ? r.value.substring(0, 40) + '...' : 'N/A'}`);
                console.log(`       Status: ${r.status}`);
            });
        } else {
            console.log('   ⚠️ No records info returned (might be verified already or API difference).');
        }

        console.log('\n--- Summary ---');
        if (d.status === 'verified') {
            console.log('🎉 Domain is FULLY VERIFIED and ready to send emails.');
        } else if (d.status === 'not_started' || d.status === 'pending') {
            console.log('⏳ Domain is PENDING VERIFICATION. Check DNS records above.');
        } else {
            console.log(`⚠️ Domain status is: ${d.status}`);
        }

    } catch (e) {
        console.error('❌ Unexpected error:', e);
    }
}

verify();
