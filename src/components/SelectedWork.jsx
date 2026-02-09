'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getProjects } from '@/lib/getProjects'
import ClickEffect from '@/components/ui/effect/ClickEffect'
import useTextClipPath from '@/hooks/useTextClipPath'

export default function SelectedWork() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="relative w-full h-full min-h-screen overflow-hidden px-1 pt-4 pb-12">
        <motion.h2
          {...useTextClipPath(0, true)}
          className="flex gap-2 font-extrabold max-lg:text-4xl max-xl:text-7xl text-8xl uppercase tracking-[-2px] max-md:mt-14 mb-16 max-md:mb-6"
        >
          Selected Work
        </motion.h2>

        <div className="gap-4 grid lg:grid-cols-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-[600px] max-md:h-[400px] overflow-hidden rounded-2xl">
              <div className="w-full h-full bg-bg/5 animate-pulse">
                <div className="w-full h-full bg-linear-to-r from-bg/1 to-bg/5"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Debug info */}
        <div className="bg-bg/10 rounded-lg mt-8 p-4">
          <p className="opacity-70 text-sm">Loading projects...</p>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section className="relative w-full h-full min-h-screen overflow-hidden px-1 pt-4 pb-12">
        <motion.h2
          {...useTextClipPath(0, true)}
          className="flex gap-2 font-extrabold max-lg:text-4xl max-xl:text-7xl text-8xl uppercase tracking-[-2px] max-md:mt-14 mb-16 max-md:mb-6"
        >
          Selected Work
        </motion.h2>

        <div className="text-center py-16">
          <p className="opacity-70 text-xl">No projects found.</p>
          <p className="opacity-50 text-sm mt-2">Please check back later for new projects.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-full min-h-screen overflow-hidden px-1 pt-4 pb-12">
      <motion.h2
        {...useTextClipPath(0, true)}
        className="flex gap-2 font-extrabold max-lg:text-4xl max-xl:text-7xl text-8xl uppercase tracking-[-2px] max-md:mt-14 mb-16 max-md:mb-6"
      >
        Selected Work
      </motion.h2>

      <div className="gap-4 grid lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: index * 0.1, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Link href={`/work/${project.slug}`}>
              <ClickEffect className="group relative h-[600px] max-md:h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                <Image
                  src={project.media?.primary}
                  alt={project.client}
                  priority={index === 0}
                  fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
                  width={100}
                  height={100}
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-104 duration-400 pointer-events-none select-none"
                />
              </ClickEffect>

              <span className="font-bold text-bg max-lg:text-xl text-4xl uppercase tracking-wide">{project.client}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
