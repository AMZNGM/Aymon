'use client'

import { motion } from 'framer-motion'

export default function ProjectProcess({ work }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="border-t pt-16"
    >
      <h2 className="text-3xl font-bold mb-8">Process & Approach</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">The Process</h3>
          <p className="text-gray-700 leading-relaxed">{work.process}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">The Impact</h3>
          <p className="text-gray-700 leading-relaxed">{work.bio}</p>
        </div>
      </div>

      {/* Video Link if available */}
      {work.vidLink && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Project Video</h3>
          <a
            href={work.vidLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View Project Video</span>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      )}
    </motion.div>
  )
}
