-- Create activity_scores table for rankings
CREATE TABLE IF NOT EXISTS public.activity_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_id TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    errors INTEGER NOT NULL DEFAULT 0,
    time_spent INTEGER NOT NULL DEFAULT 0, -- in seconds
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_scores ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Everyone can read scores to see rankings
CREATE POLICY "Allow public read access to scores"
ON public.activity_scores FOR SELECT
TO public
USING (true);

-- 2. Authenticated users can insert their own scores
CREATE POLICY "Allow authenticated users to insert their own scores"
ON public.activity_scores FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_scores_activity_id ON public.activity_scores(activity_id);
CREATE INDEX IF NOT EXISTS idx_activity_scores_score ON public.activity_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_activity_scores_created_at ON public.activity_scores(created_at DESC);
