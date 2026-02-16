-- 1. Create Notifications Table
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'connection_request', 'connection_accepted'
  title text not null,
  message text not null,
  data jsonb, -- stores extra info like { sender_id: '...' }
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

drop policy if exists "Users can see their own notifications" on notifications;
create policy "Users can see their own notifications"
  on notifications for select
  using ( auth.uid() = user_id );

drop policy if exists "Users can update own notifications" on notifications;
create policy "Users can update own notifications"
  on notifications for update
  using ( auth.uid() = user_id );

-- 2. Modify student_teachers to support 'pending' status
-- We add the column if it doesn't exist. Existing rows get 'accepted' by default to maintain current behavior.
do $$ 
begin 
  if not exists (select 1 from information_schema.columns where table_name = 'student_teachers' and column_name = 'status') then
    alter table public.student_teachers add column status text default 'accepted';
  end if; 
end $$;

-- 3. Function to Send Connection Request
create or replace function public.send_connection_request(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  sender_id uuid;
  sender_role user_role;
  sender_name text;
begin
  sender_id := auth.uid();
  
  -- Get sender details
  select role, full_name into sender_role, sender_name from public.profiles where id = sender_id;
  
  -- Insert into student_teachers based on who is who
  -- We use ON CONFLICT DO NOTHING to avoid crashing if request exists, 
  -- but ideally we should update if it was previously rejected (not handling rejection logic deeply yet)
  if sender_role = 'student' then
    -- Student requesting Teacher
    insert into public.student_teachers (student_id, teacher_id, status)
    values (sender_id, target_user_id, 'pending')
    on conflict (student_id, teacher_id) do update set status = 'pending'; 
  else
    -- Teacher requesting Student
    insert into public.student_teachers (student_id, teacher_id, status)
    values (target_user_id, sender_id, 'pending')
    on conflict (student_id, teacher_id) do update set status = 'pending';
  end if;

  -- Create Notification for the target
  insert into public.notifications (user_id, type, title, message, data)
  values (
    target_user_id,
    'connection_request',
    'Nueva solicitud de conexión',
    sender_name || ' te ha enviado una solicitud para conectar.',
    jsonb_build_object('sender_id', sender_id)
  );
end;
$$;

-- 4. Function to Accept Connection Request
create or replace function public.accept_connection_request(requester_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  my_id uuid;
  my_role user_role;
  my_name text;
begin
  my_id := auth.uid();
  select role, full_name into my_role, my_name from public.profiles where id = my_id;

  -- Update status to accepted
  if my_role = 'teacher' then
    -- I am teacher, accepting student (requester)
    update public.student_teachers
    set status = 'accepted'
    where teacher_id = my_id and student_id = requester_id;
  else
    -- I am student, accepting teacher (requester)
    update public.student_teachers
    set status = 'accepted'
    where student_id = my_id and teacher_id = requester_id;
  end if;

  -- Notify the requester that I accepted
  insert into public.notifications (user_id, type, title, message, data)
  values (
    requester_id,
    'connection_accepted',
    'Solicitud aceptada',
    my_name || ' ha aceptado tu solicitud de conexión.',
    jsonb_build_object('sender_id', my_id)
  );
end;
$$;

-- 5. Function to Mark Notification as Read
create or replace function public.mark_notification_read(notif_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.notifications
  set read = true
  where id = notif_id and user_id = auth.uid();
end;
$$;
