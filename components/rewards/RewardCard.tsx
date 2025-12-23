'use client'

type RewardCardProps = {
    name: string
    description: string
    pointsRequired: number | null
    rewardType: 'cash' | 'gift'
    userPoints: number
    status: 'active' | 'coming_soon'
}

export default function RewardCard({
    name,
    description,
    pointsRequired,
    rewardType,
    userPoints,
    status,
}: RewardCardProps) {
    const emoji = rewardType === 'cash' ? '💸' : '🎁'

    const isComingSoon = status === 'coming_soon'
    const isUnlocked =
        !isComingSoon &&
        pointsRequired !== null &&
        userPoints >= pointsRequired

    const isLocked =
        !isComingSoon &&
        pointsRequired !== null &&
        userPoints < pointsRequired

    return (
        <div
            className={`
        border border-purple-200
        rounded-xl
        p-4
        flex flex-col
        items-center
        text-center
        transition-all duration-500 ease-in-out
        hover:-translate-y-2 hover:shadow-md hover:scale-[1] bg-white
        ${isLocked ? 'cursor-not-allowed opacity-75' : 'hover:border-purple-100'}
      `}
        >
            <div className="text-2xl mb-4 bg-purple-100 rounded-xl p-2">{emoji}</div>

            <h3 className="text-lg text-gray-600 font-semibold mb-2">
                {name}
            </h3>

            <p className="text-sm text-gray-400 mb-4">
                {description}
            </p>

            {pointsRequired && (
                <p className="text-sm text-purple-600 font-medium mb-4">
                    ⭐ {pointsRequired.toLocaleString()} pts
                </p>
            )}

            {isComingSoon && (
                <button
                    disabled
                    className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-400 font-medium cursor-not-allowed"
                >
                    Coming Soon
                </button>
            )}

            {isLocked && (
                <button
                    disabled
                    className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-400 font-medium cursor-not-allowed"
                >
                    Locked
                </button>
            )}

            {isUnlocked && (
                <button
                    onClick={() => {
                        console.log(`Redeeming reward: ${name}`)
                        alert(`Successfully redeemed: ${name}!`)
                    }}
                    className="w-full py-2.5 mb-4 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg active:transform active:scale-[0.98]"
                >
                    Redeem Now
                </button>
            )}
        </div>
    )
}
