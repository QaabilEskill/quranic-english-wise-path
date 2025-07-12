-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT,
  has_paid_access BOOLEAN DEFAULT false,
  demo_messages_used INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  level INTEGER DEFAULT 1,
  category TEXT DEFAULT 'basic',
  is_islamic_themed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create vocabulary table
CREATE TABLE public.vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  arabic_word TEXT,
  english_word TEXT NOT NULL,
  meaning TEXT NOT NULL,
  pronunciation TEXT,
  example_sentence TEXT,
  category TEXT DEFAULT 'islamic',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create chat history table
CREATE TABLE public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  session_type TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookmarks table
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  phrase TEXT NOT NULL,
  meaning TEXT,
  source_type TEXT,
  source_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create quiz tests table
CREATE TABLE public.quiz_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  level INTEGER NOT NULL,
  questions JSONB NOT NULL,
  passing_score INTEGER DEFAULT 70,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user test results table
CREATE TABLE public.user_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES public.quiz_tests(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  answers JSONB,
  passed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Create Islamic stories table
CREATE TABLE public.islamic_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  level TEXT DEFAULT 'beginner',
  moral_lesson TEXT,
  vocabulary_focus TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create daily content tables
CREATE TABLE public.daily_hadith (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hadith_text TEXT NOT NULL,
  translation TEXT NOT NULL,
  explanation TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.quranic_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  arabic_word TEXT NOT NULL,
  english_meaning TEXT NOT NULL,
  transliteration TEXT,
  context TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.duas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  arabic_text TEXT NOT NULL,
  english_translation TEXT NOT NULL,
  transliteration TEXT,
  occasion TEXT,
  category TEXT DEFAULT 'daily',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.islamic_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_hadith ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quranic_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duas ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Everyone can view lessons" ON public.lessons
FOR SELECT USING (true);

CREATE POLICY "Everyone can view vocabulary" ON public.vocabulary
FOR SELECT USING (true);

CREATE POLICY "Users can view their own progress" ON public.user_progress
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own progress" ON public.user_progress
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own progress" ON public.user_progress
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can view their own chat history" ON public.chat_history
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own chat history" ON public.chat_history
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own bookmarks" ON public.bookmarks
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own bookmarks" ON public.bookmarks
FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Everyone can view quiz tests" ON public.quiz_tests
FOR SELECT USING (true);

CREATE POLICY "Users can view their own test results" ON public.user_test_results
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own test results" ON public.user_test_results
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Everyone can view Islamic stories" ON public.islamic_stories
FOR SELECT USING (true);

CREATE POLICY "Everyone can view daily hadith" ON public.daily_hadith
FOR SELECT USING (true);

CREATE POLICY "Everyone can view Quranic words" ON public.quranic_words
FOR SELECT USING (true);

CREATE POLICY "Everyone can view duas" ON public.duas
FOR SELECT USING (true);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON public.profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ language 'plpgsql' security definer;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();