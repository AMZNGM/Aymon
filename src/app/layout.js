import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import AppWrapper from '@/components/app-components/AppWrapper'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
})

export const gambarino = localFont({
  src: '../../public/fonts/Gambarino-Regular.woff2',
  variable: '--font-sec',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aymon.work/'),
  title: 'Ahmed Ayman',
  description:
    'Ahmed Ayman, also known as Aymon, is a multidisciplinary visual artist based in Cairo, Egypt. He is known for his unique style and innovative approach to art, which has earned him recognition in the art world.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${gambarino.variable}`}>
      <body
        suppressHydrationWarning
        className="relative w-dvw h-full bg-text text-bg selection:text-bg selection:bg-main font-main antialiased md:subpixel-antialiased scroll-smooth"
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
