'use client'

import { createContext, useContext, useState } from 'react'

const PreloaderContext = createContext(null)

export function PreloaderProvider({ children }) {
  const [isComplete, setIsComplete] = useState(false)

  return <PreloaderContext value={{ isComplete, setIsComplete }}>{children}</PreloaderContext>
}

export function usePreloader() {
  const context = useContext(PreloaderContext)
  if (!context) {
    throw new Error('usePreloader must be used within PreloaderProvider')
  }
  return context
}
