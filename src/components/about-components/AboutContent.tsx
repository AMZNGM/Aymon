'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '@/utils/gsapConfig'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAboutContent } from '@/lib/getAbout'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import type { AboutContent } from '@/types/admin.types'

const IMAGES = [
  '/images/2dModal/11.png',
  '/images/2dModal/12.png',
  '/images/2dModal/13.png',
  '/images/2dModal/14.png',
  '/images/2dModal/20.png',
  '/images/2dModal/21.png',
  '/images/2dModal/22.png',
  '/images/2dModal/23.png',
  '/images/2dModal/24.png',
  '/images/2dModal/25.png',
  '/images/2dModal/26.png',
  '/images/2dModal/27.png',
]

const RANDOM_IMAGES = [
  '/images/hero-Images/Asfour.webp',
  '/images/hero-Images/caligula.webp',
  '/images/hero-Images/Crow2.webp',
  '/images/hero-Images/Folk.webp',
  '/images/hero-Images/Forcing.webp',
  '/images/hero-Images/Inside.webp',
  '/images/hero-Images/Metro.webp',
  '/images/hero-Images/Working24.webp',
  '/images/hero-Images/Perspective.webp',
  '/images/hero-Images/Pigeon.webp',
  '/images/hero-Images/Proof.webp',
]

function BioText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(
    /(Ahmed Ayman|Aymon|filmmaking|the age of nine|photography|graphic design|3D design|music industry|advertising companies)/g
  )
  return (
    <p className={className}>
      {parts.map((part, i) =>
        part === 'Ahmed Ayman' ||
        part === 'Aymon' ||
        part === 'filmmaking' ||
        part === 'the age of nine' ||
        part === 'photography' ||
        part === 'graphic design' ||
        part === '3D design' ||
        part === 'music industry' ||
        part === 'advertising companies' ? (
          <strong key={i} className="font-bold">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  )
}

export default function AboutContent() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHoveringBio, setIsHoveringBio] = useState(false)
  const [randomImageIndex, setRandomImageIndex] = useState(0)

  useEffect(() => {
    if (!sectionRef.current || loading) return

    const ctx = gsap.context(() => {
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
        },
      })
    })

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [loading])

  const handleBioMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    setMousePos({ x: e.clientX, y: e.clientY })
    const percentage = y / rect.height
    const newIndex = Math.floor(percentage * RANDOM_IMAGES.length)
    setRandomImageIndex(Math.max(0, Math.min(RANDOM_IMAGES.length - 1, newIndex)))
  }

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
    <section
      ref={sectionRef}
      className="relative flex justify-between gap-4 w-dvw min-h-dvh uppercase px-4 max-md:px-1 md:pe-18 max-md:pt-18"
    >
      {/* Left Side */}
      <div className="z-10 flex flex-col justify-between gap-12 max-md:text-text md:p-8 max-md:mix-blend-difference">
        <AnimText as="h2" delay={0.3} className="font-extrabold text-[7.2dvw] leading-[7dvw]">
          {aboutContent.title}
        </AnimText>

        <AnimText as="h2" delay={0.3} className="opacity-60 font-bold text-2xl tracking-tighter">
          Biography
        </AnimText>

        <div
          onMouseMove={handleBioMouseMove}
          onMouseEnter={() => setIsHoveringBio(true)}
          onMouseLeave={() => setIsHoveringBio(false)}
          className="relative flex-1 h-full"
        >
          <AnimIn center blur delay={0.2} className="flex flex-col md:justify-evenly gap-8 md:gap-18 h-full pe-4">
            <BioText text={aboutContent.bio1 || ''} className="font-medium max-md:text-sm text-2xl leading-relaxed" />
            <BioText text={aboutContent.bio2 || ''} className="font-medium max-md:text-sm text-2xl leading-relaxed" />
            <BioText text={aboutContent.bio3 || ''} className="font-medium max-md:text-sm text-2xl leading-relaxed" />
          </AnimIn>

          {/* Mouse Follower IMAGES */}
          {isHoveringBio && !isMobile && (
            <motion.div
              style={{ left: mousePos.x + 20, top: mousePos.y - 100 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="z-50 fixed w-75 h-75 overflow-hidden shadow-2xl rounded-lg pointer-events-none"
            >
              {RANDOM_IMAGES.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Random image ${index + 1}`}
                  fill
                  sizes="300px"
                  style={{ opacity: randomImageIndex === index ? 1 : 0 }}
                  className="object-cover"
                />
              ))}
            </motion.div>
          )}
        </div>

        <AnimIn center blur delay={0.3} className="max-md:mb-8">
          <p className="flex gap-6 opacity-60 font-sec text-lg">
            <span>I Shut My</span>
            <span className="relative">
              **
              <span className="top-1.5 left-1/2 absolute rotate-90 -translate-x-1/2">)</span>
            </span>
            <span>eyes to See</span>
          </p>
        </AnimIn>
      </div>

      {/* Right Side */}
      <div className="-z-10 md:z-0 max-md:fixed max-md:inset-0 flex flex-col justify-between gap-12 w-full bg-text md:p-8">
        <span className="max-md:hidden opacity-60 font-bold text-sm md:text-2xl leading-tight tracking-tighter">
          est 2003 <br /> Known as - {aboutContent.nickname}
        </span>

        <div className="relative flex-1 max-md:scale-70 max-md:origin-top max-md:mt-18">
          {IMAGES.map((src, index) => (
            <motion.div
              key={src}
              initial={false}
              animate={{ opacity: currentImage === index ? 1 : 0 }}
              transition={{ duration: 0, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image src={src} alt={`About image ${index + 1}`} priority={index === 0} fill className="object-cover md:object-contain" />
            </motion.div>
          ))}
        </div>

        <p className="max-md:hidden opacity-60 font-bold text-[1.4dvw] max-md:text-sm tracking-tighter">
          [{aboutContent.position || 'Multidisciplinary Visual Artist'}]
        </p>
      </div>
    </section>
  )
}
