'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { TextAlignJustify } from 'lucide-react'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function MobileMenu() {
  const navLinks = useMemo(() => ['/about', '/work', '/contact'], [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className="lg:hidden">
      <input
        id="mobile-nav-toggle"
        type="checkbox"
        className="peer hidden"
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen(!isMenuOpen)}
      />
      <label aria-label="Open Menu" htmlFor="mobile-nav-toggle" className="absolute top-4 right-4 p-2 cursor-pointer z-101">
        <motion.div whileTap={{ scale: 0.9, rotate: 90 }}>
          <TextAlignJustify strokeWidth={3} />
        </motion.div>
      </label>

      <nav
        role="navigation"
        className="fixed inset-0 flex flex-col justify-center items-center gap-4 text-5xl font-medium uppercase bg-main px-6 py-2 transition-all duration-300 opacity-0 translate-y-full pointer-events-none peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:pointer-events-auto z-100"
      >
        {navLinks.map((link, index) => (
          <motion.div key={index} whileTap={{ scale: 0.9 }}>
            <Link href={link} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <VariableFontHoverByRandomLetter label={link.replace('/', '')} />
            </Link>
          </motion.div>
        ))}
      </nav>
    </div>
  )
}
