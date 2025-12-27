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
      <section className="relative w-full h-full min-h-screen overflow-hidden pt-4 px-1 pb-12">
        <motion.h2
          {...useTextClipPath(0, true)}
          className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-16 max-md:mt-14 max-md:mb-6 flex gap-2"
        >
          Selected Work
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-[600px] max-md:h-[400px] rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-bg/5 animate-pulse">
                <div className="w-full h-full bg-linear-to-r from-bg/1 to-bg/5"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-full min-h-screen overflow-hidden pt-4 px-1 pb-12">
      <motion.h2
        {...useTextClipPath(0, true)}
        className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-16 max-md:mt-14 max-md:mb-6 flex gap-2"
      >
        Selected Work
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: index * 0.1, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Link href={`/work/${project.slug}`}>
              <ClickEffect className="group relative h-[600px] max-md:h-[400px] rounded-2xl overflow-hidden cursor-pointer">
                <Image
                  src={project.media?.primary}
                  alt={project.client}
                  priority={index === 0}
                  fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
                  width={100}
                  height={100}
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover w-full h-full rounded-2xl select-none pointer-events-none group-hover:scale-104 duration-400"
                />
              </ClickEffect>

              <span className="text-bg text-4xl max-lg:text-xl font-bold uppercase tracking-wide">{project.client}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
