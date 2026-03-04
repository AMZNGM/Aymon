'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
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

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    []
  )

  const socialLinks = useMemo(() => {
    if (!aboutContent?.socialLinks) return []
    return Object.entries(aboutContent.socialLinks).map(([platform, url], index) => (
      <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-[0.8dvw] hover:text-bg max-2xl:text-sm">
        <TextWghtGrow label={platform === 'Behance' ? `Béhance` : platform.charAt(0).toUpperCase() + platform.slice(1)} />
      </a>
    ))
  }, [aboutContent])

  if (loading || !aboutContent) {
    return (
      <section className="flex justify-center items-center w-full h-full bg-bg/50">
        <span className="text-[1dvw] text-center animate-pulse">shut ur eyes...</span>
      </section>
    )
  }

  return (
    <section className="relative flex flex-col justify-between max-md:justify-center max-md:items-center gap-4 w-full h-full bg-bg/50 text-bg capitalize">
      {/* head */}
      <h6 className="self-center text-[20dvw] tracking-[-2px] select-none">
        <TextWghtGrow
          label={aboutContent.nickname}
          fromFontVariationSettings="'wght' 900, 'slnt' 0"
          toFontVariationSettings="'wght' 400, 'slnt' -10"
        />
      </h6>

      <div className="w-[74dvw] max-md:w-[79dvw] md:h-full text-bg/50 mx-auto">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="flex justify-end"
          >
            {/* location and timer */}
            <p className="flex flex-col justify-end gap-2 w-1/2 opacity-80 text-[0.8dvw] max-2xl:text-sm">
              <span>{aboutContent.location}</span>
              <span className="text-nowrap">{timeFormatter.format(currentTime)}</span>
            </p>

            {/* links */}
            <div className="space-y-4 w-1/2 text-end">
              <nav className="space-y-2">
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.href} className="block text-[0.8dvw] hover:text-bg max-2xl:text-sm">
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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex max-md:flex-col-reverse justify-between"
          >
            <p className="max-md:flex max-md:justify-between opacity-60 text-[0.8dvw] max-2xl:text-sm max-md:text-end">
              © {aboutContent.nickname} {new Date().getFullYear()}
              <span className="block text-xs mt-2 md:mt-0">All rights reserved.</span>
            </p>

            <div className="flex justify-between md:justify-end md:items-end gap-4 h-full md:text-end pb-4">{socialLinks}</div>
          </motion.div>
        </div>
      </div>

      <div className="opacity-50 max-md:text-xs text-sm px-2 py-1">
        Powered by{' '}
        <Link
          href="https://www.linkedin.com/in/abdulrahman-ngm-20b689345/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <TextWghtGrow label="NGM" />
        </Link>
      </div>
    </section>
  )
}
