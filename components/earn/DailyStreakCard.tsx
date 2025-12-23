'use client'

import { Calendar, Zap, Loader2 } from 'lucide-react'
import { useState } from 'react'

type DailyStreakCardProps = {
    streakDays: number
    claimedToday: boolean
    onClaim: () => Promise<void>
}

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function DailyStreakCard({
    streakDays,
    claimedToday,
    onClaim
}: DailyStreakCardProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleClaim = async () => {
        setIsLoading(true)
        try {
            await onClaim()
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full border-b-2 transition-all duration-200 ease-in-out
        hover:-translate-y-1 hover:shadow-xl hover:scale-[1]">
            <div className="flex items-center bg-blue-50/50 rounded-tr-3xl rounded-tl-3xl py-4 px-5 gap-3 mb-6">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-gray-800 font-bold text-base">Daily Streak</h3>
            </div>

            <div className="px-6 mb-6">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-black text-purple-600">{streakDays}</span>
                    <span className="text-lg md:text-xl font-bold text-purple-400">days</span>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 px-4 mb-6">
                {days.map((day, i) => {
                    // Logic to get current day index (0 = Monday, 6 = Sunday)
                    const todayIndex = (new Date().getDay() + 6) % 7;
                    const isToday = i === todayIndex;

                    return (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className={`relative w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all
                                ${isToday
                                    ? 'bg-gray-300 text-white shadow-lg shadow-purple-200 z-10'
                                    : 'bg-gray-200 text-gray-400'
                                }`}>
                                {isToday && (
                                    <div className="absolute -inset-1 rounded-full border-2 border-purple-600 animate-pulse" />
                                )}
                                {day}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto p-4 border-t border-gray-50">
                <p className="text-xs font-bold text-gray-400 text-center mb-4 ">Check in daily to earn +5 points</p>
                <button
                    onClick={handleClaim}
                    disabled={claimedToday || isLoading}
                    className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold transition-all shadow-lg active:scale-95 ${claimedToday
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                        : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-200'
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Zap className="w-5 h-5" />
                    )}
                    <span>{claimedToday ? 'Claimed Today' : isLoading ? 'Claiming...' : 'Claim Daily Points'}</span>
                </button>
            </div>
        </div>
    )
}
