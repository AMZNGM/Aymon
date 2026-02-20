import Link from 'next/link'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'

export default function NotFound() {
  return (
    <main className="relative w-dvw h-dvh overflow-hidden bg-text text-bg py-24 px-4 z-50">
      <section className="relative size-full flex flex-col justify-center items-center gap-8">
        <div className="text-center">
          <h1 className="text-2xl font-medium">Page not found</h1>
          <p className="text-sm">Sorry, there is nothing here</p>
        </div>
        <Link href="/" className="text-xs hover:text-main duration-200">
          <TextWghtGrow label="Go Back Home" />
        </Link>
      </section>
    </main>
  )
}
