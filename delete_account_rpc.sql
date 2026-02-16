-- Create a secure function to allow users to delete their own account
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid;
begin
  current_user_id := auth.uid();

  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- 1. Manually delete data from tables that might not have ON DELETE CASCADE
  -- (Adjust based on your actual schema constraints if needed)
  delete from public.courses where teacher_id = current_user_id;
  delete from public.reviews where student_id = current_user_id;
  
  -- 2. Delete the user from auth.users
  -- Because public.profiles has 'references auth.users on delete cascade',
  -- this will automatically remove the profile and any other cascading data
  delete from auth.users where id = current_user_id;
end;
$$;
