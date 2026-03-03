import LogoName from '@/components/nav-components/LogoName'
import NavImage from '@/components/nav-components/NavImage'
import NavLinks from '@/components/nav-components/NavLinks'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function Navbar() {
  return (
    <header className="relative flex flex-col justify-start items-center w-full lg:h-dvh max-lg:bg-text rounded-b-4xl duration-300 px-12 max-lg:px-4 max-xl:px-4 py-18 max-lg:py-4">
      <LogoName />
      <NavImage />
      <NavLinks />
      <MobileMenu className={'lg:hidden'} btnClassName={'right-2!'} />
    </header>
  )
}
