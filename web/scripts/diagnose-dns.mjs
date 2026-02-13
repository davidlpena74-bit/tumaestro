// scripts/diagnose-dns.mjs
import dns from 'dns';
import util from 'util';

const resolveTxt = util.promisify(dns.resolveTxt);
const resolveMx = util.promisify(dns.resolveMx);

async function checkDns(domain, type) {
    try {
        console.log(`🔍 Checking ${type} records for: ${domain}`);
        let records;
        if (type === 'TXT') {
            records = await resolveTxt(domain);
            // dns.resolveTxt devuelve un array de arrays de strings (chunks)
            records = records.map(chunk => chunk.join(''));
        } else if (type === 'MX') {
            records = await resolveMx(domain);
        }

        if (!records || records.length === 0) {
            console.log(`   ⚠️ No ${type} records found.`);
        } else {
            records.forEach(r => console.log(`   ✅ Found: ${JSON.stringify(r)}`));
        }
        return records;
    } catch (error) {
        if (error.code === 'ENODATA' || error.code === 'ENOTFOUND') {
            console.log(`   ❌ No records found (Error: ${error.code})`);
        } else {
            console.error(`   ❌ Error querying ${type}:`, error.message);
        }
        return null;
    }
}

async function runDiagnosis() {
    console.log('--- DIAGNOSTICO DNS PARA RESEND ---\n');

    // 1. Comprobar SPF (TXT en send.tumaestro.es)
    console.log('--- 1. SPF (send.tumaestro.es) ---');
    await checkDns('send.tumaestro.es', 'TXT');

    // 2. Comprobar MX (MX en send.tumaestro.es)
    console.log('\n--- 2. MX (send.tumaestro.es) ---');
    await checkDns('send.tumaestro.es', 'MX');

    // 3. Comprobar DKIM (TXT en resend._domainkey.tumaestro.es)
    console.log('\n--- 3. DKIM (resend._domainkey.tumaestro.es) ---');
    await checkDns('resend._domainkey.tumaestro.es', 'TXT');

    console.log('\n--- FIN DEL DIAGNOSTICO ---');
}

runDiagnosis();
