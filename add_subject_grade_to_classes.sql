-- Add subject and grade columns to classes table
alter table public.classes 
add column if not exists subject text,
add column if not exists grade text;

-- Update existing records if any (optional)
-- update public.classes set subject = 'General', grade = 'N/A' where subject is null;
