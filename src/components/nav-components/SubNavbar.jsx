import MobileMenu from '@/components/nav-components/MobileMenu'
import BackBtn from '@/components/ui/Buttons/BackBtn'
import ScrollIcon from '../Projects-components/ScrollIcon'

export default function SubNavbar() {
  return (
    <header className="fixed top-0 right-4 max-md:right-1 z-10">
      <MobileMenu />
      <div className="fixed top-0 right-4 max-md:right-1 w-14 max-md:w-12 h-80 rounded-2xl backdrop-blur-sm">
        <BackBtn />
        <ScrollIcon />
      </div>
    </header>
  )
}
