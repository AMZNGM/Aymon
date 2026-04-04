'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollIcon() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100], { clamp: true })

  return (
    <section className="top-40 max-md:-top-12 right-4 max-md:right-50.5 fixed max-md:rotate-90">
      <div className="bg-bg/10 backdrop-blur-xs rounded-2xl p-4.5">
        <div className="relative w-1 h-32 bg-bg/25 rounded-full">
          <motion.div style={{ height }} className="top-0 left-0 absolute w-full bg-bg rounded-full" />
        </div>
      </div>

      <motion.span className="in-[:where(.hide-scroll-percent)]:hidden max-md:hidden block font-medium text-bg/60 text-xs text-center md:mt-2">
        {useTransform(percentage, (v) => `${Math.round(v)}%`)}
      </motion.span>
    </section>
  )
}
