-- Tasks Table
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  class_id uuid references public.classes(id) on delete cascade not null,
  title text not null,
  description text,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Active Tasks Tracking (Completion)
create table public.student_task_completions (
  task_id uuid references public.tasks(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (task_id, student_id)
);

-- Enable RLS
alter table public.tasks enable row level security;
alter table public.student_task_completions enable row level security;

-- Policies for Tasks
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

create policy "Teachers can insert tasks"
  on tasks for insert
  with check (
    exists (
      select 1 from public.classes
      where id = class_id and teacher_id = auth.uid()
    )
  );

create policy "Teachers can update tasks"
  on tasks for all
  using (
    exists (
      select 1 from public.classes
      where id = class_id and teacher_id = auth.uid()
    )
  );

-- Policies for Completions
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

create policy "Students can un-complete tasks"
  on student_task_completions for delete
  using ( student_id = auth.uid() );
