'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useVideoEmbed } from '@/hooks/useVideoEmbed'

export default function ProjectMedia({ project }) {
  const { getEmbedUrl } = useVideoEmbed()

  const mediaItems = []

  if (project.media?.gallery?.length > 1) {
    project.media.gallery.forEach((imageSrc, index) => {
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
    return <section className="relative w-screen h-[15vh]"></section>
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden rounded-2xl px-4 max-md:px-1 py-12">
      <div className="bg-bg/10 rounded-2xl text-bg">
        <div className="max-w-7xl mx-auto p-6">
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="font-bold text-lg mb-4"
            >
              See more about: {project.title}
            </motion.h3>

            {hasVideoLink && (
              <motion.div
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, delay: 0.5 }}
                viewport={{ once: true }}
              >
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
                  <p className="text-text/40 text-sm break-all">{project.media.video.url}</p>
                </div>
              </motion.div>
            )}

            {mediaItems.map((item, index) => (
              <div key={index}>
                {item.type === 'image' && (
                  <motion.div
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.75, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="relative aspect-video overflow-hidden bg-text/10 rounded-2xl"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-contain rounded-2xl cursor-zoom-in"
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
