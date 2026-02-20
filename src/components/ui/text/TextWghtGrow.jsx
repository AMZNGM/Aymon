'use client'

import { useMemo } from 'react'
import { motion } from 'motion/react'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export default function TextWghtGrow({
  label,
  className,
  from = "'wght' 400, 'slnt' 0",
  to = "'wght' 900, 'slnt' -10",
  staggerDuration = 0.03,
  ...props
}) {
  const shuffledIndices = useMemo(() => {
    if (!label) return []
    const indices = Array.from({ length: label.length }, (_, i) => i)
    shuffleArray(indices)
    return indices
  }, [label])

  const letterVariants = {
    hover: (index) => ({
      fontVariationSettings: to,
      transition: { type: 'spring', duration: 0.7, delay: staggerDuration * index },
    }),
    initial: (index) => ({
      fontVariationSettings: from,
      transition: { type: 'spring', duration: 0.7, delay: staggerDuration * index },
    }),
  }

  return (
    <motion.span whileHover="hover" initial="initial" className={className} {...props}>
      <span className="sr-only">{label || ''}</span>

      {(label || '').split('').map((letter, i) => {
        const index = shuffledIndices[i]
        return (
          <motion.span key={i} className="inline-block whitespace-pre" aria-hidden="true" variants={letterVariants} custom={index}>
            {letter}
          </motion.span>
        )
      })}
    </motion.span>
  )
}
