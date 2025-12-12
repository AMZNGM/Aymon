import './globals.css'
import { inter, gambarino } from '@/app/fonts'
import Banner from '@/app/banner'
import ErrorBoundary from '@/components/app-components/ErrorBoundary'
import LenisSetup from '@/components/app-components/LenisSetup'
// import CustomCursor from '@/components/app-components/CustomCursor'
import GlobalImageModal from '@/components/app-components/GlobalImageModal'
import FooterWrapper from '@/components/footer-components/FooterWrapper'

export const metadata = {
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
    <html lang="en">
      <body
        className={`relative w-screen min-h-screen overflow-x-hidden! bg-text text-bg selection:text-bg selection:bg-main font-inter scroll-smooth antialiased ${inter.variable} ${gambarino.variable}`}
      >
        <LenisSetup />

        <ErrorBoundary>
          <Banner />
          {/* <CustomCursor /> */}
          {children}
          <FooterWrapper />
          <GlobalImageModal />
        </ErrorBoundary>
      </body>
    </html>
  )
}
