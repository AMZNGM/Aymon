'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useMouseMotion({
  containerRef,
  spring = { stiffness: 250, damping: 40 },
  relative = true,
  center = true,
  disabled = false,
}) {
  const ref = useRef()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    const target = window

    const update = (e) => {
      if (ref.current) cancelAnimationFrame(ref.current)

      ref.current = requestAnimationFrame(() => {
        let nx = e.clientX
        let ny = e.clientY

        if (containerRef?.current && relative) {
          const rect = containerRef.current.getBoundingClientRect()

          nx -= rect.left
          ny -= rect.top

          if (center) {
            nx -= rect.width / 2
            ny -= rect.height / 2
          }
        }

        x.set(nx)
        y.set(ny)
      })
    }

    target.addEventListener('pointermove', update)

    return () => {
      target.removeEventListener('pointermove', update)
      if (ref.current) cancelAnimationFrame(ref.current)
    }
  }, [containerRef, relative, center, disabled])

  return { x, y, sx, sy }
}

// const ref = useRef(null)

// const { sx, sy } = useMouseMotion({
//   containerRef: ref,
// })

// <motion.div style={{ x: sx, y: sy }} className="absolute size-30 bg-main" />
