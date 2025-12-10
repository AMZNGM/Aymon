'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ClickEffect from '@/components/ui/effect/ClickEffect'

export default function BackBtn() {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button onClick={handleBack} aria-label="Go back to previous page" className="absolute top-16 right-4">
      <ClickEffect className="bg-bg/10 hover:bg-bg/30 duration-100 rounded-xl cursor-pointer z-50 p-2">
        <ArrowLeft strokeWidth={2.5} />
      </ClickEffect>
    </button>
  )
}
