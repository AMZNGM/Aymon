import Link from 'next/link'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'

export default function NotFound() {
  return (
    <section className="relative flex max-md:flex-col justify-center items-center gap-4 w-dvw h-dvh p-4">
      <h1 className="font-medium text-2xl">nothing here</h1>
      <p className="text-sm">shut your eyes and go back</p>
      <Link href="/" className="hover:bg-bg border rounded-sm hover:text-text text-xs duration-200 px-2 py-1">
        <TextWghtGrow label="by by" />
      </Link>
    </section>
  )
}
