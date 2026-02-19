'use client'

import { useRef, memo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'

export default memo(function FloatingEffect({
  children,
  intensity = 2,
  perspective = 1500,
  rotationRange = 13,
  scaleOnHover = 0.95,
  className = '',
  innerClassName = '',
  ...props
}) {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 100 }
  const rotateX = useSpring(useTransform(y, [-1, 1], [rotationRange * intensity, -rotationRange * intensity]), springConfig)
  const rotateY = useSpring(useTransform(x, [-1, 1], [-rotationRange * intensity, rotationRange * intensity]), springConfig)

  const innerRotateX = useSpring(
    useTransform(y, [-1, 1], [rotationRange * intensity * -0.2, -rotationRange * intensity * -0.2]),
    springConfig
  )

  const innerRotateY = useSpring(
    useTransform(x, [-1, 1], [-rotationRange * intensity * -0.2, rotationRange * intensity * -0.2]),
    springConfig
  )

  const handleMouseMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const normalizedX = (e.clientX - centerX) / (rect.width / 2)
    const normalizedY = (e.clientY - centerY) / (rect.height / 2)

    x.set(normalizedX)
    y.set(normalizedY)
  }

  if (isMobile) return <>{children}</>

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: scaleOnHover }}
      transition={{ duration: 0.3 }}
      style={{ perspective }}
      className={`relative w-full ${className}`}
      {...props}
    >
      <motion.div style={{ rotateX, rotateY }} className="w-full h-full transform-3d">
        <motion.div style={{ rotateX: innerRotateX, rotateY: innerRotateY }} className={`transform-3d ${innerClassName}`}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
})
