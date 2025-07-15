-- Add mobile number and bio data fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN phone_number TEXT,
ADD COLUMN bio_data TEXT,
ADD COLUMN user_type TEXT DEFAULT 'student' CHECK (user_type IN ('student', 'business', 'professional', 'other'));

-- Update profiles trigger to also handle phone and bio data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer set search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, phone_number, bio_data, user_type)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email,
    NEW.raw_user_meta_data->>'phone_number',
    NEW.raw_user_meta_data->>'bio_data',
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'student')
  );
  RETURN NEW;
END;
$$;

-- Create function to award points for AI chat interactions
CREATE OR REPLACE FUNCTION public.award_points_for_activity(
  user_id_param UUID,
  activity_type TEXT,
  points_to_add INTEGER DEFAULT 10
)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  current_points INTEGER;
  new_level INTEGER;
BEGIN
  -- Get current points
  SELECT total_points INTO current_points 
  FROM profiles 
  WHERE user_id = user_id_param;
  
  -- Update points
  UPDATE profiles 
  SET 
    total_points = COALESCE(total_points, 0) + points_to_add,
    updated_at = NOW()
  WHERE user_id = user_id_param;
  
  -- Calculate new level (every 100 points = 1 level)
  new_level := FLOOR((COALESCE(current_points, 0) + points_to_add) / 100) + 1;
  
  -- Update level if it changed
  UPDATE profiles 
  SET current_level = new_level
  WHERE user_id = user_id_param AND current_level < new_level;
END;
$$;

-- Create trigger to automatically award points when chat history is created
CREATE OR REPLACE FUNCTION public.award_chat_points()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Award 5 points for each AI chat interaction
  PERFORM public.award_points_for_activity(NEW.user_id, 'ai_chat', 5);
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS chat_points_trigger ON public.chat_history;
CREATE TRIGGER chat_points_trigger
  AFTER INSERT ON public.chat_history
  FOR EACH ROW EXECUTE FUNCTION public.award_chat_points();

-- Create user_activity table to track app usage time
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  points_awarded INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create policies for user_activity
CREATE POLICY "Users can view their own activity" 
ON public.user_activity 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own activity" 
ON public.user_activity 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- Add updated_at trigger for profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();