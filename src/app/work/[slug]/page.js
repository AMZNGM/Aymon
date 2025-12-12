import { use } from 'react'
import clientInfo from '@/data/clients-info.json'
import ProjectHero from '@/components/Projects-components/ProjectHero'
import ProjectMedia from '@/components/Projects-components/ProjectMedia'

export async function generateStaticParams() {
  return clientInfo.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = clientInfo.find((project) => project.slug === slug)

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
  const project = clientInfo.find((project) => project.slug === slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Project not found</h1>
      </div>
    )
  }

  return (
    <main className="max-md:pe-13 md:pe-18">
      <ProjectHero project={project} />
      <ProjectMedia project={project} />
    </main>
  )
}
