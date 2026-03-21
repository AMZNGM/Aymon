'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import RippleEffect from '@/components/ui/effect/RippleEffect'

const BRUSH_SIZE = 4

// Draw the metallic gradient background onto a canvas context
function fillMetallicBg(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#d6d6d6')
  grad.addColorStop(0.15, '#e8e8e8')
  grad.addColorStop(0.3, '#b8b8b8')
  grad.addColorStop(0.5, '#cfcfcf')
  grad.addColorStop(0.65, '#a8a8a8')
  grad.addColorStop(0.8, '#c0c0c0')
  grad.addColorStop(1, '#b0b0b0')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Subtle brushed-metal horizontal lines
  ctx.save()
  ctx.globalAlpha = 0.04
  for (let y = 0; y < h; y += 2) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.strokeStyle = y % 4 === 0 ? '#ffffff' : '#888888'
    ctx.lineWidth = 0.5
    ctx.stroke()
  }
  ctx.restore()
}

// Draw a 3D metallic stroke segment between two points
function drawMetallic3DStroke(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, size: number) {
  // Layer 1: soft shadow (bottom-right offset)
  ctx.beginPath()
  ctx.moveTo(x1 + 1, y1 + 1)
  ctx.lineTo(x2 + 1, y2 + 1)
  ctx.strokeStyle = 'rgba(100, 100, 105, 0.4)'
  ctx.lineWidth = size + 1.5
  ctx.stroke()

  // Layer 2: mid-tone silver base
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = size + 0.5
  ctx.stroke()

  // Layer 3: silver highlight (top-left offset)
  ctx.beginPath()
  ctx.moveTo(x1 - 0.4, y1 - 0.4)
  ctx.lineTo(x2 - 0.4, y2 - 0.4)
  ctx.strokeStyle = 'rgba(210, 210, 215, 0.7)'
  ctx.lineWidth = size * 0.5
  ctx.stroke()

  // Layer 4: subtle specular
  ctx.beginPath()
  ctx.moveTo(x1 - 0.6, y1 - 0.6)
  ctx.lineTo(x2 - 0.6, y2 - 0.6)
  ctx.strokeStyle = 'rgba(195, 195, 200, 0.35)'
  ctx.lineWidth = size * 0.2
  ctx.stroke()
}

// Draw a 3D metallic dot
function drawMetallic3DDot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const r = size / 2

  // Shadow
  ctx.beginPath()
  ctx.arc(x + 1, y + 1, r + 0.8, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(100, 100, 105, 0.4)'
  ctx.fill()

  // Base
  ctx.beginPath()
  ctx.arc(x, y, r + 0.3, 0, Math.PI * 2)
  ctx.fillStyle = '#c8c8cc'
  ctx.fill()

  // Highlight
  ctx.beginPath()
  ctx.arc(x - 0.2, y - 0.2, r * 0.5, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(210, 210, 215, 0.6)'
  ctx.fill()
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      // Save current drawing
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx?.drawImage(canvas, 0, 0)

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Fill with metallic gradient background
      fillMetallicBg(ctx, rect.width, rect.height)

      // Restore drawing
      ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const startDrawing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const pos = getPos(e)
      lastPos.current = pos
      setIsDrawing(true)

      // Draw a metallic dot for single clicks
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!ctx) return
      drawMetallic3DDot(ctx, pos.x, pos.y, BRUSH_SIZE)
    },
    [getPos]
  )

  const draw = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!ctx || !lastPos.current) return

      const pos = getPos(e)
      const prev = lastPos.current

      // Interpolate points to prevent gaps on fast mouse movement
      const dx = pos.x - prev.x
      const dy = pos.y - prev.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const step = Math.max(1, BRUSH_SIZE * 0.4)

      if (dist <= step) {
        drawMetallic3DStroke(ctx, prev.x, prev.y, pos.x, pos.y, BRUSH_SIZE)
      } else {
        const steps = Math.ceil(dist / step)
        for (let i = 0; i < steps; i++) {
          const t1 = i / steps
          const t2 = (i + 1) / steps
          const sx = prev.x + dx * t1
          const sy = prev.y + dy * t1
          const ex = prev.x + dx * t2
          const ey = prev.y + dy * t2
          drawMetallic3DStroke(ctx, sx, sy, ex, ey, BRUSH_SIZE)
        }
      }

      lastPos.current = pos
    },
    [isDrawing, getPos]
  )

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    lastPos.current = null
  }, [])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fillMetallicBg(ctx, w, h)
  }, [])

  const sendDrawing = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check if canvas is empty
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const isEmpty = !pixels.some((channel, i) => (i % 4 !== 3 ? channel !== 0 : channel !== 0))
    if (isEmpty) {
      setError('Draw something first!')
      setTimeout(() => setError(''), 3000)
      return
    }

    setSending(true)
    setError('')

    try {
      // Create export canvas with metallic background
      const exportCanvas = document.createElement('canvas')
      exportCanvas.width = canvas.width
      exportCanvas.height = canvas.height
      const exportCtx = exportCanvas.getContext('2d')
      if (!exportCtx) return

      const dpr = window.devicePixelRatio || 1
      fillMetallicBg(exportCtx, canvas.width / dpr, canvas.height / dpr)
      exportCtx.drawImage(canvas, 0, 0)

      const image = exportCanvas.toDataURL('image/png')

      const res = await fetch('/api/send-drawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setSent(true)
      clearCanvas()
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError('Failed to send. Please try again.')
      setTimeout(() => setError(''), 4000)
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimIn center blur delay={0.4} className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden">
      <div
        ref={containerRef}
        style={{
          background: 'linear-gradient(135deg, #d6d6d6 0%, #e8e8e8 15%, #b8b8b8 30%, #cfcfcf 50%, #a8a8a8 65%, #c0c0c0 80%, #b0b0b0 100%)',
        }}
        className="relative w-full max-w-4xl aspect-square overflow-hidden rounded-lg touch-none cursor-crosshair"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full touch-none"
        />
      </div>

      <RippleEffect onClick={sendDrawing} className="font-sec text-3xl px-4 py-3 cursor-pointer">
        {sent ? 'Message sent ✓' : sending ? 'Sending...' : 'Send a Visual Message'}
      </RippleEffect>

      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
    </AnimIn>
  )
}
