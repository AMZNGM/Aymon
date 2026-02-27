'use client'

import { useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function NumberTicker({ value, className = '', duration = 3500 }: { value: number; className?: string; duration?: number }) {
  const finalCount = value
  const [displaySubs, setDisplaySubs] = useState(0)
  const springSubCount = useSpring(0, {
    bounce: 0,
    duration,
  })

  springSubCount.on('change', (value) => {
    setDisplaySubs(Math.round(value))
  })

  const animate = () => {
    springSubCount.set(finalCount)
  }

  return (
    <motion.div onViewportEnter={animate} className={`${className} tracking-tight`}>
      {displaySubs}
    </motion.div>
  )
}
