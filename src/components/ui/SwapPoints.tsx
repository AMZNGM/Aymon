'use client'

import { motion } from 'framer-motion'
import { Badge } from 'lucide-react'

export default function SwapPoints() {
  return (
    <div className="max-xl:hidden top-8 left-1/2 z-10 absolute flex pointer-events-none">
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
