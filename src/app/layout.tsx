import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import AppWrapper from '@/components/app-components/AppWrapper'

export const inter = Inter({
  subsets: ['latin'],
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
  openGraph: {
    title: 'Ahmed Ayman - Visual Artist',
    description: 'Multidisciplinary visual artist based in Cairo, Egypt. Explore innovative artworks and creative projects.',
    url: 'https://aymon.work/',
    siteName: 'Ahmed Ayman',
    images: [
      {
        url: '/images/profile2.webp',
        width: 1200,
        height: 630,
        alt: 'Ahmed Ayman - Visual Artist',
      },
      {
        url: '/images/profile2.webp',
        width: 1200,
        height: 1200,
        alt: 'Ahmed Ayman Profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Ayman - Visual Artist',
    description: 'Multidisciplinary visual artist based in Cairo, Egypt. Explore innovative artworks and creative projects.',
    url: '/images/profile2.webp',
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} ${gambarino.variable}`}>
      <body
        suppressHydrationWarning
        className="relative w-full h-full overflow-x-hidden! bg-text selection:bg-main text-bg selection:text-bg antialiased md:subpixel-antialiased scroll-smooth"
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
