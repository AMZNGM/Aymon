import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

import SubNavbar from '@/components/nav-components/SubNavbar'
const SelectedWork = dynamic(() => import('@/components/work-components/SelectedWork'))
import SectionHeading from '@/components/shared/SectionHeading'

export const generateMetadata = metadataGenerators.work

export default function Work() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <SubNavbar />
      <SectionHeading title="Work" className="md:me-18" />
      <SelectedWork selected={false} hasButton={false} className="md:pe-18" />
    </Suspense>
  )
}
