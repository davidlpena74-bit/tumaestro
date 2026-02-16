-- FINAL FIX FOR INFINITE RECURSION
-- We are replacing all related policies with a clean set that uses a SECURITY DEFINER function
-- to break the dependency cycle between 'classes' and 'class_students'.

-- 1. Clean up old policies
drop policy if exists "Classes are viewable by assigned students and the teacher." on public.classes;
drop policy if exists "Teachers can manage their own classes." on public.classes;
drop policy if exists "Teachers can view their own classes" on public.classes;
drop policy if exists "Classes Access" on public.classes;
drop policy if exists "Classes Management" on public.classes;

drop policy if exists "Class students are viewable by the teacher and the students in that class." on public.class_students;
drop policy if exists "Teachers can add/remove students from their classes." on public.class_students;
drop policy if exists "Teachers can add students to their classes." on public.class_students;
drop policy if exists "Teachers can remove students from their classes." on public.class_students;
drop policy if exists "Class Students Access" on public.class_students;
drop policy if exists "Class Students Teacher Manage" on public.class_students;

-- 2. Create the Security Definer function (The Circuit Breaker)
-- This function checks if a user is the teacher of a class.
-- 'security definer' means it runs with the permissions of the CREATOR (you/admin),
-- bypassing RLS on the 'classes' table to avoid the infinite loop.
create or replace function public.is_teacher_of_class(_class_id uuid)
returns boolean
language plpgsql
security definer 
set search_path = public -- Best practice for security definer
as $$
begin
  return exists (
    select 1 from public.classes
    where id = _class_id
    and teacher_id = auth.uid()
  );
end;
$$;

-- 3. Policies for CLASSES
-- Teacher view is simple. Student view queries class_students.
create policy "Classes Access"
  on public.classes for select
  using (
    teacher_id = auth.uid() 
    or 
    exists (
      select 1 from public.class_students 
      where class_id = id and student_id = auth.uid()
    )
  );

create policy "Classes Management"
  on public.classes for all
  using ( teacher_id = auth.uid() );

-- 4. Policies for CLASS_STUDENTS
-- Student view is simple. Teacher view uses the FUNCTION to check classes safely.
create policy "Class Students Access"
  on public.class_students for select
  using (
    student_id = auth.uid() 
    or
    public.is_teacher_of_class(class_id) -- Calls the safe function
  );

create policy "Class Students Teacher Manage"
  on public.class_students for all
  using (
    public.is_teacher_of_class(class_id) -- Calls the safe function
  );

-- 5. Ensure missing tables exist (Notifications, Tasks) to prevent 404s
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  title text not null,
  message text not null,
  data jsonb,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.notifications enable row level security;
drop policy if exists "Users can view their own notifications." on public.notifications;
create policy "Users can view their own notifications." on public.notifications for select using ( auth.uid() = user_id );
drop policy if exists "Anyone can insert notifications." on public.notifications;
create policy "Anyone can insert notifications." on public.notifications for insert with check ( true );

create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes(id) on delete cascade not null,
  title text not null,
  description text,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.tasks enable row level security;
drop policy if exists "Task Access" on public.tasks;
create policy "Task Access" on public.tasks for all using (
  exists (
    select 1 from public.class_students where class_id = tasks.class_id and student_id = auth.uid()
  ) or exists (
    select 1 from public.classes where id = tasks.class_id and teacher_id = auth.uid()
  )
);

create table if not exists public.student_task_completions (
  task_id uuid references public.tasks(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (task_id, student_id)
);
alter table public.student_task_completions enable row level security;
drop policy if exists "Completion Access" on public.student_task_completions;
create policy "Completion Access" on public.student_task_completions for all using ( true );
