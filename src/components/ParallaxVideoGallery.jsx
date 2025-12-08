'use client'

import { useEffect, useRef } from 'react'
import BioText from '@/components/ui/BioText'

export default function ParallaxVideoGallery() {
  const canvasRef = useRef(null)
  const headerRef = useRef(null)
  const controllerRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let mounted = true

    const startWhenReady = () => {
      import('@/components/ui/webgl.parallax.js').then(({ startParallaxGallery }) => {
        if (!mounted) return
        controllerRef.current = startParallaxGallery({
          canvas: canvasRef.current,
          headerEl: headerRef.current,
        })
      })
    }

    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(startWhenReady, { timeout: 1500 })
      } else {
        setTimeout(startWhenReady, 800)
      }
    } else {
      window.addEventListener('load', startWhenReady, { once: true })
    }

    const onVis = () => {
      if (controllerRef.current?.setVisible) {
        controllerRef.current.setVisible(!document.hidden)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      mounted = false
      document.removeEventListener('visibilitychange', onVis)
      if (controllerRef.current?.dispose) {
        controllerRef.current.dispose()
      }
    }
  }, [])

  return (
    <section className="relative w-screen h-[400vh] overflow-hidden text-text">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none"></canvas>

      <div ref={headerRef} className="h-full absolute top-0 left-1/2 -translate-x-1/2 transform-3d text-center z-50">
        <BioText />
      </div>
    </section>
  )
}
