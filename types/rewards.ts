export type ActionType =
    | 'daily_streak'
    | 'tool_spotlight'
    | 'share_stack'
    | 'referral_bonus';

export interface UserRewards {
    id: string;
    total_points: number;
    current_streak: number;
    last_streak_claim: string | null;
    referral_code: string | null;
}

export interface RewardAction {
    id: string;
    user_id: string;
    action_type: ActionType;
    points_earned: number;
    metadata: Record<string, any>;
    created_at: string;
}

export interface Referral {
    id: string;
    inviter_id: string;
    invitee_id: string | null;
    invitee_email: string;
    status: 'pending' | 'joined' | 'completed_onboarding';
    created_at: string;
}

export interface RedeemableReward {
    id: string;
    title: string;
    description: string;
    points_required: number;
    image_url: string;
    status: 'active' | 'coming_soon' | 'expired';
    created_at: string;
}
