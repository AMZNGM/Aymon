import { Metadata } from 'next'

export const metadata = {
  title: 'Contact | Aymon',
  description: 'Get in touch with Ahmed Ayman (Aymon) - Multidisciplinary Visual Artist in Cairo, Egypt',
}

export default function ContactLayout({ children }) {
  return <div className="min-h-screen">{children}</div>
}
