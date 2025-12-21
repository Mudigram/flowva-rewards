'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useAuth() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const checkUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser()
                if (isMounted) {
                    if (error) {
                        console.error('Auth check error:', error.message)
                        setUser(null)
                    } else {
                        setUser(user)
                    }
                }
            } catch (err) {
                console.error('Unexpected auth error:', err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        checkUser()

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setUser(session?.user ?? null)
                setLoading(false)
            }
        })

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [])

    return { user, loading }
}
