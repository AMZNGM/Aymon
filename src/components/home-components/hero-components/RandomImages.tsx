'use client'

import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { Draggable } from 'gsap/dist/Draggable'
import { useGSAP } from '@gsap/react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable)
}

type ImageConfig = {
  src: string
  alt: string
  x: string
  y: string
  r: number
}

const IMAGES: ImageConfig[] = [
  { src: '/images/hero-Images/Asfour.webp', alt: 'Asfour', x: '0dvw', y: '-10dvh', r: -15 },
  { src: '/images/hero-Images/aymon-self-portrait.webp', alt: 'Self Portrait', x: '18dvw', y: '-5dvh', r: 8 },
  { src: '/images/hero-Images/caligula.webp', alt: 'Caligula', x: '22dvw', y: '100dvh', r: 5 },
  { src: '/images/hero-Images/Crow2.webp', alt: 'Crow', x: '-20dvw', y: '-1dvh', r: -5 },
  { src: '/images/hero-Images/Folk.webp', alt: 'Folk', x: '0dvw', y: '30dvh', r: -12 },
  { src: '/images/hero-Images/Forcing.webp', alt: 'Forcing', x: '20dvw', y: '50dvh', r: 8 },
  { src: '/images/hero-Images/Inside.webp', alt: 'Inside', x: '-25dvw', y: '40dvh', r: 5 },
  { src: '/images/hero-Images/Metro.webp', alt: 'Metro', x: '-18dvw', y: '80dvh', r: -5 },
  { src: '/images/hero-Images/Working24.webp', alt: 'Working24', x: '10dvw', y: '90dvh', r: 12 },
  { src: '/images/hero-Images/Perspective.webp', alt: 'Perspective', x: '0dvw', y: '120dvh', r: -18 },
  { src: '/images/hero-Images/Pigeon.webp', alt: 'Pigeon', x: '13dvw', y: '150dvh', r: 15 },
  { src: '/images/hero-Images/Proof.webp', alt: 'Proof', x: '-23dvw', y: '118dvh', r: -10 },
]

export default function RandomImages() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 769px)',
          mobile: '(max-width: 768px)',
        },
        (context) => {
          const { desktop, mobile } = context.conditions!

          const visibleImages = mobile ? IMAGES.slice(0, 10) : IMAGES
          const imgs = gsap.utils.toArray<HTMLElement>('.gsap-image')

          const tl = gsap.timeline({
            scrollTrigger: desktop
              ? {
                  trigger: containerRef.current,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1,
                  pin: true,
                }
              : undefined,
          })

          imgs.forEach((img, i) => {
            const { x, y, r } = visibleImages[i % visibleImages.length]

            tl.fromTo(
              img,
              {
                x: 0,
                y: mobile ? -180 : 0,
                rotation: gsap.utils.random(-45, 45),
                scale: gsap.utils.random(0.75, 0.8),
                zIndex: Math.min(i, 10),
              },
              {
                x,
                y,
                rotation: r,
                scale: gsap.utils.random(0.7, 1),
                ease: 'power2.out',
                duration: 1,
              },
              i * 0.05
            )
          })

          const draggable = Draggable.create(imgs, {
            type: 'x,y',
            inertia: true,
            bounds: sectionRef.current ?? undefined,
            allowEventDefault: true,
            allowNativeTouchScrolling: true,
            onRelease: () => imgs.forEach((img) => (img.style.zIndex = '30')),
          })

          return () => {
            tl.kill()
            draggable.forEach((d) => d.kill())
          }
        }
      )

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section ref={sectionRef} className="h-[300dvh] max-md:h-[170dvh]">
      <div ref={containerRef} className="relative flex justify-center items-center h-dvh">
        {IMAGES.map((img, i) => (
          <div key={i} className="absolute cursor-grab active:cursor-grabbing will-change-transform gsap-image">
            <AnimIn delay={0.07 * i}>
              <ImageIn
                src={img.src}
                alt={img.alt}
                className="h-fit! rounded-2xl select-none openInModal"
                divClassName="h-100 w-[25dvw] max-md:w-[50dvw] max-lg:w-[33dvw] 2xl:w-[22dvw]"
              />
            </AnimIn>
          </div>
        ))}
      </div>
    </section>
  )
}
