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
    'physical-map-game'
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
    console.log('--- Starting Seeding Process (Admin Mode) ---');

    for (const userEntry of FAKE_USERS) {
        console.log(`\nProcessing: ${userEntry.name}`);

        let userId;

        // 1. Check if user already exists in auth
        const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
        if (listError) {
            console.error('Error listing users:', listError.message);
            return;
        }

        const existingAuthUser = users.find(u => u.email === userEntry.email);

        if (existingAuthUser) {
            userId = existingAuthUser.id;
            console.log(`Auth user found: ${userId}`);
        } else {
            // Create user in Auth
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
            console.log(`Created auth user: ${userId}`);
        }

        // 2. Update/Create Profile (The trigger should have created it, but let's be sure and set the name)
        // Wait a bit for trigger
        await new Promise(r => setTimeout(r, 500));

        const { error: pError } = await supabase
            .from('profiles')
            .update({
                full_name: userEntry.name,
                avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEntry.name.split(' ')[0]}`
            })
            .eq('id', userId);

        if (pError) {
            console.error(`Error updating profile for ${userEntry.name}:`, pError.message);
            // If it doesn't exist yet, insert it (sometimes triggers are slow or missing)
            await supabase.from('profiles').upsert({
                id: userId,
                full_name: userEntry.name,
                avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEntry.name.split(' ')[0]}`
            });
        }

        // 3. Insert easy-to-beat scores
        for (const activityId of ACTIVITIES) {
            const randomScore = Math.floor(Math.random() * 200) + 300; // 300-500 pts
            const randomTime = Math.floor(Math.random() * 120) + 180; // 180-300 seconds

            const { error: sError } = await supabase
                .from('activity_scores')
                .insert({
                    activity_id: activityId,
                    user_id: userId,
                    score: randomScore,
                    time_spent: randomTime,
                    errors: Math.floor(Math.random() * 15) + 5,
                });

            if (sError) {
                console.error(`Error inserting score: ${sError.message}`);
            } else {
                console.log(`Added score for ${activityId}: ${randomScore}pts / ${randomTime}s`);
            }
        }
    }

    console.log('\n--- Seeding Completed successfully ---');
}

seedDatabase();
