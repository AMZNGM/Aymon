import LenisSetup from '@/components/app-components/LenisSetup'
import Navbar from '@/components/Navbar.jsx'

export default function AppWrapper({ children }) {
  return (
    <>
      <LenisSetup />
      <Navbar />
      {children}
      {/* <span className="absolute bottom-1 left-2 text-main/40 text-xs uppercase">Made by NGM</span> */}
    </>
  )
}
