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
      if (!sectionRef.current || !gridRef.current) return
      const images = gsap.utils.toArray('.grid-image')
      const vh = window.innerHeight
      const vw = window.innerWidth

      images.forEach((img) => {
        gsap.set(img, {
          x: gsap.utils.random(vw * 0.9, vw * 0.5) - 350,
          y: gsap.utils.random(-vh * 0.2, vh * 0.2) + 350,
          rotation: gsap.utils.random(-90, 90),
          scale: gsap.utils.random(0.5, 1.5),
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
        },
      })

      images.forEach((img, i) => {
        const targetX = gsap.utils.random(vw * 1.1, vw * 0.5) - 550
        const targetY = gsap.utils.random(-vh * 0.5, vh * 0.5) + 350
        tl.to(
          img,
          {
            x: targetX,
            y: targetY,
            rotation: gsap.utils.random(-10, 10),
            scale: gsap.utils.random(0.5, 1.5),
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
    <section ref={sectionRef} className="relative w-screen min-h-screen max-md:h-[300vh] overflow-hidden z-20">
      <div ref={gridRef} className="size-full">
        {gridPositions.map((item) => (
          <div
            key={item.id}
            className="grid-image size-full absolute inset-0 cursor-grab active:cursor-grabbing will-change-transform"
            style={{ width: IMG_SIZE, height: IMG_SIZE }}
          >
            <div className="relative size-full bg-bg rounded-2xl">
              <Image
                src={item.src}
                alt={`Grid Image ${item.id}`}
                fill
                sizes={`${IMG_SIZE}px`}
                className="object-cover pointer-events-none rounded-2xl select-none"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
