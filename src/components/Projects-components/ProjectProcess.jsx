'use client'

import { motion } from 'framer-motion'
import { SquareArrowOutUpRight } from 'lucide-react'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function ProjectProcess({ project, className }) {
  return (
    <div className={`relative overflow-hidden bg-bg/10 rounded-2xl p-4 ${className}`}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col justify-between h-full gap-4 overflow-auto"
      >
        <h2 className="text-3xl max-md:text-2xl font-sec font-bold uppercase">Process & Approach</h2>

        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h3 className="text-lg max-md:text-base font-mono font-semibold mb-2">The Process</h3>
            <p className="text-sm max-md:text-xs text-bg/75 font-medium leading-[20px] max-md:leading-[18px] tracking-tighter">
              {project.process}
            </p>
          </div>

          <div>
            <h3 className="text-lg max-md:text-base font-mono font-semibold mb-2">The Impact</h3>
            <p className="text-sm max-md:text-xs text-bg/75 font-medium leading-[20px] max-md:leading-[18px] tracking-tighter">
              {project.bio}
            </p>
          </div>
        </div>

        {project.vidLink && (
          <div className="mt-4">
            <h3 className="text-lg max-md:text-base font-mono font-semibold mb-2">Project Video</h3>
            <a
              href={project.vidLink}
              target="_blank"
              rel="noopener noreferrer"
              className="max-lg:w-full inline-flex justify-center items-center gap-2 text-sm max-md:text-xs text-main bg-bg/10 hover:bg-bg/25 rounded-2xl duration-200 py-2 px-4"
            >
              <VariableFontHoverByRandomLetter label="View Project Video" />
              <SquareArrowOutUpRight size={14} />
            </a>
          </div>
        )}
      </motion.div>
    </div>
  )
}
