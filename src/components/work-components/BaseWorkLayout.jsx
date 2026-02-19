'use client'

import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useProjects } from '@/hooks/useProjects'
import { useIsMobile } from '@/hooks/useIsMobile'
import { ArrowRight } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effect/RippleEffect'
import HoverPreview from '@/components/work-components/HoverPreview'

const ScrollChar = ({ char, index, progress }) => {
  const x = useTransform(progress, [0, 0.3], [((index * 37) % 100) - 50, 0])
  const y = useTransform(progress, [0, 0.3], [((index * 43) % 100) - 50, 0])
  const rotate = useTransform(progress, [0, 0.3], [((index * 59) % 180) - 90, 0])

  return (
    <motion.span style={{ x, y, rotate }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

export default function BaseWorkLayout({ title1, title2, filterFn, hasButton = false }) {
  const isMobile = useIsMobile()
  const { projects, loading } = useProjects()
  const filteredProjects = projects.filter(filterFn)
  const [hoveredData, setHoveredData] = useState({ project: null, rect: null })
  const containerRef = useRef(null)
  const { sx, sy } = useMouseMotion({ relative: false })
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })

  const handleHover = useCallback((project, rect) => {
    setHoveredData({ project, rect })
  }, [])

  const heading = (
    <h2 className="font-extrabold text-[7dvw] max-md:text-4xl md:text-end uppercase leading-none tracking-[-2px] max-md:mb-6 md:pt-12 select-none">
      <span className="max-md:hidden">
        {title1.split('').map((char, index) => (
          <ScrollChar key={index} char={char} index={index} progress={scrollYProgress} />
        ))}
      </span>
      <br />
      <span className="max-md:hidden">
        {title2.split('').map((char, index) => (
          <ScrollChar key={index} char={char} index={index} progress={scrollYProgress} />
        ))}
      </span>

      <span className="md:hidden">
        {title1} <br />
        {title2}
      </span>
    </h2>
  )

  if (loading) {
    return (
      <section ref={containerRef} className="relative w-full min-h-dvh px-2 pt-4 max-md:pt-18 pb-24">
        {heading}
        <div className="gap-4 grid md:grid-cols-2">
          {[1, 2, 3, 4].map((index) => (
            <AnimIn center blur delay={0.2 * index} key={index} className="aspect-13/12 overflow-hidden rounded-2xl">
              <div className="w-full h-full bg-bg/5 animate-pulse">
                <div className="w-full h-full bg-linear-to-r from-bg/1 to-bg/5"></div>
              </div>
            </AnimIn>
          ))}
        </div>
        <div className="bg-bg/10 rounded-lg mt-8 p-4">
          <p className="opacity-70 text-sm">Loading projects...</p>
        </div>
      </section>
    )
  }

  if (filteredProjects.length === 0) {
    return (
      <section ref={containerRef} className="relative w-full min-h-dvh px-2 pt-4 max-md:pt-18 pb-24">
        {heading}
        <div className="text-center py-16">
          <p className="opacity-70 text-xl">No projects found for this category.</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative w-full min-h-dvh bg-text text-bg px-1 md:pt-4 md:pb-24">
      {heading}

      <div onMouseLeave={() => handleHover(null, null)} className="gap-4 grid md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <AnimIn center blur delay={0.2 * index} key={project.id}>
            <Link
              href={`/work/${project.slug}`}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.querySelector('.group')?.getBoundingClientRect()
                handleHover(project, rect || e.currentTarget.getBoundingClientRect())
              }}
              className="block relative"
            >
              <RippleEffect className="group relative aspect-5/4 overflow-hidden rounded-2xl cursor-pointer">
                <ImageIn src={project.media?.primary} alt={project.client} priority={index <= 3} divClassName="w-full h-full select-none" />
              </RippleEffect>

              <span className="block font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase leading-8 xl:leading-10 tracking-wide mt-2">
                {project.title}
              </span>
            </Link>
          </AnimIn>
        ))}
      </div>

      {hasButton && (
        <Link href={'/work'}>
          <div className="w-fit flex flex-col justify-center items-end hover:bg-amber-300 transition-colors duration-200 ms-auto mt-12 px-2">
            <span className="font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase tracking-wide">All Work</span>
            <ArrowRight />
          </div>
        </Link>
      )}

      {!isMobile && (
        <AnimatePresence mode="wait">
          {hoveredData.project && (
            <HoverPreview
              key="hover-preview"
              project={hoveredData.project}
              hoveredRect={hoveredData.rect}
              sectionRef={containerRef}
              sx={sx}
              sy={sy}
            />
          )}
        </AnimatePresence>
      )}
    </section>
  )
}
