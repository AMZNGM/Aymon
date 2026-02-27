import dynamic from 'next/dynamic'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

// import Preloader from '@/components/home-components/Preloader'
import Hero from '@/components/home-components/hero-components/Hero.jsx'
const TrustedUs = dynamic(() => import('@/components/home-components/TrustedUs'), { loading: LoadingSkeleton })
import SectionHeading from '@/components/shared/SectionHeading'
const SelectedWork = dynamic(() => import('@/components/work-components/SelectedWork'), { loading: LoadingSkeleton })
import Visionary from '@/components/home-components/Visionary'
const VideosSection = dynamic(() => import('@/components/home-components/VideosSection'), { loading: LoadingSkeleton })

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <>
      {/* <Preloader /> */}
      <Hero />
      <TrustedUs />
      <SectionHeading title="Selected Work" />
      <SelectedWork />
      <Visionary />
      <VideosSection />
    </>
  )
}
