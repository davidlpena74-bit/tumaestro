-- 1. Classes Table Policies
drop policy if exists "Classes are viewable by assigned students and the teacher." on public.classes;
drop policy if exists "Teachers can manage their own classes." on public.classes;

create policy "Classes are viewable by assigned students and the teacher."
  on public.classes for select
  using (
    auth.uid() = teacher_id or 
    exists (
      select 1 from public.class_students 
      where class_id = public.classes.id and student_id = auth.uid()
    )
  );

create policy "Teachers can manage their own classes."
  on public.classes for all
  using ( auth.uid() = teacher_id )
  with check ( auth.uid() = teacher_id );


-- 2. Class Students Table Policies (Managing enrollments)
drop policy if exists "Class students are viewable by the teacher and the students in that class." on public.class_students;
drop policy if exists "Teachers can add/remove students from their classes." on public.class_students;

create policy "Class students are viewable by the teacher and the students in that class."
  on public.class_students for select
  using (
    exists (
      select 1 from public.classes 
      where id = class_id and teacher_id = auth.uid()
    ) or auth.uid() = student_id
  );

-- Allow teachers to INSERT into class_students if they own the class
create policy "Teachers can add students to their classes."
  on public.class_students for insert
  with check (
    exists (
      select 1 from public.classes 
      where id = class_id and teacher_id = auth.uid()
    )
  );

-- Allow teachers to DELETE from class_students if they own the class
create policy "Teachers can remove students from their classes."
  on public.class_students for delete
  using (
    exists (
      select 1 from public.classes 
      where id = class_id and teacher_id = auth.uid()
    )
  );
