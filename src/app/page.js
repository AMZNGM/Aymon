import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

import Navbar from '@/components/nav-components/Navbar'
import Slogun from '@/components/ui/Slogun'
const RandomImages = dynamic(() => import('@/components/RandomImages'))
const SelectedWork = dynamic(() => import('@/components/SelectedWork'))
const VideosSection = dynamic(() => import('@/components/VideosSection'))

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="flex max-lg:flex-col justify-between max-lg:overflow-hidden">
        <div className="sticky max-lg:fixed top-0 left-0 lg:h-dvh max-lg:w-dvw max-lg:z-999 z-10">
          <Navbar />
        </div>

        <div className="relative w-full h-full">
          <Slogun />
          <RandomImages />
          <SelectedWork />
          <hr />
          <VideosSection />
        </div>
      </div>
    </Suspense>
  )
}
