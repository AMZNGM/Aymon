'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
const vid = '/videos/randomVideos/eyes.mp4'

export default function InteractiveBackground() {
  const { scrollYProgress } = useScroll()
  // const backgroundColor = useTransform(scrollYProgress, [0, 1], ['#ffffff', '#000000'])

  return (
    <>
      {/* <video src={vid} autoPlay muted loop className="fixed inset-0 w-full h-full object-cover opacity-15" /> */}
      {/* <motion.div className="fixed inset-0 -z-10" style={{ backgroundColor }} /> */}
    </>
  )
}
