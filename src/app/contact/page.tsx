import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

import SubNavbar from '@/components/nav-components/SubNavbar'
const ContactContent = dynamic(() => import('@/components/contact-components/ContactContent'))
const DrawingCanvas = dynamic(() => import('@/components/contact-components/DrawingCanvas'))

export const generateMetadata = metadataGenerators.contact

export default function Contact() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div className="hide-footer">
        <SubNavbar />
        <section className="relative flex flex-col justify-center items-center gap-2 w-dvw min-h-dvh p-4 md:pe-18">
          <ContactContent />
          <DrawingCanvas />
        </section>
      </div>
    </Suspense>
  )
}
