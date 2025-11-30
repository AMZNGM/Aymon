import Lenis from 'lenis'
// import Navbar from '@/components/Navbar.jsx'

export default function AppWrapper({ children }) {
  const lenis = new Lenis()
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return (
    <>
      {/* <Navbar /> */}
      {children}
      {/* <span className="absolute bottom-1 right-2 text-main/40 text-xs">Made by NGM</span> */}
    </>
  )
}
