'use client'

import { useEffect, useRef } from 'react'
import { createSwapy } from 'swapy'

export const SwapyLayout = ({ id, onSwap, config = {}, className, children }) => {
  const containerRef = useRef(null)
  const swapyRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    swapyRef.current = createSwapy(container, config)
    if (onSwap) {
      swapyRef.current.onSwap(onSwap)
    }
    return () => {
      swapyRef.current?.destroy()
    }
  }, [config, onSwap])
  return (
    <div id={id} ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export const SwapySlot = ({ id, className, children }) => {
  return (
    <div className={`cursor-grab active:cursor-grabbing ${className}`} data-swapy-slot={id}>
      {children}
    </div>
  )
}

const dragOpacityClassMap = {
  10: 'data-swapy-dragging:opacity-10',
  20: 'data-swapy-dragging:opacity-20',
  30: 'data-swapy-dragging:opacity-30',
  40: 'data-swapy-dragging:opacity-40',
  50: 'data-swapy-dragging:opacity-50',
  60: 'data-swapy-dragging:opacity-60',
  70: 'data-swapy-dragging:opacity-70',
  80: 'data-swapy-dragging:opacity-80',
  90: 'data-swapy-dragging:opacity-90',
  100: 'data-swapy-dragging:opacity-100',
}

export const SwapyItem = ({ id, className, children, dragItemOpacity = 100 }) => {
  const opacityClass = dragOpacityClassMap[dragItemOpacity] ?? 'data-swapy-dragging:opacity-50'
  return (
    <div className={`${opacityClass} ${className}`} data-swapy-item={id}>
      {children}
    </div>
  )
}
