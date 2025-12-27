import AboutText from '@/components/AboutText'

export const metadata = {
  title: 'About | Ahmed Ayman',
  description:
    'Learn more about Ahmed Ayman (Aymon), a multidisciplinary visual artist based in Cairo, Egypt. Discover creative background, artistic vision, and professional journey.',
  keywords: ['about Ahmed Ayman', 'Aymon artist', 'visual artist Cairo', 'creative background', 'artistic vision'],
  openGraph: {
    title: 'About | Ahmed Ayman',
    description: 'Discover the creative journey and artistic vision of Ahmed Ayman',
    type: 'website',
    url: 'https://www.aymon.work/about',
    images: [
      {
        url: '/images/mainPhoto.webp',
        width: 1200,
        height: 630,
        alt: 'About Ahmed Ayman',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Ahmed Ayman',
    description: 'Discover the creative journey and artistic vision of Ahmed Ayman',
    images: ['/images/mainPhoto.webp'],
  },
}

export default function About() {
  return (
    <main className="max-md:pe-13 md:pe-18">
      <AboutText />
    </main>
  )
}
