'use client'
import { Gem, Home, Compass, Library, PackageOpen, CreditCard, Settings, X } from 'lucide-react'
import UserInfo from './UserInfo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Discover', href: '/discover', icon: Compass },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'Tech Stack', href: '/tech-stack', icon: PackageOpen },
    { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
    { name: 'Rewards Hub', href: '/rewards', icon: Gem },
    { name: 'Settings', href: '/settings', icon: Settings },
]

type Props = {
    onClose?: () => void
}

export default function Sidebar({ onClose }: Props) {
    const pathname = usePathname()

    return (
        <aside className="w-64 min-w-64 bg-white shadow-lg border-r border-gray-200 p-6 flex flex-col h-full lg:h-screen lg:sticky lg:top-0">
            {/* Logo & Close Button */}
            <div className="flex items-center justify-between mb-10">
                <div className="text-xl font-bold text-purple-700">
                    Flowva
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close Menu"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    const isPlaceHolder = item.href !== '/rewards'

                    const content = (
                        <div className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                            ${isActive
                                ? 'bg-purple-100 text-purple-700 font-semibold shadow-sm'
                                : 'text-gray-500 hover:bg-purple-50 hover:text-purple-700'
                            }
                        `}>
                            <item.icon className={`w-5 h-5 flex-shrink-0 fill="#111" stroke="currentColor" strokeWidth={2} ${isActive ? 'text-purple-700' : 'text-gray-400'}`} />
                            <span className="whitespace-nowrap text-sm">{item.name}</span>
                        </div>
                    )

                    return isPlaceHolder ? (
                        <div key={item.name} title="Coming Soon">
                            {content}
                        </div>
                    ) : (
                        <Link key={item.name} href={item.href} onClick={onClose}>
                            {content}
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-auto border-t border-gray-100 pt-4">
                <UserInfo />
            </div>
        </aside>
    )
}
