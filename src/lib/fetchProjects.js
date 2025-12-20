import { client } from '@/sanity/lib/client'

export async function getProjects() {
  return client.fetch(`*[_type == "work"]{
    slug,
    title,
    client,
    category,
    year,
    status,
    featured,
    scope,
    descriptionShort,
    descriptionDetailed,
    services,
    technologies,
    mediaPrimary,
    mediaGallery,
    videoUrl,
    videoTitle,
    metadata,
    seo,
  }`)
}
