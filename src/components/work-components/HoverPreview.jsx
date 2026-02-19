'use client'

import { useEffect } from 'react'
import { motion, useTransform, useMotionValue, AnimatePresence } from 'motion/react'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function HoverPreview({ project, hoveredRect, sectionRef, sx, sy }) {
  if (!project) return null

  const sectionRect = sectionRef.current?.getBoundingClientRect() || { left: 0, top: 0 }
  const media = project.media || {}
  const hasGallery = media.gallery && Array.from(media.gallery).length > 0
  const cardCenterX = useMotionValue(0)
  const cardCenterY = useMotionValue(0)

  useEffect(() => {
    if (hoveredRect) {
      cardCenterX.set(hoveredRect.left + hoveredRect.width / 2)
      cardCenterY.set(hoveredRect.top + hoveredRect.height / 2)
    }
  }, [hoveredRect, cardCenterX, cardCenterY])

  return (
    <motion.div
      layoutId="hover-preview-container"
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        left: (hoveredRect?.left || 0) - sectionRect.left,
        top: (hoveredRect?.top || 0) - sectionRect.top,
        width: hoveredRect?.width,
        height: hoveredRect?.height,
      }}
      exit={{ scaleY: 0, rotate: -26, opacity: 0 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 30, opacity: { delay: 0.1 } }}
      className="z-50 absolute overflow-hidden rounded-2xl pointer-events-none"
    >
      <motion.div
        style={{
          x: useTransform([sx, cardCenterX], ([x, cx]) => (x - cx) / 10),
          y: useTransform([sy, cardCenterY], ([y, cy]) => (y - cy) / 10),
        }}
        className="top-1/2 left-1/2 absolute w-full h-full scale-50 -translate-x-1/2 -translate-y-1/2"
      >
        <AnimatePresence mode="popLayout" custom={project.id}>
          {hasGallery && (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(5px)' }}
              transition={{ duration: 0.3 }}
              className={`w-full h-full gap-2 grid p-2 ${media.gallery.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
              {media.gallery.slice(0, 4).map((img, i) => (
                <div key={i} className="relative w-full h-full overflow-hidden bg-bg shadow-2xl border-4 rounded-lg">
                  <ImageIn src={img} alt={project.title} divClassName="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
