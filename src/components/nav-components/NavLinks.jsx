'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import AnimText from '@/components/ui/unstyled/AnimText'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import ContactPopup from '@/components/nav-components/ContactPopup'

export default function NavLinks() {
  const navLinks = useMemo(() => ['/about', '/work'], [])
  const [isContactOpen, setIsContactOpen] = useState(false)

  const handleContactClick = (e) => {
    e.preventDefault()
    setIsContactOpen(true)
  }

  return (
    <>
      <AnimText className="max-lg:hidden flex justify-center items-center gap-4 2xl:gap-[1dvw] text-[15px] 2xl:text-[0.8dvw] text-center uppercase mt-4 p-2">
        {navLinks.map((link, index) => (
          <motion.div key={index} whileTap={{ scale: 0.9 }} onClick={() => (window.location.href = link)}>
            <Link href={link}>
              <TextWghtGrow label={link.replace('/', '')} />
            </Link>
          </motion.div>
        ))}

        <motion.div whileTap={{ scale: 0.9 }}>
          <button onClick={handleContactClick} className="uppercase cursor-pointer">
            <TextWghtGrow label="contact" />
          </button>
        </motion.div>
      </AnimText>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
