-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy for users to view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create laboratories table
CREATE TABLE public.laboratories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_uz TEXT NOT NULL,
    purpose TEXT NOT NULL,
    purpose_uz TEXT NOT NULL,
    equipment TEXT[] NOT NULL DEFAULT '{}',
    equipment_uz TEXT[] NOT NULL DEFAULT '{}',
    theory TEXT NOT NULL,
    theory_uz TEXT NOT NULL,
    procedure TEXT[] NOT NULL DEFAULT '{}',
    procedure_uz TEXT[] NOT NULL DEFAULT '{}',
    table_columns JSONB NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on laboratories
ALTER TABLE public.laboratories ENABLE ROW LEVEL SECURITY;

-- Everyone can view laboratories
CREATE POLICY "Anyone can view laboratories"
ON public.laboratories
FOR SELECT
USING (true);

-- Only admins can insert laboratories
CREATE POLICY "Admins can insert laboratories"
ON public.laboratories
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update laboratories
CREATE POLICY "Admins can update laboratories"
ON public.laboratories
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete laboratories
CREATE POLICY "Admins can delete laboratories"
ON public.laboratories
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_laboratories_updated_at
BEFORE UPDATE ON public.laboratories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();