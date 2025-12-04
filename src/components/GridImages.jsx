'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { crow, metro, geo3, proof } from '@/data/media-data/media-imports'

export default function GridImages() {
  const isMobile = useIsMobile()

  const images = [
    { src: proof, width: 800, height: 1000, alt: 'Proof Image' },
    { src: metro, width: 800, height: 1000, alt: 'Metro Image' },
    { src: geo3, width: 800, height: 1000, alt: 'Pigeon Image' },
    { src: crow, width: 800, height: 800, alt: 'Crow Image' },
  ]

  return (
    <section className="relative lg:w-[75%] ms-auto sm:min-h-screen px-1">
      <div className="relative w-full grid grid-cols-2 gap-4 p-18 max-sm:p-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ y: 100 * index }}
            whileInView={{ y: isMobile ? 0 : -50 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              priority={index < 2}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover select-none rounded-2xl cursor-zoom-in"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
