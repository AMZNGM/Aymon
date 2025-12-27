'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getAboutContent } from '@/lib/getAbout'
import useTextClipPath from '@/hooks/useTextClipPath'
import WordMagnet from '@/components/ui/text/WordMagnet'
import VariableFontHoverByRandomLetter from '@/components/ui/text/VariableFontHoverByRandomLetter'

export default function AboutText() {
  const [aboutContent, setAboutContent] = useState(null)
  const [loading, setLoading] = useState(true)

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
    <section className="relative w-screen min-h-screen overflow-hidden flex justify-center items-center py-12 px-4 max-md:py-18 max-xl:px-1">
      <div className="max-w-7xl mx-auto bg-bg/10 text-bg rounded-2xl p-6">
        <motion.h2
          {...useTextClipPath(0, true)}
          className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-16"
        >
          {aboutContent.title}
        </motion.h2>

        <div className="space-y-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.1, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-4xl max-md:text-2xl font-bold tracking-tighter">
              {aboutContent.firstName} {aboutContent.lastName}
            </h3>
            <p className="text-xl max-md:text-lg text-bg/75">{aboutContent.position || 'Multidisciplinary Visual Artist'}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.2, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <WordMagnet text={aboutContent.bio} className="text-lg max-md:text-base text-bg/60 leading-relaxed" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.3, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <p className="text-lg max-md:text-base text-bg/60 italic">&ldquo;{aboutContent.slogan}&rdquo;</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.4, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-8"
          >
            <a
              href={aboutContent.socialLinks.linkedin}
              className="text-lg max-md:text-base text-bg transition-colors duration-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VariableFontHoverByRandomLetter label={'LinkedIn'} />
            </a>
            <a
              href={aboutContent.socialLinks.instagram}
              className="text-lg max-md:text-base text-bg transition-colors duration-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VariableFontHoverByRandomLetter label={'Instagram'} />
            </a>
            <a
              href={aboutContent.socialLinks.behance}
              className="text-lg max-md:text-base text-bg transition-colors duration-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <VariableFontHoverByRandomLetter label={'Behance'} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
