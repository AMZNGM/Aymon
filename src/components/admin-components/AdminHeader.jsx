'use client'

import Link from 'next/link'
import { auth } from '@/lib/firebase'

export default function AdminHeader() {
  return (
    <div className="flex max-md:flex-col justify-between items-center max-md:gap-8 mb-8">
      <h1 className="font-bold text-3xl">Admin Panel</h1>

      <div className="flex flex-row-reverse max-md:flex-col gap-4">
        <button
          onClick={() => auth.signOut()}
          className="hover:bg-main border border-main rounded-md text-main hover:text-text text-center transition-all px-4 py-2 cursor-pointer"
        >
          Sign Out
        </button>

        <div className="flex gap-4">
          <Link
            href="/admin/content"
            className="bg-green-600 hover:bg-green-700 rounded-md text-white text-center transition-all px-4 py-2"
          >
            Edit About Page
          </Link>

          <Link href="/work" className="bg-main hover:bg-main/90 rounded-md text-text text-center transition-all px-4 py-2">
            View Work Page
          </Link>
        </div>
      </div>
    </div>
  )
}
