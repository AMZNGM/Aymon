import Image from 'next/image'
import { crow, metro, pigeon, proof } from '@/data/media-data/media-imports'

export default function GridImages() {
  const images = [
    { src: proof, width: 800, height: 1000, alt: 'Proof Image' },
    { src: metro, width: 800, height: 1000, alt: 'Metro Image' },
    { src: pigeon, width: 800, height: 1000, alt: 'Pigeon Image' },
    { src: crow, width: 800, height: 800, alt: 'Crow Image' },
  ]

  return (
    <section className="relative lg:w-[75%] ms-auto h-screen px-4 py-12">
      <div className="relative w-full grid lg:grid-cols-2 gap-4 p-18 max-sm:p-0">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            priority={index < 2}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1024px) 50vw, 30vw"
            className="object-cover pointer-events-none select-none rounded-2xl"
          />
        ))}
      </div>
    </section>
  )
}
