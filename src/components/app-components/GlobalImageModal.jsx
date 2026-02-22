'use client'

import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'

export default function GlobalImageModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [imageTitle, setImageTitle] = useState('')
  const [imageDesc, setImageDesc] = useState('')
  const [imageDate, setImageDate] = useState('')
  const [scale, setScale] = useState(1)
  const calcConstraint = useMemo(() => scale * 200, [scale])

  useEffect(() => {
    const clickToOpen = (e) => {
      const img = e.target.closest('img')
      if (img && img.src && (img.dataset.zoom === 'true' || img.classList.contains('openInModal'))) {
        setImageSrc(img.src)
        setImageTitle(img.getAttribute('data-title') || '')
        setImageDesc(img.getAttribute('data-description') || '')
        setImageDate(img.getAttribute('data-date') || '')
        setIsOpen(true)
      }
    }
    document.addEventListener('click', clickToOpen)

    const escapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setScale(1)
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

  useBodyScrollLock(isOpen)

  if (!isOpen) return

  return (
    <div
      onClick={closeModal}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="z-9999 fixed inset-0 flex justify-center items-center bg-bg/60 backdrop-blur-sm text-text cursor-zoom-out"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative min-w-[85dvw] h-[85dvh] cursor-default"
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
          className="relative size-full cursor-grab active:cursor-grabbing select-none"
          style={{ scale }}
        >
          <Image
            src={imageSrc}
            alt="Modal Image"
            fill
            sizes="(max-width: 768px) 90vw, 80vw"
            className="-z-10 object-contain transition-transform duration-300 pointer-events-none select-none"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* Info overlay */}
      {(imageTitle || imageDesc) && scale === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bottom-16 left-8 absolute max-w-3xl text-sec p-4 pointer-events-none"
        >
          {imageTitle && <h3 className="font-bold uppercase tracking-tight mb-1">{imageTitle}</h3>}
          {imageDate && <p className="font-mono text-xs uppercase tracking-widest mb-2">{imageDate}</p>}
          {imageDesc && <p className="opacity-80 font-light text-sm leading-relaxed">{imageDesc}</p>}
        </motion.div>
      )}

      <CloseBtn onClick={closeModal} />

      <div className="bottom-4 left-1/2 absolute flex gap-2 bg-text/20 backdrop-blur-md rounded-full -translate-x-1/2 p-2 transform">
        <button
          aria-label="Zoom out"
          onClick={(e) => {
            e.stopPropagation()
            zoomOut()
          }}
          className="group size-8 flex justify-center items-center hover:bg-text/30 rounded-full text-text transition-colors cursor-pointer"
        >
          <Minus size={20} />
          <span className="top-1/2 right-30 absolute size-full flex justify-center items-center opacity-0 group-hover:opacity-100 text-xs -translate-y-1/2 duration-200">
            Alt + left click
          </span>
        </button>

        <button
          aria-label="Reset zoom"
          onClick={(e) => {
            e.stopPropagation()
            resetZoom()
          }}
          className="group w-fit size-8 flex justify-center items-center hover:bg-text/30 rounded-full font-medium text-text text-sm transition-colors p-1 cursor-pointer"
        >
          {Math.round(scale * 100)}%
          <span className="absolute inset-0 size-full flex justify-center items-center opacity-0 group-hover:opacity-100 text-xs -translate-y-10 duration-200">
            Reset
          </span>
        </button>

        <button
          aria-label="Zoom in"
          onClick={(e) => {
            e.stopPropagation()
            zoomIn()
          }}
          className="group size-8 flex justify-center items-center hover:bg-text/30 rounded-full text-text transition-colors cursor-pointer"
        >
          <Plus size={20} />
          <span className="top-1/2 left-30 absolute size-full flex justify-center items-center opacity-0 group-hover:opacity-100 text-xs -translate-y-1/2 duration-200">
            Ctrl + left click
          </span>
        </button>
      </div>
    </div>
  )
}
