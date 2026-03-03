'use client'

import { useEffect } from 'react'

export function EscapeClose({ targetId }: { targetId: string }): null {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const el = document.getElementById(targetId) as HTMLInputElement | null
        if (el) {
          el.checked = false
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [targetId])

  return null
}

// <EscapeClose targetId="contact-toggle" />
