-- Create library_items table
CREATE TABLE public.library_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'book',
  category TEXT NOT NULL,
  file_url TEXT,
  external_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;

-- Everyone can view library items
CREATE POLICY "Anyone can view library items"
ON public.library_items
FOR SELECT
USING (true);

-- Create storage bucket for library files
INSERT INTO storage.buckets (id, name, public)
VALUES ('library-files', 'library-files', true);

-- Anyone can view library files
CREATE POLICY "Anyone can view library files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'library-files');

-- Create trigger for updated_at
CREATE TRIGGER update_library_items_updated_at
BEFORE UPDATE ON public.library_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();