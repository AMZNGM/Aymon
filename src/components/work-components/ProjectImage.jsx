'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectImage({ project, className }) {
  return (
    <div className={`h-[80vh] max-lg:h-[60vh] overflow-hidden rounded-2xl`}>
      <motion.div
        initial={{ opacity: 0, filter: 'blur(8px)', scale: 1.2 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 0.75 }}
        className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}
      >
        <Image
          src={project.image}
          alt={project.client}
          priority
          width={1024}
          height={1024}
          sizes="(max-width: 1024px) 50vw, 30vw"
          className="w-full h-full object-cover pointer-events-none"
        />
      </motion.div>
    </div>
  )
}
