import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import contactLinks from '@/data/contactLinks.js'
import logo from '@/assets/imgs/NGMLogo.svg'
import TextFlipper from '@/components/ui/text/TextFlipper'

const Navbar = () => {
  const sectionRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef([])
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const isScrolling = useRef(false)

  useGSAP(
    () => {
      gsap.fromTo(
        linksRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: -0.08,
          ease: 'back.out',
        },
        '+=1'
      )
    },
    { scope: sectionRef }
  )

  useGSAP(
    () => {
      const rotation = menuOpen ? 0 : 180
      const xPos = menuOpen ? 500 : 0

      gsap.to(logoRef.current, {
        rotation,
        duration: 0.6,
        ease: 'back.out(2)',
      })

      gsap.to(linksRef.current, {
        x: xPos,
        duration: 0.5,
        stagger: menuOpen ? 0.08 : -0.08,
        ease: 'back.out',
        delay: 0.2,
      })
    },
    { scope: sectionRef, dependencies: [menuOpen] }
  )

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return

      const currentScrollY = window.scrollY

      if (Math.abs(currentScrollY - lastScrollY.current) < 50) return

      if (currentScrollY > lastScrollY.current && !menuOpen) {
        setMenuOpen(true)
      } else if (currentScrollY < lastScrollY.current && menuOpen) {
        setMenuOpen(false)
      }

      lastScrollY.current = currentScrollY
      isScrolling.current = true

      setTimeout(() => {
        isScrolling.current = false
      }, 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  return (
    <header ref={sectionRef} className='fixed top-0 w-screen flex justify-between bg-bg p-4 z-50'>
      <Link to='/' className='flex justify-center items-center bg-bg'>
        <h1 className='text-text font-fake'>NGM</h1>
      </Link>

      <div className='relative overflow-hidden md:ps-8'>
        <div onClick={() => setMenuOpen(!menuOpen)} className='absolute right-0 border bg-bg p-1 max-md:p-0.5 z-10'>
          <img
            ref={logoRef}
            src={logo}
            alt='NGM Logo'
            loading='lazy'
            className='size-7 object-cover select-none contrast-65 invert-100 cursor-pointer'
          />
        </div>

        <div className='flex justify-center items-center font-fake mr-10 max-md:mr-8 p-1'>
          {contactLinks.map((link, index) => (
            <Link
              ref={el => (linksRef.current[index] = el)}
              aria-label={link.ariaLabel}
              key={link.name}
              to={link.url}
              target='_blank'
              rel='noopener noreferrer'>
              <TextFlipper>
                <span className='text-text text-xs tracking-wider uppercase p-4 max-md:p-2 cursor-pointer'>
                  {link.name}
                </span>
              </TextFlipper>
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
