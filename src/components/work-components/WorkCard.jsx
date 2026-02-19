'use client'

import Lenis from 'lenis'
import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export default function WorkCard({
  id,
  Component,
  className = '',
  initialX = '-40%',
  initialY = '20%',
  isZoomed = false,
  onZoom = () => {},
  zIndex = 10,
  onInteraction = () => {},
}) {
  const scrollContainerRef = useRef(null)
  const lenisRef = useRef(null)

  const toggleZoom = (e) => {
    if (!isZoomed) {
      onZoom(id)
      e.stopPropagation()
    } else {
      onZoom(null)
    }
  }

  useKeyboardShortcuts({
    onEscape: (e) => {
      if (!isZoomed) {
        onZoom(null)
      }
    },
  })

  useEffect(() => {
    if (isZoomed && scrollContainerRef.current) {
      const lenis = new Lenis({
        wrapper: scrollContainerRef.current,
        content: scrollContainerRef.current.firstElementChild,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        duration: 0.9,
      })

      lenisRef.current = lenis

      const raf = (time) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      const rafId = requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
        cancelAnimationFrame(rafId)
      }
    }
  }, [isZoomed])

  return (
    <section
      style={{ zIndex }}
      className={`group fixed inset-0 overflow-hidden pointer-events-none cursor-grab active:cursor-grab ${className}`}
    >
      <motion.div
        onPointerDown={() => onInteraction(id)}
        drag={!isZoomed}
        dragMomentum={false}
        dragConstraints={{ left: -1200, right: 1200, top: -1200, bottom: 1200 }}
        dragElastic={0.1}
        whileDrag={{ cursor: 'grabbing', scale: 0.52 }}
        onDoubleClick={toggleZoom}
        initial={{ x: initialX, y: initialY, scale: 0.5 }}
        animate={{
          x: isZoomed ? '5%' : initialX,
          y: isZoomed ? '5%' : initialY,
          scale: isZoomed ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="absolute w-full h-full overflow-hidden shadow-2xl border border-bg/10 rounded-3xl origin-top-left pointer-events-auto"
      >
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className={`w-full h-full overflow-y-auto overflow-x-hidden bg-text overscroll-contain ${isZoomed ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <Component hasButton={false} scrollContainer={scrollContainerRef} />
        </div>
      </motion.div>

      <div className="max-md:hidden right-0 bottom-0 fixed flex flex-col justify-center items-end opacity-0 group-hover:opacity-30 text-sm text-end transition-opacity duration-300 p-2">
        <span>Drag To Move</span>
        <span>Double Click To Zoom</span>
      </div>
    </section>
  )
}
