'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Fullscreen } from 'lucide-react'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'
import ClickEffect from '@/components/ui/effect/ClickEffect'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function ProjectGallery({ project }) {
  const [showGallery, setShowGallery] = useState(false)
  const projectImages = project.media.gallery || []
  const openGallery = () => setShowGallery(true)
  const closeGallery = () => setShowGallery(false)
  useScrollLock(showGallery)

  return (
    <>
      <button onClick={openGallery}>
        <ClickEffect className="flex justify-center items-center rounded-lg text-main bg-bg/10 hover:bg-bg/30 duration-100 cursor-pointer p-3.5 z-0">
          <VariableFontHoverByRandomLetter label="GAllERY" />
        </ClickEffect>
      </button>

      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-bg/60 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              closeGallery()
            }}
          />

          <motion.div
            initial={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="relative max-w-7xl w-full h-[90vh] max-lg:h-[85vh] bg-bg text-text border border-text/25 rounded-2xl overflow-hidden"
          >
            <CloseBtn
              onClick={(e) => {
                e.stopPropagation()
                closeGallery()
              }}
            />

            <h3 className="text-2xl max-lg:text-xl font-bold font-sec text-text p-4">Project Gallery</h3>

            <div className="h-full overflow-y-scroll p-4 pb-20">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {projectImages.map((imageName, index) => (
                  <div key={index} className="group relative break-inside-avoid rounded-lg border border-text/25 overflow-hidden">
                    <div className="relative h-48 md:h-56 lg:h-64">
                      <Image
                        src={imageName || ''}
                        alt={`${project.client} - Image ${index + 1}`}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-103 duration-200 cursor-zoom-in"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 translate-y-full group-hover:translate-y-0 duration-300">
                      <p className="text-white text-sm font-medium mb-2">
                        {project.client} - {index + 1}
                      </p>
                      <div className="w-fit bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                        <Fullscreen size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
