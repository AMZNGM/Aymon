'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { easings } from '@/utils/anim'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useIsMobile } from '@/hooks/useIsMobile'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'
import ContactPopup from '@/components/nav-components/ContactPopup'

export default function MobileMenu({ className, viewFromStart = false }) {
  const navLinks = useMemo(() => ['/about', '/work'], [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const isScrolled100vh = useScrollPosition(2.5)
  const ToggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleContactClick = (e) => {
    e.preventDefault()
    setIsContactOpen(true)
  }

  useKeyboardShortcuts({
    onEscape: () => {
      setIsMenuOpen(false)
    },
  })

  const isMobile = useIsMobile()
  if (isMobile) {
    viewFromStart = true
  }

  return (
    <aside className={`${className}`}>
      <motion.label
        aria-label="Open Menu"
        htmlFor="mobile-nav-toggle"
        onClick={ToggleMenu}
        whileTap={{ scale: 2.2 }}
        transition={{ duration: 0.3, ease: easings.motion }}
        className={`z-9999 fixed -right-14 max-md:-right-26 ${!viewFromStart ? (isScrolled100vh ? '-top-32' : '-top-52') : '-top-32'} size-44 bg-main -rotate-12 cursor-pointer ${isMenuOpen ? 'rotate-12' : ''} transition-all duration-300`}
      />

      <AnimatePresence>
        {isMenuOpen && (viewFromStart || isScrolled100vh) && (
          <motion.nav
            role="navigation"
            initial={{ y: '115%', rotate: 30 }}
            animate={{ y: 0, rotate: -20 }}
            exit={{ y: '115%', rotate: 30 }}
            transition={{ duration: 0.3, delay: 0.1, ease: easings.motion }}
            className="z-1000 fixed inset-0 max-w-2xl flex flex-col justify-center items-center gap-4 bg-main font-medium text-5xl uppercase px-6 py-2"
          >
            {navLinks.map((link, index) => (
              <motion.div key={index} whileTap={{ scale: 0.9 }}>
                <Link href={link} onClick={() => setIsMenuOpen(false)}>
                  <VariableFontHoverByRandomLetter label={link.replace('/', '')} />
                </Link>
              </motion.div>
            ))}

            <motion.div whileTap={{ scale: 0.9 }}>
              <button onClick={handleContactClick} className="cursor-pointer">
                <VariableFontHoverByRandomLetter label="contact" className="uppercase" />
              </button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </aside>
  )
}
