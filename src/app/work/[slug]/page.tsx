import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { metadataGenerators } from '@/seo/seo-helpers'
import { getProjects } from '@/lib/getProjects'
import { generateWorkSEO } from '@/seo/seo.config'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

import SubNavbar from '@/components/nav-components/SubNavbar'
import ProjectHero from '@/components/Projects-components/ProjectHero'
const ProjectMedia = dynamic(() => import('@/components/Projects-components/ProjectMedia'))
const MoreProjects = dynamic(() => import('@/components/Projects-components/MoreProjects'))

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projects = await getProjects()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return metadataGenerators.notFound()
  }

  return metadataGenerators.works({
    title: generateWorkSEO({
      name: project.title,
      tagline: project.client,
      description: project.seo?.description || project.description?.short,
      location: project.location ? { city: project.location } : undefined,
    }).title,
    description: generateWorkSEO({
      name: project.title,
      tagline: project.client,
      description: project.seo?.description || project.description?.short,
      location: project.location ? { city: project.location } : undefined,
    }).description,
    keywords: generateWorkSEO({
      name: project.title,
      tagline: project.client,
      description: project.seo?.description || project.description?.short,
      location: project.location ? { city: project.location } : undefined,
    }).keywords,
    alternates: {
      languages: {
        en: `/work/${slug}`,
        ar: `/work/${slug}`,
      },
    },
  })
}

export const revalidate = 0

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projects = await getProjects()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const serializedProject = {
    ...project,
    createdAt: project.createdAt || new Date(),
    updatedAt: project.updatedAt || new Date(),
    expiresAt: project.expiresAt || new Date(),
  }

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <SubNavbar />
      <ProjectHero project={serializedProject} />
      <ProjectMedia project={serializedProject} />
      <MoreProjects currentSlug={slug} />
    </Suspense>
  )
}
