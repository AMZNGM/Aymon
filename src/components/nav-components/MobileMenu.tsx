import Link from 'next/link'
import { TextAlignJustify } from 'lucide-react'
import RippleEffect from '@/components/ui/effect/RippleEffect'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import ModalTrigger from '@/components/ui/Modal/ModalTrigger'
import ContactModal from '@/components/nav-components/ContactModal'

export default function MobileMenu({ className, btnClassName }: { className?: string; btnClassName?: string }) {
  const navLinks = ['/about', '/work']

  return (
    <div className={`${className} overflow-hidden`}>
      <input id="mobile-nav-toggle" type="checkbox" className="peer hidden" />
      <label
        htmlFor="mobile-nav-toggle"
        className={`absolute top-4 right-2 max-md:right-1 overflow-hidden rounded-xl z-9999 ${btnClassName}`}
      >
        <RippleEffect
          className={`bg-bg/10 hover:bg-bg/30 duration-200 rounded-xl cursor-pointer z-1001 p-2 active:scale-90 active:rotate-20`}
        >
          <TextAlignJustify strokeWidth={3} />
        </RippleEffect>
      </label>

      <nav className="z-9998 fixed inset-0 flex flex-col justify-center items-center gap-4 overflow-hidden bg-main opacity-100 peer-checked:opacity-100 font-medium 2xl:text-[4dvw] text-5xl uppercase transition-all translate-y-full peer-checked:translate-y-0 duration-300 ease-in-out px-6 py-2 pointer-events-none peer-checked:pointer-events-auto">
        {navLinks.map((link, index) => (
          <label key={index} htmlFor="mobile-nav-toggle" className="cursor-pointer">
            <Link href={link} className="active:scale-90 duration-200">
              <TextWghtGrow label={link.replace('/', '')} />
            </Link>
          </label>
        ))}

        <ModalTrigger targetId="mobile-contact-modal" className="active:scale-90 duration-200 cursor-pointer">
          <TextWghtGrow label="contact" className="uppercase" />
        </ModalTrigger>
      </nav>

      <ContactModal id="mobile-contact-modal" />
    </div>
  )
}
