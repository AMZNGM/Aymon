'use client'

import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

export default function ScrollProvider({ children }) {
  const lenisRef = useRef(null)
  const rafIdRef = useRef(null)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis
    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      if (rafIdRef.current) cancelAnimationFrame(raf)
    }
  }, [])

  return <>{children}</>
}
