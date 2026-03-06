import Modal3d from '@/components/home-components/3dModal/Modal3d'

export default function Visionary() {
  return (
    <section className="relative w-dvw h-[40dvh] md:h-[50dvh] lg:h-[60dvh]">
      <Modal3d />

      <div className="flex flex-col justify-center items-center gap-6 w-full h-full uppercase">
        <h3 className="font-sec text-[14.5dvw] leading-none whitespace-nowrap mb-6">{`// Visionary **`}</h3>

        <span className="flex justify-center items-center gap-8 max-w-xl text-xs text-center">
          <span>Find</span>
          <div className="w-6 h-0.5 bg-bg" />
          <span>Your Wings</span>
        </span>

        <div className="space-y-1 2xl:max-w-[55dvw] max-w-2xl opacity-70 font-sec max-md:text-[10px] 2xl:text-[0.75dvw] text-xs text-center px-8">
          <p>
            When Aymon draws a line on a piece of white paper, he does so with such awareness that the line does not simply remain as it is;
            it becomes something more than that.
          </p>

          <p>
            There is a kind of rhetorical metamorphosis for every part that enters into the composition of the whole. But if someone draws a
            line, it remains in its state and nothing more a line on white paper.
          </p>
        </div>
      </div>
    </section>
  )
}
