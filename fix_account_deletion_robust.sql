-- Securely allow users to delete their own account and all associated data
-- 1. Ensure all foreign keys in public schema have ON DELETE CASCADE where missing
DO $$ 
BEGIN
    -- Fix courses table
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'courses_teacher_id_fkey') THEN
        ALTER TABLE public.courses DROP CONSTRAINT courses_teacher_id_fkey;
    END IF;
    ALTER TABLE public.courses ADD CONSTRAINT courses_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

    -- Fix reviews table (student side)
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'reviews_student_id_fkey') THEN
        ALTER TABLE public.reviews DROP CONSTRAINT reviews_student_id_fkey;
    END IF;
    ALTER TABLE public.reviews ADD CONSTRAINT reviews_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
END $$;

-- 2. Re-create the deletion function with better error handling and atomic steps
DROP FUNCTION IF EXISTS public.delete_own_account();
CREATE OR REPLACE FUNCTION public.delete_own_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  target_user_id := auth.uid();

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 1. Clear any notifications for this user (they might reference the user)
  -- Although profiles has cascade, we do this to be safe and avoid trigger noise
  DELETE FROM public.notifications WHERE user_id = target_user_id;

  -- 2. Delete from public.profiles
  -- This will trigger cascades to classes, class_students, student_teachers, tasks, completions, courses, reviews (now that we added cascade)
  DELETE FROM public.profiles WHERE id = target_user_id;

  -- 3. Finally delete from auth.users
  -- This requires the function owner (postgres) to have permissions on auth schema.
  -- In Supabase, postgres has these permissions.
  DELETE FROM auth.users WHERE id = target_user_id;
END;
$$;

-- 3. Ensure permissions
GRANT EXECUTE ON FUNCTION public.delete_own_account() TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_own_account() TO service_role;
