'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, Draggable } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import {
  asfour,
  aymonPortrait,
  caligula,
  crow,
  folk,
  forcing,
  haramt,
  inside,
  metro,
  perspective,
  pigeon,
  proof,
  working,
} from '@/data/media-data/media-imports'

export default function RandomImages() {
  const sectionRef = useRef(null)
  const images = [asfour, aymonPortrait, caligula, crow, folk, forcing, haramt, inside, metro, perspective, pigeon, proof, working]

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: window.innerWidth > 640 ? 'top top' : '',
          scrub: window.innerWidth > 640 ? true : false,
          pin: window.innerWidth > 640 ? true : false,
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

      if (window.innerWidth < 640) return
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
    <section ref={sectionRef} className="relative lg:w-[75%] ms-auto overflow-hidden lg:z-50">
      <div className="relative h-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className="grid-image absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 max-lg:translate-x-24! max-lg:-translate-y-30! max-sm:translate-x-12! will-change-transform cursor-grab active:cursor-grabbing sm:opacity-0"
          >
            <div className="relative w-100 max-sm:w-55">
              <Image
                src={image}
                alt={`Random Image`}
                loading="eager"
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
