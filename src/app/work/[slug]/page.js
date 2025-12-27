import { use } from 'react'
import { getProjects } from '@/lib/getProjects'
import ProjectHero from '@/components/Projects-components/ProjectHero'
import ProjectMedia from '@/components/Projects-components/ProjectMedia'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const projects = await getProjects()
  const project = projects.find((project) => project.slug === slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  return {
    title: `${project.title} | ${project.client}`,
    description: project.seo?.description || project.description?.short,
    keywords: project.seo?.keywords?.join(', ') || `${project.client}, ${project.category}, ${project.year}`,
    openGraph: {
      title: project.title,
      description: project.seo?.description || project.description?.short,
      images: [
        {
          url: project.media?.primary,
          alt: `${project.title} - ${project.client}`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
      publishedTime: `${project.year}-01-01`,
      authors: [project.client],
      tags: project.seo?.keywords || [project.category, project.client],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.seo?.description || project.description?.short,
      images: [project.media?.primary],
    },
    alternates: {
      canonical: `/work/${slug}`,
    },
  }
}

export default function ProjectPage({ params }) {
  const { slug } = use(params)
  const projects = use(getProjects())
  const project = projects.find((project) => project.slug === slug)

  const serializedProject = project
    ? {
        ...project,
        createdAt: project.createdAt?.toDate?.() || new Date(),
        updatedAt: project.updatedAt?.toDate?.() || new Date(),
        expiresAt: project.expiresAt?.toDate?.() || new Date(),
      }
    : null

  if (!serializedProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Project not found</h1>
      </div>
    )
  }

  return (
    <main className="md:pe-18">
      <ProjectHero project={serializedProject} />
      <ProjectMedia project={serializedProject} />
    </main>
  )
}
