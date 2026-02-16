-- Add status column to student_teachers
alter table public.student_teachers 
add column if not exists status text default 'pending' check (status in ('pending', 'accepted', 'rejected'));

-- Update existing records to 'accepted' so we don't break current valid connections
update public.student_teachers set status = 'accepted' where status = 'pending';

-- Add policy for notifications if not exists (already added in previous fix, but safe to ensure)
-- Ensuring students can update notifications (to mark as read or generally manage them if needed)
-- We might have 'update own notifications' policy already.

-- We need to ensure that when a teacher inserts into student_teachers, it defaults to 'pending'.
-- The default value handles this.

-- We also need to ensure that when a student accepts, they can update the status.
-- Existing policy: "Students can select/unselect teachers" (student_teachers for all using auth.uid() = student_id)
-- This allows update, so we are good.
