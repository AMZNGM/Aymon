import { use } from 'react'
import clientInfo from '@/data/clients-info.json'
import ProjectHero from '@/components/Projects-components/ProjectHero'
import ProjectMedia from '@/components/Projects-components/ProjectMedia'

export default function ProjectPage({ params }) {
  const { slug } = use(params)
  const project = clientInfo.find((project) => project.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Project not found</h1>
      </div>
    )
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectMedia project={project} />
    </>
  )
}
