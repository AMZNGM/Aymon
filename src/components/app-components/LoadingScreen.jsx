import { useEffect, useState } from 'react'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete?.()
          }, 300)
          return 100
        }
        return prev + 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  // const [isLoading, setIsLoading] = useState(true)
  // if (isLoading) {
  //   return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  // }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex justify-center items-center text-center font-fake bg-bg text-text z-50 py-12 px-4">
      <h1 className="text-4xl mb-8">NGM</h1>
      <div className="w-64 h-1 bg-main rounded-full overflow-hidden">
        <div className="h-full bg-text duration-300" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-text/60 text-sm mt-4">{progress}%</p>
    </div>
  )
}

export default LoadingScreen
