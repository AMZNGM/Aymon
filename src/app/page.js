import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

import Hero from '@/components/home-components/hero-components/Hero.jsx'
const TrustedUs = dynamic(() => import('@/components/home-components/TrustedUs'))
const SelectedWork = dynamic(() => import('@/components/work-components/SelectedWork'))
const VideosSection = dynamic(() => import('@/components/home-components/VideosSection'))

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Hero />
      <TrustedUs />
      <SelectedWork />
      <VideosSection />
    </Suspense>
  )
}
