-- Fix Notifications Table Columns
-- We want to standardize on 'read' column, but 'is_read' might exist instead.

do $$
begin
    -- Check if 'is_read' exists and 'read' does NOT exist
    if exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'is_read') 
       and not exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'read') then
        
        alter table public.notifications rename column is_read to read;
        
    -- If both exist, we need to decide. Let's assume 'read' is the target but might be empty.
    elsif exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'is_read') 
       and exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'read') then
       
        -- Sync data just in case
        update public.notifications set read = is_read where read is null;
        -- We can optionally drop is_read or ignore it. Let's keep it for safety but ensure 'read' is used.
        
    -- If 'read' exists and 'is_read' does not, we are good.
    end if;

    -- Final Check: Ensure 'read' column definitely exists now.
    if not exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'read') then
        alter table public.notifications add column read boolean default false;
    end if;
end $$;
