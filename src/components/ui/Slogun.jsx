import AnimIn from '@/components/ui/unstyled/AnimIn'

export default function Slogun() {
  return (
    <AnimIn center blur className="inset-0 w-full h-dvh font-sec text-[10dvw] max-md:text-6xl leading-none absolute!">
      <span className="top-4 max-md:top-42 left-4 absolute">i</span>
      <span className="top-56 left-1/4 absolute">shut</span>
      <span className="top-4 max-md:top-40 right-4 absolute">my</span>
      <span className="bottom-8 max-md:bottom-72 left-4 absolute">Eyes</span>
      <span className="max-md:right-10 bottom-8 max-md:bottom-65 md:left-1/2 absolute">to</span>
      <span className="right-4 max-md:right-1/2 bottom-8 absolute">see</span>
    </AnimIn>
  )
}
