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
    <section className="relative w-full h-full overflow-hidden bg-text text-bg py-12 px-1">
      <motion.h2
        // initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
        // whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        // transition={{ duration: 1 }}
        // viewport={{ once: true }}
        className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-12"
      >
        Selected Work
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Link key={index} href={`/work/${project.title}`}>
            <motion.div
              // initial={{ y: 100, filter: 'blur(10px)' }}
              // whileInView={{ y: 0, filter: 'blur(0px)' }}
              // transition={{ duration: 0.8, delay: index * 0.12, filter: { duration: 0.5 } }}
              // viewport={{ once: true, amount: 0.3 }}
              className={`group relative h-[600px] overflow-hidden cursor-pointer rounded-2xl`}
            >
              <Image
                src={project.src}
                alt={project.title}
                priority={index === 0}
                fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover w-full h-full rounded-2xl duration-1000 select-none pointer-events-none"
              />

              {/* <motion.span
                animate={{ x: [0, 12, -12, 12, 0], y: [100, 12, -12, 12, 100], opacity: [0.5, 1, 1, 0.5] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 flex justify-center items-center text-text rounded-full text-4xl max-lg:text-xl font-bold uppercase tracking-wide px-2"
              >
                {clientInfo[project.infoIndex]?.client}
              </motion.span> */}

              {/* <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 duration-500" /> */}
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}
