'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'
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
    <>
      <button
        onClick={handleBack}
        aria-label="Go back to previous page"
        className="absolute top-16 right-2 max-md:right-1 backdrop-blur-sm"
      >
        <ClickEffect className="bg-bg/10 hover:bg-bg/30 duration-100 rounded-xl cursor-pointer z-50 p-2">
          <ArrowLeft strokeWidth={2.5} />
        </ClickEffect>
      </button>

      <Link href={'/'} aria-label="Go home" className="absolute top-28 right-2 max-md:right-1 backdrop-blur-sm">
        <ClickEffect className="bg-bg/10 hover:bg-bg/30 duration-100 rounded-xl cursor-pointer z-50 p-2">
          <Home strokeWidth={2.5} />
        </ClickEffect>
      </Link>
    </>
  )
}
