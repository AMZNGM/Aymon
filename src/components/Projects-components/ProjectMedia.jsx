import { useVideoEmbed } from '@/hooks/useVideoEmbed'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import AnimText from '@/components/ui/unstyled/AnimText'

export default function ProjectMedia({ project }) {
  const { getEmbedUrl } = useVideoEmbed()

  const mediaItems = []

  if (project.media?.gallery?.length > 1) {
    project.media.gallery.forEach((imageSrc) => {
      mediaItems.push({
        type: 'image',
        src: imageSrc,
        title: project.title,
      })
    })
  }

  const hasVideoLink =
    (project.media?.video?.url && project.media.video.type === 'youtube') ||
    (project.media?.video?.url && project.media.video.type === 'vimeo')

  if (mediaItems.length === 0 && !hasVideoLink) {
    return <section className="relative w-dvw h-[15vh]"></section>
  }

  return (
    <section className="relative w-full min-h-dvh overflow-hidden rounded-2xl px-4 max-md:px-1 py-12 md:pe-22">
      <div className="bg-bg/10 rounded-2xl text-bg">
        <div className="max-w-7xl mx-auto p-6">
          <div className="space-y-4">
            <AnimText as="h3" className="font-bold text-lg mb-4">
              See more about: {project.title}
            </AnimText>

            {hasVideoLink && (
              <AnimIn center blur duration={0.75}>
                <h3 className="font-semibold text-lg capitalize mb-4">{project.media.video?.type}</h3>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-full aspect-video overflow-hidden bg-text/10 rounded-lg">
                    <iframe
                      src={getEmbedUrl(project.media.video.url)}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={project.media.video.title || 'Project Video'}
                    />
                  </div>
                  <p className="text-text/40 text-sm break-all">{project.media.video.url}</p>
                </div>
              </AnimIn>
            )}

            {mediaItems.map((item, index) => (
              <div key={index}>
                {item.type === 'image' && (
                  <ImageIn
                    src={item.src}
                    alt={item.title}
                    className="object-contain! rounded-2xl scale-100! cursor-zoom-in openInModal"
                    divClassName="relative w-full h-[80vh] overflow-hidden bg-text/10 rounded-2xl"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
