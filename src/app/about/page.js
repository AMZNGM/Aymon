import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

import SubNavbar from '@/components/nav-components/SubNavbar'
const AboutContent = dynamic(() => import('@/components/AboutContent'))

export const generateMetadata = metadataGenerators.about

export default function About() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <SubNavbar />
      <AboutContent />
    </Suspense>
  )
}
