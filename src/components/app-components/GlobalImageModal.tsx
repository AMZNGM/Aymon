'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useScrollLock } from 'usehooks-ts'
import { Minus, Plus } from 'lucide-react'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'

const ZOOM = { min: 0.5, max: 3, step: 0.25 }

export default function GlobalImageModal() {
  const { lock, unlock } = useScrollLock({ autoLock: false })
  const [modal, setModal] = useState<{ src: string; title: string; desc: string; date: string } | null>(null)
  const [scale, setScale] = useState(1)
  const close = useCallback(() => {
    setModal(null)
    setScale(1)
    unlock()
  }, [unlock])
  const zoom = useCallback((delta: number) => {
    setScale((prev) => Math.min(Math.max(prev + delta, ZOOM.min), ZOOM.max))
  }, [])

  function getOriginalImageSrc(img: HTMLImageElement) {
    const rawSrc = img.getAttribute('src') || img.src
    if (!rawSrc) return null

    try {
      const url = new URL(rawSrc, window.location.origin)

      if (url.pathname.startsWith('/_next/image')) {
        const original = url.searchParams.get('url')
        return original ? decodeURIComponent(original) : rawSrc
      }

      return rawSrc
    } catch {
      return rawSrc
    }
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (modal) return
      const img = (e.target as Element).closest('img')
      if (!img) return

      if (img.dataset.zoom === 'true' || img.classList.contains('openInModal')) {
        e.preventDefault()

        const src = getOriginalImageSrc(img)
        if (!src) return

        setModal({
          src,
          title: img.dataset.title || '',
          desc: img.dataset.description || '',
          date: img.dataset.date || '',
        })

        setScale(1)
        lock()
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [close, lock, modal])

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          key="backdrop"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="z-9999 fixed inset-0 flex justify-center items-center bg-black/70 text-text cursor-zoom-out"
        >
          <motion.div
            key="content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-[85vw] h-[85vh] cursor-default"
          >
            <motion.div
              key={modal.src}
              drag={scale > 1}
              dragMomentum={false}
              onWheel={(e) => {
                e.stopPropagation()
                // zoom(e.deltaY > 0 ? -ZOOM.step : ZOOM.step)
              }}
              animate={{
                x: scale === 1 ? 0 : undefined,
                y: scale === 1 ? 0 : undefined,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              style={{ scale }}
              className="relative w-full h-full touch-none cursor-grab active:cursor-grabbing"
            >
              <Image
                src={modal.src}
                alt="Modal Image"
                fill
                priority
                sizes="90vw"
                className="object-contain pointer-events-none select-none"
              />
            </motion.div>
          </motion.div>

          {(modal.title || modal.desc) && scale === 1 && (
            <div className="right-8 bottom-16 absolute max-w-2xl text-sec">
              {modal.title && <h3 className="font-bold uppercase mb-1">{modal.title}</h3>}
              {modal.date && <p className="opacity-70 text-xs mb-2">{modal.date}</p>}
              {modal.desc && <p className="opacity-80 text-sm leading-relaxed">{modal.desc}</p>}
            </div>
          )}

          <CloseBtn onClick={close} />

          {/* Zoom Controls */}
          <div className="bottom-6 left-1/2 absolute flex gap-2 bg-text/10 backdrop-blur-xs rounded-full -translate-x-1/2 p-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                zoom(-ZOOM.step)
              }}
              className="flex justify-center items-center size-8 cursor-pointer"
            >
              <Minus size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setScale(1)
              }}
              className="flex justify-center items-center size-8 text-sm cursor-pointer"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                zoom(ZOOM.step)
              }}
              className="flex justify-center items-center size-8 cursor-pointer"
            >
              <Plus size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
