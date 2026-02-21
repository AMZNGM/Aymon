'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useProjects } from '@/hooks/useProjects'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import ArrowCursor from '@/components/ui/ArrowCursor'
import RippleEffect from '@/components/ui/effect/RippleEffect'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

export default function MoreProjects({ currentSlug }) {
  const { projects, loading } = useProjects()
  const nonSelectedProjects = projects.filter((project) => !project.showInSelectedWork && project.slug !== currentSlug)
  const moreProjects =
    nonSelectedProjects.length > 0 ? nonSelectedProjects : projects.filter((project) => project.slug !== currentSlug).slice(0, 2)

  const containerRef = useRef(null)
  const { sx, sy } = useMouseMotion({ containerRef, relative: true, center: true, spring: { stiffness: 150, damping: 20 } })
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <section ref={containerRef} className="relative w-full h-full overflow-hidden bg-text text-bg px-2 max-md:px-1 pb-12">
      {loading ? (
        <LoadingSkeleton />
      ) : moreProjects.length === 0 ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Marquee */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: ['-100%', '0%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
          >
            {[...Array(5)].map((_, index) => (
              <AnimIn blur toDown duration={1} className="font-bold text-[8dvw] text-bg uppercase tracking-tight mx-4" key={index}>
                Next Project
              </AnimIn>
            ))}
          </motion.div>

          <hr className="w-full h-px bg-bg mb-12" />

          <AnimatePresence>{hoveredProject && <ArrowCursor sx={sx} sy={sy} />}</AnimatePresence>

          <div className="gap-4 grid md:grid-cols-2 mb-12">
            {moreProjects.slice(0, 2).map((project, index) => (
              <AnimIn center blur delay={0.2 * index} key={project.id}>
                <Link href={`/work/${project.slug}`} className="block relative cursor-none">
                  <RippleEffect className="group relative aspect-5/4 overflow-hidden rounded-2xl">
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

                  <span className="block font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase leading-8 xl:leading-10 tracking-wide mt-2">
                    {project.title}
                  </span>
                </Link>
              </AnimIn>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
