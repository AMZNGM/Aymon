'use client'

import { useEffect, useState } from 'react'
import { getLogos } from '@/lib/getLogos'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import ImagesMarquee from '@/components/ui/ImagesMarquee'

const path =
  'M51.5127 204.844C87.393 189.405 104.026 166.675 136.029 149.6C178.353 127.017 231.739 109.85 282.271 89.7791C337.762 67.7388 383.507 48.6002 475.045 51.8599C533.897 53.9556 602.365 78.0292 647.876 89.7791C689.111 100.425 739.152 108.545 777.975 119.853C848.694 140.451 910.978 149.404 995.438 160.387C1090.31 172.725 1175.79 185.261 1273.68 192.749C1309.07 195.457 1352.53 193.076 1388.58 193.076C1446.72 193.076 1501.94 198.377 1559.51 198.96C1652.07 199.897 1745.13 198.96 1837.75 198.96C1923.65 198.96 1985.67 222.496 2068.51 222.496'

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
      <ImagesMarquee path={path} viewBox="50 50 1300 200" spacing={1.4}>
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
