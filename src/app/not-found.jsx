import Link from 'next/link'
import Image from 'next/image'
import { mediaData } from '@/data/media-data/media-imports'

export default function NotFound() {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-bg text-text py-24 px-4">
      <Image
        src={mediaData[20]}
        alt="404"
        fill
        sizes="100vw"
        placeholder="blur"
        className="absolute inset-0 object-cover opacity-30 pointer-events-none max-md:hidden"
      />

      <div className="relative size-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-medium">Page not found</h1>
        <p className="text-sm">Sorry, there’s nothing here</p>
        <Link href="/" className="text-xs hover:text-main duration-200">
          Go Back Home
        </Link>
      </div>
    </section>
  )
}
