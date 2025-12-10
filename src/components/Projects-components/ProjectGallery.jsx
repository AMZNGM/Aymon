'use client'

import Image from 'next/image'
import { useState } from 'react'
import ClickEffect from '@/components/ui/effect/ClickEffect'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

const GalleryButton = ({ onOpen }) => {
  return (
    <button onClick={onOpen}>
      <ClickEffect className="flex justify-center items-center rounded-lg bg-bg/10 hover:bg-bg/30 duration-100 cursor-pointer p-3.5">
        <VariableFontHoverByRandomLetter label="GAllERY" />
      </ClickEffect>
    </button>
  )
}

export default function ProjectGallery({ project }) {
  const projectImages = [
    project.image,
    project.image2,
    project.image3,
    project.image4,
    project.image5,
    project.image6,
    project.image7,
  ].filter(Boolean)
  const [showGallery, setShowGallery] = useState(false)
  const openGallery = () => setShowGallery(true)
  const closeGallery = () => setShowGallery(false)

  return (
    <>
      <GalleryButton onOpen={openGallery} />

      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              closeGallery()
            }}
          />
          <div className="relative max-w-7xl w-full h-[90vh] max-lg:h-[85vh] bg-bg border border-text/25 rounded-2xl p-6 max-lg:p-4 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeGallery()
              }}
              className="absolute top-4 right-4 z-10 p-2 bg-text/10 hover:bg-text/20 rounded-lg transition-colors text-text"
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl max-lg:text-xl font-bold mb-6 text-text">Project Gallery</h3>

            <div className="h-[calc(90vh-120px)] max-lg:h-[calc(85vh-100px)] overflow-y-auto">
              <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-4">
                {projectImages.map((imageName, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-text/5 group">
                    <Image
                      src={imageName || ''}
                      alt={`${project.client} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/60 to-transparent">
                      <p className="text-white text-xs font-medium">
                        {project.client} - {index + 1}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-white/90 rounded-full p-1">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
