'use client'

import { motion } from 'framer-motion'

export default function ProjectDetails({ work }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-6"
    >
      {/* Services Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
        <div className="space-y-3">
          {work.details.map((detail, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-gray-700">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Project Info</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Scope:</span>
            <span className="text-gray-700">{work.scope}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Year:</span>
            <span className="text-gray-700">{work.year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Category:</span>
            <span className="text-gray-700">{work.category}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
