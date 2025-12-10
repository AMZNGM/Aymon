import { X } from 'lucide-react'
import ClickEffect from '@/components/ui/effect/ClickEffect'

export default function CloseBtn({ onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`absolute top-4 right-4 ${className}`}>
      <ClickEffect className="group bg-text/10 hover:bg-text/15 rounded-lg duration-100 cursor-pointer p-2">
        <X size={20} className="group-hover:rotate-180 duration-300" />
      </ClickEffect>
    </button>
  )
}
