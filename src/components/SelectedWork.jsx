'use client'

import Link from 'next/link'
import { useProjects } from '@/hooks/useProjects'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import RippleEffect from '@/components/ui/effect/RippleEffect'

export default function SelectedWork() {
  const { projects, loading } = useProjects()

  const heading = (
    <AnimText as="h2" className="font-extrabold text-[7dvw] max-md:text-4xl uppercase leading-none tracking-[-2px] mb-16 max-md:mb-6">
      Selected Work
    </AnimText>
  )

  if (loading) {
    return (
      <section className="relative w-full h-full min-h-dvh overflow-hidden px-2 pt-4 max-md:pt-18 pb-24">
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

  if (projects.length === 0) {
    return (
      <section className="relative w-full h-full min-h-dvh overflow-hidden px-2 pt-4 max-md:pt-18 pb-24">
        {heading}

        <div className="text-center py-16">
          <p className="opacity-70 text-xl">No projects found.</p>
          <p className="opacity-50 text-sm mt-2">Please check back later for new projects.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-full min-h-dvh overflow-hidden px-1 pt-4 max-md:pt-18 pb-24">
      {heading}

      <div className="gap-4 grid md:grid-cols-2">
        {projects.map((project, index) => (
          <AnimIn center blur delay={0.2 * index} key={project.id}>
            <Link href={`/work/${project.slug}`}>
              <RippleEffect className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer">
                <ImageIn
                  src={project.media?.primary}
                  alt={project.client}
                  priority={index <= 3}
                  className="group-hover:scale-104 duration-400 pointer-events-none select-none"
                />
              </RippleEffect>

              <span className="font-bold text-[2.2dvw] text-bg max-md:text-xl uppercase line-clamp-1 leading-8 xl:leading-10 tracking-wide">
                {project.title}
              </span>
            </Link>
          </AnimIn>
        ))}
      </div>
    </section>
  )
}
