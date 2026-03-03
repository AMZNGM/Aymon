'use client'

import { useMemo, forwardRef } from 'react'
import { AnimatePresence, motion, type MotionProps, useReducedMotion, type Variants } from 'motion/react'

interface AnimInProps extends MotionProps {
  children: React.ReactNode
  as?: keyof typeof motion
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  center?: boolean
  scale?: boolean
  toDown?: boolean
  blur?: boolean
  /** If `true`, the animation runs. If a non‑boolean value is passed, it becomes the React `key` (forces re‑mount). */
  reAnim?: boolean | string | number
}

const AnimIn = forwardRef<HTMLElement, AnimInProps>(
  (
    {
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
    },
    ref
  ) => {
    const Tag = motion[as] as React.ComponentType<MotionProps & { className?: string; ref?: React.Ref<HTMLElement> }>
    const shouldReduceMotion = useReducedMotion()

    const animationConfig = useMemo(() => {
      const isReduced = !!shouldReduceMotion

      return {
        transition: isReduced ? { duration: 0.3, delay } : { duration, delay },
        variants: {
          hidden: {
            opacity: 0,
            y: isReduced || center ? 0 : toDown ? -40 : 40,
            filter: !isReduced && blur ? 'blur(10px)' : 'blur(0px)',
            scale: scale ? 1.2 : 1,
          },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
        } satisfies Variants,
      }
    }, [duration, delay, center, toDown, blur, scale, shouldReduceMotion])

    const animationKey = typeof reAnim === 'boolean' ? undefined : JSON.stringify(reAnim)

    return (
      <AnimatePresence mode="wait">
        {reAnim && (
          <Tag
            key={animationKey}
            ref={ref}
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
)

AnimIn.displayName = 'AnimIn'

export default AnimIn
