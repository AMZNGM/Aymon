import { Suspense } from 'react'
import Navbar from '@/components/nav-components/Navbar'
import RandomImages from '@/components/RandomImages'
import SelectedWork from '@/components/SelectedWork'
import VideosSection from '@/components/VideosSection'

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
