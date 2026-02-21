'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useMouseMotion } from '@/hooks/useMouseMotion'

export default function CustomCursor() {
  const windowRef = useRef(null)
  const { x, y } = useMouseMotion(windowRef, { springConfig: { stiffness: 150, damping: 20 } })
  const { x: x2, y: y2 } = useMouseMotion(windowRef, { springConfig: { stiffness: 300, damping: 40 } })
  const [isHidden, setIsHidden] = useState(false)

  const isMobile = useIsMobile()
  if (isMobile) return

  useEffect(() => {
    const handleMouseEnter = (e) => {
      if (e.target.closest('[data-hide-cursor="true"]')) {
        setIsHidden(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (e.target.closest('[data-hide-cursor="true"]')) {
        setIsHidden(false)
      }
    }

    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  if (isHidden) return null

  return (
    <div className="flex justify-center items-center">
      <motion.div
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="top-0 left-0 z-9999 fixed w-2 h-2 bg-bg rounded-full pointer-events-none"
      />

      <motion.div
        style={{
          x: x2,
          y: y2,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="top-0 left-0 z-9999 fixed w-8 h-8 border border-bg rounded-full pointer-events-none"
      />
    </div>
  )
}
