-- 1. Drop the existing function to avoid "cannot change name of input parameter" error
drop function if exists public.accept_class_invitation(uuid, uuid);
-- Also drop any single-argument version if it exists, just to be clean
drop function if exists public.accept_class_invitation(uuid);

-- 2. Re-create the function correctly
create or replace function public.accept_class_invitation(target_user_id uuid, target_class_id uuid default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  my_id uuid;
  my_ident text;
  my_name text;
  my_email text;
begin
  my_id := auth.uid();
  
  -- Get identity
  select full_name, email into my_name, my_email
  from public.profiles 
  where id = my_id;
  
  my_ident := coalesce(my_name, my_email, 'Usuario');

  -- 1. Update connection status (bidirectional check)
  -- This handles confirming the student<->teacher relationship
  update public.student_teachers
  set status = 'accepted'
  where (student_id = my_id and teacher_id = target_user_id)
     or (teacher_id = my_id and student_id = target_user_id);

  -- 2. Enroll in class if provided and if I am the student
  if target_class_id is not null then
    -- We assume the INVITED person joins the class. 
    -- If a teacher accepts a student request, the student (target_user_id) should be in the class?
    -- Actually, usually the student accepts an invite to join.
    -- If I am the student (accepting invite):
    insert into public.class_students (class_id, student_id)
    values (target_class_id, my_id)
    on conflict (class_id, student_id) do nothing;
  end if;

  -- 3. Notify the OTHER party (the one who sent the request)
  insert into public.notifications (user_id, type, title, message, data)
  values (
    target_user_id,
    'connection_accepted',
    'Solicitud aceptada',
    my_ident || ' ha aceptado tu solicitud.',
    jsonb_build_object('sender_id', my_id, 'class_id', target_class_id)
  );
end;
$$;

-- 3. Ensure policies are correct for class joining
drop policy if exists "Students can join classes" on public.class_students;
create policy "Students can join classes"
  on public.class_students for insert
  with check ( auth.uid() = student_id );

drop policy if exists "Students can see their own enrollments" on public.class_students;
create policy "Students can see their own enrollments"
  on public.class_students for select
  using ( auth.uid() = student_id );
