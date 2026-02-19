import LogoName from '@/components/nav-components/LogoName'
import NavLinks from '@/components/nav-components/NavLinks'
import NavImage from '@/components/nav-components/NavImage'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function Navbar() {
  return (
    <header className="relative w-full lg:h-dvh flex flex-col justify-start items-center max-lg:bg-text rounded-b-4xl duration-300 px-12 max-lg:px-4 max-xl:px-4 py-18 max-lg:py-4">
      <LogoName />
      <NavImage />
      <NavLinks />
      <MobileMenu />
    </header>
  )
}
