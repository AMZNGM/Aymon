'use client'

import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsapConfig'
import { AnimatePresence, motion } from 'framer-motion'
import { useMouseMotion } from '@/hooks/useMouseMotion'
import { useProjects } from '@/hooks/useProjects'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import ArrowCursor from '@/components/ui/ArrowCursor'
import RippleEffect from '@/components/ui/effect/RippleEffect'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

function SplitHoverText({ children, className }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current || typeof SplitText === 'undefined') return

      SplitText.create(ref.current, {
        type: 'chars',
        autoSplit: true,
        onSplit(self) {
          gsap.set(self.chars, { opacity: 0.5 })

          self.chars.forEach((char) => {
            char.addEventListener('mouseenter', () => gsap.to(char, { opacity: 1, duration: 0.15, ease: 'power2.out' }))
            char.addEventListener('mouseleave', () => gsap.to(char, { opacity: 0.5, duration: 0.3, ease: 'power2.inOut' }))
          })
        },
      })
    },
    { scope: ref }
  )

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}

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
            className="flex whitespace-nowrap select-none"
          >
            {[...Array(5)].map((_, index) => (
              <AnimIn blur toDown duration={1} key={index} className="mx-0.5">
                <SplitHoverText className="font-sec text-[8dvw] text-bg uppercase tracking-tight">Experience more *</SplitHoverText>
              </AnimIn>
            ))}
          </motion.div>

          <hr className="w-full h-px bg-bg mb-12" />

          <AnimatePresence>{hoveredProject && <ArrowCursor sx={sx} sy={sy} />}</AnimatePresence>

          <div className="gap-4 grid md:grid-cols-2 mb-12">
            {moreProjects.slice(0, 2).map((project, index) => (
              <AnimIn center blur delay={0.2 * index} key={project.id}>
                <Link href={`/work/${project.slug}`} className="group block relative cursor-none">
                  <RippleEffect
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = ((e.clientX - rect.left) / rect.width) * 100
                      const y = ((e.clientY - rect.top) / rect.height) * 100
                      e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
                      e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
                    }}
                    className="group relative aspect-5/4 overflow-hidden rounded-2xl"
                  >
                    <ImageIn
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      src={project.media?.primary}
                      alt={project.client}
                      priority={index <= 3}
                      data-hide-cursor="true"
                      className="md:grayscale transition-all duration-300 md:filter"
                      divClassName="w-full h-full select-none cursor-none"
                    />

                    <div
                      style={{
                        mask: 'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, black 40%, transparent 80%, transparent 100%)',
                        WebkitMask:
                          'radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, black 40%, transparent 80%, transparent 100%)',
                      }}
                      className="max-md:hidden z-10 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    >
                      <ImageIn
                        src={project.media?.primary}
                        alt={project.client}
                        priority={index <= 3}
                        data-hide-cursor="true"
                        divClassName="w-full h-full select-none cursor-none"
                      />
                    </div>
                  </RippleEffect>

                  <span className="block font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase tracking-wide mt-2">{project.title}</span>
                </Link>
              </AnimIn>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
