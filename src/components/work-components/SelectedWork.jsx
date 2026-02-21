'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useProjects } from '@/hooks/useProjects'
import { ArrowRight, ArrowUp } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effect/RippleEffect'

export default function SelectedWork({ className = '', title = 'Selected Work', hasButton = true, selected = true }) {
  const { projects, loading } = useProjects()
  const filteredProjects = selected ? projects.filter((project) => project.showInSelectedWork === true) : projects

  const containerRef = useRef(null)
  const { sx, sy } = useMouseMotion({ containerRef, relative: true, center: true, spring: { stiffness: 150, damping: 20 } })
  const [hoveredProject, setHoveredProject] = useState(null)

  const heading = (
    <div className="flex items-center gap-12">
      <h2 className="font-extrabold text-[7dvw] max-md:text-4xl uppercase leading-none tracking-[-2px] max-md:mb-6 md:pt-12 select-none">
        {title}
      </h2>
      <div className="w-28 max-md:w-22 h-2 max-md:h-1.5 bg-bg mt-12 max-md:mb-18" />
    </div>
  )

  if (loading) {
    return (
      <section className="relative w-full min-h-dvh px-2 pt-4 max-md:pt-18 pb-24">
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
      <section className="relative w-full min-h-dvh px-2 pt-4 max-md:pt-18 pb-24">
        {heading}
        <div className="text-center py-16">
          <p className="opacity-70 text-xl">No projects found for this category.</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className={`z-99999 relative w-full min-h-dvh bg-text text-bg px-1 md:pt-4 md:pb-24 ${className}`}>
      {heading}

      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            style={{ x: sx, y: sy }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="top-1/2 left-1/2 z-50 absolute border-4 border-text rounded-full -translate-1/2 pointer-events-none mix-blend-difference"
          >
            <ArrowUp size={66} strokeWidth={1} className="text-text -rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="gap-4 grid md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <AnimIn center blur delay={0.2 * index} key={project.id}>
            <Link href={`/work/${project.slug}`} className="block relative cursor-none">
              <RippleEffect className="group relative aspect-5/4 overflow-hidden rounded-2xl">
                <ImageIn
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  src={project.media?.primary}
                  alt={project.client}
                  priority={index <= 3}
                  divClassName="w-full h-full select-none cursor-none"
                />
              </RippleEffect>

              <span className="block font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase leading-8 xl:leading-10 tracking-wide mt-2">
                {project.title}
              </span>
            </Link>
          </AnimIn>
        ))}
      </div>

      {hasButton && (
        <Link
          href={'/work'}
          className="w-fit flex flex-col justify-center items-end opacity-45 hover:opacity-100 font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase tracking-wide transition-opacity duration-300 ms-auto mt-12"
        >
          See more
          <ArrowRight />
        </Link>
      )}
    </section>
  )
}
