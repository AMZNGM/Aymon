import dynamic from 'next/dynamic'
import { metadataGenerators } from '@/seo/seo-helpers'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton'

import Hero from '@/components/home-components/hero-components/Hero.jsx'
const TrustedUs = dynamic(() => import('@/components/home-components/TrustedUs'), { loading: LoadingSkeleton })
const SelectedWork = dynamic(() => import('@/components/work-components/SelectedWork'), { loading: LoadingSkeleton })
import Modal3d from '@/components/home-components/3dModal/Modal3d'
const VideosSection = dynamic(() => import('@/components/home-components/VideosSection'), { loading: LoadingSkeleton })

export const generateMetadata = metadataGenerators.home

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedUs />
      <SelectedWork />
      <Modal3d />
      <VideosSection />
    </>
  )
}
