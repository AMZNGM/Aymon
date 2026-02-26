'use client'

import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

export default function ScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1, // scroll smooth
      wheelMultiplier: 0.5,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return <>{children}</>
}
