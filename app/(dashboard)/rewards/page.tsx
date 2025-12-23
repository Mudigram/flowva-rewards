'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell } from 'lucide-react'
import { useRewards } from '@/hooks/useRewards'
import RewardsFilter from '@/components/rewards/RewardsFilter'
import RewardsGrid from '@/components/rewards/RewardsGrid'
import { useAuth } from '@/hooks/useAuth'
import { useUserRewards } from '@/hooks/useUserRewards'
import RewardsTabs from '@/components/rewards/RewardsTab'
import RewardsJourney from '@/components/earn/RewardsJourney'
import EarnMorePoints from '@/components/earn/EarnMorePoints'
import ReferAndEarn from '@/components/earn/ReferAndEarn'
import { performRewardAction } from '@/lib/rewards'

type Filter = 'all' | 'unlocked' | 'locked' | 'coming_soon'
type RewardsTab = 'redeem' | 'earn'

export default function RewardsPage() {
    const { user, loading: authLoading } = useAuth()
    const { rewards, loading, error } = useRewards()
    const { rewardsData, loading: loadingPoints, error: pointsError, refresh: refreshRewards } = useUserRewards()
    const userPoints = rewardsData?.total_points ?? 0
    const [filter, setFilter] = useState<Filter>('all')
    const [tab, setTab] = useState<RewardsTab>('redeem')
    const router = useRouter()

    const handleShareStack = async () => {
        if (!user) return
        const result = await performRewardAction(user.id, 'share_stack', 25)
        if (result.success) {
            await refreshRewards()
        } else {
            alert(result.error)
        }
    }

    if (authLoading || loading || loadingPoints) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading rewards dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        router.push('/login')
        return null
    }

    if (error || pointsError) {
        return (
            <div className="p-8">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-semibold">Error loading data</p>
                    <p className="text-sm">{error || pointsError}</p>
                </div>
            </div>
        )
    }

    const counts = {
        all: rewards.length,
        unlocked: rewards.filter(
            (r: any) =>
                r.status === 'active' &&
                r.points_required !== null &&
                userPoints >= r.points_required
        ).length,
        locked: rewards.filter(
            (r: any) =>
                r.status === 'active' &&
                r.points_required !== null &&
                userPoints < r.points_required
        ).length,
        coming_soon: rewards.filter(
            (r: any) => r.status === 'coming_soon'
        ).length,
    }

    const filteredRewards = rewards.filter((reward: any) => {
        if (filter === 'all') return true
        if (filter === 'coming_soon') return reward.status === 'coming_soon'
        if (filter === 'unlocked') {
            return (
                reward.status === 'active' &&
                reward.points_required !== null &&
                userPoints >= reward.points_required
            )
        }
        if (filter === 'locked') {
            return (
                reward.status === 'active' &&
                reward.points_required !== null &&
                userPoints < reward.points_required
            )
        }
        return true
    })

    return (
        <div className="w-full">
            <header className="sticky top-0 bg-gray-50 z-10 px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="hidden lg:block">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl text-gray-900">Rewards Hub</h1>
                        <div className="relative p-2 bg-white rounded-xl shadow-sm border border-gray-100 md:hidden">
                            <Bell className="w-6 h-6 text-gray-400" />
                            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-gray-600">Earn points, unlock rewards, and celebrate your progress!</p>
                </div>

                {/* Mobile version of summary text */}
                <div className="lg:hidden">
                    <p className="text-gray-500 text-sm">Earn points, unlock rewards, and celebrate your progress!</p>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    <div className="bg-purple-600 text-white rounded-2xl px-6 py-4 shadow-lg flex items-center gap-4">
                        <div className="bg-purple-500/50 p-2 rounded-full text-2xl">⭐</div>
                        <div>
                            <p className="text-purple-100 text-xs uppercase tracking-wider font-semibold">Your Balance</p>
                            <p className="text-2xl font-bold">{userPoints.toLocaleString()} Points</p>
                        </div>
                    </div>

                    <div className="relative p-3 bg-white rounded-full shadow-sm border border-gray-100 hidden md:block">
                        <Bell className="w-6 h-6 text-gray-400" />
                        <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
                    </div>
                </div>
            </header>
            <div className="p-6">
                <RewardsTabs
                    activeTab={tab}
                    onChange={setTab}
                />

                <div key={tab} className="animate-slide-in">
                    {tab === 'redeem' ? (
                        <>
                            <div className="text-xl font-semibold mb-2 text-gray-900 border-l-4 border-purple-600 pl-4">
                                Redeem Your Points
                            </div>
                            <RewardsFilter
                                activeFilter={filter}
                                onChange={setFilter}
                                counts={counts}
                            />

                            <RewardsGrid
                                rewards={filteredRewards}
                                userPoints={userPoints}
                            />
                        </>
                    ) : (
                        <div className="animate-slide-in">
                            <RewardsJourney rewardsData={rewardsData} onRefresh={refreshRewards} />
                            <EarnMorePoints onShareStack={handleShareStack} />
                            <ReferAndEarn referralCode={rewardsData?.referral_code} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
