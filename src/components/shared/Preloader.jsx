'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { getAboutContent, getContactContent } from '@/lib/getAbout'
import { getProjects } from '@/lib/getProjects'
import { getLogos } from '@/lib/getLogos'
import { easings } from '@/utils/anim'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [displayedNumbers, setDisplayedNumbers] = useState([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      let completedSteps = 0
      const totalSteps = 1

      const updateProgress = () => {
        completedSteps++
        const scaledProgress = Math.round((completedSteps / totalSteps) * 100)
        setProgress(scaledProgress)

        if (scaledProgress >= 100) {
          setTimeout(() => setIsVisible(false), 5000)
        }
      }

      try {
        // await getAboutContent()
        // await getContactContent()
        await getProjects()
        // await getLogos()
        updateProgress()
      } catch (error) {
        console.error('Error loading data:', error)
        updateProgress()
      }
    }

    loadData()
  }, [])

  // Typewriter effect for numbers
  useEffect(() => {
    if (displayedNumbers.length < progress) {
      const timer = setTimeout(() => {
        setDisplayedNumbers((prev) => [...prev, prev.length])
      }, 20) // Faster delay for smoother progress

      return () => clearTimeout(timer)
    }
  }, [progress, displayedNumbers.length])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '0%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.9, ease: easings.motion }}
          className="z-50 fixed inset-0 flex flex-col justify-center items-center bg-sec text-bg text-center"
        >
          <div className="max-w-md flex flex-wrap justify-center gap-2 mb-6">
            {displayedNumbers.map((number) => (
              <motion.span
                key={number}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                className="font-sec font-bold text-2xl"
              >
                {number}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
