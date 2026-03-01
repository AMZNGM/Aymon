'use client'

import { useEffect, useRef } from 'react'
import { createSwapy } from 'swapy'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import SwapPoints from '@/components/ui/SwapPoints'
import FloatingEffect from '@/components/ui/effect/FloatingEffect'

const videos = [
  '/videos/LR_1_1.mp4',
  '/videos/edfeeling.mp4',
  '/videos/P2_1_1.mp4',
  '/videos/Plastine_1_1.mp4',
  '/videos/awarness_1.mp4',
  '/videos/K8_1_1.mp4',
  '/videos/H1_1_1.mp4',
  '/videos/V2_1_1.mp4',
  '/videos/Green_1_1.mp4',
  '/videos/cold_1.mp4',
  '/videos/Eyes_1_1.mp4',
]

export default function VideosSection() {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)
  const swapyRef = useRef(null)

  useEffect(() => {
    if (isMobile) return

    if (containerRef.current && !swapyRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        animation: 'dynamic',
      })
    }

    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy()
        swapyRef.current = null
      }
    }
  }, [isMobile])

  return (
    <section className="relative min-h-[200vh] text-bg px-1 max-md:py-12 pt-12 pb-34">
      <SwapPoints />

      <AnimIn ref={containerRef} className="z-20 relative gap-4 columns-1 sm:columns-2 lg:columns-3">
        {videos.map((video, index) => (
          <div key={index} data-swapy-slot={index} className="break-inside-avoid mb-4 cursor-grab active:cursor-grabbing">
            <div data-swapy-item={index} className="w-full h-full">
              <FloatingEffect>
                <article className="w-full">
                  <video
                    loop
                    muted
                    autoPlay
                    playsInline
                    webkit-playsinline="true"
                    controls={false}
                    src={video}
                    className="w-full h-auto rounded-2xl pointer-events-none"
                  />
                </article>
              </FloatingEffect>
            </div>
          </div>
        ))}
      </AnimIn>
    </section>
  )
}
