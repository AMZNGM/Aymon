import MobileMenu from '@/components/nav-components/MobileMenu'
import BackBtn from '@/components/ui/Buttons/BackBtn'
import ScrollIcon from '../Projects-components/ScrollIcon'

export default function SubNavbar() {
  return (
    <header className="fixed top-0 right-2 max-md:right-1 z-10">
      <MobileMenu />
      <BackBtn />
      <ScrollIcon />
    </header>
  )
}
