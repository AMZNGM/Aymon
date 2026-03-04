'use client'

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

interface AutoVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  threshold?: number
}

const AutoVideo = forwardRef<HTMLVideoElement, AutoVideoProps>(({ threshold = 0.1, ...props }, forwardedRef) => {
  const internalRef = useRef<HTMLVideoElement | null>(null)

  useImperativeHandle(forwardedRef, () => internalRef.current!)

  useEffect(() => {
    const video = internalRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return <video ref={internalRef} preload="none" {...props} />
})

AutoVideo.displayName = 'AutoVideo'

export default AutoVideo
