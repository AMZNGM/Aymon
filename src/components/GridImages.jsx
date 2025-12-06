'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import proof from '../../public/images/randomImgs/proof.webp'
import metro from '../../public/images/randomImgs/metro.webp'
import geo3 from '../../public/images/selectedImgs/geo/geo3.webp'
import crow from '../../public/images/randomImgs/crow.webp'

const images = [
  { src: proof, alt: 'Proof Image' },
  { src: metro, alt: 'Metro Image' },
  { src: geo3, alt: 'Geo Image' },
  { src: crow, alt: 'Crow Image' },
]

export default function GridImages() {
  return (
    <section className="relative lg:w-[75%] ms-auto px-1">
      <div className="relative w-full grid grid-cols-2 gap-4 px-18 max-sm:p-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ y: 100, filter: 'blur(10px)' }}
            whileInView={{ y: 0, filter: 'blur(0px)' }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.8, delay: index * 0.12, filter: { duration: 0.5 } }}
            viewport={{ once: true, amount: 0.3 }}
            className="will-change-transform transform-gpu"
          >
            <Image
              src={image.src}
              alt={image.alt}
              priority={index === 0}
              fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover select-none rounded-2xl cursor-zoom-in"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
