'use client'

import { useEffect, useState } from 'react'

const colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#a855f7', '#ec4899', '#6366f1', '#f97316', '#14b8a6', '#06b6d4']

export default function useRandomColor() {
  const [randomColor, setRandomColor] = useState(colors[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomColor(colors[Math.floor(Math.random() * colors.length)])
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return randomColor
}
