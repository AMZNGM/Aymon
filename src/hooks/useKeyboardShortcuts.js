'use client'

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
