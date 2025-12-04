import Image from 'next/image'
import Link from 'next/link'
import { personalInfo } from '@/data/personal-info'
import { TextAlignJustify } from 'lucide-react'
import { mainPhotoNoBG } from '@/data/media-data/media-imports'
import RandomColorText from '@/components/ui/text/RandomColorText'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function Navbar() {
  return (
    <header className="fixed left-0 w-2/7 max-lg:w-screen lg:h-screen max-sm:bg-text z-30 px-4 py-18 max-lg:py-6">
      <div className="relative size-full flex flex-col justify-start items-center text-center uppercase">
        <h1 className="text-7xl max-lg:text-6xl text-center font-black leading-15 max-lg:leading-12 cursor-pointer">
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
              <RandomColorText />
            </Link>
          </span>

          <span className="block text-3xl max-lg:text-2xl text-bg/50 font-sec normal-case">Visual Artist</span>
        </h1>

        <Image
          src={mainPhotoNoBG}
          alt="Main Image"
          priority
          className="size-75 object-cover pointer-events-none select-none my-12 max-lg:hidden"
        />

        <nav className="flex gap-4 text-[15px] font-medium mt-4 p-2 max-lg:hidden">
          <Link href="/about">
            <VariableFontHoverByRandomLetter label="About" />
          </Link>

          <Link href="/Work">
            <VariableFontHoverByRandomLetter label="Work" />
          </Link>

          <Link href="/contact">
            <VariableFontHoverByRandomLetter label="Contact" />
          </Link>
        </nav>
      </div>

      {/* mobile */}
      <div className="lg:hidden">
        <input id="mobile-nav-toggle" type="checkbox" className="peer hidden" />
        <label htmlFor="mobile-nav-toggle" className="absolute top-4 right-4 p-2 cursor-pointer z-101">
          <TextAlignJustify strokeWidth={3} />
        </label>

        <nav className="fixed inset-0 flex flex-col justify-center items-center gap-4 text-5xl font-medium uppercase bg-main px-6 py-2 transition-all duration-300 opacity-0 translate-y-full pointer-events-none peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:pointer-events-auto z-100">
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
