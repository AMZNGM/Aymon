import LogoName from '@/components/nav-components/LogoName'
import NavLinks from '@/components/nav-components/NavLinks'
import NavImage from '@/components/nav-components/NavImage'
import MobileMenu from '@/components/nav-components/MobileMenu'
import NavSlogan from '@/components/nav-components/NavSlogan'

export default function Navbar() {
  return (
    <header className="relative lg:h-screen max-lg:bg-text rounded-b-4xl py-18 max-lg:py-4 px-18 max-lg:px-6 max-xl:px-8 duration-300">
      <LogoName />
      <NavImage />
      <NavLinks />
      <div className="absolute top-1/2 left-1/2 -translate-1/2 rotate-16 -translate-y-22">
        <NavSlogan />
      </div>
      <MobileMenu className={'lg:hidden'} />
    </header>
  )
}
