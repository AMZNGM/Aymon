'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollIcon() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section>
      <div className="relative w-1 h-32 bg-sec p-4">
        <motion.div style={{ height }} className="absolute inset-0 w-full bg-bg" />
      </div>
    </section>
  )
}
