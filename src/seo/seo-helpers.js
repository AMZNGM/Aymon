import { SEO } from '@/seo/seo.config'

export function createMetadataGenerator(route) {
  return function generateMetadata() {
    const seoData = SEO[route] || SEO['*']

    const metadata = {
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

    return metadata
  }
}

export const metadataGenerators = {
  home: createMetadataGenerator('/'),
  about: createMetadataGenerator('/about'),
  work: createMetadataGenerator('/work'),
  privacy: createMetadataGenerator('/privacy'),
  notFound: createMetadataGenerator('*'),
  works: (data) => ({
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: data.alternates,
  }),
}
