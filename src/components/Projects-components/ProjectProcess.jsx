'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'

export default function ProjectProcess({ project, className }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      className={`relative bg-sec rounded-2xl p-4 ${className}`}
    >
      <AnimIn className="h-full overflow-y-scroll flex flex-col justify-between gap-4">
        <h2 className="font-sec font-bold 2xl:text-[2dvw] max-md:text-2xl text-3xl uppercase">Process & Approach</h2>

        <div className="flex flex-col flex-1 gap-4">
          <div>
            <h3 className="font-mono font-semibold 2xl:text-[1.2dvw] max-md:text-base text-lg mb-2">The Process</h3>
            <p className="font-medium text-bg/75 2xl:text-[1dvw] max-md:text-xs text-sm wrap-break-word max-md:leading-[18px] max-2xl:leading-5 tracking-tighter whitespace-pre-wrap">
              {project.process}
            </p>
          </div>

          <div>
            <h3 className="font-mono font-semibold 2xl:text-[1.2dvw] max-md:text-base text-lg mb-2">The Impact</h3>
            <p className="font-medium text-bg/75 2xl:text-[1dvw] max-md:text-xs text-sm wrap-break-word max-md:leading-[18px] max-2xl:leading-5 tracking-tighter whitespace-pre-wrap">
              {project.impact}
            </p>
          </div>
        </div>

        {project.media?.video?.url && (
          <div className="mt-4">
            <h3 className="font-mono font-semibold 2xl:text-[1.2dvw] max-md:text-base text-lg mb-2">Project Video</h3>
            <a
              href={project.media.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-lg:w-full justify-center items-center gap-2 bg-bg/10 hover:bg-bg/25 rounded-2xl text-bg 2xl:text-[1dvw] max-md:text-xs text-sm duration-200 px-4 py-2"
            >
              <TextWghtGrow label="View Project Video" />
              <SquareArrowOutUpRight size={14} />
            </a>
          </div>
        )}
      </AnimIn>
    </div>
  )
}
