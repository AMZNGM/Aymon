'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ProjectHeader({ work }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Back Navigation */}
      <Link href="/work" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
        <ArrowLeft size={20} />
        <span>Back to Work</span>
      </Link>

      {/* Project Title */}
      <h1 className="text-6xl font-bold">{work.client}</h1>

      {/* Project Meta */}
      <div className="flex gap-4 text-gray-500">
        <span>{work.year}</span>
        <span>•</span>
        <span>{work.category}</span>
      </div>

      {/* Project Description */}
      <p className="text-lg text-gray-700 leading-relaxed">{work.bio}</p>
    </motion.div>
  )
}
