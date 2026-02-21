'use client'

import { useEffect, useState } from 'react'
import { getLogos } from '@/lib/getLogos'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import ImagesMarquee from '@/components/ui/ImagesMarquee'

const path =
  'M51.5 517.283C99.5365 470.388 121.805 401.348 164.65 349.482C221.314 280.89 292.786 228.745 360.439 167.781C434.73 100.835 495.973 42.7027 618.524 52.6037C697.315 58.9693 788.979 132.091 849.91 167.781C905.115 200.116 972.11 224.78 1024.09 259.128C1118.76 321.694 1127.34 483.921 1240.41 517.283C1367.43 554.758 1492.5 548.155 1623.56 570.9C1670.95 579.124 1841.57 481.538 1841.57 481.538C1841.57 481.538 2162.42 433.729 2239.5 435.499C2363.42 438.345 2327.5 435.499 2451.5 435.499C2566.5 435.499 2644.59 349.482 2755.5 349.482'

export default function LogosMarquee() {
  const [logos, setLogos] = useState([])

  useEffect(() => {
    const fetchLogos = async () => {
      const data = await getLogos()
      setLogos(data)
    }
    fetchLogos()
  }, [])

  if (!logos || logos.length === 0) return null

  return (
    <section className="relative w-full h-fit bg-text text-bg pt-12">
      <ImagesMarquee path={path} viewBox="50 50 2000 600" spacing={1.4}>
        {logos.map((logo, index) => (
          <div key={logo.firestoreId || index} className="group w-24 hover:scale-125 transition-transform duration-300 ease-in-out">
            {logo.link ? (
              <a
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block z-50 relative w-full h-full cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <ImageIn
                  src={logo.src}
                  alt={`Worked With - ${index}`}
                  priority={index < 5}
                  sizes="100px"
                  className="object-contain! brightness-0 group-hover:brightness-100 transition-all pointer-events-none select-none"
                  divClassName="aspect-square"
                />
              </a>
            ) : (
              <ImageIn
                src={logo.src}
                alt={`Worked With - ${index}`}
                priority={index < 5}
                sizes="100px"
                className="object-contain! pointer-events-none select-none"
                divClassName="aspect-square"
              />
            )}
          </div>
        ))}
      </ImagesMarquee>
    </section>
  )
}
