'use client'

import { useMemo } from 'react'

export default function ErrorBackground({ className = '' }) {
  const backgroundChars = useMemo(() => {
    let seed = 12345
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    return Array.from({ length: 30 }).map((_, i) => (
      <div key={i}>
        {Array.from({ length: 500 })
          .map(() => String.fromCharCode(33 + Math.floor(seededRandom() * 94)))
          .join('')}
      </div>
    ))
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden opacity-50 text-xs leading-tight pointer-events-none select-none ${className}`}>
      {backgroundChars}
    </div>
  )
}
