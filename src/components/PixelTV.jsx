'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/utils/gsapConfig'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { videosData } from '@/data/media-data/media-imports'

export default function PixelTV() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectioneRef = useRef(null)
  const tvScreenRef = useRef(null)
  const scanlineRef = useRef(null)
  const slides = videosData.map((video, index) => ({
    id: index,
    video: video,
    text: `CHANNEL ${index + 1}`,
  }))

  useGSAP(() => {
    gsap.to(sectioneRef.current, {
      backgroundColor: '#1d1d1f',
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectioneRef.current,
        start: 'top 10%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.to(tvScreenRef.current, {
      opacity: 0.95,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    gsap.to(scanlineRef.current, {
      top: '100%',
      duration: 2,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section ref={sectioneRef} className="relative w-screen min-h-screen py-12 px-4 z-50">
      <div className="relative h-screen flex flex-col items-center justify-center">
        <div className="font-mono text-text/50 text-sm max-md:text-xs leading-none whitespace-pre">
          {`
╔══════════════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▓                                    ▓║
║▓                                    ▓║
         `}
        </div>

        <div className="relative bg-bg border-8 border-gray-800 rounded-lg shadow-2xl">
          <div
            ref={tvScreenRef}
            className="relative w-200 h-120 max-md:w-160 max-md:h-120 max-sm:w-80 max-sm:h-60 bg-black overflow-hidden"
          >
            {/* CRT Curve Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40 pointer-events-none" />

            {/* scanlines */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
              }}
            />

            {/* moving scanline */}
            <div ref={scanlineRef} className="absolute inset-0 w-full h-1 bg-text opacity-10 pointer-events-none z-20" />

            {/* carousel */}
            <div className="relative size-full p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="size-full flex flex-col items-center justify-center bg-black rounded-lg shadow-lg overflow-hidden"
                >
                  <video
                    key={slides[currentSlide].video}
                    src={slides[currentSlide].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="size-full object-cover"
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-4 left-4 text-text text-xl font-pixel font-bold tracking-wider drop-shadow-md"
                  >
                    {slides[currentSlide].text}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* nav btns */}
            <button
              onClick={prevSlide}
              className="absolute bottom-4 right-12 bg-violet-800 hover:bg-amber-800 hover:rotate-700 text-text rounded-full transition-all cursor-pointer z-30"
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute bottom-4 right-4 bg-violet-800 hover:bg-amber-600 hover:rotate-700 text-text rounded-full transition-all cursor-pointer z-30"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 max-md:hidden">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-4 h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide ? 'bg-amber-300 w-12' : 'bg-text/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="font-mono text-text/50 text-sm max-md:text-xs leading-none whitespace-pre">
          {`    
║▓                        ▓║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
╚══════════════════════════╝
     [■]  [○]  [●]  [◊]
         `}
        </div>

        <div className="absolute inset-0 bg-blue-500/20 blur-3xl -z-10 animate-pulse" />
      </div>
    </section>
  )
}
