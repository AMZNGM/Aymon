'use client'

import Image from 'next/image'
import { useRef, useMemo } from 'react'
import { gsap, Draggable } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { imagesData } from '@/data/media-data/media-imports'

export default function PixelChartGrid() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const IMG_SIZE = 250
  const gridPositions = useMemo(() => {
    return imagesData.map((img, i) => ({
      id: i,
      src: img,
    }))
  }, [])

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current || window.innerWidth < 678) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        },
      })

      const images = gsap.utils.toArray('.grid-image')
      images.forEach((img) => {
        gsap.set(img, {
          x: gsap.utils.random(window.innerHeight * 0.9, window.innerHeight * 0.1) - 280,
          y: gsap.utils.random(-window.innerHeight * 0.3, window.innerHeight * 0.1) + 80,
          rotation: gsap.utils.random(-45, 45),
          scale: gsap.utils.random(0.25, 0.75),
        })
        tl.to(
          img,
          {
            x: gsap.utils.random(window.innerHeight * 1.2, window.innerHeight * 0.1) - 380,
            y: gsap.utils.random(-window.innerHeight * 0.5, window.innerHeight * 2.2) + 180,
            rotation: gsap.utils.random(-10, 10),
            scale: gsap.utils.random(0.75, 1),
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        ).to({}, { duration: 1.1 }, '<')
      })

      Draggable.create(images, {
        type: 'x,y',
        inertia: true,
        onDragStart: function () {
          gsap.to(this.target, { scale: 1.1, zIndex: 100, duration: 0.2 })
        },
        onDragEnd: function () {
          gsap.to(this.target, { scale: 1, zIndex: 1, duration: 0.2 })
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative w-screen h-screen">
      <div ref={gridRef} className="size-full">
        {gridPositions.map((item) => (
          <div
            key={item.id}
            className="grid-image absolute top-1/2 left-1/2 -translate-1/2 will-change-transform cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-100 max-md:w-32">
              <Image
                src={item.src}
                alt={`Grid Image ${item.id + 1}`}
                className="object-cover pointer-events-none select-none rounded-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
