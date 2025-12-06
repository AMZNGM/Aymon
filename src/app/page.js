import Navbar from '@/components/Navbar'
import RandomImages from '@/components/RandomImages'
import SelectedWork from '@/components/SelectedWork'
import GeoProject from '@/components/GeoProject'

export default function Home() {
  return (
    <>
      <div className="flex max-lg:flex-col justify-between">
        <div className="sticky max-lg:fixed top-0 left-0 h-screen max-lg:w-full max-lg:z-999">
          <Navbar />
        </div>

        <div className="relative w-full h-full">
          <RandomImages />
          <SelectedWork />
          {/* <GeoProject /> */}
        </div>
      </div>
    </>
  )
}
