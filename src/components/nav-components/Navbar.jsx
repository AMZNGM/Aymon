import LogoName from '@/components/nav-components/LogoName'
import NavLinks from '@/components/nav-components/NavLinks'
import NavImage from '@/components/nav-components/NavImage'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function Navbar() {
  return (
    <header className="relative lg:h-dvh max-lg:bg-text rounded-b-4xl duration-300 px-18 max-lg:px-6 max-xl:px-8 py-18 max-lg:py-4">
      <LogoName />
      <NavImage />
      <NavLinks />
      <MobileMenu className={'lg:hidden'} btnClassName={'right-2!'} />
    </header>
  )
}
