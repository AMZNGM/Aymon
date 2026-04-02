'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { Draggable } from 'gsap/dist/Draggable'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import { getProfileImage } from '@/lib/getProfileImage'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable)
}

export default function NavImage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const data = await getProfileImage()
        setProfileImage(data?.url || null)
      } catch (error) {
        console.error('Error fetching profile image:', error)
      }
    }

    fetchProfileImage()
  }, [])

  useEffect(() => {
    if (!imageRef.current) return

    const draggable = Draggable.create(imageRef.current, {
      type: 'x,y',
      inertia: true,
      bounds: window,
      onPress: function () {
        gsap.to(this.target, { scale: 1.2, duration: 0.2, ease: 'power2.out' })
      },
      onRelease: function () {
        gsap.to(this.target, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      },
    })

    return () => {
      draggable.forEach((d) => d.kill())
    }
  }, [])

  return (
    <AnimIn center blur duration={3} className="group max-lg:hidden z-20 relative my-[3dvw]">
      <div ref={imageRef} className="cursor-grab active:cursor-grabbing">
        <ImageIn
          src={profileImage || '/images/profile2.webp'}
          alt="Nav Image"
          priority
          loading="eager"
          className="rounded-2xl scale-100!"
          divClassName="size-[16dvw]"
        />
      </div>
    </AnimIn>
  )
}
