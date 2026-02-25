export default function SectionHeading({ className = '', title = 'Selected Work' }) {
  return (
    <div className={`flex justify-between items-center gap-12 max-md:gap-4 my-16 ${className}`}>
      <div className="flex justify-between items-center gap-12">
        <h2 className="font-extrabold text-[7dvw] max-md:text-4xl uppercase leading-none tracking-[-2px] select-none">{title}</h2>
        <div className="max-md:hidden w-[6dvw] h-2 bg-bg" />
      </div>

      <div className="w-1/4 max-md:w-1/2 flex justify-between font-bold text-[1dvw] max-md:text-xs uppercase pe-1">
        <span>Distilled </span>
        <span>to </span>
        <span>the </span>
        <span>Core</span>
      </div>
    </div>
  )
}
