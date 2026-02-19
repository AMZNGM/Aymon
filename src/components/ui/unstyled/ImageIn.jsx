'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

export default function ImageIn({
  src = '',
  alt = 'Image',
  sizes = '(max-width: 768px) 60vw, 100vw',
  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className = '',
  divClassName = '',
  duration = 0.3,
  delay = 0,
  priority = false,
  description = '',
  date = '',
  ...props
}) {
  return (
    <motion.div
      {...props}
      initial={{ filter: 'blur(4px)' }}
      whileInView={{ filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration, delay: Number(delay) }}
      className={`relative ${divClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        data-title={alt}
        data-description={description}
        data-date={date}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-center object-cover hover:scale-105 transition-transform duration-700 ${className}`}
      />
    </motion.div>
  )
}
