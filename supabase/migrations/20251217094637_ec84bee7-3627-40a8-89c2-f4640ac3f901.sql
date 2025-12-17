-- Add storage policy to allow file uploads to library-files bucket
CREATE POLICY "Allow public file uploads to library-files"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'library-files');