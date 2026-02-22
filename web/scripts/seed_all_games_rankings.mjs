import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

// Initialize with service role for admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const ACTIVITIES = [
    'mapa-comunidades',
    'rios-europa',
    'physical-map-game',
    'mapa-provincias',
    'capitales-ue',
    'esqueleto',
    'musculos',
    'celula-animal',
    'celula-vegetal',
    'mapa-africa',
    'mapa-america',
    'mapa-asia',
    'mapa-europa',
    'mapa-norteamerica',
    'mapa-oceania',
    'mapa-sudamerica',
    'mapa-usa',
    'mapa-rios',
    'capitales-europa',
    'montanas-europa',
    'montanas-oceania',
    'montanas-espana',
    'montanas-america',
    'montanas-asia',
    'mares-europa',
    'mares-oceania',
    'mares-america',
    'mares-asia',
    'verbos-irregulares',
    'verbos-irregulares-basico',
    'verbos-irregulares-master',
    'verbos-irregulares-pro'
];

const FAKE_USERS = [
    { name: 'Leo Novato', email: 'leo.nov@fake.com' },
    { name: 'Sofía Aprendiz', email: 'sofia.apr@fake.com' },
    { name: 'Lucas Explorador', email: 'lucas.exp@fake.com' },
    { name: 'Marta Geógrafa', email: 'marta.geo@fake.com' },
    { name: 'Pablo Viajero', email: 'pablo.via@fake.com' },
    { name: 'Elena Curiosa', email: 'elena.cur@fake.com' },
    { name: 'Hugo Mapas', email: 'hugo.map@fake.com' },
    { name: 'Sara Brújula', email: 'sara.bru@fake.com' },
    { name: 'Dani Rutas', email: 'dani.rut@fake.com' },
    { name: 'Carla Vientos', email: 'carla.vie@fake.com' }
];

async function seedDatabase() {
    console.log('--- Starting Global Seeding Process (Easy to Beat) ---');

    // Fetch existing auth users to map emails to IDs
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('Error listing users:', listError.message);
        return;
    }

    const userMap = {}; // email -> id

    for (const userEntry of FAKE_USERS) {
        const existingAuthUser = users.find(u => u.email === userEntry.email);
        let userId;

        if (existingAuthUser) {
            userId = existingAuthUser.id;
            console.log(`Auth user exists: ${userEntry.name} (${userId})`);
        } else {
            console.log(`Creating auth user: ${userEntry.name}`);
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: userEntry.email,
                password: 'password123',
                email_confirm: true,
                user_metadata: { full_name: userEntry.name }
            });

            if (authError) {
                console.error(`Error creating auth user ${userEntry.name}:`, authError.message);
                continue;
            }
            userId = authData.user.id;
        }
        userMap[userEntry.email] = userId;

        // Ensure profile exists
        const { error: pError } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                full_name: userEntry.name,
                avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEntry.name.split(' ')[0]}`
            });

        if (pError) console.error(`Error upserting profile: ${pError.message}`);
    }

    console.log('\n--- Inserting Scores for all Activities ---');

    for (const activityId of ACTIVITIES) {
        console.log(`\nSeeding activity: ${activityId}`);

        // Shuffle users so they don't always appear in same order
        const shuffledUsers = [...FAKE_USERS].sort(() => Math.random() - 0.5);

        // Insert at least 3-5 scores for each activity
        const numScores = 3 + Math.floor(Math.random() * 4); // 3 to 6 scores

        for (let i = 0; i < numScores; i++) {
            const userEntry = shuffledUsers[i];
            const userId = userMap[userEntry.email];

            // Easy to beat ranges:
            // Score: 300 to 600 pts
            // Time: 180 to 420 seconds (3 to 7 mins)
            const randomScore = Math.floor(Math.random() * 301) + 300;
            const randomTime = Math.floor(Math.random() * 241) + 180;
            const randomErrors = Math.floor(Math.random() * 11) + 5; // 5 to 15 errors

            const { error: sError } = await supabase
                .from('activity_scores')
                .insert({
                    activity_id: activityId,
                    user_id: userId,
                    score: randomScore,
                    time_spent: randomTime,
                    errors: randomErrors,
                    created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString() // Random date in the past
                });

            if (sError) {
                console.error(`  Error inserting score for ${activityId}: ${sError.message}`);
            } else {
                console.log(`  Added: ${userEntry.name} -> ${randomScore}pts / ${randomTime}s`);
            }
        }
    }

    console.log('\n--- Seeding Process Completed ---');
}

seedDatabase();
