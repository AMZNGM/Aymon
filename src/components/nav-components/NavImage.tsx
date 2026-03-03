import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'

export default function NavImage() {
  return (
    <AnimIn center blur duration={3} className="group max-lg:hidden z-20 relative my-[3dvw]">
      <ImageIn
        src="/images/profile2.webp"
        alt="Nav Image"
        priority
        loading="eager"
        className="rounded-2xl scale-100!"
        divClassName="size-[16dvw] "
      />
    </AnimIn>
  )
}
