'use client'

import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

export default function ScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1, // smoothness (0.05 = very smooth)
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
