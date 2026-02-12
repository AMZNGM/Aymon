import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

import SubNavbar from '@/components/nav-components/SubNavbar'
const SelectedWork = dynamic(() => import('@/components/SelectedWork'))

export const generateMetadata = metadataGenerators.work

export default function Work() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <SubNavbar />
      <div className="md:pe-18">
        <SelectedWork />
      </div>
    </Suspense>
  )
}
