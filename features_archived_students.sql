-- FEATURE: Archived Students (Soft Delete)

-- 1. Add 'status' column to class_students
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'class_students' and column_name = 'status') then
        alter table public.class_students add column status text default 'active';
    end if;
end $$;

-- 2. Modify "Remove Connection" Trigger to ARCHIVE instead of DELETE from classes
create or replace function public.handle_removed_connection()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Instead of deleting, we mark as 'archived' in all classes of this teacher
  update public.class_students
  set status = 'archived'
  where student_id = OLD.student_id
  and class_id in (
    select id from public.classes where teacher_id = OLD.teacher_id
  );
  
  return OLD;
end;
$$;

-- Ensure Trigger is bound (it uses the same name as before, so create or replace function updates logic)
-- The trigger 'on_connection_removed' executes this function.

-- 3. Upsert Function for Adding Students (Handle Re-admission)
-- When adding a student, if they exist as 'archived', we must set to 'active'.
create or replace function public.enroll_student(p_class_id uuid, p_student_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.class_students (class_id, student_id, status, joined_at)
    values (p_class_id, p_student_id, 'active', now())
    on conflict (class_id, student_id) 
    do update set status = 'active', joined_at = now();
end;
$$;

-- 4. Update Policies (Optional but good practice)
-- Teachers can see all (active and archived).
-- Students can see their own (active and archived).
-- No change needed to existing policies as they don't filter by status usually.
