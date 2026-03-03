'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { TextAlignJustify } from 'lucide-react'
import RippleEffect from '@/components/ui/effect/RippleEffect'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import ModalTrigger from '@/components/ui/Modal/ModalTrigger'
import ContactModal from '@/components/nav-components/ContactModal'

export default function MobileMenu({ className, btnClassName }: { className?: string; btnClassName?: string }) {
  const navLinks = useMemo(() => ['/about', '/work'], [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen(!isMenuOpen)}
        className="peer hidden"
      />
      <label
        htmlFor="mobile-nav-toggle"
        className={`absolute top-4 right-2 max-md:right-1 backdrop-blur-sm overflow-hidden rounded-xl z-1001 ${btnClassName}`}
      >
        <motion.div whileTap={{ scale: 0.9, rotate: 90 }}>
          <RippleEffect className={`bg-bg/10 hover:bg-bg/30 duration-100 rounded-xl cursor-pointer z-1001 p-2`}>
            <TextAlignJustify strokeWidth={3} />
          </RippleEffect>
        </motion.div>
      </label>

      <nav className="z-1000 fixed inset-0 flex flex-col justify-center items-center gap-4 overflow-hidden bg-main opacity-100 peer-checked:opacity-100 font-medium 2xl:text-[4dvw] text-5xl uppercase transition-all translate-y-full peer-checked:translate-y-0 duration-300 ease-in-out px-6 py-2 pointer-events-none peer-checked:pointer-events-auto">
        {navLinks.map((link, index) => (
          <motion.div key={index} whileTap={{ scale: 0.9 }}>
            <Link href={link} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <TextWghtGrow label={link.replace('/', '')} />
            </Link>
          </motion.div>
        ))}

        <motion.div whileTap={{ scale: 0.9 }}>
          <ModalTrigger targetId="contact-modal" className="cursor-pointer">
            <TextWghtGrow label="contact" className="uppercase" />
          </ModalTrigger>
        </motion.div>
      </nav>

      <ContactModal />
    </div>
  )
}
