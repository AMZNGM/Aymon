import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MobileMenu from '@/components/nav-components/MobileMenu'

export default function SubNavbar() {
  return (
    <header className="fixed top-0 right-0 bg-main z-10">
      <MobileMenu />

      <Link href="/" className="absolute top-16 right-4 p-2 bg-bg/10 rounded-xl cursor-pointer z-1001">
        <ArrowLeft strokeWidth={3} />
      </Link>
    </header>
  )
}
