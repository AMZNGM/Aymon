import { PreloaderProvider } from '@/context/PreloaderContext'
import ErrorBoundary from '@/components/app-components/ErrorBoundary'
import ScrollProvider from '@/components/app-components/ScrollProvider'
import Banner from '@/app/banner'
import CustomCursor from '@/components/app-components/CustomCursor'
import ScrollToTop from '@/components/app-components/ScrollToTop'
import GlobalImageModal from '@/components/app-components/GlobalImageModal'
import ScrollToTopBtn from '@/components/app-components/ScrollToTopBtn'
import Footer from '@/components/footer-components/Footer'

export default function AppWrapper({ children }) {
  return (
    <ErrorBoundary>
      <ScrollProvider>
        <PreloaderProvider>
          <Banner />
          <ScrollToTop />
          {children}
          <CustomCursor />
          <GlobalImageModal />
          <ScrollToTopBtn />
          <Footer />
        </PreloaderProvider>
      </ScrollProvider>
    </ErrorBoundary>
  )
}
