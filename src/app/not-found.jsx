import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-bg text-text flex justify-center items-center py-24 px-4 z-50">
      {/* <Image
        src={CircularBuildingBG}
        alt="404"
        fill
        placeholder="blur"
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-30 pointer-events-none"
      /> */}

      <div className="flex flex-col gap-8 text-center">
        <div className="space-y-4">
          <h1 className="font-normal">Our Apologies</h1>
          <h3 className="text-3xl font-medium">It seems you have reached a page that does not exist.</h3>
          <p className="text-lg font-normal">Either the page is not available, or the address (URL) you have entered is incorrect.</p>
          <Link href="/" className="btn">
            Go Back Home
          </Link>
        </div>

        <div className="space-y-4">
          <h2 className="font-normal">نأسف</h2>
          <h3 className="text-4xl font-medium">الصفحة المطلوبة غير موجودة</h3>
          <p className="text-lg font-normal">قد يكون سبب المشكلة أن الصفحة غير متاحة، أو أن رابط الصفحة الذي أدخلته غير صحيح</p>
        </div>
      </div>
    </section>
  )
}
