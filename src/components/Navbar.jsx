import Image from 'next/image'
import Link from 'next/link'
import { personalInfo } from '@/data/personal-info'
import { TextAlignJustify } from 'lucide-react'
import { mainPhotoNoBG } from '@/data/media-data/media-imports'

export default function Navbar() {
  return (
    <header className="fixed left-0 w-2/7 max-md:w-screen md:h-screen z-30 px-4 py-18 max-md:py-6">
      <div className="relative size-full flex flex-col justify-start items-center text-center uppercase">
        <h1 className="text-7xl max-md:text-6xl text-center font-black leading-15 max-md:leading-12 cursor-pointer">
          <span className="group relative inline-block">
            <span className="block transition-opacity duration-400 group-hover:opacity-0">
              {personalInfo.firstName}
              <br />
              {personalInfo.lastName}
            </span>

            <Link
              href="/"
              className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            >
              {personalInfo.nickname}
            </Link>
          </span>

          <span className="block text-3xl max-md:text-2xl text-bg/50 font-sec normal-case">Visual Artist</span>
        </h1>

        <Image src={mainPhotoNoBG} alt="Main Image" priority className="size-75 object-cover my-12 max-md:hidden" />

        <nav className="flex gap-4 text-[15px] font-medium mt-4 max-md:hidden">
          <Link href="/about" className="hover:text-bg/25">
            About
          </Link>
          <Link href="/Work" className="hover:text-bg/25">
            Work
          </Link>
          <Link href="/contact" className="hover:text-bg/25">
            Contact
          </Link>
        </nav>

        <div className="max-w-70 mt-4 text-sm font-medium leading-4 normal-case max-md:hidden">
          Welcome to my website! Do stick around. Scrolling is encouraged here, it makes things happen.
        </div>
      </div>

      {/* mobile */}
      <div className="absolute inset-0 size-full flex justify-center items-center md:hidden">
        <input id="mobile-nav-toggle" type="checkbox" className="peer hidden" />
        <label htmlFor="mobile-nav-toggle" className="absolute top-4 right-4 p-2 cursor-pointer">
          <TextAlignJustify strokeWidth={3} />
        </label>

        <nav className="absolute top-full flex flex-col justify-center items-center gap-4 text-5xl font-medium uppercase bg-amber-300 border-2 px-6 py-2 transition-opacity duration-300 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
          <Link href="/about" className="hover:text-bg/25">
            About
          </Link>
          <Link href="/Work" className="hover:text-bg/25">
            Work
          </Link>
          <Link href="/contact" className="hover:text-bg/25">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
