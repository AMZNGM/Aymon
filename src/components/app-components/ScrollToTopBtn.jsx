'use client'

import { motion } from 'motion/react'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export default function ScrollToTopBtn() {
  const scroll100vh = useScrollPosition(1)

  return (
    <motion.button
      aria-label="Scroll to top"
      aria-controls="scroll-to-top"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: scroll100vh ? 1 : 0, y: 0 }}
      transition={{ type: 'spring', duration: 0.2, stiffness: 100 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="right-4 max-md:right-23 bottom-4 fixed bg-sec backdrop-blur-sm rounded-xl p-3.5 cursor-pointer"
    >
      ⬆︎
    </motion.button>
  )
}
