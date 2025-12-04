'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function GlobalImageModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    // Handle double-click on any image
    const handleDoubleClick = (e) => {
      const img = e.target.closest('img')
      if (img && img.src) {
        setImageSrc(img.src)
        setIsOpen(true)
        document.body.style.overflow = 'hidden'
      }
    }

    // Handle touch for mobile
    let touchTimeout
    const handleTouchStart = (e) => {
      const img = e.target.closest('img')
      if (!img || !img.src) return

      // Clear any existing timeout
      if (touchTimeout) {
        clearTimeout(touchTimeout)
        touchTimeout = null
        return // This was a double tap, ignore
      }

      // Set timeout for single tap
      touchTimeout = setTimeout(() => {
        setImageSrc(img.src)
        setIsOpen(true)
        document.body.style.overflow = 'hidden'
        touchTimeout = null
      }, 1000)
    }

    // Add event listeners
    document.addEventListener('dblclick', handleDoubleClick)
    document.addEventListener('touchstart', handleTouchStart)

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        document.body.style.overflow = 'unset'
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('dblclick', handleDoubleClick)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('keydown', handleEscape)
      if (touchTimeout) {
        clearTimeout(touchTimeout)
      }
      document.body.style.overflow = 'unset'
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={closeModal}>
      <div className="relative w-[90vw] h-[90vh] max-w-[1200px] max-h-[800px]">
        <Image
          src={imageSrc}
          alt="Modal Image"
          fill
          sizes="(max-width: 768px) 90vw, 80vw"
          className="object-contain rounded-lg cursor-zoom-out"
          onClick={(e) => e.stopPropagation()}
          priority
          unoptimized
        />
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
