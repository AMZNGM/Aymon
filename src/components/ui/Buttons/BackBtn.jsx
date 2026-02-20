'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import RippleEffect from '@/components/ui/effect/RippleEffect'

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
    <button
      onClick={handleBack}
      aria-label="Go back to previous page"
      className="top-16 max-md:top-4 right-2 max-md:right-12 absolute backdrop-blur-sm"
    >
      <RippleEffect className="z-50 bg-bg/10 hover:bg-bg/30 rounded-xl duration-100 p-2 cursor-pointer">
        <ArrowLeft strokeWidth={2.5} />
      </RippleEffect>
    </button>
  )
}
