'use client'

import Image, { ImageProps } from 'next/image'
import { motion, MotionProps } from 'motion/react'

interface ImageInProps extends MotionProps {
  src?: ImageProps['src']
  alt: string
  sizes?: ImageProps['sizes']
  className?: string
  divClassName?: string
  duration?: number
  delay?: number
  priority?: ImageProps['priority']
  loading?: ImageProps['loading']
  description?: string
  date?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function ImageIn({
  src = '',
  alt = 'Image',
  sizes = '(max-width: 768px) 60vw, 100vw',
  className = '',
  divClassName = '',
  duration = 0.3,
  delay = 0,
  priority = false,
  loading = 'lazy',
  description = '',
  date = '',
  onMouseEnter,
  onMouseLeave,
  ...props
}: ImageInProps) {
  return (
    <motion.div
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
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
        loading={loading}
        sizes={sizes}
        className={`object-center object-cover hover:scale-105 transition-transform duration-700 ${className}`}
      />
    </motion.div>
  )
}
