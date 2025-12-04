'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, Draggable } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
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
  const images = [
    { src: aymonPortrait, width: 480, height: 640, alt: 'Aymon Portrait' },
    { src: asfour, width: 800, height: 800, alt: 'Asfour Image' },
    { src: caligula, width: 800, height: 800, alt: 'Caligula Image' },
    { src: crow, width: 640, height: 800, alt: 'Crow Image' },
    { src: folk, width: 640, height: 800, alt: 'Folk Image' },
    { src: forcing, width: 640, height: 800, alt: 'Forcing Image' },
    { src: haramt, width: 800, height: 800, alt: 'Haramt Image' },
    { src: inside, width: 800, height: 800, alt: 'Inside Image' },
    { src: metro, width: 640, height: 800, alt: 'Metro Image' },
    { src: working, width: 640, height: 640, alt: 'Working Image' },
    { src: pigeon, width: 640, height: 800, alt: 'Pigeon Image' },
    { src: proof, width: 640, height: 800, alt: 'Proof Image' },
    { src: perspective, width: 640, height: 640, alt: 'Perspective Image' },
  ]

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
        bounds: window.innerWidth > 640 ? sectionRef.current : null,
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
    <section ref={sectionRef} className="relative w-screen lg:w-[75%] lg:ms-auto overflow-hidden lg:z-50">
      <div className="relative h-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className="grid-image absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 max-lg:translate-x-24! max-lg:-translate-y-30! max-sm:translate-x-12! will-change-transform cursor-grab active:cursor-grabbing sm:opacity-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative w-100 max-sm:w-55"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="220px"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="object-cover select-none rounded-2xl cursor-grab active:cursor-grabbing"
              />
            </motion.div>
          </div>
        ))}
      </div>
      <div className="h-[80vh] max-sm:h-[70vh]" />
    </section>
  )
}
