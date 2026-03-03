import Link from 'next/link'
import AnimText from '@/components/ui/unstyled/AnimText'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import ModalTrigger from '@/components/ui/Modal/ModalTrigger'
import ContactModal from '@/components/nav-components/ContactModal'

export default async function NavLinks() {
  return (
    <>
      <AnimText
        data-cursor-grow="true"
        className="max-lg:hidden flex justify-center items-center gap-4 2xl:gap-[1dvw] text-[15px] 2xl:text-[0.8dvw] text-center uppercase mt-4 p-2"
      >
        {['/about', '/work'].map((link, i) => (
          <Link key={i} href={link} className="active:scale-90 transition-transform duration-200">
            <TextWghtGrow label={link.replace('/', '')} />
          </Link>
        ))}

        <ModalTrigger targetId="desktop-contact-modal" className="cursor-pointer">
          <TextWghtGrow label="contact" />
        </ModalTrigger>
      </AnimText>

      <ContactModal id="desktop-contact-modal" />
    </>
  )
}
