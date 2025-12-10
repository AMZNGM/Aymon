'use client'

import { useState } from 'react'
import { SwapyItem, SwapyLayout, SwapySlot } from '@/components/ui/Swapy'
import SwapArrow from '@/components/Projects-components/SwapArrow'
import ProjectImage from '@/components/Projects-components/ProjectImage'
import ProjectHeader from '@/components/Projects-components/ProjectHeader'
import ProjectProcess from '@/components/Projects-components/ProjectProcess'
import ProjectGallery from '@/components/Projects-components/ProjectGallery'
import ProjectDetailsModal from '@/components/Projects-components/ProjectDetailsModal'

export default function ProjectHero({ project }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <div className="relative w-screen min-h-[88.5vh] overflow-hidden flex justify-center items-end bg-text text-bg p-4 max-md:px-1">
        <SwapArrow />

        <div className="max-xl:hidden">
          <SwapyLayout id="swapy" className="flex gap-4">
            <SwapySlot id="slot-1" className="flex-1">
              <SwapyItem id="item-1" data-swapy-handle>
                <ProjectHeader project={project} className={'xl:h-[80vh]'} onShowDetails={() => setShowDetails(true)} />
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

        <div className="xl:hidden flex flex-col gap-4 mt-26">
          <ProjectImage project={project} className={'cursor-pointer'} />
          <ProjectGallery project={project} />
          <ProjectHeader project={project} onShowDetails={() => setShowDetails(true)} />
          <ProjectProcess project={project} />
        </div>
      </div>

      <ProjectDetailsModal project={project} showDetails={showDetails} setShowDetails={setShowDetails} />
    </>
  )
}
