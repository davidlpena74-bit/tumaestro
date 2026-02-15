-- 1. Create specific types
create type user_role as enum ('student', 'teacher', 'admin');

-- 2. Profiles Table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role user_role default 'student',
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 3. Subjects Table
create table public.subjects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  icon text, -- optional: for storing an icon identifier
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.subjects enable row level security;

-- Policies for Subjects (Readable by all, only admin can insert - typically)
create policy "Subjects are viewable by everyone."
  on subjects for select
  using ( true );

-- 4. Courses/Services Table
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references public.profiles(id) not null,
  subject_id uuid references public.subjects(id) not null,
  title text not null,
  description text,
  price_per_hour decimal(10, 2), -- or total price depending on model
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.courses enable row level security;

-- Policies for Courses
create policy "Courses are viewable by everyone."
  on courses for select
  using ( true );

create policy "Teachers can insert their own courses."
  on courses for insert
  with check ( auth.uid() = teacher_id );

create policy "Teachers can update their own courses."
  on courses for update
  using ( auth.uid() = teacher_id );

-- 5. Reviews Table
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  student_id uuid references public.profiles(id) not null,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.reviews enable row level security;

-- Policies for Reviews
create policy "Reviews are viewable by everyone."
  on reviews for select
  using ( true );

create policy "Authenticated students can review."
  on reviews for insert
  with check ( auth.uid() = student_id );

-- 6. Classes Table
create table public.classes (
  id uuid default gen_random_uuid() primary key,
  teacher_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.classes enable row level security;

-- Policies for Classes
create policy "Classes are viewable by assigned students and the teacher."
  on classes for select
  using (
    auth.uid() = teacher_id or 
    exists (
      select 1 from public.class_students 
      where class_id = public.classes.id and student_id = auth.uid()
    )
  );

create policy "Teachers can manage their own classes."
  on classes for all
  using ( auth.uid() = teacher_id );

-- 7. Class Students Table (Many-to-Many)
create table public.class_students (
  class_id uuid references public.classes(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (class_id, student_id)
);

-- Enable RLS
alter table public.class_students enable row level security;

-- Policies for Class Students
create policy "Class students are viewable by the teacher and the students in that class."
  on class_students for select
  using (
    exists (
      select 1 from public.classes 
      where id = class_id and teacher_id = auth.uid()
    ) or auth.uid() = student_id
  );

create policy "Teachers can add/remove students from their classes."
  on class_students for all
  using (
    exists (
      select 1 from public.classes 
      where id = class_id and teacher_id = auth.uid()
    )
  );

-- 8. Student-Teacher Connections (for general follow/selection)
create table public.student_teachers (
  student_id uuid references public.profiles(id) on delete cascade not null,
  teacher_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (student_id, teacher_id)
);

-- Enable RLS
alter table public.student_teachers enable row level security;

-- Policies for Student-Teacher Connections
create policy "Connections viewable by both sides."
  on student_teachers for select
  using ( auth.uid() = student_id or auth.uid() = teacher_id );

create policy "Students can select/unselect teachers."
  on student_teachers for all
  using ( auth.uid() = student_id );

create policy "Teachers can select/unselect students."
  on student_teachers for all
  using ( auth.uid() = teacher_id );

-- 9. Trigger to automatically create profile on sign up
-- Updated to include role from metadata
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'student')
  );
  return new;
end;
$$;

-- Trigger execution (ensure it exists)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
