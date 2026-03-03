import MobileMenu from '@/components/nav-components/MobileMenu'
import BackBtn from '@/components/ui/Buttons/BackBtn'
import HomeBtn from '@/components/ui/Buttons/HomeBtn'
import ScrollIcon from '@/components/nav-components/ScrollIcon'

export default function SubNavbar() {
  return (
    <header className="top-0 right-2 max-md:right-1 z-10 fixed">
      <MobileMenu />
      <BackBtn />
      <HomeBtn />
      <ScrollIcon />
    </header>
  )
}
