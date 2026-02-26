'use client'

import { usePreloader } from '@/context/PreloaderContext'
import Slogun from '@/components/home-components/hero-components/Slogun'
import Navbar from '@/components/nav-components/Navbar'
import RandomImages from '@/components/home-components/hero-components/RandomImages'

export default function Hero() {
  const { isComplete } = usePreloader()

  return (
    <div
      className={`z-30 relative w-dvw h-[300dvh] max-md:h-[190dvh] lg:flex ${isComplete ? 'opacity-100' : 'opacity-0'} transition-all duration-1000`}
    >
      <div
        className={`${isComplete ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-62'} absolute inset-0 transition-transform duration-1000 delay-800`}
      >
        <Slogun />
      </div>

      <div
        className={`top-0 z-50 sticky lg:w-[27dvw] h-fit lg:h-screen ${isComplete ? 'opacity-100 left-0 translate-x-0' : 'opacity-0 -translate-x-full'} transition-transform duration-1000 delay-600`}
      >
        <Navbar />
      </div>

      <div className={`relative grow ${isComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-1200`}>
        <RandomImages />
      </div>
    </div>
  )
}
