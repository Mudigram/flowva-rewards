import { useEffect, useRef, useState } from 'react'

type Filter = 'all' | 'unlocked' | 'locked' | 'coming_soon'

type Props = {
    activeFilter: Filter
    onChange: (filter: Filter) => void
    counts: {
        all: number
        unlocked: number
        locked: number
        coming_soon: number
    }
}

const filters: { label: string; value: Filter }[] = [
    { label: 'All Rewards', value: 'all' },
    { label: 'Unlocked', value: 'unlocked' },
    { label: 'Locked', value: 'locked' },
    { label: 'Coming Soon', value: 'coming_soon' },
]

export default function RewardsFilter({
    activeFilter,
    onChange,
    counts,
}: Props) {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const filtersRef = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const activeIndex = filters.findIndex(f => f.value === activeFilter)
        const activeButton = filtersRef.current[activeIndex]
        if (activeButton) {
            setIndicatorStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            })
        }
    }, [activeFilter])

    return (
        <div className="relative mb-8 border-b border-gray-100 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max pb-1">
                {filters.map((filter, index) => (
                    <button
                        key={filter.value}
                        ref={el => { filtersRef.current[index] = el }}
                        onClick={() => onChange(filter.value)}
                        className={`
                            px-4 py-3 text-sm transition-colors duration-300 rounded-tr-lg rounded-tl-lg whitespace-nowrap
                            ${activeFilter === filter.value ? 'text-purple-800 font-semibold bg-purple-100' : 'text-gray-500 hover:text-purple-700 hover:bg-purple-100'}
                        `}
                    >
                        {filter.label}
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs transition-colors duration-300 ${activeFilter === filter.value ? 'bg-purple-200 text-purple-900' : 'bg-gray-100 text-gray-500'
                            }`}>
                            {counts[filter.value]}
                        </span>
                    </button>
                ))}

                {/* Sliding Underline */}
                <div
                    className="absolute bottom-[-1px] h-0.5 bg-purple-700 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                    }}
                />
            </div>
        </div>
    )
}
