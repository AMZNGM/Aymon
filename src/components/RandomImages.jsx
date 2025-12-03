'use client'

import Image from 'next/image'
import { useRef, useMemo } from 'react'
import { gsap, Draggable } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { imagesData } from '@/data/media-data/media-imports'

export default function RandomImages() {
  const sectionRef = useRef(null)
  const gridPositions = useMemo(() => {
    return imagesData.map((img, i) => ({
      id: i,
      src: img,
    }))
  }, [])

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          scrub: true,
          pin: true,
        },
      })

      const images = gsap.utils.toArray('.grid-image')
      images.forEach((img) => {
        tl.fromTo(
          img,
          {
            x: gsap.utils.random(window.innerWidth * 0.35, -window.innerWidth * 0.1),
            y: gsap.utils.random(window.innerHeight * 0.2, -window.innerHeight * 0.2),
            rotation: gsap.utils.random(-45, 45),
            scale: gsap.utils.random(0.75, 0.8),
            opacity: 1,
          },
          {
            x: gsap.utils.random(window.innerWidth * 0.35, -window.innerWidth * 0.1),
            y: gsap.utils.random(window.innerHeight * 0.99, -window.innerHeight * 0.2),
            rotation: gsap.utils.random(-10, 10),
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        ).to({}, { duration: 1.1 }, '<')
      })

      let highestZIndex = 10
      Draggable.create(images, {
        type: 'x,y',
        inertia: true,
        bounds: sectionRef.current,
        onDragStart: function () {
          gsap.to(this.target, { zIndex: 100, duration: 0.2 })
        },
        onDragEnd: function () {
          highestZIndex += 1
          gsap.to(this.target, { zIndex: highestZIndex, duration: 0.2 })
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative lg:w-[75%] ms-auto lg:z-50">
      <div className="relative h-screen">
        {gridPositions.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="grid-image absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 max-lg:translate-x-24! max-lg:-translate-y-30! max-sm:translate-x-12! will-change-transform cursor-grab active:cursor-grabbing opacity-0"
          >
            <div className="relative w-100 max-sm:w-55">
              <Image
                src={item.src}
                alt={`Grid Image ${item.id + 1}`}
                className="object-cover pointer-events-none select-none rounded-2xl"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="h-[80vh]" />
    </section>
  )
}
