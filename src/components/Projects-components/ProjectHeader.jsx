'use client'

import { motion } from 'framer-motion'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function ProjectHeader({ project, className, onShowDetails }) {
  return (
    <div className={`relative overflow-hidden bg-bg/10 rounded-2xl p-4 ${className}`}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col justify-between h-full gap-4 overflow-auto"
      >
        <div className="flex flex-col gap-8 max-md:gap-6">
          <div>
            <h1 className="text-4xl max-md:text-2xl font-sec font-extrabold uppercase">{project.client}</h1>

            <div className="flex gap-4 text-bg/75 font-mono text-sm max-md:text-xs">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.category}</span>
            </div>
          </div>

          <p className="text-base max-md:text-sm text-bg/75 font-medium leading-[22px] max-md:leading-[20px] tracking-tighter">
            {project.bio}
          </p>
        </div>

        <button
          onClick={onShowDetails}
          className="w-full py-2 px-4 bg-bg/10 hover:bg-bg/30 rounded-xl duration-100 text-main/75 font-medium cursor-pointer"
        >
          <VariableFontHoverByRandomLetter label="Show More Details" />
        </button>
      </motion.div>
    </div>
  )
}
