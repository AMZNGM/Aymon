'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import AnimText from '@/components/ui/unstyled/AnimText'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'
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
      <AnimText className="max-lg:hidden flex justify-center items-center gap-4 font-medium text-[15px] text-center uppercase mt-4 p-2">
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
      </AnimText>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
