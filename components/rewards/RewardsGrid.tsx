'use client'

import RewardCard from './RewardCard'

type Reward = {
    id: string
    name: string
    description: string
    points_required: number | null
    reward_type: 'cash' | 'gift'
    status: 'active' | 'coming_soon'
}

type Props = {
    rewards: Reward[]
    userPoints: number
}

export default function RewardsGrid({ rewards, userPoints }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rewards.map(reward => (
                <RewardCard
                    key={reward.id}
                    name={reward.name}
                    description={reward.description}
                    pointsRequired={reward.points_required}
                    rewardType={reward.reward_type}
                    status={reward.status}
                    userPoints={userPoints}
                />
            ))}
        </div>
    )
}
