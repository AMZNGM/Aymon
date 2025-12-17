'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import personalInfo from '@/data/personal-info.json'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function FooterContent() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy Policy' },
  ]

  return (
    <div className="relative w-full h-full flex flex-col justify-between text-bg/50 capitalize max-md:translate-y-32">
      <div className="h-1/2 max-md:h-80 flex justify-center items-center max-md:items-end">
        <h4 className="text-[20rem] max-2xl:text-[19rem] max-xl:text-[13rem] max-lg:text-[10rem] max-md:text-9xl max-sm:text-7xl text-bg font-extrabold tracking-[-2px] max-md:mb-4 duration-300">
          <VariableFontHoverByRandomLetter
            label={personalInfo.nickname}
            fromFontVariationSettings="'wght' 900, 'slnt' 0"
            toFontVariationSettings="'wght' 400, 'slnt' -10"
            className="z-10"
          />
        </h4>
      </div>

      <div className="h-1/2 max-md:h-2/3 px-8 max-md:py-4 max-md:px-14">
        <div className="w-full max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <motion.div initial={{ y: '100%' }} whileInView={{ y: 0 }} transition={{ duration: 0.75 }} className="flex justify-end">
              <p className="w-1/2 flex items-end text-sm opacity-80">
                {personalInfo.location} •{' '}
                {currentTime.toLocaleTimeString('en-US', {
                  timeZone: 'Africa/Cairo',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </p>

              <div className="w-full space-y-4 text-end">
                <nav className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <Link key={index} href={link.href} className="block text-sm hover:text-bg">
                      <VariableFontHoverByRandomLetter label={link.label} />
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </div>

          <motion.hr initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }} className="my-2 opacity-75" />

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '-100%' }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-between max-md:flex-col-reverse"
            >
              <p className="text-sm opacity-60 max-md:flex max-md:justify-between max-md:text-end">
                © {personalInfo.nickname} {new Date().getFullYear()}
                <span className="block text-xs mt-2 md:mt-0">All rights reserved.</span>
                <span className="block text-xs mt-2 md:mt-0">All rights reserved.</span>
              </p>

              <div className="h-full flex md:justify-end md:items-end md:text-end justify-between gap-4 pb-4">
                {Object.entries(personalInfo.socialLinks || {}).map(([platform, url], index) => (
                  <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-bg">
                    <VariableFontHoverByRandomLetter label={platform} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
