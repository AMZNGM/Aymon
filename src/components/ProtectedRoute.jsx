'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'

export default function ProtectedRoute({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-text text-bg">
        <div className="animate-pulse text-center">
          <div className="bg-bg/20 rounded-lg h-8 w-32 mx-auto mb-4"></div>
          <div className="bg-bg/10 rounded-lg h-4 w-64 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return children
}
