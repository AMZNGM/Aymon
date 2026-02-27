'use client'

import { useState, useEffect } from 'react'
import { getAboutContent } from '@/lib/getAbout'
import WordMagnet from '@/components/ui/text/WordMagnet'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default function PaintContent() {
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
    <section className="relative w-full h-full flex flex-col justify-center items-center bg-text text-bg text-center p-4">
      <h2 className="font-extrabold 2xl:text-[8dvw] max-lg:text-4xl max-xl:text-7xl text-8xl uppercase tracking-[-2px] max-md:my-8 md:mb-16">
        {aboutContent.title}
      </h2>

      <div className="2xl:max-w-[55dvw] max-2xl:max-w-4xl space-y-12 mx-auto">
        <h3 className="font-bold 2xl:text-[3dvw] max-md:text-2xl text-4xl tracking-tighter">
          {aboutContent.firstName} {aboutContent.lastName}
        </h3>

        <p className="text-bg/75 2xl:text-[1dvw] max-md:text-lg text-xl">{aboutContent.position || 'Multidisciplinary Visual Artist'}</p>

        <WordMagnet text={aboutContent.bio} className="text-bg/60 2xl:text-[1.2dvw] max-md:text-base text-lg leading-relaxed" />

        <p className="text-bg/60 2xl:text-[1.2dvw] max-md:text-base text-lg italic">&ldquo;{aboutContent.slogan}&rdquo;</p>

        {Object.entries(aboutContent.socialLinks).map(([key, value]) => (
          <a
            key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bg 2xl:text-[1.2dvw] max-md:text-base text-lg underline transition-colors duration-200 me-4"
          >
            <TextWghtGrow label={key === 'Behance' ? `Béhance` : key.charAt(0).toUpperCase() + key.slice(1)} />
          </a>
        ))}
      </div>
    </section>
  )
}
