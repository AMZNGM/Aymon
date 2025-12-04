'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { motion } from 'framer-motion'

export default function SelectedWork() {
  const isMobile = useIsMobile()

  return (
    <section className="relative lg:w-[75%] lg:ms-auto z-10">
      <motion.h4
        initial={{ x: '-100%' }}
        whileInView={{ x: 0, rotate: -10, y: isMobile ? 150 : 0 }}
        whileTap={{
          color: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d'],
        }}
        transition={{
          type: 'spring',
          bounce: 0.4,
          duration: 1.2,
          color: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          },
          y: { duration: 1.2 },
        }}
        className="text-9xl max-md:text-4xl bg-violet-50 select-none cursor-pointer relative z-10"
      >
        Selected Work
      </motion.h4>

      {/* <motion.h4
        initial={{ x: '100%' }}
        whileInView={{ x: 0, rotate: 20, y: isMobile ? 150 : -50 }}
        whileTap={{
          color: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d'],
        }}
        transition={{
          type: 'spring',
          bounce: 0.4,
          duration: 1.2,
          color: {
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          },
          y: { duration: 1.2 },
        }}
        className="text-9xl max-md:text-4xl text-end bg-emerald-100 select-none cursor-pointer"
      >
        Geo Project
      </motion.h4> */}
    </section>
  )
}
