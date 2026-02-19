import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

import SubNavbar from '@/components/nav-components/SubNavbar'
const WorkGallery = dynamic(() => import('@/components/work-components/WorkGallery'))

export const generateMetadata = metadataGenerators.work

export default function Work() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="relative z-20">
        <SubNavbar />
      </div>
      <div className="hide-footer">
        <WorkGallery />
      </div>
    </Suspense>
  )
}
