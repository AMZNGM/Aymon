import LogoName from '@/components/nav-components/LogoName'
import NavLinks from '@/components/nav-components/NavLinks'
import NavImage from '@/components/nav-components/NavImage'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function Navbar() {
  return (
    <header className="relative lg:h-screen bg-text rounded-b-4xl py-18 max-lg:py-4 px-18 max-lg:px-6 max-xl:px-8 duration-300">
      <LogoName />
      <NavImage />
      <NavLinks />
      <MobileMenu />
    </header>
  )
}
