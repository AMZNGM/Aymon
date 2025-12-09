'use client'

import { motion } from 'framer-motion'
import ProjectDetails from '@/components/work-components/ProjectDetails'

export default function ProjectHeader({ project }) {
  return (
    <div className="relative w-1/3 max-lg:w-full overflow-hidden bg-bg/10 rounded-2xl p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col justify-between h-full gap-4"
      >
        <div className="flex flex-col h-full gap-12">
          <div>
            <h1 className="text-6xl max-lg:text-4xl font-sec font-extrabold uppercase">{project.client}</h1>

            <div className="flex gap-4 text-bg/75 font-mono">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.category}</span>
            </div>
          </div>

          <p className="text-lg text-bg/75 font-medium leading-[24px] tracking-tighter">{project.bio}</p>
        </div>

        <ProjectDetails project={project} />
      </motion.div>
    </div>
  )
}
