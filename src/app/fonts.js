import localFont from 'next/font/local'
import { Inter, Micro_5_Charted, Doto, Coral_Pixels } from 'next/font/google'

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

export const doto = Doto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-doto',
})

export const micro5Charted = Micro_5_Charted({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-charted',
})

export const coralPixels = Coral_Pixels({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel',
})
