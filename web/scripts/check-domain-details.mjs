// scripts/check-domain-details.mjs
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.RESEND_API_KEY;
const domainId = 'cd2da978-4604-4de2-815b-18aa0ca1afac'; // The current domain ID

if (!apiKey) {
    console.error('❌ Error: RESEND_API_KEY not found');
    process.exit(1);
}

const resend = new Resend(apiKey);

async function checkDetails() {
    try {
        console.log(`🔍 Fetching details for domain ID: ${domainId}...`);
        const response = await resend.domains.get(domainId);

        if (response.error) {
            console.error('❌ Error fetching domain details:', response.error);
            return;
        }

        const domain = response.data;
        console.log(`\n🌐 Domain: ${domain.name}`);
        console.log(`   Status: ${domain.status.toUpperCase()}`);
        console.log(`   Region: ${domain.region}`);

        console.log('\n📋 DNS Records Status:');
        if (domain.records) {
            domain.records.forEach(record => {
                let statusIcon = '❓';
                if (record.status === 'verified') statusIcon = '✅';
                else if (record.status === 'pending') statusIcon = '⏳';
                else if (record.status === 'failed') statusIcon = '❌';
                else if (record.status === 'not_started') statusIcon = '⚪';

                console.log(`${statusIcon} [${record.record}] ${record.name}`);
                console.log(`    Expected Value: ${record.value}`);
                // Some APIs return 'status' per record, Resend sometimes does.
                // If 'status' is not present in the record object, we relay on the domain status.
                // But let's see what the API returns.
                if (record.status) {
                    console.log(`    Status: ${record.status}`);
                }
                console.log('');
            });
        }
    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

checkDetails();
