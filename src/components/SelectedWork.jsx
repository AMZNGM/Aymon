'use client'

import { motion } from 'framer-motion'

export default function SelectedWork() {
  const colorVariants = ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d']

  return (
    <section className="relative lg:w-[75%] lg:ms-auto px-1">
      <motion.h4
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
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
        className="text-9xl max-md:text-5xl max-md:text-center font-bold tracking-[-1px]"
      >
        Selected Work
      </motion.h4>
    </section>
  )
}
