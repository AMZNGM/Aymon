'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getAboutContent } from '@/lib/getAbout'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import WordMagnet from '@/components/ui/text/WordMagnet'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import type { AboutContent } from '@/types/admin.types'

const IMAGES = ['/images/2dModal/1.png', '/images/2dModal/2.png', '/images/2dModal/3.png', '/images/2dModal/4.png']

export default function AboutContent() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const { scrollYProgress } = useScroll()
  const imageIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75], [0, 1, 2, 3])

  useEffect(() => {
    const unsubscribe = imageIndex.on('change', (value) => {
      const newIndex = Math.max(0, Math.min(3, Math.round(value)))
      setCurrentImage(newIndex)
    })
    return () => unsubscribe()
  }, [imageIndex])

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
    <section className="relative flex max-md:flex-col justify-between gap-4 w-dvw min-h-dvh uppercase max-md:px-1 md:pe-18">
      {/* Left Side */}
      <div className="top-0 z-10 max-md:fixed md:sticky flex flex-col justify-between space-y-12 w-full h-dvh md:p-8">
        <AnimText as="h2" delay={0.3} className="font-extrabold text-[7.2dvw] leading-[7dvw] max-md:pt-12">
          {aboutContent.title}
        </AnimText>

        <AnimIn center blur delay={0.2} className="space-y-18 max-2xl:space-y-8 pe-4">
          <AnimText as="h2" delay={0.3} className="text-2xl">
            Biography
          </AnimText>
          <WordMagnet text={aboutContent.bio1 || ''} className="max-2xl:text-sm text-lg leading-relaxed" />
          <WordMagnet text={aboutContent.bio2 || ''} className="max-2xl:text-sm text-lg leading-relaxed" />
          <WordMagnet text={aboutContent.bio3 || ''} className="max-2xl:text-sm text-lg leading-relaxed" />
        </AnimIn>

        <AnimIn center blur delay={0.3} className="max-sm:self-center max-md:mb-8">
          <p className="flex gap-6 font-sec text-bg/60 text-lg">
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
      <div className="top-0 max-xl:right-0 max-xl:fixed xl:sticky flex flex-col justify-between w-full max-w-lg h-dvh max-md:h-dvh p-8 max-xl:py-28 max-xl:mix-blend-difference">
        <span className="max-xl:text-text/50 text-2xl">
          est 2003 <br /> Known as - {aboutContent.nickname}
        </span>

        <div className="relative w-full h-[80%]">
          {IMAGES.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentImage === index ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image src={src} alt={`About image ${index + 1}`} fill className="object-contain" sizes="400px" priority={index === 0} />
            </motion.div>
          ))}
        </div>

        <p className="text-bg/75 max-xl:text-text/50 max-md:text-lg text-2xl text-center">
          [{aboutContent.position || 'Multidisciplinary Visual Artist'}]
        </p>
      </div>

      {/* Spacer */}
      <div className="h-[400dvh]" />
    </section>
  )
}
