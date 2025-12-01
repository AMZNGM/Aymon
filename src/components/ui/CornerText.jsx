import { personalInfo } from '@/data/personal-info'
import Text3d from '@/components/ui/text/Text3d'

export default function CornerText() {
  return (
    <Text3d className="fixed bottom-4 left-4 -rotate-4 text-main/60 font-pixel tracking-wide cursor-default max-md:hidden z-20">
      {personalInfo.slogan}
    </Text3d>
  )
}
