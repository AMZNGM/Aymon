'use client'

import { motion } from 'motion/react'
import { useVideoEmbed } from '@/hooks/useVideoEmbed'
import ImageIn from '@/components/ui/unstyled/ImageIn'

// A reusable masonry-style grid for displaying a mix of images and video embeds.

export default function MediaGrid({ items, columns = 3 }) {
  const { getEmbedUrl } = useVideoEmbed()

  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="opacity-50 text-xl">No media found.</p>
      </div>
    )
  }

  return (
    <div className={`gap-4 space-y-4 columns-1 md:columns-2 lg:columns-${columns}`}>
      {items.map((item, index) => {
        const rotation = ((index % 3) - 1) * 1.5

        return (
          <motion.div
            key={`${item.slug}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 10) * 0.05 }}
            style={{ rotate: `${rotation}deg` }}
            className="break-inside-avoid"
          >
            {item.type === 'video' ? (
              <div className="relative w-full aspect-video overflow-hidden bg-text/5 rounded-2xl mb-4">
                <iframe
                  src={getEmbedUrl(item.url)}
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              </div>
            ) : (
              <ImageIn
                src={item.src}
                alt={item.title}
                description={item.description}
                date={item.date}
                className="object-contain! cursor-pointer openInModal"
                divClassName="aspect-square"
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
