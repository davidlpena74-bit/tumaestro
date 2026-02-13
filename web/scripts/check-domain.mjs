// scripts/check-domain.mjs
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
    console.error('❌ Error: RESEND_API_KEY not found in .env.local');
    process.exit(1);
}

const resend = new Resend(apiKey);

async function checkDomain() {
    try {
        console.log('🔍 Checking domains associated with this API Key...');
        const response = await resend.domains.list();

        if (response.error) {
            console.error('❌ Error retrieving domains:', response.error);
            return;
        }

        const domains = response.data.data;
        if (domains.length === 0) {
            console.log('⚠️ No domains found. You need to add a domain first.');
        } else {
            console.log(`✅ Found ${domains.length} domain(s):`);
            domains.forEach(domain => {
                console.log(`\n--------------------------------------------------`);
                console.log(`🌐 Domain: ${domain.name} (ID: ${domain.id})`);
                console.log(`   Status: ${domain.status.toUpperCase()}`);
                console.log(`   Created At: ${domain.created_at}`);
                console.log(`   Region: ${domain.region}`);

                if (domain.status !== 'verified') {
                    console.log(`   ⚠️  This domain is NOT verified yet.`);
                } else {
                    console.log(`   ✅ This domain is VERIFIED and ready to send.`);
                }
            });
            console.log(`--------------------------------------------------\n`);
        }

    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

checkDomain();
