-- Add delete policy for notifications so users can remove them after accepting or rejecting
create policy "Users can delete own notifications"
  on notifications for delete
  using ( auth.uid() = user_id );

-- Also fix the inconsistency in RoleBasedDashboard by ensuring the column name is correctly handled.
-- We keep 'read' as the column name as per notifications_schema.sql
