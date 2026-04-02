'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import VideoModal, { VideoThumbnail } from '@/components/shared/VideoModal'
import type { Project } from '@/types/project.types'

declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } }
  }
}

export default function ProjectMedia({ project }: { project: Project }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const mediaItems: { type: string; src: string; title: string }[] = []

  if (project.media?.gifs && project.media.gifs.length > 0) {
    project.media.gifs.forEach((gifSrc) => {
      mediaItems.push({
        type: 'gif',
        src: gifSrc,
        title: project.title + ' GIF',
      })
    })
  }

  if (project.media?.gallery?.length > 1) {
    project.media.gallery.forEach((imageSrc) => {
      mediaItems.push({
        type: 'image',
        src: imageSrc,
        title: project.title,
      })
    })
  }

  const videoType = (project.media?.video?.type || 'direct') as 'youtube' | 'vimeo' | 'cloudinary' | 'direct'
  const hasVideoLink = project.media?.video?.url && ['youtube', 'vimeo', 'cloudinary'].includes(videoType)

  const reels = useMemo(() => project.media?.reels || [], [project.media?.reels])
  const hasReels = reels.length > 0

  useEffect(() => {
    if (!hasReels) return

    const scriptId = 'instagram-embed-script'

    const processEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }

    if (document.getElementById(scriptId)) {
      processEmbeds()
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = processEmbeds
    document.body.appendChild(script)
  }, [hasReels, reels])

  if (mediaItems.length === 0 && !hasVideoLink && !hasReels) {
    return <section className="relative w-dvw h-[15vh]"></section>
  }

  return (
    <section className="relative w-full rounded-2xl px-4 max-md:px-1 py-12 md:pe-18">
      <div className="bg-sec rounded-2xl text-bg pb-12">
        <div className="space-y-4 max-w-7xl overflow-hidden mx-auto mb-4 pt-8">
          {/* videos */}
          {hasVideoLink && (
            <AnimIn center blur duration={0.75} className="w-full max-w-4xl mx-auto">
              <h3 className="font-semibold text-lg capitalize mb-4">{project.media.video?.type}</h3>
              <div className="flex flex-col items-center space-y-4">
                <VideoThumbnail
                  videoSrc={project.media?.video?.url || ''}
                  videoType={videoType}
                  fallbackSrc={project.media?.video?.thumbnail || project.media?.primary || project.media?.gallery?.[0]}
                  onClick={() => setIsVideoModalOpen(true)}
                />
              </div>
            </AnimIn>
          )}

          {/* reels */}
          {hasReels && (
            <div
              className={`pt-8 grid gap-6 w-full h-full ${reels.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
            >
              {reels.map((reel, index) => {
                const cleanUrl = reel.split('?')[0].replace(/\/$/, '') + '/'
                return (
                  <AnimIn key={`reel-${index}`} center blur duration={0.75} className="bg-bg/20 rounded-md p-2">
                    <div className="flex justify-center">
                      <blockquote
                        data-instgrm-permalink={cleanUrl}
                        data-instgrm-version="14"
                        // data-instgrm-captioned
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: 'none',
                          margin: '0',
                          maxWidth: '540px',
                          minWidth: '326px',
                          width: '100%',
                        }}
                        className="instagram-media"
                      />
                    </div>
                  </AnimIn>
                )
              })}
            </div>
          )}
        </div>

        {/* images */}
        {mediaItems.map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={project.media?.video?.url || ''}
        videoType={videoType}
      />
    </section>
  )
}

function MediaItem({ item }: { item: { type: string; src: string; title: string } }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <motion.div className="relative w-full max-w-4xl mx-auto mt-2">
      {(item.type === 'image' || item.type === 'gif') && (
        <div className="relative">
          <Image
            src={item.src}
            alt={item.title}
            width={2000}
            height={2000}
            sizes="100vw"
            loading="eager"
            unoptimized={item.type === 'gif'}
            onLoad={() => setIsLoading(false)}
            className={`block w-full h-auto rounded-2xl cursor-zoom-in openInModal transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          />

          {isLoading && <div className="absolute inset-0 bg-bg/25 rounded-2xl animate-pulse" />}
        </div>
      )}
    </motion.div>
  )
}
