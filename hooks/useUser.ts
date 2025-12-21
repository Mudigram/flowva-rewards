'use client'

import { useEffect, useState } from 'react'
import { supabase } from "@/lib/supabaseClient"

export function useUser() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()
                if (isMounted) {
                    if (error) {
                        console.error('Error fetching user:', error.message)
                        setUser(null)
                    } else {
                        setUser(data.user)
                    }
                }
            } catch (err) {
                console.error('Unexpected error fetching user:', err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        getUser()

        return () => {
            isMounted = false
        }
    }, [])

    return { user, loading }
}
