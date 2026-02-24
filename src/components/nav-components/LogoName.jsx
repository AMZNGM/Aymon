'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function LogoName() {
  const isMobile = useIsMobile()

  const nameVariants = {
    mobile: { opacity: [1, 0] },
    desktop: { opacity: 1 },
  }

  const colorNameVariants = {
    mobile: {
      opacity: [0, 1],
      color: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'],
    },
    desktop: {
      opacity: 1,
      color: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'],
    },
  }

  return (
    <h1 className="w-full font-black max-lg:text-6xl max-2xl:text-6xl text-7xl text-center uppercase leading-15 max-lg:leading-12">
      <AnimText className="group inline-block relative w-full">
        <motion.span
          variants={nameVariants}
          animate={isMobile ? 'mobile' : 'desktop'}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <span className="block group-hover:opacity-0 transition-opacity duration-400">
            Ahmed
            <br />
            Ayman
          </span>
        </motion.span>

        <motion.span
          variants={colorNameVariants}
          animate={isMobile ? 'mobile' : 'desktop'}
          transition={{
            duration: isMobile ? 3 : 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <Link
            href="/"
            className="absolute inset-0 flex justify-center items-center lg:opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          >
            Aymon
          </Link>
        </motion.span>
      </AnimText>

      <AnimText className="block font-sec text-bg/50 max-sm:text-bg/25 max-lg:text-2xl text-3xl normal-case">Visual Artist</AnimText>
    </h1>
  )
}
