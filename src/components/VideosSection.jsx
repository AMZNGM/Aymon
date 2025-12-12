'use client'

import { motion } from 'motion/react'

const projects = [
  {
    img: '/videos/randomVideos/visualCard.mp4',
    title: 'Visual Card',
  },
  {
    img: '/videos/randomVideos/cold.mp4',
    title: 'Cold',
  },
  {
    img: '/videos/randomVideos/feeling.mp4',
    title: 'Feeling',
  },
  {
    img: '/videos/randomVideos/eyes.mp4',
    title: 'Eyes',
  },
  {
    img: '/videos/randomVideos/awarnessUrbnlanes.mp4',
    title: 'Awarness Urbnlanes',
  },
  {
    img: '/videos/randomVideos/plastine.mp4',
    title: 'Plastine',
  },
]

export default function VideosSection() {
  return (
    <div className="reltive columns-1 sm:columns-2 lg:columns-3 gap-4 py-12 pe-1 max-md:px-1">
      {projects.map((project, index) => (
        <motion.article
          key={index}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-4 break-inside-avoid"
        >
          <video
            loop
            muted
            autoPlay
            playsInline
            webkit-playsinline="true"
            controls={false}
            src={project.img}
            className="w-full h-auto rounded-2xl border border-bg/25 pointer-events-none"
          />
        </motion.article>
      ))}
    </div>
  )
}
