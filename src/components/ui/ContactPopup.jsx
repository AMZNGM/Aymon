'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import personalInfo from '@/data/personal-info.json'

export default function ContactPopup({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-9999 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl max-h-[90vh] bg-bg text-text rounded-2xl overflow-y-auto p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <button onClick={onClose} className="text-2xl hover:opacity-70 transition-opacity cursor-pointer" aria-label="Close">
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Let&apos;s Connect</h3>
              <p className="text-text/80">
                I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                const displayName = platform.charAt(0).toUpperCase() + platform.slice(1)
                const handle =
                  platform === 'linkedin'
                    ? 'linkedin.com/in/aymonin'
                    : platform === 'instagram'
                    ? '@aymo.n'
                    : platform === 'behance'
                    ? 'behance.net/AYMONN'
                    : url

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-text/20 rounded-lg hover:border-text/40 transition-colors"
                  >
                    <h4 className="font-semibold">{displayName}</h4>
                    <p className="text-text/80">{handle}</p>
                  </a>
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
