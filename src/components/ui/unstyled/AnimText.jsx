'use client'

import { motion } from 'motion/react'
import { easings } from '@/utils/anim'

export default function AnimText({ children, className = '', as = 'div', delay = 0, once = true, ...props }) {
  const transition = {
    duration: 0.75,
    ease: easings.motion,
    delay: delay,
  }

  const animation = {
    initial: { clipPath: 'inset(100% 0% 0% 0%)' },
    whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
    transition: { ...transition },
    viewport: { once: once },
  }

  const Tag = motion[as]

  return (
    <Tag className={className} {...animation} {...props}>
      {children}
    </Tag>
  )
}
