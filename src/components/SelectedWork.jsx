'use client'

import { motion } from 'framer-motion'

export default function SelectedWork() {
  return (
    <section className="relative w-screen lg:w-[75%] lg:ms-auto py-4 px-1">
      <motion.span
        initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-8xl max-md:text-3xl font-bold tracking-[-1px] uppercase"
      >
        Selected Work
      </motion.span>
    </section>
  )
}
