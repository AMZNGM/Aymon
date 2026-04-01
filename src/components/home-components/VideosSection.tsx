'use client'

import { useEffect, useState } from 'react'
import { SwapyItem, SwapyLayout, SwapySlot } from '@/components/ui/Swapy'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import SwapPoints from '@/components/ui/SwapPoints'
import FloatingEffect from '@/components/ui/effect/FloatingEffect'
import AutoVideo from '@/components/ui/AutoVideo'
import { getVideos } from '@/lib/getVideos'
import type { Video } from '@/types/admin.types'

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoData = await getVideos()
        setVideos(videoData)
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <section className="relative overflow-hidden text-bg px-1 py-12 max-md:py-12">
        <div className="opacity-60 text-center">Loading videos...</div>
      </section>
    )
  }

  if (videos.length === 0) {
    return null // Don't show the section if no videos
  }

  return (
    <section className="relative overflow-hidden text-bg px-1 py-12 max-md:py-12">
      <SwapPoints />

      <SwapyLayout config={{ animation: 'dynamic' }}>
        <AnimIn className="z-20 relative gap-4 columns-1 sm:columns-2 lg:columns-3">
          {videos.map((video, index) => (
            <SwapySlot key={video.firestoreId} id={`slot-${index}`} className="group break-inside-avoid mb-4">
              <SwapyItem id={`item-${index}`}>
                <div className="w-full h-full">
                  <FloatingEffect>
                    <article className="w-full">
                      <AutoVideo
                        loop
                        muted
                        playsInline
                        webkit-playsinline="true"
                        controls={false}
                        src={video.url}
                        poster={video.thumbnail}
                        className="w-full h-full object-cover rounded-2xl pointer-events-none"
                        title={video.title}
                      />
                      {video.title && (
                        <div className="bottom-4 left-4 absolute bg-bg/25 opacity-0 group-hover:opacity-90 backdrop-blur-2xl rounded-2xl text-text text-sm text-center transition-opacity duration-300 p-4">
                          {video.title}
                        </div>
                      )}
                    </article>
                  </FloatingEffect>
                </div>
              </SwapyItem>
            </SwapySlot>
          ))}
        </AnimIn>
      </SwapyLayout>
    </section>
  )
}
