import { Metadata } from 'next'

export const metadata = {
  title: 'About | Aymon',
  description: 'Learn more about Ahmed Ayman (Aymon) - Multidisciplinary Visual Artist from Cairo, Egypt',
}

export default function AboutLayout({ children }) {
  return <div className="min-h-screen">{children}</div>
}
