'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function NavImage() {
  const { scrollYProgress } = useScroll({})
  const skewX = useTransform(scrollYProgress, [0, 1], [0, -10])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 0.9 }}
      whileDrag={{ scale: 2 }}
      transition={{ duration: 0.5 }}
      style={{ skewX }}
      className="group max-lg:hidden z-20 relative cursor-grab active:cursor-grabbing"
    >
      <AnimIn
        center
        blur
        duration={3}
        className="size-[18dvw] 2xl:size-[16dvw] flex justify-center items-center bg-transparent perspective-distant my-12 2xl:my-[3dvw]"
      >
        <div className="relative size-full transform-3d group-hover:transform-[rotateY(180deg)] transition-transform duration-700 ease-in-out">
          <ImageIn src="/images/profile2.webp" alt="Nav Image" className="rounded-2xl" divClassName="absolute! inset-0 backface-hidden" />

          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            <video
              src="/videos/BB.mp4"
              loop
              muted
              autoPlay
              playsInline
              webkit-playsinline="true"
              controls={false}
              className="w-full h-auto object-cover rounded-2xl pointer-events-none"
            />
          </div>
        </div>
      </AnimIn>
    </motion.div>
  )
}
