'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError(null)
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (authError) {
            console.error('Login error:', authError.message)
            setError(authError.message)
            setLoading(false)
        } else {
            router.push('/rewards')
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-800 p-4'>
            <h1>Login</h1>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} className='border border-gray-300 rounded-md px-4 py-2 mb-4' />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className='border border-gray-300 rounded-md px-4 py-2 mb-4' />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50' : ''}`}
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    )
}
