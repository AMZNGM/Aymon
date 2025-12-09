'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import useTextClipPath from '@/hooks/useTextClipPath'
import NavSlogan from '@/components/nav-components/NavSlogan'
import mainPhotoNoBG from '../../../public/images/mainPhotoNoBG.webp'

export default function NavImage() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 0.9 }}
      whileDrag={{ scale: 2 }}
      transition={{ duration: 0.5 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <motion.div {...useTextClipPath()} className="relative inline-block my-12 max-lg:hidden">
        <Image src={mainPhotoNoBG} alt="Main Image" priority className="w-75 h-75 object-cover pointer-events-none select-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-16 pb-4 flex justify-center items-center pointer-events-none">
          <NavSlogan />
        </div>
      </motion.div>
    </motion.div>
  )
}
