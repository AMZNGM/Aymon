'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import marwanPablo from '../../public/images/selectedImgs/marwanPablo/halal.webp'
import geo from '../../public/images/selectedImgs/geo/geo1.webp'
import menage from '../../public/images/selectedImgs/ghadaAbdelrazikXMenage07/menage.webp'
import blitz from '../../public/images/selectedImgs/blitz/blitz1.webp'

const leftColumn = [
  { src: marwanPablo, title: 'Marwan Pablo', tall: true },
  { src: geo, title: 'Geo Project', tall: false },
]

const rightColumn = [
  { src: menage, title: 'Menage x Ghada', tall: false },
  { src: blitz, title: 'Blitz', tall: true },
]

export default function SelectedWork() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="relative w-full h-full py-12 px-1">
      <motion.h2
        initial={{ y: 100, opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-12"
      >
        Selected Work
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          {leftColumn.map((item, idx) => {
            const globalIndex = idx // 0 / 1
            return (
              <motion.div
                key={globalIndex}
                className={`
                  relative group overflow-hidden cursor-pointer
                  transition-all duration-500
                  ${item.tall ? 'h-[600px]' : 'h-[300px]'}
                  ${idx === 0 ? 'rounded-full' : 'rounded-3xl'}
                `}
                onHoverStart={() => setHoveredIndex(`L${idx}`)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{
                  filter:
                    hoveredIndex !== null && hoveredIndex !== `L${idx}`
                      ? 'blur(0px)' // no blur ON the hovered item itself
                      : 'none',
                  scale: hoveredIndex === `L${idx}` ? 1.03 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  className="object-cover w-full h-full rounded-3xl duration-700 group-hover:scale-110 select-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* TITLE OVERLAY */}
                <AnimatePresence>
                  {hoveredIndex === `L${idx}` && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      <motion.span
                        animate={{ x: [0, 12, -12, 12, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-white text-4xl font-bold uppercase tracking-wide"
                      >
                        {item.title}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">
          {rightColumn.map((item, idx) => {
            const globalIndex = idx // 0 / 1
            return (
              <motion.div
                key={globalIndex}
                className={`
                  relative group overflow-hidden rounded-3xl cursor-pointer
                  transition-all duration-500
                  ${item.tall ? 'h-[600px]' : 'h-[300px]'}
                `}
                onHoverStart={() => setHoveredIndex(`R${idx}`)}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={{
                  scale: hoveredIndex === `R${idx}` ? 1.03 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  className="object-cover w-full h-full rounded-3xl duration-700 group-hover:scale-110 select-none"
                />

                {/* TITLE */}
                <AnimatePresence>
                  {hoveredIndex === `R${idx}` && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center"
                    >
                      <motion.span
                        animate={{ x: [0, 12, -12, 12, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-white text-4xl font-bold uppercase tracking-wide"
                      >
                        {item.title}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
