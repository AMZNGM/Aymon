import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-bg text-text py-24 px-4">
      <section className="relative size-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-medium">Page not found</h1>
        <p className="text-sm">Sorry, there’s nothing here</p>
        <Link href="/" className="text-xs hover:text-main duration-200">
          Go Back Home
        </Link>
      </section>
    </main>
  )
}
