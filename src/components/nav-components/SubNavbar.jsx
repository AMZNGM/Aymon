import MobileMenu from '@/components/nav-components/MobileMenu'
import BackBtn from '@/components/ui/Buttons/BackBtn'
import ScrollIcon from '@/components/nav-components/ScrollIcon'

export default function SubNavbar() {
  return (
    <header className="z-10 relative">
      <MobileMenu viewFromStart />

      <div className="top-14 right-3 fixed bg-sec -rotate-2">
        <BackBtn />
        <ScrollIcon />
      </div>
    </header>
  )
}
