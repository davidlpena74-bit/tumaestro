import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function countUsers() {
    let totalUsers = 0;
    let page = 1;
    const perPage = 1000;

    try {
        while (true) {
            const { data, error } = await supabase.auth.admin.listUsers({
                page: page,
                perPage: perPage
            });

            if (error) {
                console.error('Error listing users:', error.message);
                break;
            }

            totalUsers += data.users.length;

            if (data.users.length < perPage) {
                break;
            }
            page++;
        }

        console.log(`TOTAL_USERS_COUNT:${totalUsers}`);
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

countUsers();
