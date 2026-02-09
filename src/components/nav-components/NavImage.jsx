'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import useTextClipPath from '@/hooks/useTextClipPath'
import mainPhotoNoBG from '../../../public/images/mainPhoto2.webp'

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
      <motion.div {...useTextClipPath(0, true)} className="max-lg:hidden inline-block relative overflow-hidden rounded-2xl my-12">
        <Image src={mainPhotoNoBG} alt="Main Image" priority className="w-75 h-75 object-cover pointer-events-none select-none" />
      </motion.div>
    </motion.div>
  )
}
