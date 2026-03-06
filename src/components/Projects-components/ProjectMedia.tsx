'use client'

import { useVideoEmbed } from '@/hooks/useVideoEmbed'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import type { Project } from '@/types/project.types'

declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } }
  }
}

export default function ProjectMedia({ project }: { project: Project }) {
  const { getEmbedUrl } = useVideoEmbed()
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

  const hasVideoLink =
    (project.media?.video?.url && project.media.video.type === 'youtube') ||
    (project.media?.video?.url && project.media.video.type === 'vimeo')

  const reels = project.media?.reels || []
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
    <section className="relative w-full overflow-hidden rounded-2xl px-4 max-md:px-1 py-12 md:pe-18">
      <div className="bg-sec rounded-2xl text-bg">
        <div className="space-y-4 max-w-7xl overflow-hidden mx-auto p-6">
          {hasVideoLink && (
            <AnimIn center blur duration={0.75}>
              <h3 className="font-semibold text-lg capitalize mb-4">{project.media.video?.type}</h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full aspect-video overflow-hidden bg-text/10 rounded-lg">
                  <iframe
                    allowFullScreen
                    src={getEmbedUrl(project.media.video.url)}
                    title={project.media.video.title || 'Project Video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </AnimIn>
          )}

          {hasReels && (
            <div
              className={`pt-8 grid gap-6 w-full h-full ${reels.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}
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

          {mediaItems.map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MediaItem({ item }: { item: { type: string; src: string; title: string } }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])

  return (
    <motion.div ref={ref} style={{ scale }} className="relative">
      {(item.type === 'image' || item.type === 'gif') && (
        <ImageIn
          src={item.src}
          alt={item.title}
          unoptimized={item.type === 'gif'}
          className="object-contain! rounded-2xl scale-100! cursor-zoom-in openInModal"
          divClassName="relative w-full h-[80vh] overflow-hidden bg-text/10 rounded-2xl bg-transparent!"
        />
      )}
    </motion.div>
  )
}
