'use client'

import { useEffect, useState } from 'react'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import { getProfileImage } from '@/lib/getProfileImage'

export default function NavImage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

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

  return (
    <AnimIn center blur duration={3} className="group max-lg:hidden z-20 relative my-[3dvw]">
      <ImageIn
        src={profileImage || '/images/profile2.webp'}
        alt="Nav Image"
        priority
        loading="eager"
        className="rounded-2xl scale-100!"
        divClassName="size-[16dvw] "
      />
    </AnimIn>
  )
}
