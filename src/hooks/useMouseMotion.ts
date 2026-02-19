'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

type Options = {
  containerRef?: React.RefObject<HTMLElement>
  spring?: { stiffness?: number; damping?: number }
  relative?: boolean
  center?: boolean
  disabled?: boolean
}

export function useMouseMotion({
  containerRef,
  spring = { stiffness: 250, damping: 40 },
  relative = true,
  center = true,
  disabled = false,
}: Options = {}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    const target = window

    const update = (e: PointerEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current)

      raf.current = requestAnimationFrame(() => {
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
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [containerRef, relative, center, disabled])

  return { x, y, sx, sy }
}

// const ref = useRef(null)

// const { sx, sy } = useMouseMotion({
//   containerRef: ref,
// })

// <motion.div style={{ x: sx, y: sy }} className="absolute size-30 bg-main" />
