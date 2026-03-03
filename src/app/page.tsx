// import dynamic from 'next/dynamic'
import { metadataGenerators } from '@/seo/seo-helpers'

import Hero from '@/components/home-components/hero-components/Hero'
// const TrustedUs = dynamic(() => import('@/components/home-components/TrustedUs'))
// import SectionHeading from '@/components/shared/SectionHeading'
// const SelectedWork = dynamic(() => import('@/components/work-components/SelectedWork'))
// import Visionary from '@/components/home-components/Visionary'
// import VideosSection from '@/components/home-components/VideosSection'

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <TrustedUs /> */}
      {/* <SectionHeading title="Selected Work" /> */}
      {/* <SelectedWork /> */}
      {/* <Visionary /> */}
      {/* <VideosSection /> */}
    </main>
  )
}
