'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import personalInfo from '@/data/personal-info.json'
import useDimensions from '@/hooks/useDimensions'

export default function NavSlogan() {
  const { scrollY } = useScroll()
  const { height: vh } = useDimensions()

  const opacity = useTransform(scrollY, [vh, vh + 200], [0, 1])

  return (
    <section className="relative w-48 h-6 max-lg:hidden">
      <motion.div style={{ opacity }} className="absolute inset-0 flex justify-center items-center bg-bg duration-1000">
        <p className="text-sm text-text text-center font-black uppercase">{personalInfo.slogan}</p>
      </motion.div>
    </section>
  )
}
