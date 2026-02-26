import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listUsers() {
    try {
        // 1. Get all users from Auth
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
        if (authError) throw authError;

        // 2. Get all profiles for names
        const { data: profiles, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, role');
        if (profileError) console.warn('Could not fetch profiles:', profileError.message);

        const profileMap = profiles ? Object.fromEntries(profiles.map(p => [p.id, p])) : {};

        console.log('\n--- LISTA DE USUARIOS REGISTRADOS ---');
        console.log('Email | Nombre | Fecha Reg. | Rol');
        console.log('------------------------------------');

        authData.users.forEach(user => {
            const profile = profileMap[user.id] || {};
            const name = profile.full_name || user.user_metadata?.full_name || 'N/A';
            const date = new Date(user.created_at).toLocaleDateString();
            const role = profile.role || 'user';

            console.log(`${user.email} | ${name} | ${date} | ${role}`);
        });

    } catch (err) {
        console.error('Error:', err.message);
    }
}

listUsers();
