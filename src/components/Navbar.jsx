import LogoName from '@/components/nav-components/LogoName'
import NavLinks from '@/components/nav-components/NavLinks'
import NavImage from '@/components/nav-components/NavImage'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function Navbar() {
  return (
    <header className="fixed left-0 w-2/7 max-lg:w-screen lg:h-screen max-sm:bg-text rounded-b-4xl z-30 px-4 py-18 max-lg:py-6">
      <div className="relative w-full h-full flex flex-col justify-start items-center text-center uppercase">
        <LogoName />
        <NavImage />
        <NavLinks />
      </div>
      <MobileMenu />
    </header>
  )
}
