import FooterContent from '@/components/footer-components/FooterContent'

export default function Footer() {
  return (
    <footer style={{ clipPath: 'inset(0% 0% 0% 0%)' }} className="relative w-dvw h-[76dvh] bg-bg/50">
      <div className="-top-[100dvh] relative h-[calc(100vh+76dvh)]">
        <div className="top-[calc(100vh-76dvh)] sticky h-[76dvh]">
          <FooterContent />
        </div>
      </div>
    </footer>
  )
}
