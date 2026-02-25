import ImageIn from '@/components/ui/unstyled/ImageIn'
import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function ProjectImage({ project, className }) {
  return (
    <div className={`h-[80vh] max-lg:h-[60vh] bg-sec overflow-hidden rounded-2xl`}>
      <AnimIn center scale blur duration={0.75} className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}>
        <ImageIn src={project.media.primary} alt={project.client} priority divClassName="w-full h-full" />
      </AnimIn>
    </div>
  )
}
