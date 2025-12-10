'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { TextAlignJustify } from 'lucide-react'
import ClickEffect from '@/components/ui/effect/ClickEffect'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'
import ContactPopup from '@/components/ui/ContactPopup'

export default function MobileMenu({ className, btnClassName }) {
  const navLinks = useMemo(() => ['/about', '/work'], [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const handleContactClick = (e) => {
    e.preventDefault()
    setIsContactOpen(true)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <div className={`${className}`}>
      <input
        id="mobile-nav-toggle"
        type="checkbox"
        className="peer hidden"
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen(!isMenuOpen)}
      />
      <label
        aria-label="Open Menu"
        htmlFor="mobile-nav-toggle"
        className={`absolute top-4 right-2 max-md:right-1 backdrop-blur-sm ${btnClassName}`}
      >
        <ClickEffect className={`bg-bg/10 hover:bg-bg/30 duration-100 rounded-xl cursor-pointer z-1001 p-2`}>
          <motion.div whileTap={{ scale: 0.9, rotate: 90 }}>
            <TextAlignJustify strokeWidth={3} />
          </motion.div>
        </ClickEffect>
      </label>

      <nav
        role="navigation"
        className="fixed inset-0 flex flex-col justify-center items-center gap-4 text-5xl font-medium uppercase bg-main px-6 py-2 transition-all duration-300 opacity-0 translate-y-full pointer-events-none peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:pointer-events-auto z-1000"
      >
        {navLinks.map((link, index) => (
          <motion.div key={index} whileTap={{ scale: 0.9 }}>
            <Link href={link} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <VariableFontHoverByRandomLetter label={link.replace('/', '')} />
            </Link>
          </motion.div>
        ))}

        <motion.div whileTap={{ scale: 0.9 }}>
          <button onClick={handleContactClick}>
            <VariableFontHoverByRandomLetter label="contact" />
          </button>
        </motion.div>
      </nav>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  )
}
