import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function checkUser() {
    const email = 'davidlpena74@gmail.com';
    console.log(`Buscando usuario: ${email}...`);

    // 1. Check in auth.users (requires service role)
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
        console.error('Error al listar usuarios de auth:', authError.message);
        return;
    }

    const userInAuth = authUsers.users.find(u => u.email === email);

    if (userInAuth) {
        console.log('✅ Usuario encontrado en Auth:');
        console.log(`   ID: ${userInAuth.id}`);
        console.log(`   Email: ${userInAuth.email}`);
        console.log(`   Metadata:`, userInAuth.user_metadata);

        // 2. Check in public.profiles
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userInAuth.id)
            .single();

        if (profileError) {
            console.log('❌ El perfil en public.profiles NO existe o hubo un error:', profileError.message);
        } else {
            console.log('✅ Perfil encontrado en la base de datos:');
            console.log(`   Nombre: ${profile.full_name}`);
            console.log(`   Rol: ${profile.role}`);
        }
    } else {
        console.log('❌ No se encontró ningún usuario con ese email en Auth.');
    }
}

checkUser();
