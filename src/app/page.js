import RandomImages from '@/components/RandomImages'
import GridImages from '@/components/GridImages'

export default function Home() {
  return (
    <>
      <RandomImages />
      <div className="h-[195vh]" />
      <GridImages />
    </>
  )
}
