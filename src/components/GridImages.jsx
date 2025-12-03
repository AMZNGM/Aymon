import Image from 'next/image'
import { crow, metro, pigeon, proof } from '@/data/media-data/media-imports'

export default function GridImages() {
  return (
    <section className="relative lg:w-[75%] ms-auto h-screen px-4 py-12">
      <div className="relative w-full grid lg:grid-cols-2 gap-4 p-18 max-sm:p-0">
        <Image src={proof} alt={`Proof Image`} priority className="object-cover pointer-events-none select-none rounded-2xl" />
        <Image src={metro} alt={`Metro Image`} className="object-cover pointer-events-none select-none rounded-2xl" />
        <Image src={pigeon} alt={`Pigeon Image`} className="object-cover pointer-events-none select-none rounded-2xl" />
        <Image src={crow} alt={`Crow Image`} className="object-cover pointer-events-none select-none rounded-2xl" />
      </div>
    </section>
  )
}
