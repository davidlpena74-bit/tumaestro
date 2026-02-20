-- Create activity_ratings table
CREATE TABLE IF NOT EXISTS public.activity_ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    activity_id TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    -- Ensure one rating per user per activity
    UNIQUE(user_id, activity_id)
);

-- Enable RLS
ALTER TABLE public.activity_ratings ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Public can read ratings (to calculate averages)
CREATE POLICY "Allow public read access to ratings"
ON public.activity_ratings FOR SELECT
TO public
USING (true);

-- 2. Authenticated users can insert their own ratings
CREATE POLICY "Allow authenticated users to insert their own ratings"
ON public.activity_ratings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Users can update their own ratings
CREATE POLICY "Allow users to update their own ratings"
ON public.activity_ratings FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. Users can delete their own ratings
CREATE POLICY "Allow users to delete their own ratings"
ON public.activity_ratings FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_activity_ratings_activity_id ON public.activity_ratings(activity_id);
