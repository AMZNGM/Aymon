'use client'

import Image from 'next/image'
import { useRef, useState, useMemo } from 'react'
import { gsap, Draggable } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { imagesData } from '@/data/media-data/media-imports'
import { personalInfo } from '@/data/personal-info'
import Text3d from '@/components/ui/text/Text3d'

export default function PixelChartGrid() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [isGridReady, setIsGridReady] = useState(false)
  const GRID_SIZE = 150
  const GAP = 2
  const gridPositions = useMemo(() => {
    return imagesData.map((img, i) => ({
      id: i,
      src: img,
    }))
  }, [])

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current) return
      const images = gsap.utils.toArray('.grid-image')
      const vh = window.innerHeight
      const vw = window.innerWidth < 678 ? window.innerWidth : window.innerWidth * 0.79

      images.forEach((img) => {
        gsap.set(img, {
          x: gsap.utils.random(-vw * 100.5, vw * 0),
          y: gsap.utils.random(-vh * 0.5, vh * 1.5),
          rotation: gsap.utils.random(-90, 90),
          scale: gsap.utils.random(0.5, 1.5),
          opacity: window.innerWidth < 678 ? 0 : 1,
        })
      })

      // 3. Calculate Grid Layout
      // Determine how many columns fit in the screen
      const cols = Math.floor(vw / (GRID_SIZE + GAP))
      const startX = (vw - cols * (GRID_SIZE + GAP)) / 2 // Center the grid horizontally

      // 4. Create ScrollTrigger Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Scroll distance to complete animation
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            // Optional: Parallax or other effects during scroll
          },
        },
      })

      // Animate images to their grid positions
      images.forEach((img, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)

        const targetX = startX + col * (GRID_SIZE + GAP)
        const targetY = 100 + row * (GRID_SIZE + GAP) // Start 100px from top

        tl.to(
          img,
          {
            x: targetX,
            y: targetY,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        ) // All start at same time (0)
      })

      // 5. Enable Draggable
      Draggable.create(images, {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: gridRef.current,
        inertia: true,
        onDragStart: function () {
          gsap.to(this.target, { scale: 1.1, zIndex: 100, duration: 0.2 })
        },
        onDragEnd: function () {
          gsap.to(this.target, { scale: 1, zIndex: 1, duration: 0.2 })
          // Optional: Snap to nearest grid cell
          const x = this.x
          const y = this.y
          const snappedX = Math.round(x / (GRID_SIZE + GAP)) * (GRID_SIZE + GAP) + (startX % (GRID_SIZE + GAP)) // Adjust logic for exact snap
          // For now, free drag is fine, or we can implement liveSnap
        },
      })

      setIsGridReady(true)
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-text text-bg">
      <div ref={gridRef}>
        {gridPositions.map((item) => (
          <div
            key={item.id}
            className="grid-image size-full absolute inset-0 cursor-grab active:cursor-grabbing will-change-transform"
            style={{ width: GRID_SIZE, height: GRID_SIZE }}
          >
            <div className="relative size-full border p-1">
              <Image
                src={item.src}
                alt={`Grid Image ${item.id}`}
                fill
                sizes={`${GRID_SIZE}px`}
                className="object-cover pointer-events-none select-none"
              />
            </div>
          </div>
        ))}

        <Text3d className="absolute bottom-4 left-4 text-main/60 font-pixel tracking-wide cursor-default max-md:hidden">
          {personalInfo.slogan}
        </Text3d>
      </div>
    </section>
  )
}
