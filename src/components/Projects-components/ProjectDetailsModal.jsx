'use client'

import { motion } from 'framer-motion'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'

export default function ProjectDetailsModal({ project, showDetails, setShowDetails }) {
  useBodyScrollLock(showDetails)
  useKeyboardShortcuts({ onEscape: () => setShowDetails(false) })

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center p-4">
      <div
        onClick={() => setShowDetails(false)}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="absolute inset-0 bg-bg/60 backdrop-blur-sm"
      />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        initial={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        exit={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-6xl max-h-[80vh] overflow-y-scroll bg-bg border border-text/25 rounded-2xl text-text p-6"
      >
        <CloseBtn onClick={() => setShowDetails(false)} />
        <h3 className="font-sec font-bold text-2xl uppercase mb-6">Project Details</h3>

        <div className="space-y-6">
          <h3 className="font-bold text-text text-lg mb-4">Project Scope</h3>
          <p className="font-medium text-text/75 wrap-break-word whitespace-pre-wrap">{project.scope}</p>

          <h3 className="font-bold text-text text-lg mb-4">Services Provided</h3>
          <div className="gap-3 grid grid-cols-2">
            {project.services?.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-main rounded-full"></div>
                <span className="text-text/75 text-sm">{service}</span>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-text text-lg mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech, index) => (
              <span key={index} className="bg-text/10 rounded-lg font-mono text-text/60 text-xs px-3 py-1">
                {tech}
              </span>
            ))}
          </div>

          <h3 className="font-bold text-text text-lg mb-4">Description</h3>
          <p className="text-text/75 wrap-break-word leading-relaxed whitespace-pre-wrap">{project.description?.detailed}</p>

          <h3 className="font-bold text-text text-lg mb-4">Metadata</h3>
          <div className="gap-4 grid grid-cols-2 text-sm">
            {Object.entries(project.metadata || {}).map(([key, value]) => (
              <div key={key}>
                <span className="text-text/50">{key.replace(/_/g, ' ')}:</span>
                <span className="text-text/75 ml-2">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
