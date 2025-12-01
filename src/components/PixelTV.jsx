'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '@/utils/gsapConfig'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'

export default function PixelTV() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectioneRef = useRef(null)
  const tvScreenRef = useRef(null)
  const scanlineRef = useRef(null)

  const slides = [
    { id: 1, content: '📺 CHANNEL 1', color: 'from-purple-600 to-pink-600', text: 'Retro Vibes' },
    { id: 2, content: '🎮 CHANNEL 2', color: 'from-blue-600 to-cyan-600', text: 'Pixel Perfect' },
    { id: 3, content: '🌟 CHANNEL 3', color: 'from-green-600 to-teal-600', text: 'Nostalgia Mode' },
    { id: 4, content: '🚀 CHANNEL 4', color: 'from-orange-600 to-red-600', text: 'Blast Off!' },
  ]

  useEffect(() => {
    // CRT flicker effect with GSAP
    gsap.to(tvScreenRef.current, {
      opacity: 0.95,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // Scanline animation
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

  useGSAP(() => {
    gsap.to(sectioneRef.current, {
      backgroundColor: '#125125',
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectioneRef.current,
        start: 'top 25%',
        toggleActions: 'play none none reverse',
      },
    })
  })

  return (
    <section ref={sectioneRef} className="relative w-screen min-h-screen flex items-center justify-center p-4 z-50">
      <div className="relative">
        {/* TV Body ASCII Art */}
        <div className="font-mono text-gray-400 text-xs sm:text-sm leading-none mb-2 whitespace-pre select-none">
          {`    ╔════════════════════════════╗
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ║▓                        ▓║
    ║▓                        ▓║`}
        </div>

        {/* TV Screen Container */}
        <div className="relative bg-black border-8 border-gray-800 rounded-lg shadow-2xl">
          {/* Screen */}
          <div
            ref={tvScreenRef}
            className="relative w-[320px] h-[240px] sm:w-[480px] sm:h-[360px] bg-black overflow-hidden"
            style={{
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)',
            }}
          >
            {/* CRT Curve Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40 pointer-events-none" />

            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
              }}
            />

            {/* Moving Scanline */}
            <div
              ref={scanlineRef}
              className="absolute left-0 w-full h-1 bg-white opacity-10 pointer-events-none z-20"
              style={{ top: '0%' }}
            />

            {/* Carousel Content */}
            <div className="relative w-full h-full p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${slides[currentSlide].color} rounded-lg shadow-lg`}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-6xl sm:text-8xl mb-4"
                  >
                    {slides[currentSlide].content}
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white text-xl sm:text-2xl font-bold tracking-wider"
                  >
                    {slides[currentSlide].text}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                />
              ))}
            </div>

            {/* Static Noise Overlay */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none z-10 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E\")",
              }}
            />
          </div>
        </div>

        {/* TV Bottom ASCII */}
        <div className="font-mono text-gray-400 text-xs sm:text-sm leading-none mt-2 whitespace-pre select-none">
          {`    ║▓                        ▓║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ╚════════════════════════════╝
         [■]  [○]  [●]  [◊]`}
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl -z-10 animate-pulse" />
      </div>
    </section>
  )
}
