'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useUserPoints() {
    const [points, setPoints] = useState<number>(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchPoints = async (userId: string) => {
            try {
                const { data, error: profileError } = await supabase
                    .from('profiles')
                    .select('total_points')
                    .eq('id', userId)
                    .single()

                if (!isMounted) return

                if (profileError) {
                    // If profile doesn't exist yet, we might want to default to 0
                    console.error('Error fetching points:', profileError)
                    setPoints(0)
                } else {
                    setPoints(data?.total_points ?? 0)
                }
            } catch (err) {
                console.error('Unexpected error fetching points:', err)
                if (isMounted) setError('Failed to fetch user points')
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                fetchPoints(session.user.id)
            } else {
                setLoading(false)
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchPoints(session.user.id)
            } else {
                setPoints(0)
                setLoading(false)
            }
        })

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [])

    return {
        points,
        loading,
        error,
    }
}
