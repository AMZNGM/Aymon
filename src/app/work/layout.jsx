import MobileMenu from '@/components/nav-components/MobileMenu'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Work | Aymon',
  description: 'Explore the portfolio of Ahmed Ayman (Aymon) - Visual projects, collaborations, and creative work',
}

export default function WorkLayout({ children }) {
  return (
    <>
      <Link href="/" className="fixed top-4 left-4 p-2 z-10 bg-bg/10 rounded-xl">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <MobileMenu className={'sticky top-0 z-10'} />

      {children}
    </>
  )
}
