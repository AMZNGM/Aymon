'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

export default function ImageIn({
  src = '',
  alt = 'Image',
  sizes = '(max-width: 768px) 60vw, (max-width: 1024px) 40vw, 35vw',
  className = '',
  divClassName = '',
  duration = 0.3,
  delay = 0.3,
  priority = false,
  ...props
}) {
  return (
    <motion.div
      {...props}
      initial={{ filter: 'blur(4px)' }}
      whileInView={{ filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration, delay: Number(delay) }}
      className={`relative ${divClassName} h-full bg-bg`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-center object-cover hover:scale-105 transition-transform duration-700 ${className}`}
      />
    </motion.div>
  )
}
