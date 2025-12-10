'use client'

import { useEffect } from 'react'
import { stopLenis, startLenis } from '@/components/app-components/LenisSetup'

export function useScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
      stopLenis()
    } else {
      document.body.style.overflow = 'unset'
      startLenis()
    }

    return () => {
      document.body.style.overflow = 'unset'
      startLenis()
    }
  }, [isLocked])
}
