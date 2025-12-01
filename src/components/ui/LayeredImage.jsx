'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { mainPhotoNoBG } from '@/data/media-data/media-imports'

export default function LayeredImage() {
  const sectionRef = useRef()

  useGSAP(() => {
    const maskImgs = gsap.utils.toArray('.imgMask')

    maskImgs.forEach((maskImg, index) => {
      maskImg.addEventListener('mouseenter', () => {
        gsap.to(maskImg, { scale: 0.5 + index * 0.02, rotation: '-=50', duration: 2, overwrite: true })
      })
      maskImg.addEventListener('mouseleave', () => {
        gsap.to(maskImg, {
          scale: gsap.getProperty(maskImg, 'scale'),
          rotation: 0,
          duration: 1,
          overwrite: true,
        })
      })
    })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 4}px`,
      scrub: 1,
      onUpdate: (self) => {
        maskImgs.forEach((maskImg, index) => {
          const targetScale = 0.9 - index * 0.15
          const currentScale = 1.0
          const progressFactor = Math.min(self.progress / 0.9, 1.0)
          const finalScale = currentScale + progressFactor * (targetScale - currentScale)
          gsap.to(maskImg, { scale: finalScale, overwrite: true })
        })

        maskImgs.forEach((maskImg, index) => {
          const maxRotation = 100
          const targetRotation = index * (maxRotation / (maskImgs.length - 1))
          const finalRotation = self.progress * targetRotation
          gsap.to(maskImg, { rotate: finalRotation })
        })
      },
    })
  })

  return (
    <section ref={sectionRef} className="relative size-50">
      <Image src={mainPhotoNoBG} alt="Main Image" priority className="size-full object-cover will-change-transform" />

      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="imgMask absolute inset-0 will-change-transform">
          <Image src={mainPhotoNoBG} alt="Mask Image" priority className="size-full object-cover will-change-transform" />
        </div>
      ))}
    </section>
  )
}
