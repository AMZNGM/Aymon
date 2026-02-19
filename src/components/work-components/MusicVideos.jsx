import { useProjects } from '@/hooks/useProjects'
import { getWorkFilter, extractMedia } from '@/lib/getWork'
import MediaGrid from '@/components/work-components/MediaGrid'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

export default function MusicVideos() {
  const { projects, loading } = useProjects()

  if (loading) return <LoadingOverlay />

  const videoProjects = projects.filter(getWorkFilter('videos'))
  const allVideos = videoProjects.flatMap((p) => extractMedia(p, { videoOnly: true }))

  return (
    <section className="relative w-full min-h-dvh bg-text text-bg px-2 pt-24 pb-24">
      <h2 className="font-extrabold text-[7dvw] max-md:text-4xl md:text-end uppercase leading-none tracking-[-2px] mb-12 max-md:mb-6">
        Videos
      </h2>

      <MediaGrid items={allVideos} columns={2} />
    </section>
  )
}
