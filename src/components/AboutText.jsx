'use client'

import { motion } from 'framer-motion'
import useTextClipPath from '@/hooks/useTextClipPath'
import personalInfo from '@/data/personal-info.json'

export default function AboutText() {
  return (
    <section className="relative w-screen min-h-screen overflow-hidden flex justify-center items-center py-12 px-4 max-xl:ps-1 max-xl:pe-14">
      <div className="max-w-7xl mx-auto bg-bg/10 text-bg rounded-2xl p-6">
        <motion.h2
          {...useTextClipPath(0, true)}
          className="text-8xl max-xl:text-7xl max-lg:text-4xl font-extrabold tracking-[-2px] uppercase mb-16"
        >
          About
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
              {personalInfo.firstName} {personalInfo.lastName}
            </h3>
            <p className="text-xl max-md:text-lg text-bg/75">{personalInfo.title}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.2, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-lg max-md:text-base text-bg/60 leading-relaxed">{personalInfo.bio}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.3, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <p className="text-lg max-md:text-base text-bg/60 italic">&ldquo;{personalInfo.slogan}&rdquo;</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.4, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 pt-8"
          >
            <a
              href={personalInfo.socialLinks.linkedin}
              className="text-lg max-md:text-base text-bg hover:text-main transition-colors duration-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.socialLinks.instagram}
              className="text-lg max-md:text-base text-bg hover:text-main transition-colors duration-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={personalInfo.socialLinks.behance}
              className="text-lg max-md:text-base text-bg hover:text-main transition-colors duration-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
