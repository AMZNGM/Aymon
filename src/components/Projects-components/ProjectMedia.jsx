'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useVideoEmbed } from '@/hooks/useVideoEmbed'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimIn from '@/components/ui/unstyled/AnimIn'

function ImageCard({ src, alt, title }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5])

  return (
    <motion.div ref={ref} style={{ opacity }} className="relative aspect-video overflow-hidden bg-sec rounded-2xl">
      <ImageIn
        src={src}
        alt={alt}
        data-title={title}
        className="rounded-2xl cursor-zoom-in openInModal"
        divClassName="relative w-full h-full"
        style={{ scale }}
      />
    </motion.div>
  )
}

export default function ProjectMedia({ project }) {
  const { getEmbedUrl } = useVideoEmbed()

  const mediaItems = []

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

  if (mediaItems.length === 0 && !hasVideoLink) {
    return <section className="relative w-dvw h-[15vh]"></section>
  }

  return (
    <section className="relative w-full min-h-dvh overflow-hidden rounded-2xl px-4 max-md:px-1 py-12 md:pe-22">
      <div className="bg-sec rounded-2xl text-bg">
        <div className="space-y-4 p-6">
          {hasVideoLink && (
            <AnimIn center blur duration={0.75}>
              <h3 className="font-semibold text-lg capitalize mb-4">{project.media.video?.type}</h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full aspect-video overflow-hidden bg-text/10 rounded-lg">
                  <iframe
                    src={getEmbedUrl(project.media.video.url)}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={project.media.video.title || 'Project Video'}
                  />
                </div>
              </div>
            </AnimIn>
          )}

          {mediaItems.map((item, index) => (
            <ImageCard key={index} src={item.src} alt={item.title} title={item.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
