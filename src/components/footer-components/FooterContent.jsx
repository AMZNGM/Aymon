'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { useAbout } from '@/hooks/for-db/useAbout'
import TextWghtGrow from '@/components/ui/text/TextWghtGrow'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export default function FooterContent() {
  const { aboutContent, loading } = useAbout()
  const [currentTime, setCurrentTime] = useState(new Date())

  useInterval(() => {
    setCurrentTime(new Date())
  }, 1000)

  if (loading || !aboutContent) {
    return (
      <section className="w-full h-full flex justify-center items-center bg-bg/50">
        <span className="text-[1dvw] text-center animate-pulse">shut ur eyes...</span>
      </section>
    )
  }

  return (
    <section className="relative w-full h-full flex flex-col justify-between max-md:justify-center max-md:items-center gap-4 bg-bg/50 text-bg capitalize">
      {/* head */}
      <h6 className="self-center text-[20dvw] max-md:text-8xl tracking-[-2px] select-none">
        <TextWghtGrow label={aboutContent.nickname} from="'wght' 900, 'slnt' 0" to="'wght' 400, 'slnt' -10" />
      </h6>

      <div className="w-[74dvw] max-md:w-[79dvw] md:h-full text-bg/50 mx-auto">
        <div className="overflow-hidden">
          <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} transition={{ duration: 0.75 }} className="flex justify-end">
            {/* location and timer */}
            <p className="w-1/2 flex flex-col justify-end gap-2 opacity-80 text-[0.8dvw] max-2xl:text-sm">
              <span>{aboutContent.location}</span>

              <span className="text-nowrap">
                {currentTime.toLocaleTimeString('en-US', {
                  timeZone: 'Africa/Cairo',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </p>

            {/* links */}
            <div className="w-1/2 space-y-4 text-end">
              <nav className="space-y-2">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.href} className="block text-[0.8dvw] hover:text-bg max-2xl:text-sm cursor-none">
                    <TextWghtGrow label={link.label} />
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>

        <motion.hr initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }} className="scale-y-200 my-2" />

        <div className="overflow-hidden">
          {/* bottom */}
          <motion.div
            initial={{ y: '-100%' }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex max-md:flex-col-reverse justify-between"
          >
            <p className="max-md:flex max-md:justify-between opacity-60 text-[0.8dvw] max-2xl:text-sm max-md:text-end">
              © {aboutContent.nickname} {new Date().getFullYear()}
              <span className="block text-xs mt-2 md:mt-0">All rights reserved.</span>
            </p>

            <div className="h-full flex justify-between md:justify-end md:items-end gap-4 md:text-end pb-4">
              {Object.entries(aboutContent.socialLinks || {}).map(([platform, url], index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8dvw] hover:text-bg max-2xl:text-sm cursor-none"
                >
                  <TextWghtGrow label={platform === 'Behance' ? `Béhance` : platform.charAt(0).toUpperCase() + platform.slice(1)} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
