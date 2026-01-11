'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getAboutContent } from '@/lib/getAbout'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function FooterContent() {
  const [aboutContent, setAboutContent] = useState(null)
  const [loading, setLoading] = useState(true)

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getAboutContent()
        setAboutContent(content)
      } catch (error) {
        console.error('Error fetching about content:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy Policy' },
  ]

  if (loading || !aboutContent) {
    return (
      <section className="relative w-screen min-h-screen overflow-hidden flex justify-center items-center py-12 px-4 max-md:py-18 max-xl:px-1">
        <div className="max-w-7xl mx-auto bg-bg/10 text-bg rounded-2xl p-6">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between text-bg/50 capitalize max-md:translate-y-32">
      <div className="h-1/2 max-md:h-80 flex justify-center items-center max-md:items-end">
        <h4 className="text-[20rem] max-2xl:text-[19rem] max-xl:text-[13rem] max-lg:text-[10rem] max-md:text-9xl max-sm:text-7xl text-bg font-extrabold tracking-[-2px] max-md:mb-4 duration-300">
          <VariableFontHoverByRandomLetter
            label={aboutContent.nickname}
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
                {aboutContent.location} •{' '}
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
                © {aboutContent.nickname} {new Date().getFullYear()}
                <span className="block text-xs mt-2 md:mt-0">All rights reserved.</span>
              </p>

              <div className="h-full flex md:justify-end md:items-end md:text-end justify-between gap-4 pb-4">
                {Object.entries(aboutContent.socialLinks || {}).map(([platform, url], index) => (
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
