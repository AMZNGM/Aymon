import FooterContent from '@/components/footer-components/FooterContent'

export default function Footer() {
  return (
    <footer className="relative w-dvw h-[800px] bg-bg/50" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="-top-[100vh] relative h-[calc(100vh+800px)]">
        <div className="top-[calc(100vh-800px)] sticky h-[800px]">
          <FooterContent />
        </div>
      </div>
    </footer>
  )
}
