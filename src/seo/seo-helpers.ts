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
            url: '/images/hero-Images/aymon-self-portrait.webp',
            width: 1200,
            height: 630,
            alt: 'Ahmed Ayman | Aymon',
          },
          {
            url: '/images/profile2.webp',
            width: 1200,
            height: 1200,
            alt: 'Ahmed Ayman Profile',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.title,
        description: seoData.description,
        images: ['/images/hero-Images/aymon-self-portrait.webp'],
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
