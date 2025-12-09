import Navbar from '@/components/nav-components/Navbar'
import RandomImages from '@/components/RandomImages'
import SelectedWork from '@/components/SelectedWork'
import VideosSection from '@/components/VideosSection'

export default function Home() {
  return (
    <>
      <div className="flex max-lg:flex-col justify-between max-lg:overflow-hidden">
        <div className="sticky max-lg:fixed top-0 left-0 lg:h-screen max-lg:w-screen max-lg:z-999 z-10">
          <Navbar />
        </div>

        <div className="relative w-full h-full">
          {/* <RandomImages /> */}
          {/* <SelectedWork /> */}
          <VideosSection />
          <SelectedWork />
        </div>
      </div>
    </>
  )
}
