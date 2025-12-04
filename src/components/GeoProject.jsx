'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { geo1, geo2, geo3, geo4, geo5 } from '@/data/media-data/media-imports'

export default function GeoProject() {
  const sectionRef = useRef(null)
  const images = [
    { src: geo1, width: 800, height: 1000, alt: 'Geo1 Image' },
    { src: geo2, width: 800, height: 1000, alt: 'Geo2 Image' },
    { src: geo3, width: 800, height: 1000, alt: 'Geo3 Image' },
    { src: geo4, width: 800, height: 800, alt: 'Geo4 Image' },
    { src: geo5, width: 800, height: 800, alt: 'Geo5 Image' },
  ]

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: window.innerWidth > 640 ? true : false,
        },
      })

      const images = gsap.utils.toArray('.gsap-image')
      const staticPositions = [
        { x: window.innerWidth * 0.25, y: window.innerHeight * -0.35 },
        { x: -window.innerWidth * 0.05, y: window.innerHeight * -0.25 },
        { x: window.innerWidth * 0.15, y: window.innerHeight * 0.05 },
        { x: -window.innerWidth * 0.08, y: window.innerHeight * 0.25 },
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.35 },
      ]
      const mobileStaticPositions = [
        { x: window.innerWidth * 0.25, y: window.innerHeight * -0.15 },
        { x: -window.innerWidth * 0.05, y: window.innerHeight * -0.05 },
        { x: window.innerWidth * 0.15, y: window.innerHeight * 0.05 },
        { x: -window.innerWidth * 0.08, y: window.innerHeight * 0.15 },
        { x: window.innerWidth * 0.3, y: window.innerHeight * 0.25 },
      ]

      images.forEach((img, index) => {
        tl.fromTo(
          img,
          {
            rotation: gsap.utils.random(-45, 45),
            scale: gsap.utils.random(0.75, 0.8),
            opacity: 1,
          },
          {
            x: window.innerWidth > 640 ? staticPositions[index].x + 65 : mobileStaticPositions[index].x + 65,
            y: window.innerWidth > 640 ? staticPositions[index].y : mobileStaticPositions[index].y,
            rotation: gsap.utils.random(-10, 10),
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative lg:w-[75%] ms-auto">
      <div className="relative h-screen">
        {images.map((image, index) => (
          <div
            key={index}
            className="gsap-image absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 will-change-transform cursor-grab active:cursor-grabbing"
          >
            <motion.div
              initial={{ opacity: 0, y: 300 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 1 }}
              className="relative w-100 max-sm:w-55"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="220px"
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="object-cover select-none rounded-2xl cursor-zoom-in"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
