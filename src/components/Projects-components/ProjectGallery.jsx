'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Fullscreen } from 'lucide-react'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'
import ClickEffect from '@/components/ui/effect/ClickEffect'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function ProjectGallery({ project }) {
  const { scrollXProgress } = useScroll()

  const [showGallery, setShowGallery] = useState(false)
  const projectImages = Object.keys(project)
    .filter((key) => key.startsWith('image') && key !== 'image')
    .map((key) => project[key])
    .filter(Boolean)

  const openGallery = () => setShowGallery(true)
  const closeGallery = () => setShowGallery(false)

  useScrollLock(showGallery)

  return (
    <>
      <button onClick={openGallery}>
        <ClickEffect className="flex justify-center items-center rounded-lg bg-bg/10 hover:bg-bg/30 duration-100 cursor-pointer p-3.5 z-0">
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
            initial={{ scale: 0, x: '100%', y: '100%' }}
            animate={{ scale: 1, x: 0, y: 0 }}
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

            <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-4 overflow-auto p-4">
              {projectImages.map((imageName, index) => (
                <div key={index} className="group relative aspect-video rounded-lg border border-text/25 overflow-hidden">
                  <Image
                    src={imageName || ''}
                    alt={`${project.client} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-103 duration-200 cursor-zoom-in"
                  />

                  <div className="absolute -bottom-10 left-0 p-2 group-hover:bottom-0 duration-300">
                    <p className="w-fit bg-text/25 text-text text-xs font-medium rounded-lg p-2">
                      {project.client} - {index + 1}
                    </p>
                  </div>

                  <div className="absolute -bottom-10 right-0 p-2 group-hover:bottom-0 duration-300">
                    <div className="bg-text/25 rounded-lg p-2">
                      <Fullscreen size={15} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
