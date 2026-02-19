'use client'

import { useRef, useMemo } from 'react'
import { motion } from 'motion/react'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { easings } from '@/utils/anim'
import LogosMarquee from '@/components/home-components/LogosMarquee'
import { useIsMobile } from '@/hooks/useIsMobile'

export function splitWords(text, isMobile) {
  if (!text || isMobile) return []
  return text.match(/\S+|\s+/g) || []
}

export default function TrustedUs() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const { sx, sy } = useMouseMotion({ containerRef: sectionRef })

  const text = ` .  A  Trusted   Names in   Success.     `

  const wordSegments = useMemo(() => {
    if (isMobile) return []
    let charCount = 0
    return splitWords(text, isMobile).map((word) => {
      const chars = word.split('').map((char) => ({
        char,
        index: charCount++,
      }))
      return { word, chars }
    })
  }, [text])

  return (
    <section className="relative h-150 max-md:h-90 overflow-hidden bg-text text-text md:mb-22">
      <LogosMarquee />

      <div ref={sectionRef} className="lg:right-3/5 bottom-0 max-lg:-left-4 absolute overflow-hidden rounded-full">
        <div className="size-100 max-md:size-60 overflow-hidden flex justify-center items-center bg-bg rounded-full">
          <h4 className="max-md:hidden max-w-xs overflow-hidden flex flex-wrap justify-center text-[3dvw] text-center leading-none">
            {wordSegments.map((segment, segIdx) => (
              <span key={segIdx} className="inline-block whitespace-nowrap">
                {segment.chars.map(({ char, index }) => (
                  <motion.span
                    key={index}
                    initial={{
                      x: ((index * 37) % 100) - 50,
                      y: ((index * 43) % 100) - 50,
                      rotate: ((index * 59) % 180) - 90,
                      opacity: 0,
                    }}
                    whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.02,
                      ease: easings.motion,
                    }}
                    // viewport={{ once: true }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h4>

          <h4 className="md:hidden text-3xl text-center leading-none">{text}</h4>

          <motion.div
            animate={{
              backgroundColor: ['#ff4d4d', '#4dff88', '#4dd2ff', '#ff4df2', '#ffe74d', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f0932b'],
            }}
            style={{ x: isMobile ? 0 : sx, y: isMobile ? 0 : sy }}
            transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: easings.motion }}
            className="absolute size-50 rounded-full cursor-none mix-blend-difference"
          />
        </div>
      </div>
    </section>
  )
}
