-- Create storage bucket for team member avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('team-avatars', 'team-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view avatars
CREATE POLICY "Anyone can view team avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-avatars');

-- Allow admin to manage avatars (via edge function with service role)
CREATE POLICY "Service role can manage team avatars"
ON storage.objects FOR ALL
USING (bucket_id = 'team-avatars')
WITH CHECK (bucket_id = 'team-avatars');

-- Make username nullable in team_members table
ALTER TABLE public.team_members ALTER COLUMN username DROP NOT NULL;