import { EscapeClose } from '@/hooks/useEscapeClose'
import CloseBtn from '@/components/ui/Buttons/CloseBtn'

export default function Modal({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <>
      <input type="checkbox" id={id} className="peer/modal hidden" />
      <EscapeClose targetId={id} />
      <label
        htmlFor={id}
        className="z-9998 fixed inset-0 bg-bg/60 opacity-0 peer-checked/modal:opacity-100 backdrop-blur-sm transition-opacity duration-300 cursor-default pointer-events-none peer-checked/modal:pointer-events-auto"
      />

      <div className="z-9999 fixed inset-0 flex justify-center items-center opacity-0 peer-checked/modal:opacity-100 blur-sm peer-checked/modal:blur-none scale-95 peer-checked/modal:scale-100 transition-all translate-y-4 peer-checked/modal:translate-y-0 duration-300 ease-out pointer-events-none peer-checked/modal:pointer-events-auto">
        <div className={`relative w-full bg-bg text-text rounded-2xl p-6 ${className ?? ''}`}>
          <CloseBtn htmlFor={id} />
          {children}
        </div>
      </div>
    </>
  )
}
