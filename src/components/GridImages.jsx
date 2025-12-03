import Image from 'next/image'
import { crow, metro, pigeon, proof } from '@/data/media-data/media-imports'

export default function GridImages() {
  return (
    <section className="relative lg:w-[75%] ms-auto h-screen px-4 py-12">
      <div className="relative w-full grid lg:grid-cols-2 gap-4 p-18 max-sm:p-0">
        <Image
          src={proof}
          alt={`Proof Image`}
          priority
          width={2000}
          height={2500}
          sizes="(max-width: 1024px) 50vw, 40vw"
          className="object-cover pointer-events-none select-none rounded-2xl"
        />
        <Image
          src={metro}
          alt={`Metro Image`}
          priority
          width={2000}
          height={2500}
          sizes="(max-width: 1024px) 50vw, 40vw"
          className="object-cover pointer-events-none select-none rounded-2xl"
        />
        <Image
          src={pigeon}
          alt={`Pigeon Image`}
          priority
          width={2000}
          height={2500}
          sizes="(max-width: 1024px) 50vw, 40vw"
          className="object-cover pointer-events-none select-none rounded-2xl"
        />
        <Image
          src={crow}
          alt={`Crow Image`}
          priority
          width={2000}
          height={2500}
          sizes="(max-width: 1024px) 50vw, 40vw"
          className="object-cover pointer-events-none select-none rounded-2xl"
        />
      </div>
    </section>
  )
}
