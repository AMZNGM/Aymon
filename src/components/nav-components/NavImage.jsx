'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import LazyVideo from '@/components/ui/unstyled/LazyVideo'
import mainPhotoNoBG from '../../../public/images/profile.webp'

export default function NavImage() {
  const { scrollYProgress } = useScroll({})
  const skewX = useTransform(scrollYProgress, [0, 1], [0, -10])

  return (
    <motion.div
      style={{ skewX }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 0.9 }}
      whileDrag={{ scale: 2 }}
      transition={{ duration: 0.5 }}
      className="group max-lg:hidden z-20 relative cursor-grab active:cursor-grabbing"
    >
      <AnimIn center blur duration={3} className="size-[18dvw] flex justify-center items-center bg-transparent perspective-distant my-12">
        <div className="relative size-full transform-3d group-hover:transform-[rotateY(180deg)] transition-transform duration-700 ease-in-out">
          <ImageIn src={mainPhotoNoBG} alt="Main Image" priority className="rounded-2xl" divClassName="absolute! inset-0 backface-hidden" />

          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            <LazyVideo
              src="/videos/draft.mp4"
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
