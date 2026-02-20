-- SCRIPT PARA GENERAR DATOS FALSOS PARA EL RANKING
-- Ejecuta esto en el SQL Editor de Supabase

-- 1. Intentar crear perfiles ficticios si no existen (puede fallar si hay FK estricta a auth.users)
-- Si falla por FK, simplemente usaremos los perfiles que ya existan.

DO $$ 
DECLARE
    user_id_1 UUID := '00000000-0000-0000-0000-000000000001';
    user_id_2 UUID := '00000000-0000-0000-0000-000000000002';
    user_id_3 UUID := '00000000-0000-0000-0000-000000000003';
    user_id_4 UUID := '00000000-0000-0000-0000-000000000004';
    act_id TEXT;
BEGIN
    -- Nota: Inserción en auth.users suele requerir permisos de administrador
    -- Aquí insertamos en profiles directamente. Si el sistema tiene habilitado
    -- el FK a auth.users (que es lo normal), este script solo funcionará
    -- si esos IDs existen en auth.users. 
    
    -- Como alternativa, buscaremos IDs de perfiles reales que ya existan
    -- para rellenar con datos de prueba.
    
    FOR act_id IN SELECT unnest(ARRAY['mapa-europa', 'capitales-europa', 'rios-europa', 'montanas-europa', 'mares-europa']) LOOP
        
        -- Insertamos puntuaciones aleatorias para los perfiles que existan
        INSERT INTO public.activity_scores (user_id, activity_id, score, errors, time_spent)
        SELECT 
            id, 
            act_id, 
            floor(random() * (1000-800+1) + 800)::int, -- Score entre 800 y 1000
            floor(random() * 3)::int,                  -- 0 a 2 errores
            floor(random() * (150-45+1) + 45)::int    -- 45 a 150 segundos
        FROM public.profiles
        LIMIT 10; -- Solo para los primeros 10 usuarios
        
    END LOOP;
END $$;

-- Si quieres crear "Usuarios Bot" específicos, lo mejor es crearlos desde 
-- el Dashboard de Supabase (Authentication -> Add User) y luego
-- actualizar sus nombres en la tabla profiles:
-- UPDATE profiles SET full_name = 'Sofia Geógrafa', avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' WHERE email = 'sofia@example.com';
