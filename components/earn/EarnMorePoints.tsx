'use client'

import { Users, Share2, Star, Loader2 } from 'lucide-react'
import { useState } from 'react'

type EarnMorePointsProps = {
    onShareStack: () => Promise<void>
}

export default function EarnMorePoints({ onShareStack }: EarnMorePointsProps) {
    const [isSharing, setIsSharing] = useState(false)

    const handleShare = async () => {
        setIsSharing(true)
        try {
            await onShareStack()
        } finally {
            setIsSharing(false)
        }
    }
    return (
        <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-purple-600 rounded-full" />
                <h2 className="text-xl font-bold text-gray-900	">Earn More Points</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Refer and Win Card */}
                <div className="bg-white rounded-[2rem] hover:-translate-y-1 hover:shadow-lg hover:scale-[1] transition-all duration-200 ease-in-out hover:border-b-2 border border-gray-100 shadow-sm flex flex-col border-b-2 overflow-hidden">
                    <div className="p-5 md:p-6 flex items-center gap-4 bg-white">
                        <div className="p-3 bg-purple-100 rounded-xl flex-shrink-0">
                            <Star className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">Refer and win 10,000 points!</h3>
                    </div>
                    <div className="flex-1 bg-gray-50/50 p-5 md:p-6 border-t border-gray-50">
                        <p className="text-gray-500 text-xs md:text-sm mb-4 leading-relaxed">
                            Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of <span className="text-purple-600 font-bold">10,000 points</span>.
                        </p>
                    </div>
                </div>

                {/* Share Your Stack Card */}
                <div className="bg-white rounded-[2rem] hover:-translate-y-1 hover:shadow-lg hover:scale-[1] transition-all duration-200 ease-in-out hover:border-b-2 border border-gray-100 shadow-sm flex flex-col border-b-2 overflow-hidden">
                    <div className="p-5 md:p-6 flex items-center gap-4 bg-white">
                        <div className="p-3 bg-purple-100 rounded-xl flex-shrink-0">
                            <Share2 className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">Share Your Stack</h3>
                            <span className="inline-block mt-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Earn +25 pts</span>
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-50/50 p-5 md:p-6 border-t border-gray-50 flex flex-col">
                        <p className="text-gray-500 text-xs md:text-sm mb-4 leading-relaxed">
                            Let your network see the tools you use to stay productive.
                        </p>
                        <div className="mt-auto">
                            <button
                                onClick={handleShare}
                                disabled={isSharing}
                                className="flex items-center gap-2 px-5 py-2.5 bg-purple-100 text-purple-700 rounded-xl font-bold hover:bg-purple-200 transition-colors text-xs w-full sm:w-auto justify-center disabled:opacity-50"
                            >
                                {isSharing ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <Share2 className="w-3.5 h-3.5" />
                                )}
                                {isSharing ? 'Sharing...' : 'Share Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
