'use client'

import { Component } from 'react'
import MainBtn from '@/components/ui/Buttons/MainBtn'
import Text3d from '@/components/ui/text/Text3d'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-text text-bg font-mono">
          <div className="absolute inset-0 opacity-50 text-xs leading-tight overflow-hidden pointer-events-none select-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i}>
                {Array.from({ length: 500 })
                  .map((_, j) => String.fromCharCode(33 + Math.floor(Math.random() * 94)))
                  .join('')}
              </div>
            ))}
          </div>

          <div className="relative w-full max-w-3xl space-y-4 bg-text border-4 p-8 z-10">
            <pre className="text-xs overflow-x-auto">
              {`
                ███████╗██████╗ ██████╗  ██████╗ ██████╗     ██╗
                ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗    ██║
                █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝    ██║
                ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗    ╚═╝
                ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║    ██╗
                ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝    ╚═╝
              `}
            </pre>

            <div className="border-y-2 py-4">
              <h1 className="text-2xl font-bold mb-2">
                <Text3d rotateDirection="top" staggerFrom="center">
                  &gt;&gt; SYSTEM FAILURE DETECTED &lt;&lt;
                </Text3d>
              </h1>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              <p className="flex items-start">
                <span className="text-red-500 mr-2">[ERROR]</span>
                <Text3d>Critical exception encountered in application runtime</Text3d>
              </p>
              <p className="flex items-start">
                <span className="text-yellow-500 mr-2">[WARN]</span>
                <Text3d>State corruption detected. Manual intervention required.</Text3d>
              </p>
              <p className="flex items-start">
                <span className="text-blue-400 mr-2">[INFO]</span>
                <Text3d>Press the button below to reinitialize the system...</Text3d>
              </p>
            </div>

            <div className="text-green-400/50 text-xs mb-4">{'═'.repeat(60)}</div>

            <MainBtn onClick={() => window.location.reload()} className="font-mono w-full bg-bg hover:bg-text transition-colors">
              [ REBOOT SYSTEM ]
            </MainBtn>

            <div className="text-main text-xs mt-4 text-center">{'═ '.repeat(60)}</div>

            <div className="mt-4 flex items-center text-sm">
              <span className="mr-2">$</span>
              <span className="animate-ping">|</span>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
