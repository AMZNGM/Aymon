'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function NavLinks() {
  const navLinks = useMemo(() => ['/about', '/work', '/contact'], [])

  return (
    <nav className="flex gap-4 text-[15px] font-medium mt-4 p-2 max-lg:hidden">
      {navLinks.map((link, index) => (
        <motion.div key={index} whileTap={{ scale: 0.9 }} onClick={() => (window.location.href = link)}>
          <Link href={link}>
            <VariableFontHoverByRandomLetter label={link.replace('/', '')} />
          </Link>
        </motion.div>
      ))}
    </nav>
  )
}
