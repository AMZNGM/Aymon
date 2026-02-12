'use client'

import { useAboutContent } from '@/hooks/useAboutContent'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import LoadingOverlay from '@/components/shared/LoadingOverlay'
import WordMagnet from '@/components/ui/text/WordMagnet'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function AboutContent() {
  const { aboutContent, loading } = useAboutContent()

  if (loading || !aboutContent) {
    return <LoadingOverlay />
  }

  return (
    <section className="relative w-dvw min-h-dvh overflow-hidden flex justify-center items-center px-4 max-xl:px-1 py-12 max-md:py-18 md:pe-18 xl:pe-0">
      <div className="max-w-7xl bg-bg/10 rounded-2xl text-bg mx-auto p-6">
        <AnimText as="h2" delay={0.3} className="font-extrabold max-lg:text-4xl max-xl:text-7xl text-8xl uppercase tracking-[-2px] mb-16">
          {aboutContent.title}
        </AnimText>

        <div className="max-w-4xl space-y-12">
          <AnimIn center blur className="space-y-4">
            <h3 className="font-bold max-md:text-2xl text-4xl tracking-tighter">
              {aboutContent.firstName} {aboutContent.lastName}
            </h3>

            <p className="text-bg/75 max-md:text-lg text-xl">{aboutContent.position || 'Multidisciplinary Visual Artist'}</p>
          </AnimIn>

          <AnimIn center blur delay={0.2} className="space-y-4">
            <WordMagnet text={aboutContent.bio} className="text-bg/60 max-md:text-base text-lg leading-relaxed" />
          </AnimIn>

          <AnimIn center blur delay={0.3} className="space-y-2">
            <p className="text-bg/60 max-md:text-base text-lg italic">&ldquo;{aboutContent.slogan}&rdquo;</p>
          </AnimIn>

          <AnimIn center blur delay={0.4} className="flex flex-wrap gap-4 pt-8">
            {Object.entries(aboutContent.socialLinks).map(([key, value]) => (
              <a
                key={key}
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bg max-md:text-base text-lg underline transition-colors duration-200"
              >
                <VariableFontHoverByRandomLetter label={key} />
              </a>
            ))}
          </AnimIn>
        </div>
      </div>
    </section>
  )
}
