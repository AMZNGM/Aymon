import FooterContent from '@/components/footer-components/FooterContent'

export default function Footer() {
  return (
    <footer className="relative w-screen h-[800px] bg-bg/50" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
        <div className="sticky top-[calc(100vh-800px)] h-[800px]">
          <FooterContent />
        </div>
      </div>
    </footer>
  )
}
