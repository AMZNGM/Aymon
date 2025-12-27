'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { createSwapy } from 'swapy'
import { useIsMobile } from '@/hooks/useIsMobile'

const videos = [
  '/videos/randomVideos/LR.mp4',
  '/videos/randomVideos/feeling.mp4',
  '/videos/randomVideos/awarnessUrbnlanes.mp4',
  '/videos/randomVideos/plastine.mp4',
  '/videos/randomVideos/P2.mp4',
  '/videos/randomVideos/visualCard.mp4',
  '/videos/randomVideos/eyes.mp4',
  '/videos/randomVideos/H1.mp4',
  '/videos/randomVideos/Green.mp4',
  '/videos/randomVideos/K8.mp4',
]

export default function VideosSection() {
  const containerRef = useRef(null)
  const swapyRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    if (containerRef.current && !swapyRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        animation: 'dynamic',
      })
    }

    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy()
        swapyRef.current = null
      }
    }
  }, [isMobile])

  return (
    <div ref={containerRef} className="reltive columns-1 sm:columns-2 lg:columns-3 gap-4 py-12 pe-1 max-md:px-1">
      {videos.map((video, index) => (
        <motion.div
          key={index}
          data-swapy-slot={index}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-4 break-inside-avoid"
        >
          <motion.article data-swapy-item={index} className="w-full">
            <video
              loop
              muted
              autoPlay
              playsInline
              webkit-playsinline="true"
              controls={false}
              src={video}
              className="w-full h-auto rounded-2xl border border-bg/25 pointer-events-none"
            />
          </motion.article>
        </motion.div>
      ))}
    </div>
  )
}
