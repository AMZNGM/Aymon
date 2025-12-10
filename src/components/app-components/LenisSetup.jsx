'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null
let rafId = null

export function stopLenis() {
  if (lenisInstance) {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    lenisInstance.destroy()
    lenisInstance = null
  }
}

export function startLenis() {
  if (lenisInstance) {
    lenisInstance.start()
  } else {
    lenisInstance = new Lenis()
    function raf(time) {
      lenisInstance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  }
}

export default function LenisSetup() {
  useEffect(() => {
    lenisInstance = new Lenis()
    function raf(time) {
      lenisInstance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      lenisInstance.destroy()
      lenisInstance = null
    }
  }, [])
}
