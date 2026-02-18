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

async function deleteUser() {
    const email = 'davidlpena74@gmail.com';
    console.log(`Iniciando eliminación del usuario: ${email}...`);

    // 1. Get the user ID
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error('Error al listar usuarios:', listError.message);
        return;
    }

    const targetUser = users.find(u => u.email === email);

    if (!targetUser) {
        console.log(`❌ No se encontró el usuario ${email}. Puede que ya haya sido borrado.`);
        return;
    }

    console.log(`✅ Usuario encontrado (ID: ${targetUser.id}). Procediendo al borrado...`);

    // 2. Delete the user (this should cascade if DB triggers are set, or we rely on the DB cleanup)
    const { error: deleteError } = await supabase.auth.admin.deleteUser(targetUser.id);

    if (deleteError) {
        console.error('❌ Error al borrar el usuario de Auth:', deleteError.message);
    } else {
        console.log('✅ Usuario eliminado correctamente de Supabase Auth.');

        // 3. Double check public.profiles (our RPC usually handles this, but let's be sure)
        const { error: profileError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', targetUser.id);

        if (profileError) {
            console.log('Nota: El perfil puede que ya no existiera o dio error al borrar:', profileError.message);
        } else {
            console.log('✅ Perfil en base de datos verificado/borrado.');
        }
    }
}

deleteUser();
