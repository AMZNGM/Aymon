'use client'

import React from 'react'

export default function ModalTrigger({
  targetId,
  children,
  className,
}: {
  targetId: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={className}
      onClick={() => {
        const el = document.getElementById(targetId) as HTMLInputElement | null
        if (el) el.checked = !el.checked
      }}
    >
      {children}
    </span>
  )
}
