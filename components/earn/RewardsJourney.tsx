'use client'

import PointsBalanceCard from './PointsBalanceCard'
import DailyStreakCard from './DailyStreakCard'
import ToolSpotlightCard from './ToolSpotlightCard'

import { UserRewards } from '@/types/rewards'
import { claimDailyStreak, performRewardAction } from '@/lib/rewards'

type RewardsJourneyProps = {
    rewardsData: UserRewards | null
    onRefresh: () => Promise<void>
}

export default function RewardsJourney({ rewardsData, onRefresh }: RewardsJourneyProps) {
    const claimedToday = rewardsData?.last_streak_claim
        ? new Date(rewardsData.last_streak_claim).toDateString() === new Date().toDateString()
        : false;

    const handleClaimStreak = async () => {
        if (!rewardsData) return
        const result = await claimDailyStreak(
            rewardsData.id,
            rewardsData.current_streak,
            rewardsData.last_streak_claim
        )
        if (result.success) {
            await onRefresh()
        } else {
            alert(result.error)
        }
    }

    const handleClaimTool = async () => {
        if (!rewardsData) return
        const result = await performRewardAction(rewardsData.id, 'tool_spotlight', 50)
        if (result.success) {
            await onRefresh()
        } else {
            alert(result.error)
        }
    }

    return (
        <div className="mt-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-purple-600 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Rewards Journey</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                <PointsBalanceCard points={rewardsData?.total_points ?? 0} />
                <DailyStreakCard
                    streakDays={rewardsData?.current_streak ?? 0}
                    claimedToday={claimedToday}
                    onClaim={handleClaimStreak}
                />
                <ToolSpotlightCard onClaim={handleClaimTool} />
            </div>
        </div>
    )
}
