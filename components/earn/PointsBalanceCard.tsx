'use client'

import { Star, Award } from 'lucide-react'

type PointsBalanceCardProps = {
    points: number
    goalPoints?: number
    goalLabel?: string
}

export default function PointsBalanceCard({
    points,
    goalPoints = 5000,
    goalLabel = '$5 Gift Card'
}: PointsBalanceCardProps) {
    const progress = Math.min((points / goalPoints) * 100, 100)

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full border-b-2 transition-all duration-200 ease-in-out
        hover:-translate-y-1 hover:shadow-xl hover:scale-[1]">
            <div className="flex items-center bg-purple-50/50 rounded-tr-3xl rounded-tl-3xl py-4 px-5 gap-3 mb-6">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Award className="w-5 h-5 text-purple-600 " />
                </div>
                <h3 className="text-gray-900 font-bold text-base">Points Balance</h3>
            </div>

            <div className="px-6 mb-6">
                <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl md:text-5xl font-black text-purple-600">{points.toLocaleString()}</span>
                        <span className="text-base font-bold text-purple-400">pts</span>
                    </div>
                    <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-3 rounded-xl shadow-lg shadow-orange-100 hidden sm:block">
                        <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                </div>
            </div>

            <div className="mt-auto px-6 pb-6">
                <div className="flex justify-between text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                    <span>Progress to {goalLabel}</span>
                    <span className="text-purple-600">{points}/{goalPoints}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden p-0.5">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-xs font-medium text-gray-400 mt-4 flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    Just getting started — keep earning!
                </p>
            </div>
        </div>
    )
}
