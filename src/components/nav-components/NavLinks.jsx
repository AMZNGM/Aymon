'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'
import useTextClipPath from '@/hooks/useTextClipPath'
import ContactPopup from '@/components/ui/ContactPopup'

export default function NavLinks() {
  const navLinks = useMemo(() => ['/about', '/work'], [])
  const [isContactOpen, setIsContactOpen] = useState(false)

  const handleContactClick = (e) => {
    e.preventDefault()
    setIsContactOpen(true)
  }

  return (
    <>
      <motion.nav
        {...useTextClipPath(0, true)}
        className="flex justify-center items-center text-center gap-4 text-[15px] font-medium uppercase mt-4 p-2 max-lg:hidden"
      >
        {navLinks.map((link, index) => (
          <motion.div key={index} whileTap={{ scale: 0.9 }} onClick={() => (window.location.href = link)}>
            <Link href={link}>
              <VariableFontHoverByRandomLetter label={link.replace('/', '')} />
            </Link>
          </motion.div>
        ))}

        <motion.div whileTap={{ scale: 0.9 }}>
          <button onClick={handleContactClick} className="uppercase cursor-pointer">
            <VariableFontHoverByRandomLetter label="contact" />
          </button>
        </motion.div>
      </motion.nav>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
