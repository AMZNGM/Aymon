'use client'

import { motion, type MotionProps } from 'motion/react'

interface AnimTextProps extends MotionProps {
  children: React.ReactNode
  as?: keyof typeof motion
  className?: string
  delay?: number
  once?: boolean
}

export default function AnimText({ children, className = '', as = 'div', delay = 0, once = true, ...props }: AnimTextProps) {
  const transition = {
    duration: 0.75,
    delay: delay,
  }

  const animation: MotionProps = {
    initial: { clipPath: 'inset(100% 0% 0% 0%)' },
    whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
    transition: { ...transition },
    viewport: { once: once },
  }

  const Tag = motion[as] as React.ComponentType<MotionProps & { className?: string }>

  return (
    <Tag className={className} {...animation} {...props}>
      {children}
    </Tag>
  )
}
