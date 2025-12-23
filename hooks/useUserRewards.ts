'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { UserRewards } from '@/types/rewards'

export function useUserRewards() {
    const [rewardsData, setRewardsData] = useState<UserRewards | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchRewardsData = async (userId: string) => {
        try {
            const { data, error: profileError } = await supabase
                .from('profiles')
                .select('id, total_points, current_streak, last_streak_claim, referral_code')
                .eq('id', userId)
                .single()

            if (profileError) {
                console.error('Error fetching rewards data:', profileError)
                setError('Failed to fetch rewards data')
            } else {
                setRewardsData(data)
            }
        } catch (err) {
            console.error('Unexpected error fetching rewards data:', err)
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let isMounted = true

        const initialize = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user && isMounted) {
                await fetchRewardsData(session.user.id)
            } else {
                if (isMounted) setLoading(false)
            }
        }

        initialize()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                if (isMounted) fetchRewardsData(session.user.id)
            } else {
                if (isMounted) {
                    setRewardsData(null)
                    setLoading(false)
                }
            }
        })

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [])

    return {
        rewardsData,
        loading,
        error,
        refresh: async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) await fetchRewardsData(session.user.id)
        }
    }
}
