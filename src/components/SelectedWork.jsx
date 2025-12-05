'use client'

import { motion } from 'framer-motion'

export default function SelectedWork() {
  const colorVariants = ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d']

  return (
    <section className="relative w-screen lg:w-[75%] lg:ms-auto px-4 max-md:text-center">
      <motion.span
        initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        whileHover={{ color: colorVariants }}
        transition={{
          duration: 1,
          color: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
        viewport={{ once: true }}
        className="text-9xl max-md:text-5xl font-bold tracking-[-1px] uppercase"
      >
        Selected Work
      </motion.span>
    </section>
  )
}
