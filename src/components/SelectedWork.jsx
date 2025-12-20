'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getProjects } from '@/lib/fetchProjects'
import useTextClipPath from '@/hooks/useTextClipPath'
import ClickEffect from '@/components/ui/effect/ClickEffect'

export default function SelectedWork() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProjects().then((data) => setProjects(data))
  }, [])

  const processedProjects = projects
    .map((project, index) => ({
      index,
      slug: project.slug?.current,
      src: project.mediaPrimary?.asset?.url,
      title: project.title || project.client,
      featured: project.featured,
    }))
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })

  return (
    <section className="relative w-full h-full min-h-screen overflow-hidden pt-4 px-1 pb-12">
      <motion.h2
        {...useTextClipPath(0, true)}
        className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-16 max-md:mt-14 max-md:mb-6"
      >
        Selected Work
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {processedProjects.map((project) => (
          <motion.div
            key={project.index}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: index * 0.1, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Link href={`/work/${project.slug}`}>
              <ClickEffect className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer">
                <Image
                  src={project.src}
                  alt={project.title}
                  priority={index === 0}
                  fetchPriority={project.index <= 1 ? 'high' : 'auto'}
                  width={100}
                  height={100}
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover w-full h-full rounded-2xl select-none pointer-events-none group-hover:scale-104 duration-400"
                />
              </ClickEffect>

              <span className="text-bg text-4xl max-lg:text-xl font-bold uppercase tracking-wide">{project.title}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
