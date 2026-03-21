import type { Metadata } from 'next'
import { SEO, RouteKey } from '@/seo/seo.config'

interface WorkMetadataInput {
  title: string
  description: string
  keywords?: Metadata['keywords']
  alternates?: Metadata['alternates']
}

export function createMetadataGenerator(route: RouteKey) {
  return function generateMetadata(): Metadata {
    const seoData = SEO[route] || SEO['*']

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        type: 'website',
        url: `https://www.aymon.work${route === '/' ? '' : route}`,
        images: [
          {
            url: '/images/mainPhoto2.webp',
            width: 1200,
            height: 630,
            alt: 'Ahmed Ayman | Aymon',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.title,
        description: seoData.description,
        images: ['/images/mainPhoto2.webp'],
      },
    }
  }
}

export const metadataGenerators = {
  home: createMetadataGenerator('/'),
  about: createMetadataGenerator('/about'),
  work: createMetadataGenerator('/work'),
  contact: createMetadataGenerator('/contact'),
  notFound: createMetadataGenerator('*'),
  works: (data: WorkMetadataInput): Metadata => {
    const keywords = data.keywords
    return {
      title: data.title,
      description: data.description,
      keywords: keywords,
      alternates: data.alternates,
    }
  },
}
