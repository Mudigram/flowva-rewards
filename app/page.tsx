'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/rewards')
      } else {
        router.push('/login')
      }
    }
    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 items-center justify-center flex flex-col gap-4">
        <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-3xl">⭐</span>
        </div>
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          <p className="text-gray-600 font-medium">Entering Rewards Hub...</p>
        </div>
      </div>
    </div>
  )
}
