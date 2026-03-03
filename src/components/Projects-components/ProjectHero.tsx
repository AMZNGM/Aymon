import { SwapyItem, SwapyLayout, SwapySlot } from '@/components/ui/Swapy'
import SwapPoints from '@/components/ui/SwapPoints'
import ProjectHeader from '@/components/Projects-components/ProjectHeader'
import ProjectImage from '@/components/Projects-components/ProjectImage'
import ProjectProcess from '@/components/Projects-components/ProjectProcess'
import ProjectDetailsModal from '@/components/Projects-components/ProjectDetailsModal'
import type { Project } from '@/types/project.types'

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <>
      <div className="relative flex justify-center items-end w-dvw min-h-[88.5vh] overflow-hidden bg-text text-bg px-4 max-md:px-1 md:pe-18">
        <SwapPoints />

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
          </SwapyLayout>
        </div>

        <div className="xl:hidden flex flex-col gap-4 mt-26">
          <ProjectImage project={project} className={'cursor-pointer'} />
          <ProjectHeader project={project} />
          <ProjectProcess project={project} />
        </div>
      </div>

      <ProjectDetailsModal project={project} />
    </>
  )
}
