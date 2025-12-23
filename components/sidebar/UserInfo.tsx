'use client'
import Image from 'next/image'

import { useUser } from '@/hooks/useUser'

export default function UserInfo() {
    const { user, loading } = useUser()

    if (loading) {
        return <div className="h-12 bg-gray-100 rounded animate-pulse" />
    }

    if (!user) return null

    return (
        <div className="flex items-center gap-3 p-3">
            {/* Avatar */}

            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-semibold text-purple-800">
                {user.email?.[0]?.toUpperCase()}
            </div>

            {/* Info */}
            <div className="text-sm">
                <div className="font-medium text-gray-800">
                    {user.user_metadata?.username ?? 'User'}
                </div>
                <div className="text-gray-500 text-xs">
                    {user.email}
                </div>
            </div>
        </div>
    )
}
