'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'
import ClickEffect from '@/components/ui/effect/ClickEffect'
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
        className="fixed inset-0 bg-bg/60 flex justify-center items-center z-9999 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl max-h-[90vh] bg-bg text-text rounded-2xl overflow-y-auto p-6"
        >
          <CloseBtn onClick={onClose} className="z-50" />

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold font-sec mb-4">Get in Touch</h2>

            <div>
              <h3 className="text-xl font-semibold font-mono mb-2">Let&apos;s Connect</h3>
              <p className="text-text/80 font-mono tracking-[10.5px]">
                I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say
                hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4 font-mono tracking-widest">
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
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="block">
                    <ClickEffect className="block border border-text/20 rounded-lg hover:border-text/40 transition-colors cursor-pointer p-4">
                      <h4 className="font-semibold">{displayName}</h4>
                      <p className="text-text/80">{handle}</p>
                    </ClickEffect>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
