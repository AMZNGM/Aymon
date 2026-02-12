export default function LoadingSkeleton() {
  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2 animate-pulse">
        <div className="w-32 h-8 bg-bg/20 rounded-lg"></div>
        <div className="w-64 h-4 bg-bg/10 rounded-lg"></div>
      </div>
    </div>
  )
}
