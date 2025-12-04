'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function GlobalImageModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

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

      if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
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

    document.addEventListener('dblclick', handleDoubleClick)
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
      document.removeEventListener('dblclick', handleDoubleClick)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  if (!isOpen) return null

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm cursor-zoom-out z-9999"
    >
      <div className="relative size-[75%] cursor-default">
        <Image
          src={imageSrc}
          alt="Modal Image"
          fill
          sizes="(max-width: 768px) 90vw, 80vw"
          className="object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
          priority
          unoptimized
        />
      </div>

      <button
        aria-label="Close modal"
        onClick={closeModal}
        className="absolute top-4 right-4 size-10 flex justify-center items-center bg-text/20 backdrop-blur-md rounded-full text-text hover:bg-text/30 transition-colors cursor-pointer"
      >
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
