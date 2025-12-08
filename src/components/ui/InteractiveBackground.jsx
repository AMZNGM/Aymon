'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function InteractiveBackground() {
  const { scrollYProgress } = useScroll()
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ['#ffffff', '#030303'])

  return (
    <>
      <motion.div className="fixed inset-0 -z-10" style={{ backgroundColor }} />
    </>
  )
}
