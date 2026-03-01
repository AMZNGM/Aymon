'use client'

import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollLock } from 'usehooks-ts'
import { Minus, Plus } from 'lucide-react'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'

const ZOOM = { min: 0.5, max: 3, step: 0.25 }

export default function GlobalImageModal() {
  const { lock, unlock } = useScrollLock({ autoLock: false })
  const [modal, setModal] = useState(null)
  const [scale, setScale] = useState(1)
  const dragConstraint = useMemo(() => scale * 200, [scale])

  const close = () => {
    setModal(null)
    setScale(1)
    unlock()
  }
  const zoom = (delta) => setScale((p) => Math.min(Math.max(p + delta, ZOOM.min), ZOOM.max))

  useEffect(() => {
    const onClick = (e) => {
      const img = e.target.closest('img')
      if (img?.src && (img.dataset.zoom === 'true' || img.classList.contains('openInModal'))) {
        setModal({ src: img.src, title: img.dataset.title || '', desc: img.dataset.description || '', date: img.dataset.date || '' })
        setScale(1)
        lock()
      }
    }
    const onKey = (e) => e.key === 'Escape' && close()

    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          key="modal-backdrop"
          onClick={close}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3 } }}
          transition={{ duration: 0.25 }}
          className="z-9999 fixed inset-0 flex justify-center items-center bg-bg/60 backdrop-blur-sm text-text cursor-zoom-out"
        >
          <motion.div
            key="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(40px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40, scale: 0.9, filter: 'blur(40px)' }}
            transition={{ type: 'spring', stiffness: 110, damping: 15 }}
            className="relative min-w-[85dvw] h-[85dvh] cursor-default"
          >
            <motion.div
              drag={scale > 1}
              dragElastic={0.2}
              dragConstraints={{ left: -dragConstraint, right: dragConstraint, top: -dragConstraint + 150, bottom: dragConstraint - 150 }}
              dragMomentum={false}
              onClick={(e) => {
                e.ctrlKey || e.metaKey ? (e.preventDefault(), zoom(ZOOM.step)) : e.altKey && (e.preventDefault(), zoom(-ZOOM.step))
              }}
              animate={{ x: scale === 1 ? 0 : undefined, y: scale === 1 ? 0 : undefined }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ scale }}
              className="relative size-full cursor-grab active:cursor-grabbing select-none"
            >
              <Image
                src={modal.src}
                alt="Modal Image"
                fill
                sizes="(max-width: 768px) 90vw, 80vw"
                className="-z-10 object-contain pointer-events-none select-none"
                priority
                unoptimized
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {(modal.title || modal.desc) && scale === 1 && (
              <motion.div
                key="modal-info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="right-8 bottom-16 absolute max-w-3xl text-sec p-4 pointer-events-none"
              >
                {modal.title && <h3 className="font-bold uppercase tracking-tight mb-1">{modal.title}</h3>}
                {modal.date && <p className="font-mono text-xs uppercase tracking-widest mb-2">{modal.date}</p>}
                {modal.desc && <p className="opacity-80 font-light text-sm leading-relaxed">{modal.desc}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          <CloseBtn onClick={close} />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bottom-4 left-1/2 absolute flex gap-2 bg-text/20 backdrop-blur-md rounded-full -translate-x-1/2 p-2"
          >
            {[
              { icon: <Minus size={20} />, action: () => zoom(-ZOOM.step), label: 'Zoom out', hint: 'Alt + click', side: 'right-30' },
              { icon: `${Math.round(scale * 100)}%`, action: () => setScale(1), label: 'Reset zoom', hint: 'Reset', side: null },
              { icon: <Plus size={20} />, action: () => zoom(ZOOM.step), label: 'Zoom in', hint: 'Ctrl + click', side: 'left-30' },
            ].map(({ icon, action, label, hint, side }) => (
              <button
                key={label}
                aria-label={label}
                onClick={(e) => {
                  e.stopPropagation()
                  action()
                }}
                className="group relative size-8 flex justify-center items-center rounded-full font-medium text-sm p-1 cursor-pointer"
              >
                {icon}
                <span
                  className={`absolute ${side ?? 'inset-0'} size-full flex justify-center items-center opacity-0 group-hover:opacity-100 text-xs ${side ? '-translate-y-1/2 top-1/2' : '-translate-y-10'} duration-200 pointer-events-none`}
                >
                  {hint}
                </span>
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
