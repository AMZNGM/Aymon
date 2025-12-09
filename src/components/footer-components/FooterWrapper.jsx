'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/footer-components/Footer'

export default function FooterWrapper() {
  const pathname = usePathname()

  if (pathname === '/about') {
    return null
  }

  return <Footer />
}
