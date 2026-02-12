'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollIcon() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="fixed top-40 right-4 max-md:-top-12 max-md:right-50.5 max-md:rotate-90 bg-bg/10 rounded-2xl backdrop-blur-sm p-4.5">
      <div className="relative w-1 h-32 bg-bg/25 rounded-full">
        <motion.div className="absolute top-0 left-0 w-full bg-bg rounded-full" style={{ height }} />
      </div>
    </section>
  )
}
