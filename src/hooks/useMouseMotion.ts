'use client'

import { useEffect, useRef, RefObject } from 'react'
import { MotionValue, useMotionValue, useSpring, SpringOptions } from 'framer-motion'

export function useMouseMotion({
  containerRef,
  spring = { stiffness: 250, damping: 40 },
  relative = true,
  center = true,
  disabled = false,
}: {
  containerRef?: RefObject<HTMLElement | null>
  spring?: SpringOptions | null | false
  relative?: boolean
  center?: boolean
  disabled?: boolean
}): {
  x: MotionValue<number>
  y: MotionValue<number>
  sx: MotionValue<number>
  sy: MotionValue<number>
} {
  const rafRef = useRef<number | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, spring || { stiffness: 1000000, damping: 100 })
  const sy = useSpring(y, spring || { stiffness: 1000000, damping: 100 })

  useEffect(() => {
    if (disabled) return

    const update = (e: PointerEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      rafRef.current = requestAnimationFrame(() => {
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

    window.addEventListener('pointermove', update)

    return () => {
      window.removeEventListener('pointermove', update)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, relative, center, disabled, x, y])

  return { x, y, sx, sy }
}

// const ref = useRef<HTMLDivElement | null>(null)
// const { sx, sy } = useMouseMotion({ containerRef: ref })
// <motion.div style={{ x: sx, y: sy }} className="absolute size-30 bg-main"/>
