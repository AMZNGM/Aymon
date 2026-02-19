import ErrorBackground from '@/components/shared/ErrorBackground'
import FooterContent from '@/components/footer-components/FooterContent'

export default function Footer() {
  return (
    <footer className="relative w-dvw h-[800px] max-md:h-[600px] bg-sec [clip-path:inset(0)]">
      <div className="-top-[100vh] relative h-[calc(100vh+800px)] max-md:h-[calc(100vh+600px)]">
        <div className="top-[calc(100vh-800px)] max-md:top-[calc(100vh-600px)] sticky h-[800px] max-md:h-[600px]">
          <FooterContent />
          <ErrorBackground className="opacity-20! blur-xs" />
        </div>
      </div>
    </footer>
  )
}
