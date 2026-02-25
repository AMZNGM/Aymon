'use client'

import React, { useEffect, useRef, useId, useMemo } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform, useScroll, useVelocity, useSpring } from 'motion/react'

const wrap = (min, max, value) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

export default function ImagesMarquee({
  children,
  className,
  path,
  viewBox = '0 0 100 100',
  repeat = 2,
  baseVelocity = 8,
  direction = 'normal',
  draggable = true,
  dragSensitivity = 0.05,
  useScrollVelocity = true,
  slowdownOnHover = true,
  slowDownFactor = 0.1,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  dragAwareDirection = true,
  verticalBuffer = 80,
  spacing = 1.5,
}) {
  const container = useRef(null)
  const marqueeContainerRef = useRef(null)
  const baseOffset = useMotionValue(0)
  const isDragging = useRef(false)
  const dragVelocity = useRef(0)
  const directionFactor = useRef(direction === 'normal' ? 1 : -1)
  const lastPointerPosition = useRef({ x: 0, y: 0 })
  const isHovered = useRef(false)
  const generatedId = useId()
  const id = `marquee-path-${generatedId}`
  const hoverFactorValue = useMotionValue(1)
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  useEffect(() => {
    const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number)
    const originalWidth = vbWidth || 100
    const originalHeight = vbHeight || 100

    const updateScale = () => {
      const wrapper = container.current
      const marqueeContainer = marqueeContainerRef.current
      if (!wrapper || !marqueeContainer) return

      const scale = wrapper.clientWidth / originalWidth
      marqueeContainer.style.width = `${originalWidth}px`
      marqueeContainer.style.height = `${originalHeight}px`
      marqueeContainer.style.transform = `scale(${scale})`
      marqueeContainer.style.transformOrigin = 'top left'

      const totalBuffer = verticalBuffer * scale
      wrapper.style.height = `${originalHeight * scale + totalBuffer}px`
      marqueeContainer.style.top = `${totalBuffer / 2}px`
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [viewBox])

  const items = useMemo(() => {
    const childrenArray = React.Children.toArray(children)
    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => ({
        child,
        itemIndex: repeatIndex * childrenArray.length + childIndex,
        key: `${childIndex}-${repeatIndex}`,
      }))
    )
  }, [children, repeat])

  useAnimationFrame((_, delta) => {
    hoverFactorValue.set(isHovered.current && slowdownOnHover ? slowDownFactor : 1)

    const velocity = scrollVelocity.get()
    if (Math.abs(velocity) > 2) {
      directionFactor.current = velocity < 0 ? -1 : 1
    }

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * smoothHoverFactor.get()

    if (useScrollVelocity) {
      moveBy += moveBy * Math.abs(velocityFactor.get())
    }

    if (draggable) {
      if (isDragging.current && dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current)
      }

      moveBy += dragVelocity.current
      if (!isDragging.current) {
        dragVelocity.current *= 0.95
        if (Math.abs(dragVelocity.current) < 0.001) dragVelocity.current = 0
      }
    }

    baseOffset.set(baseOffset.get() + moveBy)
  })

  const handlePointerDown = (e) => {
    if (!draggable) return
    isDragging.current = true
    lastPointerPosition.current = { x: e.clientX, y: e.clientY }
    dragVelocity.current = 0
  }

  const handlePointerMove = (e) => {
    if (!draggable || !isDragging.current) return
    const deltaX = e.clientX - lastPointerPosition.current.x
    const deltaY = e.clientY - lastPointerPosition.current.y
    const projectedDelta = deltaX > 0 ? Math.sqrt(deltaX ** 2 + deltaY ** 2) : -Math.sqrt(deltaX ** 2 + deltaY ** 2)

    // Only start moving if there's significant movement
    if (Math.abs(projectedDelta) > 2) {
      dragVelocity.current = projectedDelta * dragSensitivity
      lastPointerPosition.current = { x: e.clientX, y: e.clientY }
    }
  }

  const handlePointerUp = (e) => {
    if (!draggable) return
    isDragging.current = false
  }

  return (
    <div
      ref={container}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      className={`relative overflow-x-hidden overflow-y-visible cursor-grab active:cursor-grabbing max-md:scale-200 touch-none ${className}`}
    >
      <div ref={marqueeContainerRef} className="relative">
        <svg
          viewBox={viewBox}
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          className="block w-full h-full opacity-0 pointer-events-none"
        >
          <path id={id} d={path} fill="none" />
        </svg>

        {items.map(({ child, itemIndex, key }) => {
          const virtualPathLength = 100 * spacing
          const itemOffset = useTransform(baseOffset, (v) => {
            const position = (itemIndex * virtualPathLength) / items.length
            return wrap(0, virtualPathLength, v + position)
          })

          const opacity = useTransform(itemOffset, [0, 100, 100.01, virtualPathLength], [1, 1, 0, 0])
          const display = useTransform(itemOffset, (v) => (v <= 100 ? 'block' : 'none'))

          return (
            <motion.div
              key={key}
              style={{
                offsetPath: `path('${path}')`,
                offsetDistance: useTransform(itemOffset, (v) => `${v}%`),
                display,
                zIndex: 10,
              }}
              className="top-0 -left-10 active:z-50 absolute -translate-x-1/2 -translate-y-1/2 backface-hidden pointer-events-auto select-none will-change-transform"
            >
              {child}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
