import { use } from 'react'
import { SwapyItem, SwapyLayout, SwapySlot } from '@/components/ui/Swapy'
import clientInfo from '@/data/clients-info.json'
import ProjectImage from '@/components/work-components/ProjectImage'
import ProjectHeader from '@/components/work-components/ProjectHeader'
import ProjectProcess from '@/components/work-components/ProjectProcess'
import ProjectGallery from '@/components/work-components/ProjectGallery'
import { ArrowLeft, Link } from 'lucide-react'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function ProjectPage({ params }) {
  const { slug } = use(params)

  const project = clientInfo.find(
    (_, index) =>
      (slug === 'marwan-pablo' && index === 0) ||
      (slug === 'menage-ghada' && index === 1) ||
      (slug === 'geo-project' && index === 2) ||
      (slug === 'blitz' && index === 3)
  )

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">project not found</h1>
      </div>
    )
  }

  return (
    <div className="relative w-screen min-h-screen overflow-hidden flex justify-center items-center bg-text text-bg p-4">
      <div className="max-xl:hidden">
        <SwapyLayout id="swapy" className="flex gap-4">
          <SwapySlot id="slot-1" className="flex-1">
            <SwapyItem id="item-1" data-swapy-handle>
              <ProjectHeader project={project} className={'xl:h-[80vh]'} />
            </SwapyItem>
          </SwapySlot>

          <SwapySlot id="slot-2" className="flex-2">
            <SwapyItem id="item-2" data-swapy-handle>
              <ProjectImage project={project} className={'xl:h-[80vh]'} />
            </SwapyItem>
          </SwapySlot>

          <SwapySlot id="slot-3" className="flex-1">
            <SwapyItem id="item-3" data-swapy-handle>
              <ProjectProcess project={project} className={'xl:h-[80vh]'} />
            </SwapyItem>
          </SwapySlot>

          <div className="flex-0 flex justify-end items-end">
            <ProjectGallery project={project} />
          </div>
        </SwapyLayout>
      </div>

      <div className="xl:hidden flex flex-col gap-4">
        <ProjectImage project={project} className={'cursor-pointer'} />
        <ProjectGallery project={project} />
        <ProjectHeader project={project} />
        <ProjectProcess project={project} />
      </div>
    </div>
  )
}
