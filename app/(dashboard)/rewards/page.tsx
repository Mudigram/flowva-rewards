'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRewards } from '@/hooks/useRewards'
import RewardsFilter from '@/components/rewards/RewardsFilter'
import RewardsGrid from '@/components/rewards/RewardsGrid'
import { useAuth } from '@/hooks/useAuth'
import { useUserPoints } from '@/hooks/useUserPoints'
import RewardsTabs from '@/components/rewards/RewardsTab'

type Filter = 'all' | 'unlocked' | 'locked' | 'coming_soon'
type RewardsTab = 'redeem' | 'earn'

export default function RewardsPage() {
    const { user, loading: authLoading } = useAuth()
    const { rewards, loading, error } = useRewards()
    const { points: userPoints, loading: loadingPoints, error: pointsError } = useUserPoints()
    const [filter, setFilter] = useState<Filter>('all')
    const [tab, setTab] = useState<RewardsTab>('redeem')
    const router = useRouter()

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
            <header className="sticky top-6 bg-gray-50 z-10 px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
                <div>
                    <h1 className="text-2xl text-gray-900">Rewards Hub</h1>
                    <p className="text-gray-600">Earn points, unlock rewards, and celebrate your progress!</p>
                </div>



                <div className="bg-purple-600 text-white rounded-2xl px-6 py-4 shadow-lg flex items-center gap-4">
                    <div className="bg-purple-500/50 p-2 rounded-full text-2xl">⭐</div>
                    <div>
                        <p className="text-purple-100 text-xs uppercase tracking-wider font-semibold">Your Balance</p>
                        <p className="text-2xl font-bold">{userPoints.toLocaleString()} Points</p>
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
                            <div className="text-xl font-semibold mb-2 text-gray-900 border-r border-gray-20">
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
                        <div className="bg-white border border-dashed border-purple-200 rounded-2xl p-20 text-center">
                            <div className="text-5xl mb-6">🚀</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Earn Points Coming Soon</h2>
                            <p className="text-gray-600 max-w-md mx-auto">
                                We're building exciting ways for you to earn more points!
                                Complete missions, reach milestones, and level up your Flowva experience.
                            </p>
                            <button className="mt-8 px-6 py-2 bg-purple-100 text-purple-700 rounded-full font-medium hover:bg-purple-200 transition-colors">
                                Notify Me
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
