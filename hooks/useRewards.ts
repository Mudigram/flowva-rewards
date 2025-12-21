'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useRewards() {
    const [rewards, setRewards] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchRewards = async () => {
            try {
                const { data, error: fetchError } = await supabase
                    .from('redeemable_rewards')
                    .select('*')

                if (isMounted) {
                    if (fetchError) {
                        setError(fetchError.message)
                    } else {
                        setRewards(data ?? [])
                    }
                }
            } catch (err) {
                if (isMounted) setError('Unexpected error fetching rewards')
                console.error(err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchRewards()

        return () => {
            isMounted = false
        }
    }, [])

    return { rewards, loading, error }
}
