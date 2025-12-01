import { personalInfo } from '@/data/personal-info'
import Text3d from '@/components/ui/text/Text3d'
import LayeredImage from '@/components/ui/LayeredImage'

export default function Navbar() {
  return (
    <header className="fixed left-0 w-1/4 min-h-screen bg-text text-bg py-12 px-4 z-50">
      <div className="relative h-full flex flex-col justify-between items-center gap-4 ">
        <div className="flex flex-col justify-between items-center gap-8">
          <Text3d as="h1" staggerFrom="center" className="w-1/2 text-8xl font-pixel leading-12 cursor-default">
            {personalInfo.name}
          </Text3d>
          <Text3d as="h2" rotateDirection="bottom" className="text-8xl font-pixel leading-12 cursor-default">
            {personalInfo.nickname}
          </Text3d>
          <Text3d as="p" staggerFrom="random" className="text-4xl font-doto leading-12 cursor-default">
            Alive from {personalInfo.birthYear} in {personalInfo.location}
          </Text3d>
        </div>
      </div>

      <LayeredImage />
    </header>
  )
}
