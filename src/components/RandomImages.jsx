'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, Draggable } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import asfour from '../../public/images/randomImgs/asfour.webp'
import aymonPortrait from '../../public/images/randomImgs/aymonPortrait.webp'
import caligula from '../../public/images/randomImgs/caligula.webp'
import crow from '../../public/images/randomImgs/crow.webp'
import folk from '../../public/images/randomImgs/folk.webp'
import forcing from '../../public/images/randomImgs/forcing.webp'
import haramt from '../../public/images/randomImgs/haramt.webp'
import inside from '../../public/images/randomImgs/inside.webp'
import metro from '../../public/images/randomImgs/metro.webp'
import perspective from '../../public/images/randomImgs/perspective.webp'
import pigeon from '../../public/images/randomImgs/pigeon.webp'
import proof from '../../public/images/randomImgs/proof.webp'
import working from '../../public/images/randomImgs/working.webp'

const images = [
  { src: aymonPortrait, alt: 'Aymon Portrait' },
  { src: asfour, alt: 'Asfour Image' },
  { src: pigeon, alt: 'Pigeon Image' },
  { src: crow, alt: 'Crow Image' },
  { src: folk, alt: 'Folk Image' },
  { src: forcing, alt: 'Forcing Image' },
  { src: metro, alt: 'Metro Image' },
  { src: inside, alt: 'Inside Image' },
  { src: working, alt: 'Working Image' },
  { src: caligula, alt: 'Caligula Image' },
  { src: haramt, alt: 'Haramt Image' },
  { src: proof, alt: 'Proof Image' },
  { src: perspective, alt: 'Perspective Image' },
]

export default function RandomImages() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const isMobile = useIsMobile()

  const desktopPositions = [
    { x: 0, y: -160, rotate: -15 },
    { x: 150, y: -50, rotate: 8 },
    { x: 520, y: -150, rotate: 5 },
    { x: 600, y: 180, rotate: -5 },
    { x: -200, y: 200, rotate: -12 },
    { x: 0, y: 400, rotate: -15 },
    { x: 250, y: 250, rotate: 8 },
    { x: 620, y: 500, rotate: 5 },
    { x: 120, y: 680, rotate: -5 },
    { x: -200, y: 700, rotate: 12 },
    { x: 300, y: 750, rotate: 8 },
    { x: -50, y: 930, rotate: -18 },
    { x: 520, y: 1000, rotate: 15 },
  ]

  const mobilePositions = [
    { x: '10%', y: -80, rotate: -15 },
    { x: '90%', y: -50, rotate: 8 },
    { x: '50%', y: 80, rotate: -6 },
    { x: '90%', y: 260, rotate: 8 },
    { x: '10%', y: 240, rotate: -12 },

    { x: '20%', y: -200, rotate: -20 },
    { x: '80%', y: -100, rotate: 10 },
    { x: '50%', y: 50, rotate: -15 },
    { x: '80%', y: 200, rotate: 10 },
    { x: '20%', y: 180, rotate: -12 },
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
      images.forEach((img, index) => {
        const pos =
          window.innerWidth <= 1536 ? mobilePositions[index % mobilePositions.length] : desktopPositions[index % desktopPositions.length]
        tl.fromTo(
          img,
          {
            rotation: gsap.utils.random(-45, 45),
            scale: gsap.utils.random(0.75, 0.8),
            opacity: 1,
          },
          {
            x: pos.x,
            y: pos.y,
            rotation: pos.rotate,
            scale: window.innerWidth <= 1280 ? gsap.utils.random(0.5, 0.75) : gsap.utils.random(0.75, 1),
            duration: 1,
            ease: 'power2.inOut',
          },
          index * 0.08
        ).to({}, { duration: 1.1 }, '<')
      })

      Draggable.create(images, {
        type: 'x,y',
        inertia: true,
        bounds: containerRef.current,
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative z-0">
      <div ref={containerRef} className="h-[185vh] max-2xl:h-screen">
        <div className="relative h-screen">
          {(isMobile ? images.slice(0, 10) : images).map((image, index) => (
            <div
              key={index}
              className="grid-image absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 will-change-transform cursor-grab active:cursor-grabbing"
            >
              <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative w-100 max-sm:w-55"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  priority={index === 0}
                  fetchPriority={index === 0 || index === 1 ? 'high' : 'auto'}
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover select-none rounded-2xl cursor-grab active:cursor-grabbing"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
