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

async function deleteRecord() {
    console.log('Searching for profile \"David Lopez\"...');

    // Find profile
    const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .ilike('full_name', '%David Lopez%');

    if (pError) {
        console.error('Error fetching profiles:', pError);
        return;
    }

    if (!profiles || profiles.length === 0) {
        console.log('No profiles found matching \"David Lopez\". Trying broader search...');
        const { data: broaderProfiles, error: bError } = await supabase
            .from('profiles')
            .select('id, full_name')
            .ilike('full_name', '%David%');

        if (bError) { console.error('Error broader search:', bError); return; }
        console.log('Profiles found with \"David\":', broaderProfiles);

        if (broaderProfiles) profiles.push(...broaderProfiles);
    }

    const uniqueProfileIds = [...new Set(profiles.map(p => p.id))];

    for (const profileId of uniqueProfileIds) {
        const profile = profiles.find(p => p.id === profileId);
        console.log(`Checking scores for profile: ${profile.full_name} (${profileId})`);

        // Find the record: activity_id='mapa-comunidades', user_id=profileId, time_spent=60
        // The user said "1 min", which is exactly 60 seconds in the database.
        const { data: scores, error: sError } = await supabase
            .from('activity_scores')
            .select('*')
            .eq('activity_id', 'mapa-comunidades')
            .eq('user_id', profileId)
            .eq('time_spent', 60);

        if (sError) {
            console.error(`Error fetching scores for ${profileId}:`, sError);
            continue;
        }

        if (scores && scores.length > 0) {
            console.log(`Found ${scores.length} record(s) to delete for ${profile.full_name}:`, scores);

            const { error: dError } = await supabase
                .from('activity_scores')
                .delete()
                .in('id', scores.map(s => s.id));

            if (dError) {
                console.error('Error deleting records:', dError);
            } else {
                console.log('Successfully deleted record(s).');
            }
        } else {
            console.log(`No records found with 60s for ${profile.full_name}.`);
        }
    }
}

deleteRecord();
