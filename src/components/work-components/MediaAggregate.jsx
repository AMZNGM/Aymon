import { useProjects } from '@/hooks/useProjects'
import { useConceptArt } from '@/hooks/useConceptArt'
import { extractMedia } from '@/lib/getWork'
import MediaGrid from '@/components/work-components/MediaGrid'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default function MediaAggregate() {
  const { projects, loading: projectsLoading } = useProjects()
  const { conceptArt, loading: artLoading } = useConceptArt()

  if (projectsLoading || artLoading) return <LoadingOverlay />

  const projectMedia = projects.flatMap((p) => extractMedia(p))
  const artMedia = conceptArt.flatMap((a) => extractMedia(a))
  const allMedia = [...projectMedia, ...artMedia]

  return (
    <section className="relative w-full min-h-dvh bg-text text-bg px-2 pt-24 pb-24">
      <h2 className="font-extrabold text-[7dvw] max-md:text-4xl md:text-end uppercase leading-none tracking-[-2px] mb-12 max-md:mb-6">
        Media <br /> Aggregate
      </h2>

      <MediaGrid items={allMedia} columns={3} />
    </section>
  )
}
