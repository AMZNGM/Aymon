import Image from 'next/image'
import { crow, metro, pigeon, proof } from '@/data/media-data/media-imports'

export default function GridImages() {
  return (
    <section className="relative w-screen h-screen px-4 py-12">
      <div className="relative size-full grid grid-cols-3 gap-4 pe-32">
        <div />
        <Image src={proof} alt={`Proof Image`} className="w-full object-cover pointer-events-none select-none rounded-2xl" />
        <Image src={metro} alt={`Metro Image`} className="w-full object-cover pointer-events-none select-none rounded-2xl" />
        <div />
        <Image src={pigeon} alt={`Pigeon Image`} className="w-full object-cover pointer-events-none select-none rounded-2xl" />
        <Image src={crow} alt={`Crow Image`} className="w-full object-cover pointer-events-none select-none rounded-2xl" />
      </div>
    </section>
  )
}
