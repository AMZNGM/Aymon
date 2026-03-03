import ScrollProvider from '@/components/app-components/ScrollProvider'
import Banner from '@/components/app-components/banner'
import CustomCursor from '@/components/app-components/CustomCursor'
import GlobalImageModal from '@/components/app-components/GlobalImageModal'
import ScrollToTopBtn from '@/components/app-components/ScrollToTopBtn'
import Footer from '@/components/footer-components/Footer'

export default function AppWrapper({ children }) {
  return (
    <ScrollProvider>
      <Banner />
      {children}
      <CustomCursor />
      <GlobalImageModal />
      <ScrollToTopBtn />
      <Footer />
    </ScrollProvider>
  )
}
