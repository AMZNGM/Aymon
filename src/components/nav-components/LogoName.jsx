'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { easings } from '@/utils/anim'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function LogoName() {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (!containerRef.current || window.innerWidth < 768) return

      const letters = gsap.utils.toArray('.logo-letter')
      const subtitle = gsap.utils.toArray('.subtitle')

      const cols = 15
      const rows = 2
      const cellW = window.innerWidth / cols
      const startY = window.innerHeight * 0.7
      const cellH = (window.innerHeight - startY) / rows

      const tl = gsap.timeline({
        scrollTrigger: {
          // trigger: 'body',
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      })

      letters.forEach((letter, index) => {
        const col = index % cols
        const row = Math.floor(index / cols)

        tl.fromTo(
          letter,
          {
            x: 0,
            y: 0,
            rotation: 0,
          },
          {
            x: (col * cellW + cellW / 2 - window.innerWidth / 3) * 0.1,
            y: startY + row * cellH + cellH / 2 - 50,
            rotation: gsap.utils.random(-45, 45),
            ease: easings.gsap,
            delay: -0.1,
          },
          0
        )
      })

      tl.to(
        subtitle,
        {
          opacity: 1,
          ease: easings.gsap,
        },
        0
      )

      tl.to(
        '.visual-artist',
        {
          letterSpacing: '7px',
          ease: easings.gsap,
          duration: 2,
        },
        0
      )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      <AnimIn
        center
        blur
        duration={2}
        className="group relative font-black text-[4.3dvw] max-lg:text-6xl text-center uppercase max-lg:leading-12 pointer-events-none"
      >
        <motion.span
          animate={{ opacity: isMobile ? [1, 0] : 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="flex flex-col items-center -space-y-3 group-hover:opacity-0! text-nowrap leading-none transition-opacity duration-400"
        >
          <div>
            {'Ahmed'.split('').map((letter, index) => (
              <span key={index} className="inline-block logo-letter">
                {letter}
              </span>
            ))}
          </div>

          <div>
            {'Aymen'.split('').map((letter, index) => (
              <span key={index} className="inline-block logo-letter">
                {letter}
              </span>
            ))}
          </div>
        </motion.span>

        <motion.span
          animate={{
            opacity: isMobile ? [0, 1] : 1,
            color: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'],
          }}
          transition={{ duration: isMobile ? 3 : 5, repeat: Infinity, repeatType: 'reverse', ease: easings.motion }}
        >
          <Link
            href="/"
            className="absolute inset-0 flex justify-center items-center lg:opacity-0 group-hover:opacity-100! transition-opacity duration-400 pointer-events-auto subtitle"
          >
            Aymon
          </Link>
        </motion.span>
      </AnimIn>

      <AnimIn
        center
        blur
        duration={1.5}
        className="block font-sec text-bg/50 max-sm:text-bg/25 max-lg:text-2xl text-3xl text-nowrap visual-artist"
      >
        Visual Artist
      </AnimIn>
    </div>
  )
}
