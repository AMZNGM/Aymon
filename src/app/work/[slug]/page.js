import { use } from 'react'
import clientInfo from '@/data/clients-info.json'
import ProjectImage from '@/components/work-components/ProjectImage'
import ProjectHeader from '@/components/work-components/ProjectHeader'
import ProjectProcess from '@/components/work-components/ProjectProcess'

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
    <div className="relative w-screen min-h-screen overflow-hidden bg-text text-bg p-4 pt-18">
      <div className="flex max-lg:flex-col-reverse gap-4">
        <ProjectHeader project={project} />
        <ProjectImage project={project} />
      </div>
      {/* <ProjectProcess project={project} /> */}
    </div>
  )
}
