'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import marwanPablo from '../../public/images/selectedImgs/marwanPablo/halal.webp'
import geo from '../../public/images/selectedImgs/geo/geo1Resize.webp'
import menage from '../../public/images/selectedImgs/ghadaAbdelrazikXMenage07/menageRezie.webp'
import blitz from '../../public/images/selectedImgs/blitz/blitz1.webp'
import clientInfo from '../data/clients-info.json'

const projects = [
  { src: marwanPablo, title: 'marwan-pablo', infoIndex: 0 },
  { src: geo, title: 'geo-project', infoIndex: 2 },
  { src: menage, title: 'menage-ghada', infoIndex: 1 },
  { src: blitz, title: 'blitz', infoIndex: 3 },
]

export default function SelectedWork() {
  return (
    <section className="relative w-full h-full overflow-hidden py-12 px-1">
      <motion.h2
        initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-12"
      >
        Selected Work
      </motion.h2>

      <motion.div
        initial={{ y: 100, filter: 'blur(10px)' }}
        whileInView={{ y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, filter: { duration: 0.5 } }}
        className="grid lg:grid-cols-2 gap-4"
      >
        {projects.map((project, index) => (
          <motion.div key={index} initial={{ y: 200 }} whileInView={{ y: 0 }} transition={{ duration: 0.5, delay: index * 0.09 }}>
            <Link href={`/work/${project.title}`}>
              <div className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer">
                <Image
                  src={project.src}
                  alt={project.title}
                  priority={index === 0}
                  fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover w-full h-full rounded-2xl select-none pointer-events-none group-hover:scale-105 duration-400"
                />
                <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 duration-300 pointer-events-none" />
              </div>

              <span className="text-bg text-4xl max-lg:text-xl font-bold uppercase tracking-wide">
                #{index + 1} {` `} {clientInfo[project.infoIndex]?.client}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
