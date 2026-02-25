'use client'

import LoadingSkeleton from '@/components/shared/LoadingSkeleton'
import { useState, useRef, useEffect } from 'react'

export default function LazyVideo({ src, ...props }) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-h-[200px]">
      {isVisible ? <video src={src} {...props} /> : <LoadingSkeleton count="1" />}
    </div>
  )
}
