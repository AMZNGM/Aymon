'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimIn from '@/components/ui/unstyled/AnimIn'

const COLORS = ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']

export default function LogoName() {
  const isMobile = useIsMobile()

  return (
    <h1 className="font-black text-[4dvw] max-2xl:text-6xl text-center uppercase leading-12 max-lg:leading-12 2xl:leading-none">
      <AnimIn center blur duration={2.7} className="group">
        <motion.span
          animate={{ opacity: isMobile ? [1, 0] : 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <span className="block group-hover:opacity-0 transition-opacity duration-400">
            Ahmed
            <br />
            Ayman



          </span>
        </motion.span>

        <motion.span
          animate={{ opacity: isMobile ? [0, 1] : 1, color: COLORS }}
          transition={{ duration: isMobile ? 3 : 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <Link
            href="/"
            className="absolute inset-0 flex justify-center items-center lg:opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          >
            Aymon
          </Link>
        </motion.span>
      </AnimIn>

      <AnimIn
        center
        blur
        duration={1.7}
        className="block font-sec text-bg/50 max-sm:text-bg/25 2xl:text-[1.5dvw] max-lg:text-2xl text-3xl normal-case"
      >
        Visual Artist
      </AnimIn>
    </h1>
  )
}
