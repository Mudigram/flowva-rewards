'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Loader2, ArrowRight, User } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // 1. Sign up user
            const { data, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            })

            if (authError) {
                setError(authError.message)
            } else if (data.user) {
                // 2. Create profile entry (Manual step if no trigger exists)
                // We'll try to insert to ensure the UI works even without a trigger
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            full_name: fullName,
                            total_points: 0,
                            current_streak: 0,
                            referral_code: Math.random().toString(36).substring(2, 8).toUpperCase()
                        }
                    ])

                if (profileError && profileError.code !== '23505') { // Ignore if trigger handled it or duplicate
                    console.error('Error creating profile:', profileError)
                }

                router.push('/rewards')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4 font-sans">
            <div className="w-full max-w-md animate-slide-in">
                {/* Logo Area */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-xl border border-white/30">
                        <div className="text-3xl">⭐</div>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Flowva</h1>
                    <p className="text-white/80 mt-2 font-medium">Join us and start earning points today!</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-white/50 backdrop-blur-sm">
                    <form onSubmit={handleSignup} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Alex Johnson"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all font-medium text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all font-medium text-gray-900"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Min. 6 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all font-medium text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl py-4 font-bold shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                        <p className="text-gray-500 text-sm font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-purple-600 font-bold hover:underline underline-offset-4 decoration-2">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                        Start your journey with Flowva
                    </p>
                </div>
            </div>
        </div>
    )
}
