'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getAboutContent } from '@/lib/getAbout'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import type { AboutContent } from '@/types/admin.types'

const IMAGES = ['/images/2dModal/11.png', '/images/2dModal/12.png', '/images/2dModal/13.png', '/images/2dModal/14.png']

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

// Helper to bold specific names in text
function BioText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(Ahmed Ayman|Aymon|filmmaking)/g)
  return (
    <p className={className}>
      {parts.map((part, i) =>
        part === 'Ahmed Ayman' || part === 'Aymon' || part === 'filmmaking' ? (
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
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const { scrollYProgress } = useScroll()
  const imageIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, 1, 2, 3])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHoveringBio, setIsHoveringBio] = useState(false)
  const [randomImageIndex, setRandomImageIndex] = useState(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const unsubscribe = imageIndex.on('change', (value) => {
      const newIndex = Math.max(0, Math.min(3, Math.round(value)))
      setCurrentImage(newIndex)
    })
    return () => unsubscribe()
  }, [imageIndex])

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
    <section className="relative flex justify-between gap-4 w-dvw min-h-dvh uppercase px-4 max-md:px-1 md:pe-18 max-md:pt-12">
      {/* Left Side */}
      <div className="z-10 flex flex-col justify-between gap-1 max-md:text-text md:p-8 max-md:mix-blend-difference">
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
          className="relative h-full"
        >
          <AnimIn center blur delay={0.2} className="flex flex-col justify-evenly gap-18 h-full pe-4">
            <BioText text={aboutContent.bio1 || ''} className="font-medium max-2xl:text-lg text-2xl leading-relaxed" />
            <BioText text={aboutContent.bio2 || ''} className="font-medium max-2xl:text-lg text-2xl leading-relaxed" />
            <BioText text={aboutContent.bio3 || ''} className="font-medium max-2xl:text-lg text-2xl leading-relaxed" />
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
      <div className="top-0 right-0 max-md:fixed sticky flex flex-col justify-between w-full h-dvh p-8">
        <span className="opacity-60 font-bold max-md:text-sm text-2xl leading-tight">
          est 2003 <br /> Known as - {aboutContent.nickname}
        </span>

        <div className="relative w-full h-full">
          {IMAGES.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentImage === index ? 1 : 0 }}
              transition={{ duration: 0, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image src={src} alt={`About image ${index + 1}`} fill className="object-cover" sizes="400px" priority={index === 0} />
            </motion.div>
          ))}
        </div>

        <p className="opacity-60 font-bold text-[1.4dvw] max-md:text-sm text-center text-nowrap tracking-tighter">
          [{aboutContent.position || 'Multidisciplinary Visual Artist'}]
        </p>
      </div>

      {/* Spacer */}
      {/* <div className="h-[200dvh]" /> */}
    </section>
  )
}
