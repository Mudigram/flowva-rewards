-- SQL Migration: Rewards Hub Backend (Updated for existing 'profiles')
-- Run this in your Supabase SQL Editor

-- 1. Extend existing 'profiles' table with Rewards metadata
-- Assuming 'id' and 'total_points' already exist
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0 NOT NULL,
    ADD COLUMN IF NOT EXISTS last_streak_claim TIMESTAMP WITH TIME ZONE,
    ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- 2. Table for Logging Point-Earning Actions
CREATE TABLE IF NOT EXISTS public.reward_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    action_type TEXT NOT NULL, -- e.g., 'daily_streak', 'tool_spotlight', 'share_stack', 'referral_bonus'
    points_earned INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. Table for Tracking Referrals
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inviter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    invitee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    invitee_email TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL, -- 'pending', 'joined', 'completed_onboarding'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 4. RLS Policies
ALTER TABLE public.reward_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Profiles policies (assuming some already exist, we just ensure user can view theirs)
-- CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

-- Users can only see their own actions
CREATE POLICY "Users can view their own actions" ON public.reward_actions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can only see referrals they initiated
CREATE POLICY "Users can view their own referrals" ON public.referrals
    FOR SELECT USING (auth.uid() = inviter_id);
