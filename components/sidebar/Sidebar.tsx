'use client'
import { Gem } from 'lucide-react'
import UserInfo from './UserInfo'
import Link from 'next/link'

export default function Sidebar() {
    return (
        <aside className="w-64 min-w-64 bg-white shadow-lg border-r border-gray-200 p-6 flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="text-xl font-bold text-purple-700 mb-10">
                Flowva
            </div>

            {/* Nav */}
            <nav className="space-y-4">
                <Link
                    href="/rewards"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 
                               bg-purple-50 text-purple-700 font-medium"
                >
                    <Gem className="w-5 h-5 flex-shrink-0" />
                    <span className="whitespace-nowrap">Rewards Hub</span>
                </Link>
            </nav>

            <div className="mt-auto border-t border-gray-500">
                <UserInfo />
            </div>
        </aside>
    )
}
