import LenisSetup from '@/components/app-components/LenisSetup'
import Navbar from '@/components/Navbar.jsx'

export default function AppWrapper({ children }) {
  return (
    <>
      <LenisSetup />
      <Navbar />
      {children}
    </>
  )
}
