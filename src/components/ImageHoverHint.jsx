'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Glasses } from 'lucide-react'

export default function ImageHoverHint() {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const handleMouseEnter = (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('cursor-zoom-in')) {
        setShowHint(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('cursor-zoom-in')) {
        setShowHint(false)
      }
    }

    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <AnimatePresence>
      {showHint && (
        <motion.span
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="fixed bottom-0 text-2xl leading-5 text-bg z-50 pointer-events-none"
        >
          <Glasses size={20} />
          Click
        </motion.span>
      )}
    </AnimatePresence>
  )
}
