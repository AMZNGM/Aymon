'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollIcon() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="top-40 max-md:-top-12 right-4 max-md:right-50.5 fixed bg-bg/10 backdrop-blur-sm rounded-2xl max-md:rotate-90 p-4.5">
      <div className="relative w-1 h-32 bg-bg/25 rounded-full">
        <motion.div className="top-0 left-0 absolute w-full bg-bg rounded-full" style={{ height }} />
      </div>
    </section>
  )
}
