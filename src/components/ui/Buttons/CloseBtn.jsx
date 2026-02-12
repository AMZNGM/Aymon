import { X } from 'lucide-react'
import RippleEffect from '@/components/ui/effect/RippleEffect'

export default function CloseBtn({ onClick, className = '' }) {
  return (
    <button onClick={onClick} className={`absolute top-4 right-4 ${className}`}>
      <RippleEffect className="group bg-text/10 hover:bg-text/15 rounded-lg duration-100 p-2 cursor-pointer">
        <X size={20} className="group-hover:rotate-180 duration-300" />
      </RippleEffect>
    </button>
  )
}
