// scripts/verify-domain.mjs
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.RESEND_API_KEY;
const domainId = '5228c9a2-1edc-4fe8-a4fa-486fd3777f88'; // El ID que recuperamos antes

if (!apiKey) {
    console.error('❌ Error: RESEND_API_KEY not found in .env.local');
    process.exit(1);
}

const resend = new Resend(apiKey);

async function verifyDomain() {
    try {
        console.log(`⏳ Triggering verification for domain ID: ${domainId}...`);
        const response = await resend.domains.verify(domainId);

        if (response.error) {
            console.error('❌ Verification failed:', response.error);
        } else {
            console.log('✅ Verification triggered successfully!');
            console.log('API Response:', response);
            console.log('\nWait a few seconds and run the check-domain script again to see if status changes.');
        }

    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

verifyDomain();
