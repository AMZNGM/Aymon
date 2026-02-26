'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { usePreloader } from '@/context/PreloaderContext'
import { getProjects } from '@/lib/getProjects'
import { getLogos } from '@/lib/getLogos'
import { easings } from '@/utils/anim'
import { images } from '@/components/home-components/hero-components/RandomImages'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function Preloader() {
  const { setIsComplete } = usePreloader()
  const containerRef = useRef(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        await getProjects()
        await getLogos()
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true)
          gsap.set(containerRef.current, { display: 'none' })
        },
      })

      const imgElements = gsap.utils.toArray('.preloader-image')

      imgElements.forEach((img, index) => {
        const angleOffset = (index / imgElements.length) * Math.PI * 2
        const radius = 25 + (index % 2.2) * 15
        const x = Math.cos(angleOffset) * radius
        const y = Math.sin(angleOffset) * radius

        gsap.to(img, {
          x: `${x}dvw`,
          y: `${y - 10}dvh`,
          delay: 2.6 + index * 0.1,
        })
      })

      tl.to(
        containerRef.current,
        {
          scale: window.innerWidth < 768 ? 1 : 18,
          duration: 2.8,
          ease: easings.gsap,
        },
        '+=4.4'
      )

      tl.to(imgElements, { opacity: 0 })
      tl.to(containerRef.current, { scale: 1 })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden bg-text">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            style={{ transform: `translate(-50%, -50%) rotate(${images[index].rotation}deg)` }}
            className="top-1/2 left-1/2 absolute will-change-transform preloader-image"
          >
            <AnimIn center blur delay={0.2 * index} className="duration-300">
              <img
                src={image.src}
                alt={image.alt}
                className="w-[25dvw] max-md:w-[50dvw] max-lg:w-[33dvw] 2xl:w-[22dvw] h-fit object-cover rounded-2xl"
              />
            </AnimIn>
          </div>
        ))}
      </div>
    </div>
  )
}
