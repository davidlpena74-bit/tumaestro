-- Handling Connection Rejection Notifications

-- 1. Ensure 'status' column exists in student_teachers if not already
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'student_teachers' and column_name = 'status') then
        alter table public.student_teachers add column status text default 'accepted'; 
        -- Default accepted for old rows, but new requests should be pending.
        -- Ideally we would have done this earlier. Let's assume 'pending' is what we use for requests.
    end if;
end $$;

-- 2. Create Trigger Function for Rejection
create or replace function public.handle_rejected_connection()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  rejector_id uuid;
  rejector_name text;
  recipient_id uuid;
  sender_role text;
begin
  -- Trigger fired on DELETE usually means rejection of a pending request 
  -- OR removal of an existing friend.
  -- We only want to notify if it was a PENDING request being rejected.
  
  if OLD.status = 'pending' then
    rejector_id := auth.uid();
    
    -- If deleted by system or cascade, auth.uid() might be null or different.
    if rejector_id is null then return OLD; end if;

    -- Infer who is rejecting based on IDs
    if rejector_id = OLD.student_id then
       -- I am the student rejecting a teacher's request? 
       -- Or I am the student cancelling my own request?
       -- Usually requests have an `initiator_id` to know who sent it.
       -- Without `initiator_id`, we have to guess or rely on context.
       -- Assuming the UI only allows "Reject" on incoming requests.
       recipient_id := OLD.teacher_id;
       
    elsif rejector_id = OLD.teacher_id then
       -- I am the teacher rejecting a student request
       recipient_id := OLD.student_id;
    else
       return OLD; 
    end if;
    
    -- Fetch rejector name
    select coalesce(full_name, email, 'Usuario') into rejector_name
    from public.profiles 
    where id = rejector_id;

    insert into public.notifications (user_id, type, title, message, data)
    values (
      recipient_id,
      'connection_rejected', 
      'Solicitud rechazada',
      rejector_name || ' ha rechazado la solicitud de conexión.',
      '{}'::jsonb
    );
  end if;

  return OLD;
end;
$$;

-- 3. Bind Trigger
drop trigger if exists on_connection_rejected on public.student_teachers;
create trigger on_connection_rejected
  before delete on public.student_teachers
  for each row execute procedure public.handle_rejected_connection();
