'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function ProjectHeader({ project, className }) {
  const [showDetails, setShowDetails] = useState(false)

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
          onClick={() => setShowDetails(true)}
          className="w-full py-2 px-4 bg-bg/10 hover:bg-bg/30 rounded-xl duration-100 text-main/75 font-medium cursor-pointer"
        >
          <VariableFontHoverByRandomLetter label="Show More Details" />
        </button>
      </motion.div>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-bg text-text border border-text/25 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-auto"
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 p-2 hover:bg-text/10 rounded-lg transition-colors cursor-pointer"
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-6">Project Details</h3>

            <div className="space-y-6">
              <div className="space-y-2 text-sm">
                <h4 className="font-semibold font-mono uppercase tracking-wider mb-4">Services</h4>
                {project.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-text rounded-full" />
                    <span className="text-text/75">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <h4 className="font-semibold font-mono uppercase tracking-wider mb-4">Project Info</h4>
                <div className="flex justify-between">
                  <span>Scope:</span>
                  <span className="text-text/75">{project.scope}</span>
                </div>
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span className="text-text/75">{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="text-text/75">{project.category}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
