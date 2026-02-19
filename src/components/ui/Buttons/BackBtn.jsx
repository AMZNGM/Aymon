'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'
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
    <>
      <button onClick={handleBack} aria-label="Go back to previous page">
        <RippleEffect className="hover:scale-120 duration-500 p-1 cursor-pointer">
          <ArrowLeft strokeWidth={2.5} />
        </RippleEffect>
      </button>

      <Link href={'/'} aria-label="Go home">
        <RippleEffect className="hover:scale-120 duration-500 p-1 cursor-pointer">
          <Home strokeWidth={2.5} />
        </RippleEffect>
      </Link>
    </>
  )
}
