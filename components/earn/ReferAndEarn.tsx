'use client'

import { UsersRound, Copy, Facebook, Linkedin } from 'lucide-react'
import { useState } from 'react'

type ReferAndEarnProps = {
    referralCode?: string | null
}

export default function ReferAndEarn({ referralCode }: ReferAndEarnProps) {
    const referralLink = `https://app.flowvahub.com/signup/?ref=${referralCode || 'mudi7970'}`
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">Refer & Earn</h2>
            </div>

            <div className="transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:scale-[1] bg-[#f8faff] rounded-[1rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="">
                    {/* Top Section */}
                    <div className="flex items-start bg-blue-100 gap-4 p-4 mb-6 md:mb-12">
                        <div className="p-4 flex-shrink-0">
                            <UsersRound className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-base md:text-lg font-bold text-[#1a1b3a] mb-0.5">Share Your Link</h3>
                            <p className="text-gray-400 text-[10px] md:text-xs">Invite friends and earn 25 points when they join!</p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 gap-3 md:gap-6 mb-8 md:mb-12 text-center">
                        <div className="flex flex-col items-center p-2 md:p-0">
                            <span className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">0</span>
                            <span className="text-[9px] md:text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Referrals</span>
                        </div>
                        <div className="flex flex-col items-center p-2 md:p-0">
                            <span className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">0</span>
                            <span className="text-[9px] md:text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Points Earned</span>
                        </div>
                    </div>

                    {/* Referral Link Section */}
                    <div className="bg-white/50 rounded-[1.5rem] p-4 md:p-5 border border-purple-50">
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 px-1">
                            Your personal referral link:
                        </label>
                        <div className="relative group hover:-translate-y-1 hover:shadow-lg hover:scale-[1] transition-all duration-200 ease-in-out">
                            <input
                                type="text"
                                readOnly
                                value={referralLink}
                                className="w-full bg-white border border-gray-100 rounded-lg py-3 px-4 pr-10 text-[10px] md:text-xs text-gray-500 shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-200 transition-all font-medium truncate"
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                                title="Copy to clipboard"
                            >
                                <Copy className={`w-3.5 h-3.5 md:w-4 md:h-4 ${copied ? 'text-green-500' : 'text-purple-600'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="flex flex-wrap justify-center items-center gap-2.5 md:gap-3 mt-6 mb-4">
                        <a href="#" className="p-2.5 md:p-3 bg-[#1877F2] rounded-full text-white hover:scale-110 transition-transform shadow-sm">
                            <Facebook className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                        </a>
                        <a href="#" className="p-2.5 md:p-3 bg-black rounded-full text-white hover:scale-110 transition-transform flex items-center justify-center shadow-sm">
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" className="p-2.5 md:p-3 bg-[#0077B5] rounded-full text-white hover:scale-110 transition-transform shadow-sm">
                            <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current stroke-0" />
                        </a>
                        <a href="#" className="p-2.5 md:p-3 bg-[#25D366] rounded-full text-white hover:scale-110 transition-transform flex items-center justify-center shadow-sm">
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
