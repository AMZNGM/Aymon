'use client'

import { motion } from 'motion/react'

export default function Slogun() {
  return (
    <motion.section
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.75 }}
      className="absolute top-0 left-0 w-full h-screen flex justify-center items-center text-9xl max-md:text-6xl font-sec"
    >
      <span className="absolute top-4 left-4 max-md:top-42">i</span>
      <span className="absolute top-56 left-1/4">shut</span>
      <span className="absolute top-4 right-4 max-md:top-40">my</span>
      <span className="absolute bottom-8 left-4 max-md:bottom-72">Eyes</span>
      <span className="absolute bottom-8 md:left-1/2 max-md:bottom-65 max-md:right-10">to</span>
      <span className="absolute bottom-8 right-4 max-md:right-1/2">see</span>
    </motion.section>
  )
}
