'use client'

import { motion } from 'framer-motion'
import { useScrollLock } from '@/hooks/useScrollLock'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'

export default function ProjectDetailsModal({ project, showDetails, setShowDetails }) {
  useScrollLock(showDetails)

  if (!showDetails) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg/60 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
      <motion.div
        initial={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.3 }}
        className="relative bg-bg text-text border border-text/25 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-scroll"
      >
        <CloseBtn onClick={() => setShowDetails(false)} />

        <h3 className="text-2xl font-bold font-sec uppercase mb-6">Project Details</h3>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text mb-4">Project Scope</h3>
          <p className="text-text/75 font-medium">{project.scope}</p>

          <h3 className="text-lg font-bold text-text mb-4">Services Provided</h3>
          <div className="grid grid-cols-2 gap-3">
            {project.services?.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-main rounded-full"></div>
                <span className="text-text/75 text-sm">{service}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-text mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-text/10 rounded-lg text-xs text-text/60 font-mono">
                {tech}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-text mb-4">Description</h3>
          <p className="text-text/75 leading-relaxed">{project.description?.detailed}</p>

          <h3 className="text-lg font-bold text-text mb-4">Metadata</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text/50">Duration:</span>
              <span className="ml-2 text-text/75">{project.metadata?.duration}</span>
            </div>
            <div>
              <span className="text-text/50">Team Size:</span>
              <span className="ml-2 text-text/75">{project.metadata?.team_size} people</span>
            </div>
            <div>
              <span className="text-text/50">Location:</span>
              <span className="ml-2 text-text/75">{project.metadata?.client_location}</span>
            </div>
            <div>
              <span className="text-text/50">Type:</span>
              <span className="ml-2 text-text/75 capitalize">{project.metadata?.project_type}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
