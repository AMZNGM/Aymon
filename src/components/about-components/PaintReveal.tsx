'use client'

import PaintContent from '@/components/about-components/PaintContent'
import PaintScene from '@/components/about-components/PaintScene'

export default function PaintReveal() {
  return (
    <section className="relative w-dvw min-h-dvh">
      <PaintContent />
      <PaintScene />
    </section>
  )
}
