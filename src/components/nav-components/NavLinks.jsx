'use client'

import Link from 'next/link'
import { useState } from 'react'
import AnimText from '@/components/ui/unstyled/AnimText'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import ContactPopup from '@/components/nav-components/ContactPopup'

export default function NavLinks() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <>
      <AnimText className="max-lg:hidden flex justify-center items-center gap-4 2xl:gap-[1dvw] text-[15px] 2xl:text-[0.8dvw] text-center uppercase mt-4 p-2">
        {['/about', '/work'].map((link, index) => (
          <div key={index} onClick={() => (window.location.href = link)} className="active:scale-90 transition-transform duration-200">
            <Link href={link}>
              <TextWghtGrow label={link.replace('/', '')} />
            </Link>
          </div>
        ))}

        <button
          onClick={(e) => {
            e.preventDefault()
            setIsContactOpen(true)
          }}
          className="uppercase active:scale-90 transition-transform duration-200 cursor-pointer"
        >
          <TextWghtGrow label="contact" />
        </button>
      </AnimText>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
