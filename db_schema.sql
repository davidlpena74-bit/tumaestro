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

-- 6. Trigger to automatically create profile on sign up (Optional but recommended)
-- This function handles the creation of a profile row whenever a new user signs up in auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger execution
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
