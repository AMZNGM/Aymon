export default function LoadingSkeleton({ className = '', count = '0' }) {
  const gridCols = count === '1' ? 'grid-cols-1' : count === '2' ? 'grid-cols-2' : 'md:grid-cols-2'

  if (count === '0') {
    return (
      <div className="w-full h-dvh flex flex-col justify-center items-center gap-2 animate-pulse">
        <div className="w-32 h-8 bg-bg/20 rounded-lg" />
        <div className="w-64 h-4 bg-bg/10 rounded-lg" />
      </div>
    )
  }

  return (
    <div className={`gap-4 grid ${gridCols} ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="w-full h-full aspect-13/12 overflow-hidden bg-bg/5 rounded-2xl animate-pulse" />
      ))}
    </div>
  )
}
