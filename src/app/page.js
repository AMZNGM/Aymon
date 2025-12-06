import RandomImages from '@/components/RandomImages'
import GridImages from '@/components/GridImages'
import SelectedWork from '@/components/SelectedWork'
import GeoProject from '@/components/GeoProject'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* <RandomImages /> */}
      <SelectedWork />
      <GridImages />
      <GeoProject />
    </main>
  )
}
