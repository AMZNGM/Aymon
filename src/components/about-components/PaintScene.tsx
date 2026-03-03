'use client'

import { useEffect, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'

export default function PaintScene() {
  const { width = 0, height = 0 } = useWindowSize({ initializeWithValue: false })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pervPosRef = useRef<{ x: number; y: number } | null>(null)
  const w = width
  const h = height

  useEffect(() => {
    const init = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'destination-out'
    }

    if (w > 0) init()
  }, [w, h])

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

  const mouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, movementX, movementY } = e
    const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10
    if (pervPosRef.current != null) {
      const { x, y } = pervPosRef.current
      for (let i = 0; i < nbOfCircles; i++) {
        const targetX = lerp(x, clientX, (1 / nbOfCircles) * i)
        const targetY = lerp(y, clientY, (1 / nbOfCircles) * i)
        paint(targetX, targetY, 50)
      }
    }
    pervPosRef.current = { x: clientX, y: clientY }
  }

  const paint = (x: number, y: number, radius: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <section className="max-md:hidden z-9999 absolute inset-0">
      {w === 0 && <div className="absolute inset-0 w-full h-full bg-black" />}
      <canvas ref={canvasRef} width={w} height={h} onMouseMove={mouseMove} />
    </section>
  )
}
