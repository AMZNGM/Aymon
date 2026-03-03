'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import { useEffect, useRef } from 'react'
import { createSwapy, type Swapy, type Config, type SwapEventHandler } from 'swapy'

export const SwapyLayout = ({
  id,
  onSwap,
  config = {},
  className,
  children,
}: {
  id?: string
  onSwap?: SwapEventHandler
  config?: Partial<Config>
  className?: string
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const swapyRef = useRef<Swapy | null>(null)
  const isMobile = useIsMobile()

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

  if (isMobile) return <div className={className}>{children}</div>

  return (
    <div id={id} ref={containerRef} className={className}>
      {children}
    </div>
  )
}

export const SwapySlot = ({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) => {
  return (
    <div className={`cursor-grab active:cursor-grabbing ${className || ''}`} data-swapy-slot={id}>
      {children}
    </div>
  )
}

const dragOpacityClassMap: Record<number, string> = {
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

export const SwapyItem = ({
  id,
  className,
  children,
  dragItemOpacity = 100,
}: {
  id: string
  className?: string
  children: React.ReactNode
  dragItemOpacity?: number
}) => {
  const opacityClass = dragOpacityClassMap[dragItemOpacity] ?? 'data-swapy-dragging:opacity-50'
  return (
    <div className={`${opacityClass} ${className || ''}`} data-swapy-item={id}>
      {children}
    </div>
  )
}
