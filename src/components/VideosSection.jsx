'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useTextClipPath from '@/hooks/useTextClipPath'

const videoData = [
  {
    src: '/videos/randomVideos/eyes.mp4',
    alt: 'video 1',
    title: 'Eyes',
    description: 'Visual exploration of human perception',
  },
  {
    src: '/videos/randomVideos/feeling.mp4',
    alt: 'video 2',
    title: 'Feeling',
    description: 'Emotional journey through motion',
  },
  {
    src: '/videos/randomVideos/visualCard.mp4',
    alt: 'video 3',
    title: 'Visual Card',
    description: 'Interactive design showcase',
  },
  {
    src: '/videos/randomVideos/awarnessUrbnlanes.mp4',
    alt: 'video 4',
    title: 'Urban Awareness',
    description: 'City life and movement',
  },
]

export default function VideosSection() {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Call all hooks at the top level before any early returns
  const heading1Props = useTextClipPath(0, true)
  const heading2Props = useTextClipPath(0.1, true)
  const heading3Props = useTextClipPath(0.2, true)

  useEffect(() => {
    const loadVideos = async () => {
      try {
        // Simulate async loading (in production, this could be from API)
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Validate video sources
        const validVideos = await Promise.all(
          videoData.map(async (video) => {
            try {
              const response = await fetch(video.src, { method: 'HEAD' })
              if (response.ok) {
                return video
              }
              return null
            } catch (e) {
              console.warn(`Video not found: ${video.src}`)
              return null
            }
          })
        )

        const filteredVideos = validVideos.filter(Boolean)
        setVideos(filteredVideos)
      } catch (err) {
        setError('Failed to load videos')
        console.error('Video loading error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadVideos()
  }, [])

  if (isLoading) {
    return (
      <section className="relative w-full h-full py-12 px-1">
        <div className="xl:sticky inset-0 max-w-xl text-8xl max-2xl:text-7xl max-xl:text-7xl font-extrabold tracking-[-2px] uppercase">
          <motion.h6 {...heading1Props}>~Loading...</motion.h6>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse bg-bg/20 rounded-2xl w-120 h-64"></div>
        </div>
      </section>
    )
  }

  if (error || videos.length === 0) {
    return (
      <section className="relative w-full h-full py-12 px-1">
        <div className="xl:sticky inset-0 max-w-xl text-8xl max-2xl:text-7xl max-xl:text-7xl font-extrabold tracking-[-2px] uppercase">
          <motion.h6 {...heading1Props}>~Coming Soon!</motion.h6>
        </div>
        <div className="flex justify-center items-center h-64">
          <p className="text-text/60">Videos will be available soon</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-full py-12 px-1">
      <div className="xl:sticky inset-0 max-w-xl text-8xl max-2xl:text-7xl max-xl:text-7xl font-extrabold tracking-[-2px] uppercase">
        <motion.h6 {...heading1Props}>~See &</motion.h6>
        <motion.h6 {...heading2Props}>~Feel &</motion.h6>
        <motion.h6 {...heading3Props}>~BeAware!</motion.h6>
      </div>

      {videos.map((vid, index) => (
        <motion.div
          key={vid.src}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="sticky top-0 right-0 flex flex-col items-end"
        >
          <div className="relative">
            <video
              loop
              muted
              autoPlay
              src={vid.src}
              className="object-cover w-120 rounded-2xl"
              onError={(e) => {
                console.error(`Video failed to load: ${vid.src}`)
                e.target.style.display = 'none'
              }}
            />
            <div className="absolute bottom-0 right-0 p-2 text-text/75 text-sm">
              <p className="font-medium">{vid.title}</p>
              <p className="text-xs opacity-75">{vid.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  )
}
