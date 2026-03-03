import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

const PaintReveal = dynamic(() => import('@/components/about-components/PaintReveal'))

export const generateMetadata = metadataGenerators.about

export default function About() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="hide-footer">
        <PaintReveal />
      </div>
    </Suspense>
  )
}
