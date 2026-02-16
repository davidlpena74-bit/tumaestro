-- Drop existing policy if it exists (handling potential naming variations or just ensuring clean slate)
drop policy if exists "Teachers can manage their own classes." on public.classes;

-- Create explicit policy for teachers to manage their own classes (insert, update, delete)
create policy "Teachers can manage their own classes."
  on public.classes
  for all
  using ( auth.uid() = teacher_id )
  with check ( auth.uid() = teacher_id );

-- Ensure RLS is enabled
alter table public.classes enable row level security;
