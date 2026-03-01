'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap, Draggable, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'

const IMAGES = [
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
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => {
      gsap.killTweensOf('.gsap-image')
      ScrollTrigger.killAll()
      setIsMobile(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useGSAP(
    () => {
      if (!containerRef.current) return
      const imgs = gsap.utils.toArray('.gsap-image')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? '' : 'top top',
          end: isMobile ? '' : 'bottom top',
          scrub: isMobile ? false : 1,
          pin: !isMobile,
        },
      })

      imgs.forEach((img, i) => {
        const { x, y, r } = IMAGES[i % IMAGES.length]
        tl.fromTo(
          img,
          {
            x: 0,
            y: isMobile ? -180 : 0,
            rotation: gsap.utils.random(-45, 45),
            scale: gsap.utils.random(0.75, 0.8),
            zIndex: Math.min(i, 10),
          },
          { x, y, rotation: r, scale: gsap.utils.random(0.7, 1), ease: 'power2.out', duration: 1 },
          i * 0.05
        )
      })

      Draggable.create(imgs, {
        type: 'x,y',
        inertia: true,
        bounds: sectionRef.current,
        allowEventDefault: true,
        allowNativeTouchScrolling: true,
        onRelease: () => isMobile && imgs.forEach((img) => (img.style.zIndex = 30)),
      })
    },
    { scope: containerRef, dependencies: [isMobile] }
  )

  const visibleImages = isMobile ? IMAGES.slice(0, 10) : IMAGES

  return (
    <section ref={sectionRef} className="h-[300dvh] max-md:h-[170dvh]">
      <div key={isMobile ? 'mobile' : 'desktop'} ref={containerRef} className="relative h-dvh flex justify-center items-center">
        {visibleImages.map((img, i) => (
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
