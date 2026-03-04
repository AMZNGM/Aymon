'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useMouseMotion } from '@/hooks/useMouseMotion'

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const { sx, sy } = useMouseMotion({ containerRef: ref, spring: { stiffness: 250, damping: 30 } })
  const { x, y } = useMouseMotion({ containerRef: ref, spring: false })
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleOver = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest('[data-hide-cursor="true"]')) {
        setHidden(true)
      }
    }

    const handleOut = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest('[data-hide-cursor="true"]')) {
        setHidden(false)
      }
    }

    document.addEventListener('pointerover', handleOver)
    document.addEventListener('pointerout', handleOut)

    return () => {
      document.removeEventListener('pointerover', handleOver)
      document.removeEventListener('pointerout', handleOut)
    }
  }, [])

  return (
    <motion.div animate={{ opacity: hidden ? 0 : 1 }} transition={{ duration: 0.15 }} className="max-md:hidden pointer-events-none">
      <motion.div style={{ x: sx, y: sy }} className="z-50 fixed inset-0 w-4 h-2 bg-bg rounded-full -translate-1/2" />
      <motion.div style={{ x, y }} className="z-50 fixed inset-0 w-8 h-8 border rounded-full -translate-1/2" />
    </motion.div>
  )
}
