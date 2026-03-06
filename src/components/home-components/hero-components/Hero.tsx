import Slogun from '@/components/home-components/hero-components/Slogun'
import Navbar from '@/components/nav-components/Navbar'
import RandomImages from '@/components/home-components/hero-components/RandomImages'

export default function Hero() {
  return (
    <div className="z-30 relative lg:flex w-dvw h-[300dvh] max-md:h-[210dvh] overflow-x-hidden">
      <Slogun />

      <div className="top-0 left-0 z-50 sticky lg:w-[27dvw] h-fit lg:h-dvh">
        <Navbar />
      </div>

      <div className="relative grow">
        <RandomImages />
      </div>
    </div>
  )
}
