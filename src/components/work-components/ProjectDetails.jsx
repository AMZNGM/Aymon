'use client'

import { motion } from 'framer-motion'

export default function ProjectDetails({ project }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-sm">
        <h3 className="font-semibold font-mono uppercase tracking-wider mb-4">Services</h3>
        {project.details.map((detail, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-2 h-2 bg-black rounded-full" />
            <span className="text-bg/75">{detail}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm">
        <h3 className="font-semibold font-mono uppercase tracking-wider mb-4">Project Info</h3>
        <div className="flex justify-between">
          <span>Scope:</span>
          <span className="text-bg/75">{project.scope}</span>
        </div>
        <div className="flex justify-between">
          <span>Year:</span>
          <span className="text-bg/75">{project.year}</span>
        </div>
        <div className="flex justify-between">
          <span>Category:</span>
          <span className="text-bg/75">{project.category}</span>
        </div>
      </div>
    </motion.div>
  )
}
