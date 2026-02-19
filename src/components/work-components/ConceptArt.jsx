'use client'

import { useConceptArt } from '@/hooks/useConceptArt'
import { extractMedia } from '@/lib/getWork'
import MediaGrid from '@/components/work-components/MediaGrid'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default function ConceptArt() {
  const { conceptArt, loading } = useConceptArt()

  if (loading) return <LoadingOverlay />

  const allMedia = conceptArt.flatMap((item) => extractMedia(item))

  return (
    <section className="relative w-full min-h-dvh bg-text text-bg px-2 pt-24 pb-24">
      <h2 className="font-extrabold text-[7dvw] max-md:text-4xl md:text-end uppercase leading-none tracking-[-2px] scale-none mb-12 max-md:mb-6">
        Concept Art
      </h2>

      <MediaGrid items={allMedia} />
    </section>
  )
}
