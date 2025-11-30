'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
// import Navbar from '@/components/Navbar.jsx'

export default function AppWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* <Navbar /> */}
      {children}
      <span className="absolute bottom-1 right-2 text-text/40 text-xs uppercase">Made by NGM</span>
    </>
  )
}
