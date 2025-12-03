import localFont from 'next/font/local'
import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const gambarino = localFont({
  src: '../../public/fonts/Gambarino-Regular.woff2',
  display: 'swap',
  variable: '--font-sec',
})
