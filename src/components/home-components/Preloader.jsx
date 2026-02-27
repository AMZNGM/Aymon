'use client'

import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { getProjects } from '@/lib/getProjects'
import { getLogos } from '@/lib/getLogos'
import { images } from '@/components/home-components/hero-components/RandomImages'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)

  useGSAP(() => {
    const loadData = async () => {
      try {
        await getProjects()
        await getLogos()

        setIsLoading(false)
        gsap.set(containerRef.current, { display: 'none' })
      } catch (error) {
        console.error('Error loading data:', error)
        setIsLoading(false)
        gsap.set(containerRef.current, { display: 'none' })
      }
    }

    loadData()
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 })

      const words = Array.from(containerRef.current.querySelectorAll('.word'))

      words.forEach((word) => {
        tl.to(word, {
          opacity: 0,
          scale: 0.8,
          duration: 0.05,
        })

        tl.to(word, {
          opacity: 1,
          scale: 1.2,
          duration: 0.1,
        })
      })

      for (let i = 0; i < 10; i++) {
        tl.to(containerRef.current, { backgroundColor: '#000', duration: 0.01 })
        tl.to(containerRef.current, { backgroundColor: '#fff', duration: 0.01 })
      }

      const imgsTl = gsap.timeline({ repeat: -1 })
      const bgImages = Array.from(containerRef.current.querySelectorAll('.bgImage'))

      bgImages.forEach((image, index) => {
        imgsTl.to(image, {
          opacity: 1,
          duration: 0.05,
          onStart: () => {
            bgImages.forEach((otherBg, otherIndex) => {
              if (otherIndex !== index) {
                gsap.set(otherBg, { opacity: 0 })
              }
            })
          },
        })
        imgsTl.to(image, { opacity: 0, duration: 0.05 })
      })

      tl.add(imgsTl)
    },
    { scope: containerRef, dependencies: [isLoading] }
  )

  return (
    <div
      ref={containerRef}
      className="z-9999 fixed inset-0 w-dvw h-dvh flex flex-col justify-center items-center gap-4 bg-text font-bold text-bg text-4xl md:text-6xl p-4"
    >
      <span className="word">i</span>
      <span className="word">shut</span>
      <span className="word">my</span>
      <span className="word">Eyes</span>
      <span className="word">to</span>
      <span className="word">see</span>

      {images.slice(1).map((image, index) => (
        <div key={index} style={{ backgroundImage: `url(${image.src})` }} className="absolute inset-0 bg-contain bg-center bgImage" />
      ))}
    </div>
  )
}
