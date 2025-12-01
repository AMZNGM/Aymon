export default function BgGrid() {
  const GRID_SIZE = 50

  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-25 z-10"
      style={{
        backgroundImage: `
                linear-gradient(to right, #030303 1px, transparent 1px),
                 linear-gradient(to bottom, #030303 1px, transparent 1px)
               `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
      }}
    />
  )
}
