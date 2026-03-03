export default function SectionHeading({ className = '', title = 'Selected Work' }: { className?: string; title?: string }) {
  return (
    <div className={`flex justify-between items-center gap-4 my-16 px-1 uppercase ${className}`}>
      <div className="flex justify-between items-center gap-12">
        <h2 className="font-extrabold text-[7dvw] max-md:text-4xl leading-none tracking-[-2px]">{title}</h2>
        <div className="max-md:hidden w-[6dvw] h-2 bg-bg" />
      </div>

      <div className="flex justify-between w-1/4 max-md:w-1/2 font-bold text-[1dvw] max-md:text-[10px] pe-1">
        <span>Distilled </span>
        <span>to </span>
        <span>the </span>
        <span>Core</span>
      </div>
    </div>
  )
}
