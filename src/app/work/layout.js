import SubNavbar from '@/components/nav-components/SubNavbar'

export const metadata = {
  title: 'Work | Aymon',
  description: 'Explore the portfolio of Ahmed Ayman (Aymon) - Visual projects, collaborations, and creative work',
}

export default function WorkLayout({ children }) {
  return (
    <>
      <SubNavbar />
      {children}
    </>
  )
}
