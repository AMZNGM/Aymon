'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion/react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getAboutContent } from '@/lib/getAbout'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import type { AboutContent } from '@/types/admin.types'

const IMAGES = [
  '/images/2dModal/20.png',
  '/images/2dModal/21.png',
  '/images/2dModal/22.png',
  '/images/2dModal/23.png',
  '/images/2dModal/24.png',
  '/images/2dModal/25.png',
  '/images/2dModal/26.png',
  '/images/2dModal/27.png',
]

const HIGHLIGHT_KEYWORDS = new Set([
  'Ahmed Ayman',
  'Aymon',
  'filmmaking',
  'the age of nine',
  'photography',
  'graphic design',
  '3D design',
  'music industry',
  'advertising companies',
])

const HIGHLIGHT_REGEX = new RegExp(`(${[...HIGHLIGHT_KEYWORDS].join('|')})`, 'g')

function ScrollChar({
  char,
  index,
  total,
  scrollYProgress,
  progressRange,
}: {
  char: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  progressRange: [number, number]
}) {
  const animStart = progressRange[0] + (index / total) * (progressRange[1] - progressRange[0])
  const animEnd = progressRange[0] + ((index + 1) / total) * (progressRange[1] - progressRange[0])
  const opacity = useTransform(scrollYProgress, [animStart, animEnd], [0.5, 1])

  return <motion.span style={{ opacity }}>{char}</motion.span>
}

function BioText({
  text,
  className,
  scrollYProgress,
  progressRange,
}: {
  text: string
  className?: string
  scrollYProgress: MotionValue<number>
  progressRange: [number, number]
}) {
  const parts = text.split(HIGHLIGHT_REGEX)

  // flatten all chars with their bold info
  const chars: { char: string; bold: boolean }[] = []
  for (const part of parts) {
    const isBold = HIGHLIGHT_KEYWORDS.has(part)
    for (const c of part) chars.push({ char: c, bold: isBold })
  }

  // group consecutive chars by bold flag for wrapping
  const groups: { bold: boolean; startIdx: number; chars: string[] }[] = []
  for (let i = 0; i < chars.length; i++) {
    const last = groups[groups.length - 1]
    if (last && last.bold === chars[i].bold) {
      last.chars.push(chars[i].char)
    } else {
      groups.push({ bold: chars[i].bold, startIdx: i, chars: [chars[i].char] })
    }
  }

  const total = chars.length

  return (
    <p className={className}>
      {groups.map((group, gi) => {
        const inner = group.chars.map((c, ci) => (
          <ScrollChar
            key={group.startIdx + ci}
            char={c}
            index={group.startIdx + ci}
            total={total}
            scrollYProgress={scrollYProgress}
            progressRange={progressRange}
          />
        ))

        return group.bold ? (
          <strong key={gi} className="font-bold">
            {inner}
          </strong>
        ) : (
          <span key={gi}>{inner}</span>
        )
      })}
    </p>
  )
}

function ScrollBio({
  bio1,
  bio2,
  bio3,
  scrollYProgress,
}: {
  bio1: string
  bio2: string
  bio3: string
  scrollYProgress: MotionValue<number>
}) {
  const len1 = bio1.length
  const len2 = bio2.length
  const len3 = bio3.length
  const totalLength = Math.max(1, len1 + len2 + len3)

  const end1 = len1 / totalLength
  const end2 = (len1 + len2) / totalLength

  return (
    <AnimIn center blur delay={0.2} className="relative flex flex-col flex-1 md:justify-evenly gap-10 md:gap-18 h-full md:pe-4">
      <BioText
        text={bio1}
        scrollYProgress={scrollYProgress}
        progressRange={[0, end1]}
        className="font-medium md:text-2xl leading-relaxed max-md:leading-loose"
      />
      <BioText
        text={bio2}
        scrollYProgress={scrollYProgress}
        progressRange={[end1, end2]}
        className="font-medium md:text-2xl leading-relaxed max-md:leading-loose"
      />
      <BioText
        text={bio3}
        scrollYProgress={scrollYProgress}
        progressRange={[end2, 1]}
        className="font-medium md:text-2xl leading-relaxed max-md:leading-loose"
      />
    </AnimIn>
  )
}

export default function AboutContent() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const progressMV = useMotionValue(0)

  // Auto-cycle images
  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length)
    }, 500)
    return () => clearInterval(interval)
  }, [isMobile])

  // scroll-driven image animation on desktop
  useEffect(() => {
    if (!sectionRef.current || loading) return

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${IMAGES.length * 20}%`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress
              const newIndex = Math.floor(progress * IMAGES.length)
              const clampedIndex = Math.min(IMAGES.length - 1, newIndex)
              setCurrentImage(clampedIndex)
              progressMV.set(progress)
            },
          })
        },
        '(max-width: 767px)': () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
            onUpdate: (self) => {
              progressMV.set(self.progress)
            },
          })
        },
      })
    })

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [loading, progressMV])

  // fetching
  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getAboutContent()
        setAboutContent(content)
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (loading || !aboutContent) {
    return <LoadingOverlay />
  }

  return (
    <section ref={sectionRef} className="relative flex justify-between gap-4 w-dvw min-h-dvh uppercase px-4 md:pe-18">
      {/* Left Side */}
      <div className="flex flex-col justify-between gap-12 mt-18">
        <div className="flex items-center">
          <AnimText as="h2" delay={0.3} className="font-extrabold text-[7.2dvw] leading-[7dvw]">
            {aboutContent.title}
          </AnimText>

          <div className="w-8 md:w-22 h-px md:h-1 bg-bg ms-12" />
        </div>

        <div className="flex justify-between items-start">
          <AnimText as="h2" delay={0.3} className="opacity-60 font-bold md:text-2xl tracking-tighter">
            Biography
          </AnimText>

          <span className="md:hidden opacity-60 font-bold leading-tight tracking-tighter">
            est 2003 <br /> Known as - {aboutContent.nickname}
          </span>
        </div>

        <div className="md:hidden relative w-full aspect-4/5">
          <Image src={IMAGES[currentImage]} alt={`About image ${currentImage + 1}`} priority fill className="object-center object-cover" />
        </div>

        <p className="md:hidden opacity-60 font-bold text-center tracking-tighter">
          [{aboutContent.position || 'Multidisciplinary Visual Artist'}]
        </p>

        <ScrollBio
          bio1={aboutContent.bio1 || ''}
          bio2={aboutContent.bio2 || ''}
          bio3={aboutContent.bio3 || ''}
          scrollYProgress={progressMV}
        />

        <AnimIn as="p" center blur delay={0.3} className="flex max-md:justify-center gap-6 opacity-60! font-sec text-xl mb-12">
          <span>I Shut My</span>
          <span className="relative">
            **
            <span className="top-1.5 left-1/2 absolute rotate-90 -translate-x-1/2">)</span>
          </span>
          <span>eyes to See</span>
        </AnimIn>
      </div>

      {/* Right Side */}
      <div className="max-md:hidden flex flex-col w-full p-8">
        <span className="opacity-60 font-bold text-2xl leading-tight tracking-tighter">
          est 2003 <br /> Known as - {aboutContent.nickname}
        </span>

        <div className="relative w-full min-h-0 aspect-4/5 grow">
          {IMAGES.map((src, index) => (
            <motion.div
              key={src}
              initial={false}
              animate={{ opacity: currentImage === index ? 1 : 0 }}
              transition={{ duration: 0, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image src={src} alt={`About image ${index + 1}`} priority={index === 0} fill className="object-center object-contain" />
            </motion.div>
          ))}
        </div>

        <p className="opacity-60 font-bold text-[1.4dvw] text-nowrap tracking-tighter">
          [{aboutContent.position || 'Multidisciplinary Visual Artist'}]
        </p>
      </div>
    </section>
  )
}
