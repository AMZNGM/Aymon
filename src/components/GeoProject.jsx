'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import geo1 from '../../public/images/selectedImgs/geo/geo1.webp'
import geo2 from '../../public/images/selectedImgs/geo/geo2.webp'
import geo3 from '../../public/images/selectedImgs/geo/geo3.webp'
import geo4 from '../../public/images/selectedImgs/geo/geo4.webp'
import geo5 from '../../public/images/selectedImgs/geo/geo5.webp'
import clientsInfo from '@/data/clients-info.json'

const images = [
  { src: geo1, alt: 'Geo1 Image' },
  { src: geo2, alt: 'Geo2 Image' },
  { src: geo3, alt: 'Geo3 Image' },
  { src: geo4, alt: 'Geo4 Image' },
  { src: geo5, alt: 'Geo5 Image' },
]

export default function GeoProject() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      const isMobile = vw <= 640

      const desktopPositions = [
        { x: vw * 0.25, y: vh * -0.35 },
        { x: -vw * 0.05, y: vh * -0.25 },
        { x: vw * 0.15, y: vh * 0.002 },
        { x: -vw * 0.08, y: vh * 0.25 },
        { x: vw * 0.3, y: vh * 0.35 },
      ]
      const mobilePositions = desktopPositions.map((pos) => ({
        x: pos.x * 0.7,
        y: pos.y * 0.6,
      }))
      const randomValues = images.map(() => ({
        startRotation: gsap.utils.random(-45, 45),
        startScale: gsap.utils.random(0.75, 0.8),
        endRotation: gsap.utils.random(-10, 10),
      }))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: !isMobile,
        },
      })

      const gsapImages = gsap.utils.toArray('.gsap-image')

      gsapImages.forEach((img, index) => {
        const finalPos = isMobile ? mobilePositions[index] : desktopPositions[index]

        tl.fromTo(
          img,
          {
            rotation: randomValues[index].startRotation,
            scale: randomValues[index].startScale,
            opacity: 1,
          },
          {
            x: finalPos.x + 65,
            y: finalPos.y,
            rotation: randomValues[index].endRotation,
            scale: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )
      })

      return () => {
        tl.kill()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative lg:w-[75%] ms-auto">
      <div className="relative h-screen max-md:h-[75vh]">
        {images.map((image, index) => (
          <div
            key={index}
            className="gsap-image absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 will-change-transform transform-gpu"
          >
            <motion.div
              initial={{ opacity: 0, y: 300, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative w-100 max-sm:w-55 will-change-transform transform-gpu"
            >
              <Image
                src={image.src}
                alt={image.alt}
                priority={index === 0}
                fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover select-none rounded-2xl cursor-zoom-in"
              />
            </motion.div>
          </div>
        ))}
      </div>

      <motion.span
        initial={{ y: 100, filter: 'blur(10px)' }}
        whileInView={{ y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute top-4 lg:right-4 max-lg:left-1 w-full text-5xl max-md:text-xl lg:text-end font-bold uppercase"
      >
        #1 {clientsInfo[1].client}
      </motion.span>
    </section>
  )
}
