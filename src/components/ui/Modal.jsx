import { EscapeClose } from "@/hooks/useKeyboardShortcuts";

export default function Modal({ id, trigger, children, className }) {
  return (
    <>
      <input type="checkbox" id={id} className="peer/modal hidden" />
      <EscapeClose targetId={id} />

      {/* backdrop */}
      <label
        htmlFor={id}
        className="z-9998 fixed inset-0 bg-bg/60 opacity-0 peer-checked/modal:opacity-100 backdrop-blur-sm transition-opacity duration-300 cursor-default pointer-events-none peer-checked/modal:pointer-events-auto"
      />

      {/* modal */}






      <div
        className="z-9999 fixed inset-0 items-center opacity-0 peer-checked/modal:opacity-100 blur-sm peer-checked/modal:blur-none scale-95 peer-checked/modal:scale-100 transition-all translate-y-4 peer-checked/modal:translate-y-0 duration-300 ease-out pointer-events-none peer-checked/modal:pointer-events-auto fle x justify -center"
      >
        <div className={`relative w-full max-w-xl bg-bg rounded-2xl text-text p-6 ${className ?? ''}`}>
          <label
            htmlFor={id}
            className="top-4 right-4 absolute size-8 flex justify-center items-center hover:bg-text/10 rounded-full transition-colors cursor-pointer"
          >
            ✕
          </label>
          {children}
        </div>
      </div>

      {/* inline trigger */}
      {trigger && (
        <label htmlFor={id} className="cursor-pointer">
          {trigger}
        </label>
      )}
    </>
  )
}

// <ModalTrigger targetId="contact-modal">
//   <img src="..." />
// </ModalTrigger>

// <Modal id="contact-modal" >
//   content
// </Modal>
