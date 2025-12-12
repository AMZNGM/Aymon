import SubNavbar from '@/components/nav-components/SubNavbar'

export const metadata = {
  title: 'About | Aymon',
  description: 'Learn more about Ahmed Ayman (Aymon) - Multidisciplinary Visual Artist from Cairo, Egypt',
}

export default function AboutLayout({ children }) {
  return (
    <>
      <SubNavbar />
      {children}
    </>
  )
}
