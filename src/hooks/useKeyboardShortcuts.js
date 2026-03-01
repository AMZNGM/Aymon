'use client'

import { useEffect } from 'react'
import { useEventListener } from 'usehooks-ts'

export function useKeyboardShortcuts({ onEscape }) {
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      onEscape?.()
    }
  })
}

// useKeyboardShortcuts({
//   onEscape: () => {
//     setShowCookies(false)
//   },
// })

export function EscapeClose({ targetId }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        const el = document.getElementById(targetId)
        if (el) el.checked = false
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return null
}


// <EscapeClose targetId="contact-toggle" />
