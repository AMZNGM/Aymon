'use client'

import { useState, useEffect } from 'react'
import { getAboutContent } from '@/lib/getAbout'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import WordMagnet from '@/components/ui/text/WordMagnet'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default function AboutContent() {
  const [aboutContent, setAboutContent] = useState(null)
  const [loading, setLoading] = useState(true)

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
    <section className="relative w-dvw min-h-dvh flex justify-center items-center text-center px-4">
      <div className="max-2xl:max-w-4xl min-h-dvh flex flex-col justify-center bg-sec text-bg p-6">
        <AnimText
          as="h2"
          delay={0.3}
          className="font-extrabold 2xl:text-[8dvw] max-lg:text-4xl max-xl:text-7xl text-8xl uppercase tracking-[-2px] max-md:my-8 md:mb-16"
        >
          {aboutContent.title}
        </AnimText>

        <div className="2xl:max-w-[55dvw] max-2xl:max-w-4xl space-y-12 mx-auto">
          <AnimIn center blur className="space-y-4">
            <h3 className="font-bold 2xl:text-[3dvw] max-md:text-2xl text-4xl tracking-tighter">
              {aboutContent.firstName} {aboutContent.lastName}
            </h3>

            <p className="text-bg/75 2xl:text-[1dvw] max-md:text-lg text-xl">
              {aboutContent.position || 'Multidisciplinary Visual Artist'}
            </p>
          </AnimIn>

          <AnimIn center blur delay={0.2} className="space-y-4">
            <WordMagnet text={aboutContent.bio} className="text-bg/60 2xl:text-[1.2dvw] max-md:text-base text-lg leading-relaxed" />
          </AnimIn>

          <AnimIn center blur delay={0.3} className="space-y-2">
            <p className="text-bg/60 2xl:text-[1.2dvw] max-md:text-base text-lg italic">&ldquo;{aboutContent.slogan}&rdquo;</p>
          </AnimIn>

          <AnimIn center blur delay={0.4} className="flex flex-wrap justify-center items-center gap-4 2xl:gap-12 pt-8">
            {Object.entries(aboutContent.socialLinks).map(([key, value]) => (
              <a
                key={key}
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bg 2xl:text-[1.2dvw] max-md:text-base text-lg underline transition-colors duration-200"
              >
                <TextWghtGrow label={key === 'Behance' ? `Béhance` : key.charAt(0).toUpperCase() + key.slice(1)} />
              </a>
            ))}
          </AnimIn>
        </div>
      </div>
    </section>
  )
}
