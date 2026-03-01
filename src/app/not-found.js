import Link from 'next/link'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'

export default function NotFound() {
  return (
    <section className="relative w-dvw h-dvh flex max-md:flex-col justify-center items-center gap-4 p-4">
      <h1 className="text-2xl font-medium">nothing here</h1>
      <p className="text-sm">shut your eyes and go back</p>
      <Link href="/" className="text-xs duration-200 border px-2 py-1 rounded-sm hover:bg-bg hover:text-text">
        <TextWghtGrow label="by by" />
      </Link>
    </section>
  )
}
