'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ImageHoverHint from './ImageHoverHint'

export default function GlobalImageModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // double-click on any image
    const handleDoubleClick = (e) => {
      const img = e.target.closest('img')
      if (img && img.src) {
        setImageSrc(img.src)
        setIsOpen(true)
        document.body.style.overflow = 'hidden'
      }
    }

    // double touch for mobile
    let lastTouchTime = 0
    const handleTouchStart = (e) => {
      const img = e.target.closest('img')
      if (!img || !img.src) return

      const currentTime = Date.now()
      const timeSinceLastTouch = currentTime - lastTouchTime

      if (timeSinceLastTouch < 500 && timeSinceLastTouch > 0) {
        // This is a double touch
        setImageSrc(img.src)
        setIsOpen(true)
        document.body.style.overflow = 'hidden'
        lastTouchTime = 0 // Reset to prevent triple touches
      } else {
        // This is a single touch, just record the time
        lastTouchTime = currentTime
      }
    }

    document.addEventListener('click', handleDoubleClick)
    document.addEventListener('touchstart', handleTouchStart)

    // escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        document.body.style.overflow = 'unset'
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleDoubleClick)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    setScale(1)
    document.body.style.overflow = 'unset'
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetZoom = () => {
    setScale(1)
  }

  if (!isOpen) return <ImageHoverHint />

  return (
    <>
      <ImageHoverHint />
      <div onClick={closeModal} className="fixed inset-0 flex justify-center items-center bg-black/60 cursor-zoom-out z-9999">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative size-[75%] cursor-default"
        >
          <Image
            src={imageSrc}
            alt="Modal Image"
            fill
            sizes="(max-width: 768px) 90vw, 80vw"
            className="object-contain rounded-lg transition-transform duration-300"
            style={{ transform: `scale(${scale})` }}
            onClick={(e) => e.stopPropagation()}
            priority
            unoptimized
          />
        </motion.div>

        <button
          aria-label="Close modal"
          onClick={closeModal}
          className="absolute top-4 right-4 size-10 flex justify-center items-center bg-text/20 backdrop-blur-md rounded-full text-text hover:bg-text/30 transition-colors cursor-pointer"
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-text/20 backdrop-blur-md rounded-full p-2">
          <button
            aria-label="Zoom out"
            onClick={(e) => {
              e.stopPropagation()
              zoomOut()
            }}
            className="size-8 flex justify-center items-center text-text hover:bg-text/30 rounded-full transition-colors cursor-pointer"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            aria-label="Reset zoom"
            onClick={(e) => {
              e.stopPropagation()
              resetZoom()
            }}
            className="size-8 flex justify-center items-center text-text hover:bg-text/30 w-fit p-1 rounded-full transition-colors cursor-pointer text-sm font-medium"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            aria-label="Zoom in"
            onClick={(e) => {
              e.stopPropagation()
              zoomIn()
            }}
            className="size-8 flex justify-center items-center text-text hover:bg-text/30 rounded-full transition-colors cursor-pointer"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
