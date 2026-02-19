'use client'

import { motion } from 'framer-motion'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function ProjectImage({ project, className }) {
  return (
    <div className={`h-[80vh] max-lg:h-[60vh] bg-sec overflow-hidden rounded-2xl`}>
      <motion.div
        initial={{ opacity: 0, filter: 'blur(8px)', scale: 1.2 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 0.75 }}
        className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}
      >
        <ImageIn src={project.media.primary} alt={project.client} priority divClassName="w-full h-full pointer-events-none select-none" />
      </motion.div>
    </div>
  )
}
