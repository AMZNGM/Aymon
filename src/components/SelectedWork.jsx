'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useTextClipPath from '@/hooks/useTextClipPath'
import ClickEffect from '@/components/ui/effect/ClickEffect'
import clientInfo from '@/data/clients-info.json'

const processedProjects = (() => {
  const loadedProjects = clientInfo.map((project, index) => ({
    src: project.media?.primary,
    title: project.title || project.client,
    infoIndex: index,
  }))

  return [...loadedProjects].sort((a, b) => {
    if (clientInfo[a.infoIndex]?.featured && !clientInfo[b.infoIndex]?.featured) return -1
    if (!clientInfo[a.infoIndex]?.featured && clientInfo[b.infoIndex]?.featured) return 1
    return 0
  })
})()

export default function SelectedWork() {
  return (
    <section className="relative w-full h-full overflow-hidden pt-4 px-1 pb-12">
      <motion.h2
        {...useTextClipPath(0, true)}
        className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-16"
      >
        Selected Work
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {processedProjects.map((project, index) => (
          <motion.div
            key={project.infoIndex}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: index * 0.1, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Link href={`/work/${clientInfo[project.infoIndex]?.slug}`}>
              <ClickEffect className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer">
                <Image
                  src={project.src}
                  alt={clientInfo[project.infoIndex]?.client}
                  priority={index === 0}
                  fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
                  width={100}
                  height={100}
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover w-full h-full rounded-2xl select-none pointer-events-none group-hover:scale-104 duration-400"
                />
              </ClickEffect>

              <span className="text-bg text-4xl max-lg:text-xl font-bold uppercase tracking-wide">
                {clientInfo[project.infoIndex]?.client}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
