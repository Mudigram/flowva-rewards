import { useEffect, useRef, useState } from 'react'

type RewardsTab = 'redeem' | 'earn'

type Props = {
    activeTab: RewardsTab
    onChange: (tab: RewardsTab) => void
}

const tabs: { label: string; value: RewardsTab }[] = [
    { label: 'Earn Points', value: 'earn' },
    { label: 'Redeem Rewards', value: 'redeem' },
]

export default function RewardsTabs({ activeTab, onChange }: Props) {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const activeIndex = tabs.findIndex(t => t.value === activeTab)
        const activeButton = tabsRef.current[activeIndex]
        if (activeButton) {
            setIndicatorStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            })
        }
    }, [activeTab])

    return (
        <div className="relative flex gap-3 mb-8 border-b border-gray-100">
            {tabs.map((tab, index) => (
                <button
                    key={tab.value}
                    ref={el => { tabsRef.current[index] = el }}
                    onClick={() => onChange(tab.value)}
                    className={`
                        px-6 py-3 text-sm font-semibold transition-colors duration-300
                        ${activeTab === tab.value ? 'text-purple-800 bg-purple-100 rounded-tr-lg rounded-tl-lg' : 'text-gray-500 hover:text-purple-700 hover:bg-purple-100 rounded-tr-lg rounded-tl-lg'}
                    `}
                    role="tab"
                    aria-selected={activeTab === tab.value}
                >
                    {tab.label}
                </button>
            ))}

            {/* Sliding Underline */}
            <div
                className="absolute bottom-[-2px] h-1 bg-purple-700 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) rounded-full"
                style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                }}
            />
        </div>
    )
}
