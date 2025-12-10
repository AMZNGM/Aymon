'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export function stopLenis() {
  if (lenisInstance) {
    lenisInstance.stop()
  }
}

export function startLenis() {
  if (lenisInstance) {
    lenisInstance.start()
  }
}

export default function LenisSetup() {
  useEffect(() => {
    lenisInstance = new Lenis()
    function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
      lenisInstance.destroy()
      lenisInstance = null
    }
  }, [])
}
