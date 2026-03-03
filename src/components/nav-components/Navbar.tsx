import LogoName from '@/components/nav-components/LogoName'
import NavImage from '@/components/nav-components/NavImage'
import NavLinks from '@/components/nav-components/NavLinks'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function Navbar() {
  return (
    <header className="relative flex flex-col items-center lg:h-dvh max-lg:bg-text max-lg:rounded-b-4xl py-18 max-lg:py-2">
      <LogoName />
      <NavImage />
      <NavLinks />
      <MobileMenu className={'lg:hidden'} btnClassName={'right-2!'} />
    </header>
  )
}
