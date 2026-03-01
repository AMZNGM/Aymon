'use client'

export default function ModalTrigger({ targetId, children, className }) {
  return (
    <span
      className={className}
      onClick={() => {
        const el = document.getElementById(targetId)
        if (el) el.checked = !el.checked
      }}


    >
      {children}
    </span>
  )
}






