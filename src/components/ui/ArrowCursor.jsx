'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ArrowCursor({ sx, sy }) {
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      data-hide-cursor="true"
      className="top-1/2 left-1/2 z-50 absolute border-4 border-text rounded-full -translate-1/2 pointer-events-none mix-blend-difference"
    >
      <ArrowUp size={66} strokeWidth={1} className="text-text -rotate-45" />
    </motion.div>
  )
}
