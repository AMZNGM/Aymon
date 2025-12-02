import { personalInfo } from '@/data/personal-info'
import Text3d from '@/components/ui/text/Text3d'
import LayeredImage from '@/components/ui/LayeredImage'

export default function Navbar() {
  return (
    <header className="fixed left-0 w-1/4 max-md:w-screen min-h-screen z-30">
      <div className="relative w-full h-screen flex flex-col justify-between items-center gap-4 pt-12">
        <section className="w-1/2 md:flex flex-col justify-between items-center gap-8">
          <Text3d as="h1" staggerFrom="center" className="text-9xl font-charted leading-14 cursor-default max-md:hidden">
            {personalInfo.name}
          </Text3d>

          <Text3d as="h2" className="text-9xl font-charted leading-12 cursor-default">
            {personalInfo.nickname}
          </Text3d>

          <Text3d as="p" staggerFrom="random" className="text-4xl font-doto leading-8 text-end cursor-default mt-4 max-md:mt-12">
            Alive from {personalInfo.birthYear} in {personalInfo.location}
          </Text3d>
        </section>

        <LayeredImage />
      </div>
    </header>
  )
}
