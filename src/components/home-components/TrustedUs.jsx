'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { easings } from '@/utils/anim'
import LogosMarquee from '@/components/home-components/LogosMarquee'

export default function TrustedUs() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const { sx, sy } = useMouseMotion({ containerRef: sectionRef })

  return (
    <section className="relative h-150 max-md:h-90 overflow-hidden bg-text text-text md:mb-22">
      <LogosMarquee />

      <div ref={sectionRef} className="lg:right-3/5 bottom-0 max-lg:-left-4 absolute overflow-hidden rounded-full">
        <div className="size-100 max-md:size-60 overflow-hidden flex justify-center items-center md:bg-bg rounded-full">
          <h4 className="z-10 max-w-xs overflow-hidden flex flex-wrap justify-center text-[3dvw] max-md:text-bg max-md:text-3xl text-center uppercase leading-none">
            &nbsp;&nbsp;&nbsp;A
            <br /> Trusted Names in Success.
          </h4>

          <motion.div
            animate={{
              backgroundColor: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f0932b'],
            }}
            style={{ x: isMobile ? 0 : sx, y: isMobile ? 0 : sy }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: easings.motion }}
            className="absolute size-50 max-md:opacity-50 rounded-full cursor-none mix-blend-difference"
          />
        </div>
      </div>
    </section>
  )
}
