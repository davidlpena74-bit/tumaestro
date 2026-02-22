import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const ACTIVITIES = ['mapa-provincias'];

async function seedProvinces() {
    console.log('--- Seeding Rankings for Provincias de España ---');

    // Get existing fake users created in previous step
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('Error listing users:', listError.message);
        return;
    }

    const fakeEmails = [
        'leo.nov@fake.com', 'sofia.apr@fake.com', 'lucas.exp@fake.com',
        'marta.geo@fake.com', 'pablo.via@fake.com', 'elena.cur@fake.com'
    ];

    const fakeUsers = users.filter(u => fakeEmails.includes(u.email || ''));

    if (fakeUsers.length === 0) {
        console.log('No fake users found. Please run the main seed script first.');
        return;
    }

    for (const user of fakeUsers) {
        for (const activityId of ACTIVITIES) {
            const randomScore = Math.floor(Math.random() * 200) + 300;
            const randomTime = Math.floor(Math.random() * 120) + 240; // Proyectos are more targets (52), so they take longer

            const { error: sError } = await supabase
                .from('activity_scores')
                .insert({
                    activity_id: activityId,
                    user_id: user.id,
                    score: randomScore,
                    time_spent: randomTime,
                    errors: Math.floor(Math.random() * 20) + 10,
                });

            if (sError) {
                console.error(`Error for ${user.email}: ${sError.message}`);
            } else {
                console.log(`Added score for ${user.email}: ${randomScore}pts / ${randomTime}s`);
            }
        }
    }

    console.log('--- Seeding Completed ---');
}

seedProvinces();
