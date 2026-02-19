import ErrorBoundary from '@/components/app-components/ErrorBoundary'
import ScrollProvider from '@/components/app-components/ScrollProvider'
import Banner from '@/app/banner'
import CustomCursor from '@/components/app-components/CustomCursor'
import ScrollToTop from '@/components/app-components/ScrollToTop'
import GlobalImageModal from '@/components/app-components/GlobalImageModal'
import Footer from '@/components/footer-components/Footer'

export default function AppWrapper({ children }) {
  return (
    <ErrorBoundary>
      <ScrollProvider>
        <Banner />
        <ScrollToTop />
        {children}
        <CustomCursor />
        <GlobalImageModal />
        <Footer />
      </ScrollProvider>
    </ErrorBoundary>
  )
}
