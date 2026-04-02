'use client'

import Image from 'next/image'
import { useEventListener } from 'usehooks-ts'
import { AnimatePresence, motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useVideoEmbed } from '@/hooks/useVideoEmbed'

export function VideoThumbnail({
  videoSrc,
  videoType,
  fallbackSrc,
  onClick,
}: {
  videoSrc: string
  videoType: string
  fallbackSrc?: string
  onClick: () => void
}) {
  const { getThumbnailUrl } = useVideoEmbed()
  const thumbnailUrl = getThumbnailUrl(videoSrc, videoType) || fallbackSrc || '/images/video-placeholder.webp'

  return (
    <div onClick={onClick} className="group relative w-full aspect-video overflow-hidden bg-text/10 rounded-2xl cursor-pointer">
      {/* Video thumbnail image */}
      <Image src={thumbnailUrl} alt="Video thumbnail" fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-bg/20 group-hover:bg-bg/40 transition-colors" />
      {/* Play button */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex justify-center items-center w-20 h-20 bg-bg/50 rounded-full group-hover:scale-110 transition-transform duration-400">
          <Play className="w-8 h-8 fill-text text-text ml-1" />
        </div>
      </div>
    </div>
  )
}

export default function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  videoType = 'direct',
}: {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  videoType?: 'cloudinary' | 'youtube' | 'vimeo' | 'direct'
}) {
  const { getEmbedUrl } = useVideoEmbed()
  const embedUrl = getEmbedUrl(videoSrc, videoType)

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="top-0 left-0 z-101 fixed flex justify-center items-center w-screen h-screen">
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="top-0 left-0 absolute w-full h-full bg-bg/80 backdrop-blur-lg"
          />

          {/* Video container */}
          <motion.div
            initial={{ clipPath: 'inset(43.5% 43.5% 33.5% 43.5%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
            exit={{
              clipPath: 'inset(43.5% 43.5% 33.5% 43.5%)',
              opacity: 0,
              transition: { duration: 0.8, type: 'spring', stiffness: 100, damping: 20, opacity: { duration: 0.2, delay: 0.6 } },
            }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
            className="relative w-full max-w-7xl aspect-video mx-4"
          >
            <iframe src={embedUrl} className="w-full h-full rounded-lg" allowFullScreen allow="autoplay; fullscreen" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
