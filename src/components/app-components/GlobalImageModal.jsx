'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

export default function GlobalImageModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [scale, setScale] = useState(1)
  const calcConstraint = scale * 200

  useEffect(() => {
    const clickToOpen = (e) => {
      const img = e.target.closest('img')
      if (img && img.src) {
        setImageSrc(img.src)
        setIsOpen(true)
      }
    }
    document.addEventListener('click', clickToOpen)

    const escapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setScale(1)
        document.body.style.overflow = 'unset'
      }
    }
    document.addEventListener('keydown', escapeKey)

    return () => {
      document.removeEventListener('click', clickToOpen)
      document.removeEventListener('keydown', escapeKey)
    }
  }, [])

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetZoom = () => {
    setScale(1)
  }

  const closeModal = () => {
    setIsOpen(false)
    setScale(1)
    document.body.classList.remove('overflow-hidden')
  }

  const handleImageClick = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      zoomIn()
    }

    if (e.altKey) {
      e.preventDefault()
      zoomOut()
    }
  }

  if (!isOpen) return
  return (
    <div onClick={closeModal} className="fixed inset-0 flex justify-center items-center bg-bg/60 cursor-zoom-out z-9999">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative size-[75%] cursor-default"
      >
        <motion.div
          onClick={handleImageClick}
          animate={{ x: scale === 1 ? 0 : undefined, y: scale === 1 ? 0 : undefined }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          drag={scale === 1 ? false : true}
          dragElastic={0.2}
          dragConstraints={{ left: -calcConstraint, right: calcConstraint, top: -calcConstraint + 150, bottom: calcConstraint - 150 }}
          dragPropagation={false}
          dragMomentum={false}
          className="relative size-full select-none cursor-grab active:cursor-grabbing"
          style={{ scale }}
        >
          <Image
            src={imageSrc}
            alt="Modal Image"
            fill
            sizes="(max-width: 768px) 90vw, 80vw"
            className="object-contain select-none pointer-events-none transition-transform duration-300 -z-10"
            priority
            unoptimized
          />
        </motion.div>
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
          className="group size-8 flex justify-center items-center text-text hover:bg-text/30 rounded-full transition-colors cursor-pointer"
        >
          <Minus size={20} />
          <span className="size-full flex justify-center items-center absolute top-1/2 right-30 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 duration-200">
            Alt + left click
          </span>
        </button>

        <button
          aria-label="Reset zoom"
          onClick={(e) => {
            e.stopPropagation()
            resetZoom()
          }}
          className="group size-8 flex justify-center items-center text-text hover:bg-text/30 w-fit p-1 rounded-full transition-colors cursor-pointer text-sm font-medium"
        >
          {Math.round(scale * 100)}%
          <span className="size-full flex justify-center items-center absolute inset-0 -translate-y-10 text-xs opacity-0 group-hover:opacity-100 duration-200">
            Reset
          </span>
        </button>

        <button
          aria-label="Zoom in"
          onClick={(e) => {
            e.stopPropagation()
            zoomIn()
          }}
          className="group size-8 flex justify-center items-center text-text hover:bg-text/30 rounded-full transition-colors cursor-pointer"
        >
          <Plus size={20} />
          <span className="size-full flex justify-center items-center absolute top-1/2 left-30 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 duration-200">
            Ctrl + left click
          </span>
        </button>
      </div>
    </div>
  )
}
