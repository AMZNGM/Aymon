'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import personalInfo from '@/data/personal-info.json'

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
    <h1 className="text-7xl max-lg:text-6xl text-center font-black uppercase leading-15 max-lg:leading-12">
      <span className="group relative inline-block">
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
          <span className="block transition-opacity duration-400 group-hover:opacity-0">
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
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
            className="absolute inset-0 flex justify-center items-center lg:opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          >
            {personalInfo.nickname}
          </Link>
        </motion.span>
      </span>

      <span className="block text-3xl max-lg:text-2xl text-bg/50 max-sm:text-bg/25 font-sec normal-case">Visual Artist</span>
    </h1>
  )
}
