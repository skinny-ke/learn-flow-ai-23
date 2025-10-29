-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create user_stats table for XP, level, streak
CREATE TABLE public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stats"
  ON public.user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON public.user_stats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats"
  ON public.user_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create subject_progress table
CREATE TABLE public.subject_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject_name TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  total_time_minutes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, subject_name)
);

ALTER TABLE public.subject_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress"
  ON public.subject_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own progress"
  ON public.subject_progress FOR ALL
  USING (auth.uid() = user_id);

-- Create quiz_results table
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz results"
  ON public.quiz_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results"
  ON public.quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create calendar_events table
CREATE TABLE public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  subject TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own events"
  ON public.calendar_events FOR ALL
  USING (auth.uid() = user_id);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subject_progress_updated_at
  BEFORE UPDATE ON public.subject_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Student')
  );
  
  -- Insert user stats
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger to create profile and stats on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();