-- ENHANCED CONNECTION LOGIC (Cancellation vs Rejection vs Unlinking)

-- 1. Add 'initiator_id' to student_teachers to track who started the request
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'student_teachers' and column_name = 'initiator_id') then
        alter table public.student_teachers add column initiator_id uuid references public.profiles(id);
    end if;
end $$;

-- 2. Update existing rows (best guess cleanup)
-- If we can't be sure, strictly speaking allow null, but for logic we try to infer or leave null.
-- We won't force not null on existing rows to avoid breaking.

-- 3. Unified Trigger for Deletions (Rejections & Unlinking)
create or replace function public.handle_connection_deletion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_id uuid;
  actor_name text;
  recipient_id uuid;
  notification_type text;
  notification_title text;
  notification_msg text;
begin
  actor_id := auth.uid();
  
  -- If system delete (cascade/admin), might be null. Skip or handle gracefully.
  if actor_id is null then return OLD; end if;

  -- fetch actor name
  select coalesce(full_name, email, 'Usuario') into actor_name
  from public.profiles where id = actor_id;

  -- CASE A: PENDING REQUEST (Rejection vs Cancellation)
  if OLD.status = 'pending' then
     
     -- If the deleter is the INITIATOR, it's a CANCELLATION.
     -- We generally DO NOT notify the other party if I cancel my own request.
     if OLD.initiator_id is not null and actor_id = OLD.initiator_id then
        return OLD; -- Cancelled, no noise.
     end if;

     -- If the deleter is NOT the initiator (i.e. is the target), it's a REJECTION.
     -- We notify the initiator.
     if OLD.initiator_id is not null and actor_id <> OLD.initiator_id then
        recipient_id := OLD.initiator_id;
        notification_type := 'connection_rejected';
        notification_title := 'Solicitud Rechazada';
        notification_msg := actor_name || ' ha rechazado tu solicitud.';
        
     -- If initiator_id is NULL (legacy row), we fallback to guessing or do nothing to be safe.
     -- Let's try to guess: if actor is student, notify teacher? Risky. 
     -- Better safe: if no initiator_id, implies old data, maybe skip or send generic.
     -- Let's skip to avoid "Case A (Option 2) robustness".
     elsif OLD.initiator_id is null then
         return OLD; 
     end if;

  -- CASE B: ACCEPTED CONNECTION (Unlinking)
  elsif OLD.status = 'accepted' then
     -- User is breaking a bond. Notify the OTHER party.
     if actor_id = OLD.student_id then
        recipient_id := OLD.teacher_id;
     else
        recipient_id := OLD.student_id;
     end if;
     
     notification_type := 'connection_removed';
     notification_title := 'Conexión Finalizada';
     notification_msg := actor_name || ' ha finalizado vuestra conexión.';
     
  else
     return OLD;
  end if;

  -- Execute Notification if recipient identified
  if recipient_id is not null then
      insert into public.notifications (user_id, type, title, message, data)
      values (
        recipient_id,
        notification_type, 
        notification_title,
        notification_msg,
        jsonb_build_object('actor_id', actor_id, 'previous_status', OLD.status)
      );
  end if;

  return OLD;
end;
$$;

-- 4. Bind Trigger
drop trigger if exists on_connection_deleted on public.student_teachers;
-- Also drop the old one if it exists from previous steps
drop trigger if exists on_connection_rejected on public.student_teachers;

create trigger on_connection_deleted
  before delete on public.student_teachers
  for each row execute procedure public.handle_connection_deletion();
