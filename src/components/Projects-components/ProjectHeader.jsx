import AnimIn from '@/components/ui/unstyled/AnimIn'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'

export default function ProjectHeader({ project, className, onShowDetails }) {
  return (
    <div className={`relative overflow-hidden bg-sec rounded-2xl p-4 md:p-6 ${className}`}>
      <AnimIn className="h-full overflow-auto flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-8 max-md:gap-6">
          <div>
            <h1 className="font-sec font-extrabold max-md:text-3xl text-5xl">{project.client}</h1>

            <div className="flex gap-4 font-mono text-bg/75 max-md:text-xs text-sm mt-8">
              <span>{project.year}</span>
              <span>•</span>
              <span>{project.category}</span>
              <span>•</span>
              <span className="capitalize">{project.status}</span>
            </div>
          </div>

          <p className="font-medium text-bg/75 max-md:text-sm text-base wrap-break-word leading-[22px] max-md:leading-5 tracking-tighter whitespace-pre-wrap">
            {project.description?.detailed}
          </p>
        </div>

        <button
          onClick={onShowDetails}
          className="w-full bg-bg/10 hover:bg-bg/30 rounded-xl outline-none font-medium text-bg/75 duration-100 px-4 py-2 cursor-pointer select-none"
        >
          <TextWghtGrow label="Show More Details" />
        </button>
      </AnimIn>
    </div>
  )
}
