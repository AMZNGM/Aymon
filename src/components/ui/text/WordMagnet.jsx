import { useState, useEffect, useRef } from 'react'

export default function WordMagnet({ text, className }) {
  const [words, setWords] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const wordsRef = useRef([])
  const animationFrameRef = useRef(null)

  useEffect(() => {
    // Initialize word positions
    const container = containerRef.current
    if (!container) return

    const wordElements = container.querySelectorAll('.word')
    const initialWords = Array.from(wordElements).map((el, index) => {
      const rect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return {
        id: index,
        text: el.textContent,
        x: 0,
        y: 0,
        originalX: rect.left - containerRect.left + rect.width / 2,
        originalY: rect.top - containerRect.top + rect.height / 2,
        vx: 0,
        vy: 0,
      }
    })

    wordsRef.current = initialWords
    setWords(initialWords)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const animate = () => {
      wordsRef.current = wordsRef.current.map((word) => {
        const dx = word.originalX + word.x - mousePos.x
        const dy = word.originalY + word.y - mousePos.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const repelRadius = 300
        const repelForce = 0.5
        const returnForce = 0.05
        const damping = 0.85

        let ax = 0
        let ay = 0

        // Repel from cursor
        if (distance < repelRadius && distance > 0) {
          const force = ((repelRadius - distance) / repelRadius) * repelForce
          ax += (dx / distance) * force
          ay += (dy / distance) * force
        }

        // Return to original position
        ax += -word.x * returnForce
        ay += -word.y * returnForce

        // Update velocity with damping
        const newVx = (word.vx + ax) * damping
        const newVy = (word.vy + ay) * damping

        // Update position
        const newX = word.x + newVx
        const newY = word.y + newVy

        return {
          ...word,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        }
      })

      setWords([...wordsRef.current])
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePos])

  return (
    <div ref={containerRef} className="relative">
      <div className={`text-3xl leading-relaxed font-medium select-none ${className}`}>
        {text.split(' ').map((word, index) => (
          <span key={index} className="inline-block mr-3 mb-3">
            <span
              className="word inline-block transition-none"
              style={{
                transform: words[index] ? `translate(${words[index].x}px, ${words[index].y}px)` : 'translate(0, 0)',
                cursor: 'default',
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
