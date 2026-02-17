-- Trigger to automatically remove students from classes when their connection with the teacher is deleted.

create or replace function public.handle_removed_connection()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- If a student-teacher connection is deleted
  -- We must remove the student from ALL classes owned by that teacher.
  
  -- OLD.student_id is the student
  -- OLD.teacher_id is the teacher
  
  delete from public.class_students
  where student_id = OLD.student_id
  and class_id in (
    select id from public.classes where teacher_id = OLD.teacher_id
  );
  
  return OLD;
end;
$$;

-- Drop trigger if exists
drop trigger if exists on_connection_removed on public.student_teachers;

-- Create trigger
create trigger on_connection_removed
  after delete on public.student_teachers
  for each row execute procedure public.handle_removed_connection();
