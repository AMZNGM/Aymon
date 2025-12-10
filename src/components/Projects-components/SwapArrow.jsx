'use client'

import { motion } from 'framer-motion'
import { Badge } from 'lucide-react'

export default function SwapArrow() {
  return (
    <div className="absolute top-12 left-1/2 flex z-10 pointer-events-none max-xl:hidden">
      <motion.div animate={{ x: [0, '-14000%', 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <Badge size={10} />
      </motion.div>
      <motion.div animate={{ x: ['-7000%', 0, '-7000%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <Badge size={10} />
      </motion.div>
      <motion.div animate={{ x: ['7000%', 0, '7000%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <Badge size={10} />
      </motion.div>
      <motion.div animate={{ x: [0, '14000%', 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <Badge size={10} />
      </motion.div>
    </div>
  )
}
