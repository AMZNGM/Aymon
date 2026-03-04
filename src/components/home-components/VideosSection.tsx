import { SwapyItem, SwapyLayout, SwapySlot } from '@/components/ui/Swapy'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import SwapPoints from '@/components/ui/SwapPoints'
import FloatingEffect from '@/components/ui/effect/FloatingEffect'
import AutoVideo from '@/components/ui/AutoVideo'

const videos = [
  '/videos/LR_1_1.mp4',
  '/videos/edfeeling.mp4',
  '/videos/P2_1_1.mp4',
  '/videos/Plastine_1_1.mp4',
  '/videos/awarness_1.mp4',
  '/videos/K8_1_1.mp4',
  '/videos/H1_1_1.mp4',
  '/videos/V2_1_1.mp4',
  '/videos/Green_1_1.mp4',
  '/videos/cold_1.mp4',
  '/videos/Eyes_1_1.mp4',
]

export default function VideosSection() {
  return (
    <section className="relative overflow-hidden text-bg px-1 py-12 max-md:py-12">
      <SwapPoints />

      <SwapyLayout config={{ animation: 'dynamic' }}>
        <AnimIn className="z-20 relative gap-4 columns-1 sm:columns-2 lg:columns-3">
          {videos.map((video, index) => (
            <SwapySlot key={index} id={`slot-${index}`} className="break-inside-avoid mb-4">
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
                        src={video}
                        className="w-full h-auto rounded-2xl pointer-events-none"
                      />
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
