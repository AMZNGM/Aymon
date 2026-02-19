'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { createSwapy } from 'swapy'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import LazyVideo from '@/components/ui/unstyled/LazyVideo'
import SwapPoints from '@/components/ui/SwapPoints'
import FloatingEffect from '@/components/ui/effect/FloatingEffect'

const videos = [
  '/videos/LR.mp4',
  '/videos/feeling2.mp4',
  '/videos/P2.mp4',
  '/videos/plastine.mp4',
  '/videos/awarnessUrbnlanes.mp4',
  '/videos/P2.mp4',
  '/videos/eyes.mp4',
  '/videos/test.mp4',
  '/videos/H1.mp4',
  '/videos/Green.mp4',
  '/videos/K8.mp4',
  '/videos/V2.mp4',
  '/videos/visualCard.mp4',
]

export function FallChar({ char, index, scrollYProgress, isMobile }) {
  if (isMobile) return
  const start = Math.abs(Math.sin((index + 1) * 31337)) * 0.25
  const end = start + 0.4
  const randomRotation = Math.sin(index * 42) * 310
  const randomX = Math.sin(index * 77) * 50

  const y = useTransform(scrollYProgress, [start, end], [0, 1000])
  const rotate = useTransform(scrollYProgress, [start, end], [0, randomRotation])
  const x = useTransform(scrollYProgress, [start, end], [0, randomX])

  return (
    <motion.span style={{ y, rotate, x }} className="inline-block origin-center will-change-transform">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

export default function VideosSection() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const swapyRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

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
    <section ref={sectionRef} className="relative min-h-[200vh] bg-text text-bg px-1 md:py-34">
      {/* <hr className="top-0 absolute w-full mt-16 max-md:mb-4" /> */}

      <div className="max-md:hidden top-0 left-0 z-10 sticky w-full h-screen flex flex-col justify-start items-center font-extrabold text-center uppercase pt-12 pointer-events-none">
        <h2 className="text-[9dvw] leading-none tracking-[-2px] whitespace-nowrap mt-4">
          {'Visual Experiments'.split('').map((char, index) => (
            <FallChar key={index} char={char} index={index} scrollYProgress={scrollYProgress} isMobile={isMobile} />
          ))}
        </h2>

        <AnimIn delay={0.3} className="max-md:text-[10px] text-sm leading-none tracking-widest mt-4">
          Explorations in motion, 3D render, and visual effects.
        </AnimIn>
      </div>

      <AnimIn ref={containerRef} className="z-20 relative gap-4 columns-1 sm:columns-2 lg:columns-3 pt-[10vh]">
        <SwapPoints />

        {videos.map((video, index) => (
          <div key={index} data-swapy-slot={index} className="break-inside-avoid mb-4 cursor-grab active:cursor-grabbing">
            <div data-swapy-item={index} className="w-full h-full">
              <FloatingEffect>
                <article className="w-full">
                  <LazyVideo
                    loop
                    muted
                    autoPlay
                    playsInline
                    webkit-playsinline="true"
                    controls={false}
                    src={video}
                    className="w-full h-auto border-4 rounded-2xl pointer-events-none"
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
