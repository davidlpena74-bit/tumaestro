import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const FAKE_USER_EMAILS = [
    'leo.nov@fake.com',
    'sofia.apr@fake.com',
    'lucas.exp@fake.com',
    'marta.geo@fake.com',
    'pablo.via@fake.com',
    'elena.cur@fake.com',
    'hugo.map@fake.com',
    'sara.bru@fake.com',
    'dani.rut@fake.com',
    'carla.vie@fake.com'
];

async function cleanup() {
    console.log('--- Cleaning up Fake Scores ---');

    // 1. Get IDs for these emails
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('Error listing users:', listError.message);
        return;
    }

    const fakeUserIds = users
        .filter(u => FAKE_USER_EMAILS.includes(u.email))
        .map(u => u.id);

    if (fakeUserIds.length === 0) {
        console.log('No fake users found in Auth.');
        return;
    }

    console.log(`Found ${fakeUserIds.length} fake users. Deleting their scores...`);

    // 2. Delete scores
    const { error: delError, count } = await supabase
        .from('activity_scores')
        .delete({ count: 'exact' })
        .in('user_id', fakeUserIds);

    if (delError) {
        console.error('Error deleting scores:', delError.message);
    } else {
        console.log(`Successfully deleted ${count} scores.`);
    }

    console.log('--- Cleanup Completed ---');
}

cleanup();
