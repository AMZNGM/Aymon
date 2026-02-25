'use client'

import { useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { easings } from '@/utils/anim'

export default function AnimIn({
  children,
  as = 'div',
  className = '',
  delay = 0,
  duration = 0.75,
  once = true,
  center = false,
  scale = false,
  toDown = false,
  blur = false,
  reAnim = true,
  ...props
}) {
  const Tag = motion[as]
  const shouldReduceMotion = useReducedMotion()

  const animationConfig = useMemo(() => {
    const isReduced = !!shouldReduceMotion

    return {
      transition: isReduced ? { duration: 0.3, delay } : { duration, delay, ease: easings.motion },
      variants: {
        hidden: {
          opacity: 0,
          y: isReduced || center ? 0 : toDown ? -40 : 40,
          filter: !isReduced && blur ? 'blur(10px)' : 'blur(0px)',
          scale: scale ? 1.2 : 1,
        },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
      },
    }
  }, [duration, delay, center, toDown, blur, shouldReduceMotion])

  const animationKey = typeof reAnim === 'boolean' ? undefined : JSON.stringify(reAnim)

  return (
    <AnimatePresence mode="wait">
      {reAnim && (
        <Tag
          key={animationKey}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          variants={animationConfig.variants}
          transition={animationConfig.transition}
          viewport={{ once }}
          className={`relative ${className}`}
          style={{ position: 'relative', ...props.style }}
          {...props}
        >
          {children}
        </Tag>
      )}
    </AnimatePresence>
  )
}
