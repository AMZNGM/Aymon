import { Suspense } from 'react'
import Navbar from '@/components/nav-components/Navbar'
import RandomImages from '@/components/RandomImages'
import SelectedWork from '@/components/SelectedWork'
import VideosSection from '@/components/VideosSection'

export const metadata = {
  title: 'Ahmed Ayman | Creative Portfolio',
  description:
    'Ahmed Ayman, also known as Aymon, is a multidisciplinary visual artist based in Cairo, Egypt. Explore creative projects in motion graphics, visual art, and design.',
  keywords: ['Ahmed Ayman', 'Aymon', 'visual artist', 'motion graphics', 'Cairo', 'Egypt', 'creative portfolio', 'digital art'],
  openGraph: {
    title: 'Ahmed Ayman | Creative Portfolio',
    description: 'Multidisciplinary visual artist showcasing innovative creative projects',
    type: 'website',
    url: 'https://ahmedayman.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ahmed Ayman Creative Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Ayman | Creative Portfolio',
    description: 'Multidisciplinary visual artist showcasing innovative creative projects',
    images: ['/images/og-image.jpg'],
  },
}

function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-2 animate-pulse">
        <div className="bg-bg/20 rounded-lg h-8 w-32"></div>
        <div className="bg-bg/10 rounded-lg h-4 w-64"></div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <div className="flex max-lg:flex-col justify-between max-lg:overflow-hidden">
        <div className="sticky max-lg:fixed top-0 left-0 lg:h-screen max-lg:w-screen max-lg:z-999 z-10">
          <Suspense fallback={<LoadingSkeleton />}>
            <Navbar />
          </Suspense>
        </div>

        <div className="relative w-full h-full">
          <Suspense fallback={<LoadingSkeleton />}>
            <RandomImages />
          </Suspense>
          <Suspense fallback={<LoadingSkeleton />}>
            <SelectedWork />
          </Suspense>
          <Suspense fallback={<LoadingSkeleton />}>
            <VideosSection />
          </Suspense>
        </div>
      </div>
    </>
  )
}
