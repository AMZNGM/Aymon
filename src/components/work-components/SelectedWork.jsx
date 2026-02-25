'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useProjects } from '@/hooks/for-db/useProjects'
import { ArrowRight } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effect/RippleEffect'
import ArrowCursor from '@/components/ui/ArrowCursor'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

export default function SelectedWork({ className = '', hasButton = true, selected = true }) {
  const { projects, loading } = useProjects()
  const filteredProjects = selected ? projects.filter((project) => project.showInSelectedWork === true) : projects

  const containerRef = useRef(null)
  const { sx, sy } = useMouseMotion({ containerRef, relative: true, center: true, spring: { stiffness: 150, damping: 20 } })
  const [hoveredProject, setHoveredProject] = useState(null)

  if (loading) {
    return <LoadingSkeleton count="4" className={`mb-12 px-1 ${className}`} />
  }

  return (
    <section ref={containerRef} className={`relative w-full text-bg mb-12 px-1 ${className}`}>
      <AnimatePresence>{hoveredProject && <ArrowCursor sx={sx} sy={sy} />}</AnimatePresence>

      <div className="gap-4 grid md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <AnimIn center blur delay={0.2 * index} key={project.id}>
            <Link href={`/work/${project.slug}`} className="block relative cursor-none">
              <RippleEffect className="relative aspect-5/4 overflow-hidden rounded-2xl">
                <ImageIn
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  src={project.media?.primary}
                  alt={project.client}
                  priority={index <= 3}
                  data-hide-cursor="true"
                  divClassName="w-full h-full select-none cursor-none"
                />
              </RippleEffect>

              <span className="block font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase tracking-wide mt-2">{project.title}</span>
            </Link>
          </AnimIn>
        ))}
      </div>

      {hasButton && (
        <Link
          href={'/work'}
          className="z-30 relative w-fit flex flex-col justify-center items-end opacity-45 hover:opacity-100 font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase tracking-wide transition-opacity duration-300 ms-auto mt-12"
        >
          See more
          <ArrowRight />
        </Link>
      )}
    </section>
  )
}
