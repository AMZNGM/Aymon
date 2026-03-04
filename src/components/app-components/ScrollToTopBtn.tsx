'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopBtn() {
  const { scrollY } = useScroll()
  const threshold = typeof window !== 'undefined' ? window.innerHeight : 1000
  const y = useTransform(scrollY, [0, threshold], [100, 0])
  const opacity = useTransform(scrollY, [0, threshold], [0, 1])

  return (
    <motion.button
      style={{ y, opacity }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="right-4 bottom-4 z-50 fixed bg-sec rounded-full p-[1dvw] cursor-pointer"
    >
      <ArrowUp />
    </motion.button>
  )
}
