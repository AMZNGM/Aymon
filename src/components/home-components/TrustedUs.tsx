'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import LogosMarquee from '@/components/home-components/LogosMarquee'

export default function TrustedUs() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { sx, sy } = useMouseMotion({ containerRef: sectionRef, center: false })

  return (
    <section className="relative h-150 max-md:h-110 2xl:h-full overflow-hidden text-text">
      <LogosMarquee />

      <div ref={sectionRef} className="top-38 max-md:top-50 max-md:-left-4 md:left-[14dvw] absolute overflow-hidden rounded-full">
        <div className="flex justify-center items-center size-[25dvw] max-md:size-60 overflow-hidden md:bg-bg rounded-full">
          <h4 className="z-10 flex flex-wrap justify-center max-2xl:max-w-xs overflow-hidden text-[3dvw] max-md:text-bg max-md:text-3xl text-center uppercase leading-none cursor-none select-none">
            &nbsp;&nbsp;&nbsp;A
            <br /> Trusted Names in Success.
          </h4>

          <motion.div
            animate={{
              backgroundColor: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f0932b'],
            }}
            style={{ x: isMobile ? 0 : sx, y: isMobile ? 0 : sy }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: [0.25, 1, 0.75, 1] }}
            className="absolute size-50 max-md:opacity-50 rounded-full -translate-1/2 cursor-none mix-blend-difference"
          />
        </div>
      </div>
    </section>
  )
}
