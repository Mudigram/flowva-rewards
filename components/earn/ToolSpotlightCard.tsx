'use client'

import { LayoutGrid, Calendar, Gift, UserPlus, Loader2 } from 'lucide-react'
import { useState } from 'react'

type ToolSpotlightCardProps = {
    onClaim: () => Promise<void>
}

export default function ToolSpotlightCard({ onClaim }: ToolSpotlightCardProps) {
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
            <div className="px-4 py-5 md:py-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-tr-3xl rounded-tl-3xl flex justify-between items-start mb-5 text-white">
                <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-3 py-0.5 rounded-full mb-2 inline-block">Featured</span>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight">Top Tool Spotlight</h3>
                    <p className="text-base md:text-lg font-semibold mt-1 opacity-90">Reclaim</p>
                </div>
                <div className="p-2 bg-white/20 rounded-xl">
                    <LayoutGrid className="w-6 h-6 md:w-7 md:h-7" />
                </div>
            </div>

            <div className="flex-1 px-3 mb-5">
                <div className="bg-white rounded-2xl p-4 md:p-5 text-gray-900 ">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="mt-1">
                            <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-sm">
                            <p className="font-bold text-gray-800 mb-2 leading-snug">Automate and Optimize Your Schedule</p>
                            <p className="text-gray-500 leading-relaxed">
                                Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks, meetings, and breaks to boost productivity. Free to try — earn Flowva Points when you sign up!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 px-4 pb-6 pt-2 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-purple-600 text-white rounded-2xl text-md font-bold hover:bg-purple-700 transition-colors shadow-lg active:scale-95">
                    <UserPlus className="w-5 h-5" />
                    <span>Sign up</span>
                </button>
                <button
                    onClick={handleClaim}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-tr from-purple-600 to-pink-600 text-white rounded-2xl text-md font-bold hover:bg-fuchsia-600 transition-colors shadow-lg active:scale-95 disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Gift className="w-5 h-5" />
                    )}
                    <span>{isLoading ? 'Claiming...' : 'Claim 50 pts'}</span>
                </button>
            </div>
        </div>
    )
}
