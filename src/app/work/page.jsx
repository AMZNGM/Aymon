'use client'

import { motion } from 'framer-motion'

export default function Work() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
        <h1 className="text-6xl font-bold mb-8">Work</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Work portfolio coming soon...</p>
      </motion.div>
    </main>
  )
}
