'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

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
    return <LoadingSkeleton />
  }

  if (!user) {
    return null
  }

  return children
}
