'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectImage({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.75 }}
      className="relative w-2/3 max-lg:w-full max-h-[75vh]"
    >
      <Image
        src={project.image}
        alt={project.client}
        priority
        width={1024}
        height={1024}
        sizes="(max-width: 1024px) 50vw, 30vw"
        className="w-full h-full object-cover rounded-2xl"
      />
    </motion.div>
  )
}
