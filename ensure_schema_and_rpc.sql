-- 1. Ensure 'notifications' table exists and has correct columns
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'connection_request', 'connection_accepted', etc.
  title text not null,
  message text not null,
  data jsonb, -- extra info
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

-- Policies for Notifications
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

-- 2. Ensure 'student_teachers' has 'status' column
do $$ 
begin 
  if not exists (select 1 from information_schema.columns where table_name = 'student_teachers' and column_name = 'status') then
    alter table public.student_teachers add column status text default 'accepted';
    -- Update existing records to accepted if column was just added
    update public.student_teachers set status = 'accepted';
  end if; 
end $$;

-- 3. RPC: Mark Notification Read
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

-- 4. RPC: Accept Class Invitation (The critical function)
create or replace function public.accept_class_invitation(target_user_id uuid, target_class_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  my_id uuid;
  my_ident text;
begin
  my_id := auth.uid();
  
  -- Get identity
  select coalesce(full_name, email) into my_ident 
  from public.profiles 
  where id = my_id;

  -- Update connection status (bidirectional check)
  update public.student_teachers
  set status = 'accepted'
  where (student_id = my_id and teacher_id = target_user_id)
     or (teacher_id = my_id and student_id = target_user_id);

  -- Enroll in class if provided
  if target_class_id is not null then
    insert into public.class_students (class_id, student_id)
    values (target_class_id, my_id)
    on conflict (class_id, student_id) do nothing;
  end if;

  -- Notify the other party
  insert into public.notifications (user_id, type, title, message, data)
  values (
    target_user_id,
    'connection_accepted',
    '¡Solicitud aceptada!',
    my_ident || ' ha aceptado tu invitación.',
    jsonb_build_object('sender_id', my_id)
  );
end;
$$;

-- 5. Permissions: Allow students to join classes (Critical for class enrollment)
drop policy if exists "Students can join classes" on public.class_students;
create policy "Students can join classes"
  on public.class_students for insert
  with check ( auth.uid() = student_id );

-- Ensure students can see their own enrollments
drop policy if exists "Students can see their own enrollments" on public.class_students;
create policy "Students can see their own enrollments"
  on public.class_students for select
  using ( auth.uid() = student_id );
