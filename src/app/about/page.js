import ParallaxVideoGallery from '@/components/ParallaxVideoGallery'

export const metadata = {
  title: 'About | Ahmed Ayman',
  description:
    'Learn more about Ahmed Ayman (Aymon), a multidisciplinary visual artist based in Cairo, Egypt. Discover creative background, artistic vision, and professional journey.',
  keywords: ['about Ahmed Ayman', 'Aymon artist', 'visual artist Cairo', 'creative background', 'artistic vision'],
  openGraph: {
    title: 'About | Ahmed Ayman',
    description: 'Discover the creative journey and artistic vision of Ahmed Ayman',
    type: 'website',
    url: 'https://ahmedayman.com/about',
    images: [
      {
        url: '/images/og-image.jpg',
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
    images: ['/images/og-image.jpg'],
  },
}

export default function About() {
  return (
    <>
      <ParallaxVideoGallery />
    </>
  )
}
