'use client'

import { useEffect, useState } from 'react'
import { getLogos } from '@/lib/getLogos'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import ImagesMarquee from '@/components/ui/ImagesMarquee'

const path =
  'M51.5 517.243C211.013 361.522 344.994 30.4648 618.524 52.5637C922.173 77.0959 1020.81 452.453 1240.41 517.243C1722.64 659.519 2250.74 349.442 2755.5 349.442'

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
    <section className="relative w-full h-fit md:overflow-hidden max-md:-translate-x-28 max-md:-translate-y-12 pt-6 max-md:pt-22">
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
