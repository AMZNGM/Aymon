'use client'

import { motion } from 'framer-motion'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'

export default function ProjectDetailsModal({ project, showDetails, setShowDetails }) {
  if (!showDetails) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-bg text-text border border-text/25 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-auto"
      >
        <CloseBtn onClick={() => setShowDetails(false)} />

        <h3 className="text-2xl font-bold font-sec uppercase mb-6">Project Details</h3>

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
              <span>Year:</span>
              <span className="text-text/75">{project.year}</span>
            </div>
            <div className="flex justify-between">
              <span>Scope:</span>
              <span className="text-text/75">{project.scope}</span>
            </div>
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="text-text/75">{project.category}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
