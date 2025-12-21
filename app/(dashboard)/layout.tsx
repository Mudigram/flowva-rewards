'use client'

import Sidebar from '@/components/sidebar/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 p-0">
                {children}
            </main>
        </div>
    )
}
