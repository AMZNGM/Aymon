'use client'

import { useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { useScrollLock } from 'usehooks-ts'
import { usePreloader } from '@/components/app-components/PreloaderContext'
import { getProjects } from '@/lib/getProjects'
import { getLogos } from '@/lib/getLogos'
import { easings } from '@/utils/anim'
import { images } from '@/components/home-components/hero-components/RandomImages'

export default function Preloader() {
  const { setIsComplete } = usePreloader()
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef(null)

  useGSAP(() => {
    const loadData = async () => {
      const scrollAndComplete = () => {
        gsap.to(
          {},
          {
            duration: 1,
            ease: easings.gsap,
            onUpdate: function () {
              const progress = this.progress()
              window.scrollTo({
                top: window.innerHeight * progress,
                behavior: 'auto',
              })
            },
            onComplete: () => {
              setIsLoading(false)
              setIsComplete(true)
              gsap.set(containerRef.current, { display: 'none' })
            },
          }
        )
      }

      try {
        await getProjects()
        await getLogos()

        setTimeout(scrollAndComplete, 3000)
      } catch (error) {
        console.error('Error loading data:', error)
        setTimeout(scrollAndComplete, 3000)
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

      const bgImages = Array.from(containerRef.current.querySelectorAll('.bgImage'))

      bgImages.forEach((image, index) => {
        tl.to(image, {
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
        tl.to(image, { opacity: 0, duration: 0.05 })
      })

      if (!isLoading) {
        gsap.set(containerRef.current, { backgroundColor: '#fff' })
      }
    },
    { scope: containerRef, dependencies: [isLoading] }
  )

  useScrollLock()

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="z-9999 relative w-dvw h-dvh overflow-hidden flex flex-col justify-center items-center gap-4 bg-text font-bold text-bg text-4xl md:text-6xl p-4"
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
