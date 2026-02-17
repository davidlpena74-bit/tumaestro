-- FINAL FIX FOR NOTIFICATIONS AND RLS

-- 1. Ensure 'read' column is the authority
do $$
begin
    -- If 'read' does not exist but 'is_read' does, rename it
    if not exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'read') 
       and exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'is_read') then
        alter table public.notifications rename column is_read to read;
    end if;

    -- If 'read' still doesn't exist, create it
    if not exists (select 1 from information_schema.columns where table_name = 'notifications' and column_name = 'read') then
        alter table public.notifications add column read boolean default false;
    end if;
end $$;

-- 2. Reset RLS Policies for Notifications completely
alter table public.notifications enable row level security;

drop policy if exists "Users can see their own notifications" on notifications;
create policy "Users can see their own notifications"
  on notifications for select
  using ( auth.uid() = user_id );

drop policy if exists "Users can update own notifications" on notifications;
create policy "Users can update own notifications"
  on notifications for update
  using ( auth.uid() = user_id );

drop policy if exists "Users can delete own notifications" on notifications;
create policy "Users can delete own notifications"
  on notifications for delete
  using ( auth.uid() = user_id );

drop policy if exists "Anyone can insert notifications" on notifications;
-- We usually restrict insert, but for system notifications via RPC effectively it is 'system'.
-- But sometimes users insert notifications directly (e.g. valid friend request).
-- Let's allow users to insert notifications for ANYONE for now (to facilitate requests), 
-- or restrict to 'connection_request'.
-- For now, let's keep it checking nothing for insert, relying on application logic? 
-- No, let's allow authenticated users to insert.
create policy "Users can insert notifications"
  on notifications for insert
  with check ( auth.role() = 'authenticated' );

-- 3. Robust 'mark_notification_read' RPC
-- Drop old versions just in case
drop function if exists public.mark_notification_read(uuid);

create or replace function public.mark_notification_read(notif_id uuid)
returns boolean -- Return true if successful
language plpgsql
security definer
set search_path = public
as $$
declare
  _user_id uuid;
  _row_count int;
begin
  _user_id := auth.uid();
  
  update public.notifications
  set read = true
  where id = notif_id and user_id = _user_id;

  get diagnostics _row_count = row_count;
  return _row_count > 0;
end;
$$;

-- 4. Just in case, grant permissions explicitly (should not be needed for public schema but good practice)
grant all on public.notifications to authenticated;
grant all on public.notifications to service_role;
