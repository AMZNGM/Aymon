import MobileMenu from '@/components/nav-components/MobileMenu'
import BackBtn from '@/components/ui/Buttons/BackBtn'

export default function SubNavbar() {
  return (
    <header className="fixed top-0 right-0 z-10">
      <MobileMenu />
      <BackBtn />
    </header>
  )
}
