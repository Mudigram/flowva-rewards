import { supabase } from './supabaseClient';
import { ActionType } from '@/types/rewards';

export async function claimDailyStreak(userId: string, currentStreak: number, lastClaim: string | null) {
    const now = new Date();
    const lastClaimDate = lastClaim ? new Date(lastClaim) : null;

    // Check if already claimed today
    if (lastClaimDate && lastClaimDate.toDateString() === now.toDateString()) {
        return { error: 'Already claimed today' };
    }

    let newStreak = 1;
    if (lastClaimDate) {
        const diffTime = Math.abs(now.getTime() - lastClaimDate.getTime());
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays <= 2) { // Within 48 hours, streak continues
            newStreak = currentStreak + 1;
        }
    }

    const pointsToEarn = 5;

    // Start a transaction-like update
    // 1. Update Profile
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            total_points: supabase.rpc('increment', { row_id: userId, column_name: 'total_points', amount: pointsToEarn }), // This is a mock-like way, better to use absolute math if not using RPC
            current_streak: newStreak,
            last_streak_claim: now.toISOString()
        } as any) // Type casting as we'll use a safer way below
        .eq('id', userId);

    // Better approach for Supabase: use a simple update with calculated values for now
    // In a real app, you'd use a database function (RPC) to ensure atomicity

    const { data: currentProfile } = await supabase.from('profiles').select('total_points').eq('id', userId).single();
    const updatedPoints = (currentProfile?.total_points || 0) + pointsToEarn;

    const { error: updateError } = await supabase
        .from('profiles')
        .update({
            total_points: updatedPoints,
            current_streak: newStreak,
            last_streak_claim: now.toISOString()
        })
        .eq('id', userId);

    if (updateError) return { error: updateError.message };

    // 2. Log Action
    const { error: actionError } = await supabase
        .from('reward_actions')
        .insert({
            user_id: userId,
            action_type: 'daily_streak',
            points_earned: pointsToEarn,
            metadata: { streak: newStreak }
        });

    if (actionError) console.error('Error logging action:', actionError);

    return { success: true, newStreak, pointsEarned: pointsToEarn };
}

export async function performRewardAction(userId: string, actionType: ActionType, points: number) {
    // 1. Check if already performed (if one-time)
    if (actionType === 'share_stack') {
        const { data } = await supabase
            .from('reward_actions')
            .select('id')
            .eq('user_id', userId)
            .eq('action_type', actionType)
            .single();

        if (data) return { error: 'Already shared stack' };
    }

    // 2. Update Points
    const { data: currentProfile } = await supabase.from('profiles').select('total_points').eq('id', userId).single();
    const updatedPoints = (currentProfile?.total_points || 0) + points;

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ total_points: updatedPoints })
        .eq('id', userId);

    if (updateError) return { error: updateError.message };

    // 3. Log Action
    await supabase.from('reward_actions').insert({
        user_id: userId,
        action_type: actionType,
        points_earned: points
    });

    return { success: true };
}
