'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Undo, RotateCcw, Droplets } from 'lucide-react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'
import RippleEffect from '@/components/ui/effect/RippleEffect'

const BRUSH_SIZE = 4

// Color palette matching Windows Paint app
const COLOR_PALETTE = [
  '#000000', // Black
  '#808080', // Gray
  '#FF0000', // Red
  '#FFFF00', // Yellow
  '#008000', // Green
  '#008080', // Teal
  '#0080FF', // Blue
  '#FF00FF', // Magenta

  '#FFFFFF', // White
  '#555555', // Dark Gray
  '#800000', // Maroon
  '#808040', // Brown
  '#556b2f', // Dark Green
  '#004040', // Dark Teal
  '#000080', // Navy
  '#800080', // Purple
]

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
function drawMetallic3DStroke(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  size: number,
  color: string = '#000000'
) {
  // Layer 1: soft shadow (bottom-right offset)
  ctx.beginPath()
  ctx.moveTo(x1 + 1, y1 + 1)
  ctx.lineTo(x2 + 1, y2 + 1)
  ctx.strokeStyle = 'rgba(100, 100, 105, 0.4)'
  ctx.lineWidth = size + 1.5
  ctx.stroke()

  // Layer 2: colored base
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size + 0.5
  ctx.stroke()

  // Layer 3: color highlight (top-left offset)
  ctx.beginPath()
  ctx.moveTo(x1 - 0.4, y1 - 0.4)
  ctx.lineTo(x2 - 0.4, y2 - 0.4)
  ctx.strokeStyle = color + 'B3' // Add transparency for highlight
  ctx.lineWidth = size * 0.5
  ctx.stroke()

  // Layer 4: subtle specular
  ctx.beginPath()
  ctx.moveTo(x1 - 0.6, y1 - 0.6)
  ctx.lineTo(x2 - 0.6, y2 - 0.6)
  ctx.strokeStyle = color + '59' // More transparency for specular
  ctx.lineWidth = size * 0.2
  ctx.stroke()
}

// Draw a 3D metallic dot
function drawMetallic3DDot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string = '#000000') {
  const r = size / 2

  // Shadow
  ctx.beginPath()
  ctx.arc(x + 1, y + 1, r + 0.8, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(100, 100, 105, 0.4)'
  ctx.fill()

  // Base
  ctx.beginPath()
  ctx.arc(x, y, r + 0.3, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()

  // Highlight
  ctx.beginPath()
  ctx.arc(x - 0.2, y - 0.2, r * 0.5, 0, Math.PI * 2)
  ctx.fillStyle = color + '99' // Add transparency for highlight
  ctx.fill()
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [currentColor, setCurrentColor] = useState('#000000')
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [historyStep, setHistoryStep] = useState(0)

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

      // Only draw if canvas has valid dimensions
      if (canvas.width > 0 && canvas.height > 0) {
        tempCtx?.drawImage(canvas, 0, 0)
      }

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

    // Load latest drawing from localStorage if it exists
    const saved = localStorage.getItem('aymon-last-drawing') || localStorage.getItem('aymon-drawings')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        // Handle both single object (new logic) and array (legacy)
        const latest = Array.isArray(data) ? data[data.length - 1] : data
        if (latest && latest.image) {
          const img = new Image()
          img.onload = () => {
            const ctx = canvas.getContext('2d')
            if (ctx) {
              const rect = container.getBoundingClientRect()
              ctx.drawImage(img, 0, 0, rect.width, rect.height)
            }
          }
          img.src = latest.image
        }
      } catch (error) {
        console.error('Failed to load saved drawing:', error)
      }
    }

    return () => window.removeEventListener('resize', resize)
  }, [])

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL()
    setHistory((prev) => {
      const newHistory = [...prev.slice(0, historyStep), dataUrl]
      setHistoryStep(newHistory.length)
      return newHistory
    })
  }, [historyStep])

  const undo = useCallback(() => {
    if (historyStep <= 0) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const newStep = historyStep - 1
    setHistoryStep(newStep)

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    // Clear and refill background
    fillMetallicBg(ctx, rect.width, rect.height)

    if (newStep > 0 && history[newStep - 1]) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height)
      }
      img.src = history[newStep - 1]
    }
  }, [history, historyStep])

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const rect = containerRef.current?.getBoundingClientRect()
    if (!ctx || !rect) return

    fillMetallicBg(ctx, rect.width, rect.height)
    setHistory([])
    setHistoryStep(0)
    localStorage.removeItem('aymon-last-drawing')
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
      saveHistory()
      const pos = getPos(e)
      lastPos.current = pos
      setIsDrawing(true)

      // Draw a metallic dot for single clicks
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!ctx) return
      drawMetallic3DDot(ctx, pos.x, pos.y, BRUSH_SIZE, currentColor)
    },
    [getPos, saveHistory, currentColor]
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
        drawMetallic3DStroke(ctx, prev.x, prev.y, pos.x, pos.y, BRUSH_SIZE, currentColor)
      } else {
        const steps = Math.ceil(dist / step)
        for (let i = 0; i < steps; i++) {
          const t1 = i / steps
          const t2 = (i + 1) / steps
          const sx = prev.x + dx * t1
          const sy = prev.y + dy * t1
          const ex = prev.x + dx * t2
          const ey = prev.y + dy * t2
          drawMetallic3DStroke(ctx, sx, sy, ex, ey, BRUSH_SIZE, currentColor)
        }
      }

      lastPos.current = pos
    },
    [isDrawing, getPos, currentColor]
  )

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
    lastPos.current = null
  }, [])

  const saveDrawing = async () => {
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
      // Small artificial delay to make the "Sending..." state feel real
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Create export canvas with metallic background
      const exportCanvas = document.createElement('canvas')
      exportCanvas.width = canvas.width
      exportCanvas.height = canvas.height
      const exportCtx = exportCanvas.getContext('2d')
      if (!exportCtx) return

      const dpr = window.devicePixelRatio || 1
      const styledWidth = canvas.width / dpr
      const styledHeight = canvas.height / dpr

      // Scale up exportCtx to handle high-DPR rendering in fillMetallicBg
      exportCtx.scale(dpr, dpr)
      fillMetallicBg(exportCtx, styledWidth, styledHeight)

      // Reset scale before drawing the main canvas (which is already scaled)
      exportCtx.setTransform(1, 0, 0, 1, 0, 0)
      exportCtx.drawImage(canvas, 0, 0)

      // Use JPEG with quality to save space and prevent localStorage quota errors
      const image = exportCanvas.toDataURL('image/jpeg', 0.8)

      // Save to localStorage with timestamp
      const timestamp = new Date().toISOString()
      const drawingData = {
        image,
        timestamp,
        id: `drawing-${Date.now()}`,
      }

      // Clean up legacy history and prepare for new save to avoid quota issues
      localStorage.removeItem('aymon-drawings')

      // Store the single latest drawing
      localStorage.setItem('aymon-last-drawing', JSON.stringify(drawingData))

      setSent(true)
      setTimeout(() => setSent(false), 3000)
    } catch (error) {
      console.error('Failed to save drawing:', error)
      setError('Failed to save. Storage might be full.')
      setTimeout(() => setError(''), 4000)
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimIn center blur delay={0.4} className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden uppercase">
      {/* Canvas Container - Takes full available space */}
      <div className="flex max-md:flex-col justify-center max-md:items-center gap-2 w-full">
        <div className="w-13"></div>
        {/* Canvas - Centered with full space */}
        <div
          ref={containerRef}
          style={{
            background:
              'linear-gradient(135deg, #d6d6d6 0%, #e8e8e8 15%, #b8b8b8 30%, #cfcfcf 50%, #a8a8a8 65%, #c0c0c0 80%, #b0b0b0 100%)',
          }}
          className="relative w-full max-w-2xl aspect-square rounded-lg touch-none cursor-crosshair"
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

        {/* Color Palette - Right Aligned Like Top Navigation */}
        <div className="flex md:flex-col gap-1">
          {/* Color Columns */}
          <div className="flex max-md:flex-col gap-1">
            {/* First Column */}
            <div className="flex md:flex-col gap-1">
              {COLOR_PALETTE.slice(0, 8).map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className={`w-6 h-6 border transition-all hover:border-gray-400 ${
                    currentColor === color ? 'border-black border-2 shadow-sm' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>

            {/* Second Column */}
            <div className="flex md:flex-col gap-1">
              {COLOR_PALETTE.slice(8).map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className={`w-6 h-6 border transition-all hover:border-gray-400 ${
                    currentColor === color ? 'border-black border-2 shadow-sm' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Color Controls - Under the Columns */}
          <div className="flex max-md:flex-col justify-between gap-1 md:mt-1">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              className="w-6 h-6 bg-bg/10 hover:bg-bg/30 border-2 border-gray-300 transition-all cursor-pointer"
              aria-label="Color picker"
            />

            <RippleEffect
              onClick={() => setCurrentColor('#c8c8cc')}
              className="h-fit bg-bg/10 hover:bg-bg/30 transition-all duration-100 p-1 cursor-pointer"
              title="Reset to silver color"
            >
              <Droplets strokeWidth={2.5} size={16} />
            </RippleEffect>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center gap-4 w-full mt-4">
        <RippleEffect
          onClick={undo}
          className={`bg-bg/10 hover:bg-bg/30 rounded-xl duration-100 p-2 cursor-pointer backdrop-blur-xs transition-opacity ${
            historyStep <= 0 ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <Undo strokeWidth={2.5} />
        </RippleEffect>
        <RippleEffect
          onClick={saveDrawing}
          className={`rounded-md outline-none font-medium 2xl:text-[1dvw] transition-colors duration-100  px-4 py-2 cursor-pointer select-none ${
            sent ? 'bg-bg text-text' : 'bg-bg/10 hover:bg-bg/30 text-bg/75'
          }`}
        >
          <TextWghtGrow label={sent ? 'Message sent' : sending ? 'Sending...' : 'Send a Visual Message'} />
        </RippleEffect>

        <RippleEffect
          onClick={resetCanvas}
          className="bg-bg/10 hover:bg-bg/30 backdrop-blur-xs rounded-xl transition-opacity duration-100 p-2 cursor-pointer"
        >
          <RotateCcw strokeWidth={2.5} />
        </RippleEffect>
      </div>

      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
    </AnimIn>
  )
}
