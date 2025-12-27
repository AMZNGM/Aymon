import SelectedWork from '@/components/SelectedWork'

export const metadata = {
  title: 'Work | Ahmed Ayman',
  description:
    'Browse all creative projects by Ahmed Ayman (Aymon). Explore motion graphics, visual art, and design projects showcasing innovative artistic work.',
  keywords: ['Ahmed Ayman work', 'Aymon projects', 'motion graphics portfolio', 'visual art projects', 'design portfolio Cairo'],
  openGraph: {
    title: 'Work | Ahmed Ayman',
    description: 'Browse all creative projects by Ahmed Ayman',
    type: 'website',
    url: 'https://www.aymon.work/',
    images: [
      {
        url: '/images/mainPhoto.webp',
        width: 1200,
        height: 630,
        alt: 'Ahmed Ayman Work Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Ahmed Ayman',
    description: 'Browse all creative projects by Ahmed Ayman',
    images: ['/images/mainPhoto.webp'],
  },
}

export default function Work() {
  return (
    <main className="md:pe-18">
      <SelectedWork />
    </main>
  )
}
