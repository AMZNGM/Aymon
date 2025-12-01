import Navbar from '@/components/Navbar.jsx'
import LenisSetup from '@/components/app-components/LenisSetup'

export default function AppWrapper({ children }) {
  return (
    <>
      <Navbar />
      <LenisSetup />
      {children}
      <span className="absolute bottom-1 left-2 text-main/40 text-xs uppercase">Made by NGM</span>
    </>
  )
}
