'use client'

import { useRef } from 'react'
import { gsap, Draggable } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useIsMobile } from '@/hooks/useIsMobile'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'

const images = [
  { src: '/images/hero-Images/Asfour.webp', alt: 'Asfour' },
  { src: '/images/hero-Images/aymon-self-portrait.webp', alt: 'Aymon Self Portrait' },
  { src: '/images/hero-Images/caligula.webp', alt: 'Caligula' },
  { src: '/images/hero-Images/Crow.webp', alt: 'Crow' },
  { src: '/images/hero-Images/Folk.webp', alt: 'Folk' },
  { src: '/images/hero-Images/Forcing.webp', alt: 'Forcing' },
  { src: '/images/hero-Images/Inside.webp', alt: 'Inside' },
  { src: '/images/hero-Images/Metro.webp', alt: 'Metro' },
  { src: '/images/hero-Images/Working24.webp', alt: 'Working24' },
  { src: '/images/hero-Images/Perspective.webp', alt: 'Perspective' },
  { src: '/images/hero-Images/Pigeon.webp', alt: 'Pigeon' },
  { src: '/images/hero-Images/Proof.webp', alt: 'Proof' },
]

const toPositions = [
  { x: '0dvw', y: '-10dvh', rotate: -15 },
  { x: '18dvw', y: '-5dvh', rotate: 8 },
  { x: '22dvw', y: '100dvh', rotate: 5 },
  { x: '-20dvw', y: '-1dvh', rotate: -5 },
  { x: '0dvw', y: '30dvh', rotate: -12 },
  { x: '20dvw', y: '50dvh', rotate: 8 },
  { x: '-25dvw', y: '40dvh', rotate: 5 },
  { x: '-18dvw', y: '80dvh', rotate: -5 },
  { x: '10dvw', y: '70dvh', rotate: 12 },
  { x: '0dvw', y: '90dvh', rotate: -18 },
  { x: '13dvw', y: '135dvh', rotate: 15 },
  { x: '-23dvw', y: '118dvh', rotate: -10 },
]

export default function RandomImages() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const AllImages = isMobile ? images.slice(0, 10) : images

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const images = gsap.utils.toArray('.gsap-image')
      const isMobile = window.innerWidth <= 768

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? '' : 'top top',
          end: isMobile ? '' : 'bottom top',
          scrub: isMobile ? false : 1,
          pin: isMobile ? false : true,
        },
      })

      images.forEach((img, index) => {
        const toPos = toPositions[index % toPositions.length]

        tl.fromTo(
          img,
          {
            x: 0,
            y: isMobile ? -180 : 0,
            rotation: gsap.utils.random(45, -45),
            scale: gsap.utils.random(0.75, 0.8),
            opacity: 1,
            zIndex: Math.min(index, 10),
          },
          {
            x: toPos.x,
            y: toPos.y,
            rotation: toPos.rotate,
            scale: gsap.utils.random(0.7, 1),
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
          },
          index * 0.05
        )
      })

      Draggable.create(images, {
        type: 'x,y',
        inertia: true,
        bounds: containerRef.current,
        allowEventDefault: true,
        allowNativeTouchScrolling: true,
        onRelease: function () {
          if (isMobile) {
            images.forEach((img) => {
              img.style.zIndex = 30
            })
          }
        },
        // onPress: function () {
        //   gsap.killTweensOf(this.target)
        // },
      })
    },
    { scope: sectionRef }
  )

  return (
    <div ref={containerRef} className="h-[300dvh] max-md:h-[170dvh]">
      <section ref={sectionRef} className="relative h-dvh flex justify-center items-center">
        {AllImages.map((image, index) => (
          <div key={index} className="absolute cursor-grab active:cursor-grabbing will-change-transform gsap-image">
            <AnimIn delay={0.07 * index}>
              <ImageIn
                src={image.src}
                alt={image.alt}
                className="h-fit! rounded-2xl select-none openInModal"
                divClassName="aspect-square w-[25dvw] max-md:w-[50dvw] max-lg:w-[33dvw] 2xl:w-[22dvw]"
              />
            </AnimIn>
          </div>
        ))}
      </section>
    </div>
  )
}
