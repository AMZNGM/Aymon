import { use } from 'react'
import clientInfo from '@/data/clients-info.json'
import ProjectHeader from '@/components/work-components/ProjectHeader'
import ProjectDetails from '@/components/work-components/ProjectDetails'
import ProjectImage from '@/components/work-components/ProjectImage'
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
    <div className="relative w-screen min-h-screen overflow-hidden bg-text text-bg">
      <div className="w-full h-full flex">
        <ProjectImage project={project} />
        ngm
      </div>

      <div className="container mx-auto px-6 py-12 hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-8">
            {/* <ProjectHeader project={project} /> */}
            {/* <ProjectDetails project={project} /> */}
          </div>
        </div>

        {/* <ProjectProcess project={project} /> */}
      </div>
    </div>
  )
}
