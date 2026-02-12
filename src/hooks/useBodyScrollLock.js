'use client'

import { useEffect } from 'react'

export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isLocked])
}

// useBodyScrollLock(mobileMenuOpen || true)

// onClick={(e) => e.stopPropagation()}
// onWheel={(e) => e.stopPropagation()}
// onTouchMove={(e) => e.stopPropagation()}
