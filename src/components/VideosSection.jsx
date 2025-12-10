'use client'

import { motion } from 'framer-motion'
import useTextClipPath from '@/hooks/useTextClipPath'

const vids = [
  { src: '/videos/randomVideos/eyes.mp4', alt: 'video 1' },
  { src: '/videos/randomVideos/feeling.mp4', alt: 'video 2' },
  { src: '/videos/randomVideos/visualCard.mp4', alt: 'video 3' },
  { src: '/videos/randomVideos/awarnessUrbnlanes.mp4', alt: 'video 4' },
]

export default function VideosSection() {
  return (
    <section className="relative w-full h-full py-12 px-1">
      <div className="xl:sticky inset-0 max-w-xl text-8xl max-2xl:text-7xl max-xl:text-7xl font-extrabold tracking-[-2px] uppercase">
        <motion.h6 {...useTextClipPath(0, true)}>~See &</motion.h6>
        <motion.h6 {...useTextClipPath(0.1, true)}>~Feel &</motion.h6>
        <motion.h6 {...useTextClipPath(0.2, true)}>~BeAware!</motion.h6>
      </div>

      {vids.map((vid, index) => (
        <div key={index} className="sticky top-0 right-0 flex flex-col items-end">
          <video
            loop
            muted
            autoPlay
            controls={false}
            src={vid.src}
            className="object-cover w-120 rounded-2xl pointer-events-none max-md:mb-2"
          />
        </div>
      ))}
    </section>
  )
}
