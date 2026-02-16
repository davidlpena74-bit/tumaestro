-- Create Classes Table if it doesn't exist
create table if not exists public.classes (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for classes
alter table public.classes enable row level security;

-- Policies for Classes
-- Drop policies if they refer to tables we just created so we don't duplicate or error if they exist
drop policy if exists "Classes are viewable by assigned students and the teacher." on classes;
create policy "Classes are viewable by assigned students and the teacher."
  on classes for select
  using (
    auth.uid() = teacher_id or 
    exists (
      select 1 from public.class_students 
      where class_id = public.classes.id and student_id = auth.uid()
    )
  );

drop policy if exists "Teachers can manage their own classes." on classes;
create policy "Teachers can manage their own classes."
  on classes for all
  using ( auth.uid() = teacher_id );


-- Create Class Students Table if it doesn't exist
create table if not exists public.class_students (
  class_id uuid references public.classes(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (class_id, student_id)
);

-- Enable RLS for class_students
alter table public.class_students enable row level security;

-- Policies for Class Students
drop policy if exists "Class students are viewable by the teacher and the students in that class." on class_students;
create policy "Class students are viewable by the teacher and the students in that class."
  on class_students for select
  using (
    exists (
      select 1 from public.classes 
      where id = class_id and teacher_id = auth.uid()
    ) or auth.uid() = student_id
  );

drop policy if exists "Teachers can add/remove students from their classes." on class_students;
create policy "Teachers can add/remove students from their classes."
  on class_students for all
  using (
    exists (
      select 1 from public.classes 
      where id = class_id and teacher_id = auth.uid()
    )
  );

-- Tasks Table (from previous step, but ensuring it runs now that classes exist)
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes(id) on delete cascade not null,
  title text not null,
  description text,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Active Tasks Tracking (Completion)
create table if not exists public.student_task_completions (
  task_id uuid references public.tasks(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (task_id, student_id)
);

-- Enable RLS for tasks and completions
alter table public.tasks enable row level security;
alter table public.student_task_completions enable row level security;

-- Policies for Tasks
drop policy if exists "Tasks viewable by class members" on tasks;
create policy "Tasks viewable by class members"
  on tasks for select
  using (
    exists (
      select 1 from public.class_students
      where class_id = public.tasks.class_id and student_id = auth.uid()
    ) or
    exists (
      select 1 from public.classes
      where id = public.tasks.class_id and teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers can insert tasks" on tasks;
create policy "Teachers can insert tasks"
  on tasks for insert
  with check (
    exists (
      select 1 from public.classes
      where id = class_id and teacher_id = auth.uid()
    )
  );

drop policy if exists "Teachers can update tasks" on tasks;
create policy "Teachers can update tasks"
  on tasks for all
  using (
    exists (
      select 1 from public.classes
      where id = class_id and teacher_id = auth.uid()
    )
  );

-- Policies for Completions
drop policy if exists "Completions viewable by relevant parties" on student_task_completions;
create policy "Completions viewable by relevant parties"
  on student_task_completions for select
  using (
    student_id = auth.uid() or
    exists (
      select 1 from public.tasks t
      join public.classes c on t.class_id = c.id
      where t.id = task_id and c.teacher_id = auth.uid()
    )
  );

drop policy if exists "Students can complete tasks" on student_task_completions;
create policy "Students can complete tasks"
  on student_task_completions for insert
  with check (
    student_id = auth.uid() and
    exists (
       select 1 from public.tasks t
       join public.class_students cs on t.class_id = cs.class_id
       where t.id = task_id and cs.student_id = auth.uid()
    )
  );

drop policy if exists "Students can un-complete tasks" on student_task_completions;
create policy "Students can un-complete tasks"
  on student_task_completions for delete
  using ( student_id = auth.uid() );
