'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error boundary caught:', error)
  }, [error])

  const backgroundChars = useMemo(() => {
    let seed = 12345
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    return Array.from({ length: 30 }).map((_, i) => (
      <div key={i}>
        {Array.from({ length: 500 })
          .map(() => String.fromCharCode(33 + Math.floor(seededRandom() * 94)))
          .join('')}
      </div>
    ))
  }, [])

  return (
    <main className="relative w-dvw h-dvh overflow-hidden flex justify-center items-center bg-text font-mono text-bg">
      <div className="absolute inset-0 overflow-hidden opacity-50 text-xs leading-tight pointer-events-none select-none">
        {backgroundChars}
      </div>

      <div className="z-10 relative w-full max-w-3xl space-y-4 bg-text border-4 p-8">
        <pre className="overflow-x-auto text-xs">
          {`
███████╗██████╗ ██████╗  ██████╗ ██████╗     ██╗
██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗    ██║
█████╗  ██████╔╝██████╔╝██║   ██║██████╔╝    ██║
██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╝    ╚═╝
███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║    ██╗
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝    ╚═╝
              `}
        </pre>

        <div className="border-y-2 py-4">
          <h1 className="font-bold text-2xl mb-2">&gt;&gt; SYSTEM FAILURE DETECTED &lt;&lt;</h1>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <p className="flex items-start">
            <span className="text-red-500 mr-2">[ERROR]</span>
            Critical exception encountered in application runtime
          </p>
          <p className="flex items-start">
            <span className="text-yellow-500 mr-2">[WARN]</span>
            State corruption detected. Manual intervention required.
          </p>
          <p className="flex items-start">
            <span className="text-blue-400 mr-2">[INFO]</span>
            Press the button below to reinitialize the system...
          </p>
        </div>

        <div className="text-green-400/50 text-xs mb-4">{'═'.repeat(60)}</div>

        <button
          onClick={() => {
            // attempt to recover by re-rendering the segment
            reset()
          }}
          className="w-full hover:bg-bg hover:text-text transition-colors p-4 cursor-pointer"
        >
          [ REBOOT SYSTEM ]
        </button>

        <div className="text-main text-xs text-center mt-4">{'═ '.repeat(60)}</div>

        <div className="flex items-center text-sm mt-4">
          <span className="mr-2">$</span>
          <span className="animate-ping">|</span>
        </div>
      </div>
    </main>
  )
}
