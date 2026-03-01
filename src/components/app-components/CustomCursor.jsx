'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useMouseMotion } from '@/hooks/useMouseMotion'

export default function CustomCursor() {
  const ref = useRef(null)
  const { x, y } = useMouseMotion(ref, { springConfig: { stiffness: 150, damping: 20 } })
  const { x: x2, y: y2 } = useMouseMotion(ref, { springConfig: { stiffness: 300, damping: 40 } })
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const handle = (e) => {
      if (e.target.closest('[data-hide-cursor="true"]')) {
        setIsHidden(e.type === 'mouseover')
      }
    }

    document.addEventListener('mouseover', handle)
    document.addEventListener('mouseout', handle)

    return () => {
      document.removeEventListener('mouseover', handle)
      document.removeEventListener('mouseout', handle)
    }
  }, [])

  if (isHidden) return null

  return (
    <div className="hidden pointer-events-none max-md:">
      <motion.div style={{ x: x, y: y }} className="z-50 fixed inset-0 w-4 h-2 bg-bg rounded-full -translate-1/2" />
      <motion.div style={{ x: x2, y: y2 }} className="z-50 fixed inset-0 w-8 h-8 border rounded-full -translate-1/2" />
    </div>
  )
}
