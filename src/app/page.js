import RandomImages from '@/components/RandomImages'
import GridImages from '@/components/GridImages'

export default function Home() {
  return (
    <main className="w-[75%] ms-auto">
      <RandomImages />
      <GridImages />
    </main>
  )
}
