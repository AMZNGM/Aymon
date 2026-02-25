'use client'

import { motion } from 'motion/react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopBtn() {
  const scroll100vh = useScrollPosition(1)

  return (
    <motion.button
      aria-label="Scroll to top"
      aria-controls="scroll-to-top"
      animate={{ y: scroll100vh ? 0 : 100 }}
      transition={{ type: 'spring', duration: 0.2, stiffness: 100 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="right-4 bottom-4 z-50 fixed bg-sec backdrop-blur-sm rounded-full p-[1dvw] cursor-pointer"
    >
      <ArrowUp />
    </motion.button>
  )
}
