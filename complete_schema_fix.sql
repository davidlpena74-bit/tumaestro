-- 1. Create Missing Tables

-- Notifications Table
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'class_removal', 'new_assignment', etc.
  title text not null,
  message text not null,
  data jsonb,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

create policy "Users can view their own notifications."
  on public.notifications for select
  using ( auth.uid() = user_id );

create policy "System/Teachers can insert notifications."
  on public.notifications for insert
  with check ( true ); -- Ideally restricted, but for now open for app logic

create policy "Users can update own notifications (mark read)."
  on public.notifications for update
  using ( auth.uid() = user_id );


-- Tasks Table
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes(id) on delete cascade not null,
  title text not null,
  description text,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tasks enable row level security;

create policy "Tasks viewable by class members."
  on public.tasks for select
  using (
    exists (
      select 1 from public.class_students
      where class_students.class_id = tasks.class_id
      and class_students.student_id = auth.uid()
    ) or exists (
      select 1 from public.classes
      where classes.id = tasks.class_id
      and classes.teacher_id = auth.uid()
    )
  );

create policy "Teachers can manage tasks."
  on public.tasks for all
  using (
    exists (
      select 1 from public.classes
      where classes.id = tasks.class_id
      and classes.teacher_id = auth.uid()
    )
  );


-- Student Task Completions
create table if not exists public.student_task_completions (
  task_id uuid references public.tasks(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (task_id, student_id)
);

alter table public.student_task_completions enable row level security;

create policy "Viewable by student and teacher."
  on public.student_task_completions for select
  using (
    auth.uid() = student_id or exists (
       select 1 from public.tasks
       join public.classes on tasks.class_id = classes.id
       where tasks.id = student_task_completions.task_id
       and classes.teacher_id = auth.uid()
    )
  );

create policy "Students can mark complete."
  on public.student_task_completions for insert
  with check ( auth.uid() = student_id );

create policy "Students can mark incomplete."
  on public.student_task_completions for delete
  using ( auth.uid() = student_id );


-- 2. Fix Infinite Recursion in RLS Policies

-- Helper function to check if user is teacher of a class (Security Definer to bypass RLS)
create or replace function public.is_class_teacher(class_uuid uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.classes
    where id = $1 and teacher_id = auth.uid()
  );
$$;

-- Drop existing complex policies to replace them
drop policy if exists "Classes are viewable by assigned students and the teacher." on public.classes;
drop policy if exists "Class students are viewable by the teacher and the students in that class." on public.class_students;
drop policy if exists "Teachers can view their own classes" on public.classes; 

-- Re-create Classes Policy
create policy "Classes are viewable by assigned students and the teacher."
  on public.classes for select
  using (
    teacher_id = auth.uid() or 
    exists (
      select 1 from public.class_students 
      where class_id = public.classes.id and student_id = auth.uid()
    )
  );

-- Re-create Class Students Policy (using helper to break recursion)
create policy "Class students are viewable by the teacher and the students in that class."
  on public.class_students for select
  using (
    student_id = auth.uid() or public.is_class_teacher(class_id)
  );

-- Ensure Teachers can manage their classes (Already done, but reinforcing)
drop policy if exists "Teachers can manage their own classes." on public.classes;
create policy "Teachers can manage their own classes."
  on public.classes for all
  using ( auth.uid() = teacher_id );
