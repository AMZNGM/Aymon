'use client'

import { motion } from 'motion/react'

const projects = [
  {
    img: '/videos/randomVideos/visualCard.mp4',
    title: 'Visual Card',
  },
  {
    img: '/videos/randomVideos/plastine.mp4',
    title: 'Plastine',
  },
  {
    img: '/videos/randomVideos/cold.mp4',
    title: 'Cold',
  },
  {
    img: '/videos/randomVideos/K8.mp4',
    title: 'K8',
  },
  {
    img: '/videos/randomVideos/feeling.mp4',
    title: 'Feeling',
  },
  {
    img: '/videos/randomVideos/Green.mp4',
    title: 'Green',
  },
  {
    img: '/videos/randomVideos/eyes.mp4',
    title: 'Eyes',
  },
  {
    img: '/videos/randomVideos/H1.mp4',
    title: 'H1',
  },
  {
    img: '/videos/randomVideos/LR.mp4',
    title: 'LR',
  },
  {
    img: '/videos/randomVideos/O6.mp4',
    title: 'O6',
  },
  {
    img: '/videos/randomVideos/P2.mp4',
    title: 'P2',
  },
  {
    img: '/videos/randomVideos/awarnessUrbnlanes.mp4',
    title: 'Awarness Urbnlanes',
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
