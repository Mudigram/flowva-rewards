'use client'

import Sidebar from '@/components/sidebar/Sidebar'
import { Menu, X, Bell } from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Top Nav */}
            <nav className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center gap-2 z-40">


                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className="text-xl font-bold text-gray-800 tracking-tight">Rewards Hub</div>
                <div className="flex items-center ml-auto">
                    <div className="relative p-2 bg-gray-50 rounded-xl border border-gray-100">
                        <Bell className="w-5 h-5 text-gray-500" />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></div>
                    </div>
                </div>
            </nav>

            {/* Backdrop for Mobile */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px] transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar with Responsive Drawer */}
            <div className={`
                fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar onClose={() => setIsMobileOpen(false)} />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full pt-16 lg:pt-0">
                {children}
            </main>
        </div>
    )
}
